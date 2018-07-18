import Entry, { db } from '../models/entry';

let entries = db;

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
        res.status(404).send({ message: 'Entry not found' });
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
  editEntry(req, res, next) {
    try {
      const entryID = parseInt(req.params.id, 10);
      const { title, content } = req.body;

      const exists = entries.find(entry => entry.id === entryID);

      if (exists) {
        let entryIndex;
        entries.forEach((entry, index) => {
          if (entry.id === entryID) {
            entryIndex = index;
            entries[index].title = title;
            entries[index].content = content;
            entries[index].updatedAt = Date.now();
          }
        });

        res.send({
          entry: entries[entryIndex],
          message: 'Edited Diary Entry Successfully',
        });
      } else {
        res.status(404).send({ message: 'Entry not found' });
      }
    } catch (error) {
      next(error);
    }
  },
  deleteEntry(req, res, next) {
    try {
      const entryID = parseInt(req.params.id, 10);
      const exists = entries.find(entry => entry.id === entryID);

      if (exists) {
        const newEntries = entries.filter(entry => entry.id !== entryID);
        entries = newEntries;
        res.send({
          message: 'Deleted Diary Entry Successfully',
        });
      } else {
        res.status(404).send({ message: 'Entry not found' });
      }
    } catch (error) {
      next(error);
    }
  },
};
