/**
 * Represents a user profile
 */
export class User {
  #id;
  #name;
  #friends;
  constructor({
    id,
    name,
    friends = [],
    status = "",
    activity = "",
    note = "",
  }) {
    this.#id = String(id);
    this.#name = name;
    this.#friends = friends.map((friendId) => String(friendId));
    this.status = status;
    this.activity = activity;
    this.note = note;
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
    if (!this.friends.includes(friendIdStr)) {
      this.friends.push(friendIdStr);
    }
  }

  /**
   * Updates the user's display name.
   * @param {string} newName - The new name for the user.
   */
  changeName(newName) {
    //TODO: Add validation for name if required
    this.#name = newName;
  }

  /**
   * Updates the user's status text.
   * @param {string} status - The new status value.
   */
  changeStatus(status) {
    //TODO: Add validation for status if required
    this.status = status;
  }

  /**
   * Updates the user's current activity.
   * @param {string} activity - The new activity value.
   */
  changeActivity(activity) {
    //TODO: Add validation for activity if required
    this.activity = activity;
  }

  /**
   * Updates the user's note field.
   * @param {string} note - The new note value.
   */
  changeNote(note) {
    //TODO: Add validation for note if required
    this.note = note;
  }
}
