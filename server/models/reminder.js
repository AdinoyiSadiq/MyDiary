class Reminder {
  constructor(authorID, content, date) {
    this.authorID = authorID;
    this.content = content;
    this.date = date;
    this.viewed = 'false';
    this.createdAt = Date.now();
  }
}

export default Reminder;