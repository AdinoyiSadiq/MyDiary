import Entry, { db as database } from '../models/entry';
import db from '../db';

let entries = database;

export default {
  createEntry(req, res, next) {
    try {
      const queryString = 'INSERT INTO public.entries(user_id, title, content, created, updated) VALUES ($1, $2, $3, $4, $5) RETURNING *';
      const { id } = req.user;
      const { title, content } = req.body;
      const entry = new Entry(id, title, content);

      db.query(queryString,
        [entry.authorID, entry.title, entry.content, entry.createdAt, entry.updatedAt],
        (err, result) => {
          res.status(201).send({
            entry: result.rows[0],
            message: 'Diary Entry Created Successfully',
          });
        });
    } catch (error) {
      next(error);
    }
  },
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
      } else if (singleEntry.length > 1) {
        res.status(500).send({ error: 'An error occurred while retrieving the entry' });
      } else {
        res.status(404).send({ message: 'Entry not found' });
      }
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

export function resetTestDB() {
  entries = [
    {
      id: 1,
      authorID: 1,
      title: 'The Andela Way',
      content: 'The Andela bootcamp is a popularly known program amongst programmers.',
      createdAt: 1531513412307,
      updatedAt: 1531513412307,
    },
  ];
  const testData = entries;
  return testData;
}
