import { beforeEach, describe, expect, test } from "vitest";
import sessionsDataSeed from "../data/sessions.seed.json";
import usersDataSeed from "../data/users.seed.json";
import usersStatusSeed from "../data/users-status.seed.json";
import { store } from "./AppStore.js";

describe("AppStore persistence", () => {
  const userJson = usersDataSeed.map((userData) => {
    const userStatus = usersStatusSeed.find(
      (status) => status.userId === userData.id,
    );
    const { userId, ...statusData } = userStatus ?? {
      userId: null,
      status: "",
      activity: "",
      note: "",
    };

    return {
      ...userData,
      ...(statusData ?? { status: "", activity: "", note: "" }),
    };
  });

  const expectedUserJson = JSON.stringify(
    Object.values(userJson).map((userData) => ({
      ...userData,
      id: String(userData.id),
      friends: userData.friends.map((friendId) => String(friendId)),
    })),
  );

  const expectedSessionJson = JSON.stringify(
    sessionsDataSeed.map((sessionData) => ({
      ...sessionData,
      id: String(sessionData.id),
      participants: sessionData.participants.map((participantId) =>
        String(participantId),
      ),
      ownerId: String(sessionData.ownerId),
    })),
  );

  beforeEach(() => {
    const storage = new Map();

    globalThis.localStorage = {
      getItem(key) {
        return storage.has(key) ? storage.get(key) : null;
      },
      setItem(key, value) {
        storage.set(key, String(value));
      },
      removeItem(key) {
        storage.delete(key);
      },
      clear() {
        storage.clear();
      },
    };
  });

  test("Subscribe registers and notifies on store changes", () => {
    store.load();

    let callCount = 0;
    const unsubscribe = store.subscribe(() => {
      callCount += 1;
    });

    store.setCurrentUser("2");
    store.setUserNote("Focus time");

    expect(callCount).toBe(2);

    unsubscribe();
  });

  test("Unsubscribe stops future notifications", () => {
    store.load();

    let callCount = 0;
    const unsubscribe = store.subscribe(() => {
      callCount += 1;
    });

    store.setCurrentUser("2");
    unsubscribe();
    store.setUserNote("No more notifications");

    expect(callCount).toBe(1);
  });

  test("Load notifies subscribers", () => {
    let callCount = 0;
    store.subscribe(() => {
      callCount += 1;
    });

    store.load();

    expect(callCount).toBe(1);
  });

  test("Load AppStore from empty localStorage", () => {
    store.load();

    expect(store.currentUser).toBe("1");
    expect(JSON.stringify(Array.from(store.users.values()))).toBe(
      expectedUserJson,
    );
    expect(JSON.stringify(store.studySessions)).toBe(expectedSessionJson);
  });

  test("Save AppStore to localStorage", () => {
    store.load();
    store.save();
    const savedState = JSON.parse(localStorage.getItem("studyFinderState"));
    expect(savedState).toHaveProperty("sessions");
    expect(savedState).toHaveProperty("users");
    expect(savedState).toHaveProperty("currentUser");
    expect(savedState.currentUser).toBe("1");
    expect(JSON.stringify(savedState.sessions)).toBe(expectedSessionJson);
    expect(JSON.stringify(Object.values(savedState.users))).toBe(
      expectedUserJson,
    );
  });

  test("Load AppStore from localStorage", () => {
    store.load();
    store.save();
    store.load();

    expect(store.currentUser).toBe("1");
    expect(JSON.stringify(Array.from(store.users.values()))).toBe(
      expectedUserJson,
    );
    expect(JSON.stringify(store.studySessions)).toBe(expectedSessionJson);
  });

  test("Changing current user and saving to localStorage", () => {
    store.load();
    store.setCurrentUser("2");
    store.save();
    const savedState = JSON.parse(localStorage.getItem("studyFinderState"));
    expect(savedState.currentUser).toBe("2");
  });

  test("Setting current user with an unknown id should throw an error", () => {
    store.load();

    expect(() => store.setCurrentUser("999")).toThrow("User not found");
  });

  test("Adding a friend and saving to localStorage", () => {
    store.load();
    store.setCurrentUser("2");
    store.addFriend("4");
    store.save();
    const savedState = JSON.parse(localStorage.getItem("studyFinderState"));
    const user2 = savedState.users["2"];
    expect(user2.friends).toContain("4");
  });

  test("Adding a friend that is not in the users list should throw an error", () => {
    store.load();
    store.setCurrentUser("2");
    expect(() => store.addFriend("999")).toThrow("Friend user not found");
  });

  test("Removing a friend and saving to localStorage", () => {
    store.load();
    store.setCurrentUser("2");
    const initialFriends = store.users.get("2").friends;
    if (initialFriends.length > 0) {
      store.removeFriend(initialFriends[0]);
      store.save();
      const savedState = JSON.parse(localStorage.getItem("studyFinderState"));
      const user2 = savedState.users["2"];
      expect(user2.friends).not.toContain(initialFriends[0]);
    }
  });

  test("Removing a friend that is not in the users list should throw an error", () => {
    store.load();
    store.setCurrentUser("2");

    expect(() => store.removeFriend("999")).toThrow(
      "Invalid friend ID or user not found",
    );
  });

  test("Setting user status and activity", () => {
    store.load();
    store.setCurrentUser("3");
    store.setUserStatus("Offline");
    store.setUserActivity("studying");
    store.save();
    const savedState = JSON.parse(localStorage.getItem("studyFinderState"));
    const user3 = savedState.users["3"];
    expect(user3.status).toBe("Offline");
    expect(user3.activity).toBe("studying");
  });

  test("Setting user name updates the current user", () => {
    store.load();
    store.setCurrentUser("3");
    store.setUserName("Taylor");

    expect(store.users.get("3").name).toBe("Taylor");
  });

  test("Setting user note updates the current user", () => {
    store.load();
    store.setCurrentUser("3");
    store.setUserNote("Study block");

    expect(store.users.get("3").note).toBe("Study block");
  });

  test("Creating a new study session", () => {
    store.load();
    const initialSessionCount = store.studySessions.length;
    store.createStudySession({
      title: "Test Study Group",
      subject: "Mathematics",
      time: "2024-01-15T14:00:00Z",
    });
    expect(store.studySessions.length).toBe(initialSessionCount + 1);
  });

  test("Creating a study session sets the current user as owner", () => {
    store.load();
    store.setCurrentUser("3");

    store.createStudySession({
      title: "Owned session",
      startDate: "2024-01-15T14:00:00Z",
      location: "Library",
      participants: [],
      capacity: 4,
    });

    expect(store.studySessions.at(-1).ownerId).toBe("3");
  });

  test("Joining a study session", () => {
    store.load();
    store.setCurrentUser("3");
    if (store.studySessions.length > 0) {
      const sessionId = store.studySessions[0].id;
      store.joinSession(sessionId);
      expect(store.studySessions[0].participants).toContain("3");
    }
  });

  test("Joining a study session with an unknown id should throw", () => {
    store.load();
    store.setCurrentUser("3");

    expect(() => store.joinSession("999")).toThrow();
  });

  test("Leaving a study session", () => {
    store.load();
    store.setCurrentUser("1");
    if (store.studySessions.length > 0) {
      const sessionId = store.studySessions[0].id;
      store.leaveSession(sessionId);
      expect(store.studySessions[0].participants).not.toContain("1");
    }
  });

  test("Leaving a study session with an unknown id should throw", () => {
    store.load();
    store.setCurrentUser("1");

    expect(() => store.leaveSession("999")).toThrow();
  });

  test("All users are loaded from seed data", () => {
    store.load();
    expect(store.users.size).toBe(usersDataSeed.length);
    usersDataSeed.forEach((userData) => {
      expect(store.users.has(String(userData.id))).toBe(true);
    });
  });

  test("All sessions are loaded from seed data", () => {
    store.load();
    expect(store.studySessions.length).toBe(sessionsDataSeed.length);
    sessionsDataSeed.forEach((sessionData) => {
      const session = store.studySessions.find(
        (s) => s.id === String(sessionData.id),
      );
      expect(session).toBeDefined();
    });
  });

  test("User data includes status information from seed", () => {
    store.load();
    const user1 = store.users.get("1");
    expect(user1).toHaveProperty("status");
    expect(user1).toHaveProperty("activity");
    expect(user1).toHaveProperty("note");
  });

  test("Setting user note", () => {
    store.load();
    store.setCurrentUser("1");
    store.setUserNote("Studying for final exam");
    store.save();
    const savedState = JSON.parse(localStorage.getItem("studyFinderState"));
    const user1 = savedState.users["1"];
    expect(user1.note).toBe("Studying for final exam");
  });
});
