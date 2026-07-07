import { describe, expect, test } from "vitest";
import { createStudySessions } from "./__fixtures__/session-fixtures.js";
describe("Testing study session model functionality", () => {
  test("Testing session ID conversion from int to string", () => {
    const session = createStudySessions({ id: 1 });
    expect(session.id).toBe("1");
  });
  test("Testing session participant ID conversion from int to string", () => {
    const session = createStudySessions({ participants: [1, 2] });
    expect(session.participants).toEqual(["1", "2"]);
  });
  test("Testing addParticipants with string input", () => {
    const session = createStudySessions();
    const initialParticipants = [...session.participants];
    session.addParticipants("3");
    expect(session.participants).toEqual([...initialParticipants, "3"]);
  });
  test("Testing addParticipants with int input expecting to be converted to string", () => {
    const session = createStudySessions();
    const initialParticipants = [...session.participants];
    session.addParticipants(3);
    expect(session.participants).toEqual([...initialParticipants, "3"]);
  });
  test("Testing addParticipants to a full session", () => {
    const session = createStudySessions({ capacity: 2 });
    const initialParticipants = [...session.participants];
    session.addParticipants(3);
    expect(session.participants).toEqual(initialParticipants);
  });
});
