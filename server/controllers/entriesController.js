import Entry from '../models/entry';
import db from '../db';

import utility from '../helpers/utility';

export default {
  createEntry(req, res, next) {
    try {
      const queryString = 'INSERT INTO public.entries(user_id, title, content, created, updated) VALUES ($1, $2, $3, $4, $5) RETURNING *';
      const id = req.userID;
      const values = utility.trimValues(req.body);
      const { title, content } = values;
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
      const id = req.userID;
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
      const id = req.userID;

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
      const values = utility.trimValues(req.body);
      const { title, content } = values;
      const id = req.userID;
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
      const queryString = 'DELETE FROM entries WHERE id=$1 AND user_id=$2';
      const entryID = parseInt(req.params.id, 10);
      const id = req.userID;

      db.query('SELECT * FROM entries WHERE user_id=$1 AND id=$2', [id, entryID], (err, result) => {
        const len = Object.keys(result.rows).length;
        if (len === 1) {
          db.query(queryString, [entryID, id], () => {
            res.send({
              message: 'Deleted Diary Entry Successfully',
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
};
