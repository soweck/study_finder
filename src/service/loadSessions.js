// store/AppStore.js
import { User } from "../models/User.js";
import { StudySession } from "../models/StudySession.js";

class AppStore {
  constructor() {
    this._state = {
      users: [],
      sessions: [],
      currentUser: null,
    };
    this._listeners = [];
  }

  // --- INITIALIZATION (Hydration) ---
  init(rawProfiles, rawPresence, rawSessions, currId) {
    // 1. Hydrate Users
    this._state.users = rawProfiles.map((p) => {
      const presence = rawPresence.find((pr) => pr.userid === p.id);
      return new User(p, presence);
    });

    // 2. Hydrate Sessionsw
    this._state.sessions = rawSessions.map((s) => new StudySession(s));

    // Set active user profile
    this._state.currentUser = this._state.users.find((u) => u.id === currId);
  }

  // --- SESSION ACTIONS (Business Logic) ---
  joinSession(sessionId) {
    const session = this._state.sessions.find((s) => s.id === sessionId);

    if (session && !session.isFull()) {
      // Update data in memory
      session.addParticipant(this._state.currentUser.id);

      this._notify();
    }
  }

  subscribe(callback) {
    this._listeners.push(callback);
    return () =>
      (this._listeners = this._listeners.filter((l) => l !== callback));
  }

  _notify() {
    this._listeners.forEach((callback) => callback());
  }
}

export const store = new AppStore();
