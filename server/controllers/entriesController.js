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
      const queryString = 'SELECT * FROM entries WHERE user_id=$1';
      const { id } = req.user;
      db.query(queryString, [id], (err, result) => {
        res.send({
          entries: result.rows,
          message: 'All Diary Entries Retrieved Successfully',
        });
      });
    } catch (error) {
      next(error);
    }
  },
  getEntry(req, res, next) {
    try {
      const queryString = 'SELECT * FROM entries WHERE user_id=$1 AND id=$2';
      const entryID = parseInt(req.params.id, 10);
      const { id } = req.user;

      db.query(queryString, [id, entryID], (err, result) => {
        const len = Object.keys(result.rows).length;
        if (len === 1) {
          res.send({
            entry: result.rows[0],
            message: 'Diary Entry Retrieved Successfully',
          });
        } else if (len > 1) {
          res.status(500).send({ error: 'An error occurred while retrieving the entry' });
        } else {
          res.status(404).send({ message: 'Entry not found' });
        }
      });
    } catch (error) {
      next(error);
    }
  },
  editEntry(req, res, next) {
    try {
      const queryString = 'UPDATE entries SET title=$1, content=$2, updated=$3 WHERE user_id=$4 AND id=$5 RETURNING *';

      const entryID = parseInt(req.params.id, 10);
      const { title, content } = req.body;
      const { id } = req.user;
      const updatedAt = Date.now();

      db.query('SELECT * FROM entries WHERE user_id=$1 AND id=$2', [id, entryID], (err, result) => {
        const len = Object.keys(result.rows).length;
        if (len === 1) {
          db.query(queryString, [title, content, updatedAt, id, entryID], (error, resp) => {
            res.send({
              entry: resp.rows[0],
              message: 'Edited Diary Entry Successfully',
            });
          });
        } else if (len > 1) {
          res.status(500).send({ error: 'An error occurred while updating the entry' });
        } else {
          res.status(404).send({ message: 'Entry not found' });
        }
      });
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
