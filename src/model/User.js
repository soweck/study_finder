export class User {
  constructor(id, name, friends, status, activity, note) {
    this.id = id;
    this.name = name;
    this.friends = friends;
    this.status = status;
    this.activity = activity;
    this.note = note;
  }

  addFriend(friendId) {
    if (!friendId || typeof friendId === "object") {
      console.error(`Invalid friendId provided: ${friendId}`);
      return;
    }
    this.friends.push(friendId);
  }

  changeStatus(status) {
    this.status = status;
  }

  changeActivity(activity) {
    this.activity = activity;
  }

  changeNote(note) {
    this.note = note;
  }
}
