/**
 * Represents a study session
 */
export default class StudySession {
  #id;
  #title;
  #participants;
  constructor({
    id,
    title = "Untitled Session",
    startDate,
    location,
    participants = [],
    capacity = 99,
  }) {
    this.#id = String(id);
    this.#title = title;
    this.startDate = startDate;
    this.location = location;
    this.#participants = participants.map((participantId) =>
      String(participantId),
    );
    this.capacity = capacity;
  }

  get id() {
    return this.#id;
  }

  get title() {
    return this.#title;
  }

  get participants() {
    return this.#participants;
  }

  /**
   * Updates the session title.
   * @param {string} newTitle - The new title for the session.
   */
  changeTitle(newTitle) {
    //TODO: Add validation for title if required
    this.#title = newTitle;
  }

  /**
   * Adds a participant when the session is not full and the participant is not already included.
   * @param {string|number} participantId - The participant identifier to add.
   */
  addParticipants(participantId) {
    const participantIdStr = String(participantId);
    if (!this.participants.includes(participantIdStr) && !this.isFull()) {
      this.participants.push(participantIdStr);
    }
  }

  /**
   * Determines whether the session has reached its capacity.
   * @returns {boolean} True when the session cannot accept more participants.
   */
  isFull() {
    return this.participants.length >= this.capacity;
  }
}
