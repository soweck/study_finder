export class StudySession {
  constructor(id, title, startDate, location, participants = [], capacity) {
    this.id = id;
    this.title = title;
    this.startDate = startDate;
    this.location = location;
    this.participants = participants;
    this.capacity = capacity;
  }

  addParticipants(participantId) {
    const participantIdStr = String(participantId);
    if (!this.participants.includes(participantIdStr) && !this.isFull()) {
      this.participants.push(participantIdStr);
    }
  }

  isFull() {
    return this.participants.length >= this.capacity;
  }
}
