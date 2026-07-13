import { describe, expect, test } from "vitest";
import { createUser } from "./__fixtures__/user-fixtures.js";

describe("Testing user model functionality", () => {
  test("Testing user ID conversion from int to string", () => {
    const user = createUser({ id: 1 });
    expect(user.id).toBe("1");
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
    user.addFriend(initialFriends[0]);
    expect(user.friends).toEqual(initialFriends);
  });
});
