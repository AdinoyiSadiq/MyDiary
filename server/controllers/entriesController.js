import Entry, { db } from '../models/entry';

const entries = db;

export default {
  getAllEntries(req, res, next) {
    try {
      res.send({
        entries,
        message: 'All Diary Entries Retrieved Successfully',
      });
    } catch (error) {
      next(error);
    }
  },
  getEntry(req, res, next) {
    try {
      const entryID = parseInt(req.params.id, 10);
      const singleEntry = entries.filter(entry => entry.id === entryID);

      if (singleEntry.length === 1) {
        res.send({
          entry: singleEntry[0],
          message: 'Diary Entry Retrieved Successfully',
        });
      } else {
        res.status(404).send({ error: 'Entry not found' });
      }
    } catch (error) {
      next(error);
    }
  },
  createEntry(req, res, next) {
    try {
      const { authorID, title, content } = req.body;
      const entry = new Entry(authorID, title, content);
      entries.push(entry);
      res.status(201).send({
        entry,
        message: 'Diary Entry Created Successfully',
      });
    } catch (error) {
      next(error);
    }
  },
};
