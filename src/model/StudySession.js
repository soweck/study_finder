export class StudySession {
  #id;
  #title;
  #participants;
  #ownerId;

  constructor({
    id,
    title = "Untitled Session",
    startDate,
    location,
    participants = [],
    capacity = 99,
    ownerId,
  }) {
    this.#id = String(id);
    this.#title = title;
    this.startDate = startDate;
    this.location = location;
    this.#participants = participants.map((participantId) =>
      String(participantId),
    );
    this.capacity = capacity;
    this.#ownerId = String(ownerId);
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

  get ownerId() {
    return this.#ownerId;
  }

  /**
   * Updates the session title.
   * @param {string} newTitle - The new title for the session.
   */
  setTitle(newTitle) {
    // TODO: Add validation for title if required
    this.#title = newTitle;
  }

  /**
   * Adds a participant when the session is not full and the participant is not already included.
   * @param {string|number} participantId - The participant identifier to add.
   */
  addParticipant(participantId) {
    const participantIdStr = String(participantId);
    if (this.participants.includes(participantIdStr)) {
      throw new Error("Participant already exists");
    }

    if (this.isFull()) {
      throw new Error("Session is full");
    }

    this.participants.push(participantIdStr);
  }

  removeParticipant(participantId) {
    const participantIdStr = String(participantId);
    if (!this.participants.includes(participantIdStr)) {
      throw new Error("Participant not found");
    }
    // TODO: Consider the case where removing of owner is attempted. Should we allow it? Should we throw an error?
    this.#participants = this.participants.filter(
      (id) => id !== participantIdStr,
    );
  }

  /**
   * Determines whether the session has reached its capacity.
   * @returns {boolean} True when the session cannot accept more participants.
   */
  isFull() {
    return this.participants.length >= this.capacity;
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      startDate: this.startDate,
      location: this.location,
      participants: this.participants,
      capacity: this.capacity,
      ownerId: this.ownerId,
    };
  }
}
