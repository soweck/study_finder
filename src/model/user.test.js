import { describe, expect, test } from "vitest";
import { createUser } from "./__fixtures__/user-fixtures.js";

describe("Testing user model functionality", () => {
  test("Testing user ID conversion from int to string", () => {
    const user = createUser({ id: 1 });
    expect(user.id).toBe("1");
  });

  test("Testing default status when no status is provided", () => {
    const user = createUser({ status: undefined });
    expect(user.status).toBe("Offline");
  });

  test("Testing friend ID conversion from int to string", () => {
    const user = createUser({ friends: [1, 2] });
    expect(user.friends).toEqual(["1", "2"]);
  });

  test("Testing addFriend with string input", () => {
    const user = createUser();
    const initialFriends = [...user.friends];
    user.addFriend("13");
    expect(user.friends).toEqual([...initialFriends, "13"]);
  });

  test("Testing addFriend with number input expecting to be converted to string", () => {
    const user = createUser();
    const initialFriends = [...user.friends];
    user.addFriend(13);
    expect(user.friends).toEqual([...initialFriends, "13"]);
  });

  test("Testing addFriend with duplicate friend", () => {
    const user = createUser();
    const initialFriends = [...user.friends];
    expect(() => user.addFriend(initialFriends[0])).toThrow(
      "Friend already exists",
    );
  });

  test("Adding yourself as a friend should throw an error", () => {
    const user = createUser();
    expect(() => user.addFriend(user.id)).toThrow(
      "Cannot add yourself as a friend",
    );
  });

  test("Testing removeFriend with string input", () => {
    const user = createUser({ friends: ["1", "2", "3"] });
    user.removeFriend("2");
    expect(user.friends).toEqual(["1", "3"]);
  });

  test("Testing removeFriend with number input expecting to be converted to string", () => {
    const user = createUser({ friends: ["1", "2", "3"] });
    user.removeFriend(2);
    expect(user.friends).toEqual(["1", "3"]);
  });

  test("Testing removeFriend with a friend that does not exist", () => {
    const user = createUser({ friends: ["1", "2", "3"] });
    expect(() => user.removeFriend("9")).toThrow("Friend not found");
  });

  test("Testing removeFriend with yourself should throw an error", () => {
    const user = createUser({ friends: ["1", "2", "3"] });
    expect(() => user.removeFriend(user.id)).toThrow(
      "Cannot remove yourself as a friend",
    );
  });

  test("Testing setName updates the user name", () => {
    const user = createUser();
    user.setName("Taylor");
    expect(user.name).toBe("Taylor");
  });

  test("Testing setActivity updates the user activity", () => {
    const user = createUser();
    user.setActivity("Studying");
    expect(user.activity).toBe("Studying");
  });

  test("Testing setNote updates the user note", () => {
    const user = createUser();
    user.setNote("Exam next week");
    expect(user.note).toBe("Exam next week");
  });

  test("Testing setStatus method with valid status", () => {
    const user = createUser({ status: "Offline" });
    user.setStatus("online");
    expect(user.status).toBe("Online");
  });

  test("Testing setStatus method with empty status", () => {
    const user = createUser({ status: "Offline" });
    expect(() => user.setStatus("")).toThrow("Status cannot be empty");
  });

  test("Testing setStatus method with invalid status", () => {
    const invalidStatus = "Available";
    const user = createUser({ status: "Offline" });
    expect(() => user.setStatus(invalidStatus)).toThrow(
      `Invalid status: ${invalidStatus}`,
    );
  });

  test("Testing toJSON returns the user data", () => {
    const user = createUser({
      id: 5,
      name: "Taylor",
      friends: [1, 2],
      status: "Busy",
      activity: "Reading",
      note: "Focus mode",
    });

    expect(user.toJSON()).toEqual({
      id: "5",
      name: "Taylor",
      friends: ["1", "2"],
      status: "Busy",
      activity: "Reading",
      note: "Focus mode",
    });
  });
});
