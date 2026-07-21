import { StudySession } from "../model/StudySession.js";
import { User } from "../model/User.js";
import usersStatusSeed from "../data/users-status.seed.json";
import sessionsDataSeed from "../data/sessions.seed.json";
import usersDataSeed from "../data/users.seed.json";

class AppStore {
  #defaultUser = "1";
  #subscribers = new Set();
  // TODO: Use dictionary for sessions for faster lookup?
  #state = { sessions: [], users: new Map(), currentUser: null };

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
    const userIdStr = String(userId);
    if (this.#state.users.get(userIdStr)) {
      this.#state.currentUser = userIdStr;
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
  save() {
    localStorage.setItem(
      "studyFinderState",
      JSON.stringify({
        ...this.#state,
        users: Object.fromEntries(this.#state.users),
      }),
    );
  }

  load() {
    const savedState = localStorage.getItem("studyFinderState");
    const parsedState = JSON.parse(savedState);
    let sessions = [];
    if (parsedState?.sessions) {
      sessions = parsedState.sessions;
    } else {
      sessions = sessionsDataSeed;
    }
    this.#state.sessions = sessions.map(
      (sessionData) => new StudySession(sessionData),
    );

    let users = [];
    if (parsedState?.users) {
      users = Object.entries(parsedState.users).map(([id, userData]) => [
        id,
        new User(userData),
      ]);
    } else {
      users = usersDataSeed.map((userData) => {
        const userStatus = usersStatusSeed.find(
          (status) => status.userId === userData.id,
        );
        const { userId, ...statusData } = userStatus ?? {};
        return [
          String(userData.id),
          new User({
            ...userData,
            ...statusData,
          }),
        ];
      });
    }
    this.#state.users = new Map(users);
    this.#state.currentUser =
      parsedState?.currentUser ?? String(this.#defaultUser);
    this.#notify();
  }
}

export const store = new AppStore();
