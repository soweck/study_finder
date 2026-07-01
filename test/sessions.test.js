import { describe, expect, test } from "vitest";
import { StudySession } from "../src/model/StudySession.js";

describe("Hydrating proper study sessions", () => {
  const jsonFile = [
    {
      id: 0,
      title: "Last-minute study",
      startDate: "2025-12-03T12:00:00+07:00",
      location: "RMIT 80.10.2",
      participants: [2, 1],
      capacity: 5,
    },
    {
      id: 1,
      title: "Data structures review",
      startDate: "2025-12-03T16:00:00+07:00",
      location: "RMIT 12.02.5",
      participants: [7, 8, 9, 10, 11, 12],
      capacity: 6,
    },
    {
      id: 2,
      title: "chill creative arts session",
      startDate: "2025-12-03T20:30:00+07:00",
      location: "State Library",
      participants: [3, 4, 5, 6, 13, 11, 14, 15],
      capacity: 10,
    },
  ];
  const sessionClassArray = jsonFile.map(
    (e) =>
      new StudySession(
        e.id,
        e.title,
        e.startDate,
        e.location,
        e.participants,
        e.capacity,
      ),
  );

  test("Loading proper data", () => {
    expect(sessionClassArray).toEqual(jsonFile);
  });
  test;
});
