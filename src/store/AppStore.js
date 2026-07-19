import { StudySession } from "../model/StudySession.js";

class AppStore {
  #subscribers = new Set();
  // TODO: Use dictionary for sessions for faster lookup?
  #state = { sessions: [], users: new Map(), currentUser: null };

  constructor(currentUser) {
    if (currentUser) {
      this.#state.currentUser = String(currentUser);
    }
  }

  get currentUser() {
    return this.#state.currentUser;
  }

  get users() {
    return this.#state.users;
  }

  get studySessions() {
    return this.#state.sessions;
  }

  setCurrentUser(userId) {
    if (
      this.#state.users.get(String(userId)) &&
      this.#state.currentUser === null
    ) {
      this.#state.currentUser = String(userId);
      this.#notify();
    }
  }

  addFriend(friendId) {
    const friendIdStr = String(friendId);
    if (
      friendIdStr !== this.#state.currentUser &&
      this.#state.users.get(friendIdStr)
    ) {
      this.#state.users.get(this.#state.currentUser).addFriend(friendIdStr);
      this.#notify();
    } else {
      throw new Error("Invalid friend ID or user not found");
    }
  }

  createStudySession(session) {
    if (session instanceof StudySession) {
      this.#state.sessions.push(session);
    } else {
      throw new Error("Invalid study session object");
    }
  }

  subscribe(callback) {
    if (typeof callback === "function") {
      this.#subscribers.add(callback);
      return () => {
        this.#subscribers.delete(callback);
      };
    }
  }

  #notify() {
    this.#subscribers.forEach((callback) => callback());
  }

  // TODO: Implement save() and load() methods for persistence to and from localStorage
}

export const store = new AppStore();
