export const db = [
  {
    id: 1,
    authorID: 1,
    title: 'The Andela Way',
    content: 'The Andela bootcamp is a popularly known program amongst programmers.',
    createdAt: 1531513412307,
    updatedAt: 1531513412307,
  },
];

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
