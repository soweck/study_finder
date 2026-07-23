import { UserStatus } from "./UserStatus.js";

export class User {
  #id;
  #name;
  #friends;
  constructor({
    id,
    name,
    friends = [],
    status = "OFFLINE",
    activity = "",
    note = "",
  }) {
    this.#id = String(id);
    this.#name = name;
    this.#friends = friends.map((friendId) => String(friendId));
    this.setStatus(status);
    this.setActivity(activity);
    this.setNote(note);
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get friends() {
    return this.#friends;
  }

  /**
   * Adds a friend identifier when it is not already present.
   * @param {string|number} friendId - The friend identifier to add.
   */
  addFriend(friendId) {
    const friendIdStr = String(friendId);
    if (this.friends.includes(friendIdStr)) {
      throw new Error("Friend already exists");
    }

    if (friendIdStr === this.#id) {
      throw new Error("Cannot add yourself as a friend");
    }

    this.friends.push(friendIdStr);
  }

  removeFriend(friendId) {
    const friendIdStr = String(friendId);
    if (!this.friends.includes(friendIdStr)) {
      throw new Error("Friend not found");
    }

    if (friendIdStr === this.#id) {
      throw new Error("Cannot remove yourself as a friend");
    }

    this.#friends = this.friends.filter((id) => id !== friendIdStr);
  }

  /**
   * Updates the user's display name.
   * @param {string} newName - The new name for the user.
   */
  setName(newName) {
    // TODO: Add validation for name if required
    this.#name = newName;
  }

  /**
   * Updates the user's status text.
   * @param {string} status - The new status value.
   */
  setStatus(status) {
    if (!status) {
      throw new Error("Status cannot be empty");
    }

    if (!UserStatus[status.toUpperCase()]) {
      throw new Error(`Invalid status: ${status}`);
    }

    this.status = UserStatus[status.toUpperCase()];
  }

  /**
   * Updates the user's current activity.
   * @param {string} activity - The new activity value.
   */
  setActivity(activity) {
    // TODO: Add validation for activity if required
    this.activity = activity;
  }

  /**
   * Updates the user's note field.
   * @param {string} note - The new note value.
   */
  setNote(note) {
    // TODO: Add validation for note if required
    this.note = note;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      friends: this.friends,
      status: this.status,
      activity: this.activity,
      note: this.note,
    };
  }
}
