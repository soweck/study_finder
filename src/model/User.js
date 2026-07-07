export class User {
  constructor(id, name, friends = [], status = "", activity = "", note = "") {
    this.id = String(id);
    this.name = name;
    this.friends = friends.map(friendId => String(friendId));
    this.status = status;
    this.activity = activity;
    this.note = note;
  }

  addFriend(friendId) {
    const friendIdStr = String(friendId);
    if (!this.friends.includes(friendIdStr)) {
      this.friends.push(friendIdStr);
    }
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
