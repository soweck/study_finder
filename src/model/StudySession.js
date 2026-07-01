export class StudySession {
  constructor(id, title, startDate, location, participants, capacity) {
    this.id = id;
    this.title = title;
    this.startDate = startDate;
    this.location = location;
    this.participants = participants;
    this.capacity = capacity;
  }

  addParticipants(participant) {
    if (!this.isFull()) {
      this.participants.push(participant);
    }
  }

  isFull() {
    return this.participants.length >= this.capacity;
  }
}
