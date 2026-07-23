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

  #currentUserObject() {
    const currentUser = this.#state.users.get(this.#state.currentUser);

    if (!currentUser) {
      throw new Error("Current user not found");
    }

    return currentUser;
  }

  setCurrentUser(userId) {
    const userIdStr = String(userId);

    if (!this.#state.users.get(userIdStr)) {
      throw new Error("User not found");
    }

    this.#state.currentUser = userIdStr;
    this.save();
    this.#notify();
  }

  setUserStatus(status) {
    this.#currentUserObject().setStatus(status);
    this.save();
    this.#notify();
  }

  setUserActivity(activity) {
    this.#currentUserObject().setActivity(activity);
    this.save();
    this.#notify();
  }

  setUserNote(note) {
    this.#currentUserObject().setNote(note);
    this.save();
    this.#notify();
  }

  setUserName(name) {
    this.#currentUserObject().setName(name);
    this.save();
    this.#notify();
  }

  addFriend(friendId) {
    const friendIdStr = String(friendId);

    if (!this.#state.users.has(friendIdStr)) {
      throw new Error("Friend user not found");
    }

    this.#currentUserObject().addFriend(friendIdStr);
    this.save();
    this.#notify();
  }

  removeFriend(friendId) {
    const friendIdStr = String(friendId);

    if (!this.#state.users.has(friendIdStr)) {
      throw new Error("Invalid friend ID or user not found");
    }

    this.#currentUserObject().removeFriend(friendIdStr);
    this.save();
    this.#notify();
  }

  joinSession(sessionId) {
    const session = this.#state.sessions.find(
      (s) => s.id === String(sessionId),
    );
    session.addParticipant(this.#state.currentUser);
    this.save();
    this.#notify();
  }

  leaveSession(sessionId) {
    const session = this.#state.sessions.find(
      (s) => s.id === String(sessionId),
    );
    session.removeParticipant(this.#state.currentUser);
    this.save();
    this.#notify();
  }

  createStudySession(session) {
    const newSession = new StudySession({
      ...session,
      ownerId: this.#state.currentUser,
    });
    this.#state.sessions.push(newSession);
    this.save();
    this.#notify();
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

  save() {
    try {
      localStorage.setItem(
        "studyFinderState",
        JSON.stringify({
          ...this.#state,
          users: Object.fromEntries(this.#state.users),
        }),
      );
    } catch (error) {
      console.error("Error saving state to localStorage:", error);
    }
  }

  #loadStates(parsedState) {
    let sessions = [];
    let users = [];
    let currentUser = this.#defaultUser;

    if (parsedState?.sessions) {
      sessions = parsedState.sessions;
    } else {
      sessions = sessionsDataSeed;
    }

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

    if (parsedState?.currentUser) {
      currentUser = parsedState.currentUser;
    }

    return { sessions, users, currentUser };
  }

  load() {
    const savedState = localStorage.getItem("studyFinderState");
    const parsedState = JSON.parse(savedState);
    const { sessions, users, currentUser } = this.#loadStates(parsedState);
    this.#state.sessions = sessions.map(
      (sessionData) => new StudySession(sessionData),
    );
    this.#state.users = new Map(users);
    this.#state.currentUser = currentUser;
    this.#notify();
  }
}

export const store = new AppStore();
