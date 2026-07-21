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
    expect(() => store.addFriend("999")).toThrow(
      "Invalid friend ID or user not found",
    );
  });
});
