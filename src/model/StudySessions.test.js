import { describe, expect, test } from "vitest";

import { createStudySessions } from "./__fixtures__/StudySession.fixtures.js";

describe("Testing study session model functionality", () => {
  test("Testing session ID conversion from int to string", () => {
    const session = createStudySessions({ id: 1 });
    expect(session.id).toBe("1");
  });

  test("Testing owner ID conversion from int to string", () => {
    const session = createStudySessions({ ownerId: 4 });
    expect(session.ownerId).toBe("4");
  });

  test("Testing session participant ID conversion from int to string", () => {
    const session = createStudySessions({ participants: [1, 2] });
    expect(session.participants).toEqual(["1", "2"]);
  });

  test("Testing default title when no title is provided", () => {
    const session = createStudySessions({ title: undefined });
    expect(session.title).toBe("Untitled Session");
  });

  test("Testing setTitle updates the session title", () => {
    const session = createStudySessions();
    session.setTitle("Exam Prep");
    expect(session.title).toBe("Exam Prep");
  });

  test("Testing isFull when capacity has not been reached", () => {
    const session = createStudySessions({ capacity: 3, participants: ["1"] });
    expect(session.isFull()).toBe(false);
  });

  test("Testing isFull when capacity has been reached", () => {
    const session = createStudySessions({
      capacity: 2,
      participants: ["1", "2"],
    });
    expect(session.isFull()).toBe(true);
  });

  test("Testing addParticipants with string input", () => {
    const session = createStudySessions();
    const initialParticipants = [...session.participants];
    session.addParticipant("3");
    expect(session.participants).toEqual([...initialParticipants, "3"]);
  });
  test("Testing addParticipants with number input expecting to be converted to string", () => {
    const session = createStudySessions();
    const initialParticipants = [...session.participants];
    session.addParticipant(3);
    expect(session.participants).toEqual([...initialParticipants, "3"]);
  });
  test("Testing addParticipant to a full session", () => {
    const session = createStudySessions({ capacity: 2 });
    expect(() => session.addParticipant(3)).toThrow("Session is full");
  });
  test("Testing addParticipant with duplicate participant", () => {
    const session = createStudySessions();
    const initialParticipants = [...session.participants];
    expect(() => session.addParticipant(initialParticipants[0])).toThrow(
      "Participant already exists",
    );
  });
  test("Testing removeParticipant with string input", () => {
    const session = createStudySessions({ participants: ["1", "2", "3"] });
    session.removeParticipant("2");
    expect(session.participants).toEqual(["1", "3"]);
  });

  test("Testing removeParticipant with number input expecting to be converted to string", () => {
    const session = createStudySessions({ participants: ["1", "2", "3"] });
    session.removeParticipant(2);
    expect(session.participants).toEqual(["1", "3"]);
  });

  test("Testing removeParticipant with a participant not in the session", () => {
    const session = createStudySessions({ participants: ["1", "2", "3"] });
    expect(() => session.removeParticipant("4")).toThrow(
      "Participant not found",
    );
  });

  test("Testing toJSON returns the session data", () => {
    const session = createStudySessions({ ownerId: 7 });
    expect(session.toJSON()).toEqual({
      id: "0",
      title: "Last-minute study",
      startDate: "2025-12-03T12:00:00+07:00",
      location: "RMIT 80.10.2",
      participants: ["2", "1"],
      capacity: 5,
      ownerId: "7",
    });
  });
});
