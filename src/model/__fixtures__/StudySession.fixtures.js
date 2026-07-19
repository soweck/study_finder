import { StudySession } from "../StudySession.js";

const session = {
  id: "0",
  title: "Last-minute study",
  startDate: "2025-12-03T12:00:00+07:00",
  location: "RMIT 80.10.2",
  participants: ["2", "1"],
  capacity: 5,
};

export const createStudySessions = (overrides = {}) =>
  new StudySession({ ...session, ...overrides });
