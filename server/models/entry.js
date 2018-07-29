class Entry {
  constructor(authorID, title, content) {
    this.authorID = authorID;
    this.title = title;
    this.content = content;
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
  }
}

export default Entry;
