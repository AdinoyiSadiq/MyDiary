import Entry from '../models/entry';
import db from '../db';

import utility from '../helpers/utility';

function restrictUpdate(time) {
  const timeDiff = Date.now() - time;
  const dayCreated = Date(time).substring(0, 3);
  const day = Date(Date.now()).substring(0, 3);
  if (timeDiff > 86400000) {
    return false;
  }
  if (day !== dayCreated) {
    return false;
  }
  return true;
}

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
      const id = req.userID;
      const entryID = parseInt(req.params.id, 10);

      const isNumber = !Number.isNaN(entryID);
      if (isNumber) {
        db.query(queryString, [id, entryID], (err, result) => {
          const resultLength = Object.keys(result.rows).length;
          if (resultLength === 1) {
            res.send({
              entry: result.rows[0],
              message: 'Diary Entry Retrieved Successfully',
            });
          } else if (resultLength > 1) {
            res.status(500).send({ error: 'An error occurred while retrieving the entry' });
          } else {
            res.status(404).send({ message: 'Entry not found' });
          }
        });
      } else {
        res.status(400).send({ error: 'Invalid request, ensure route parameters are correct' });
      }
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

      const isNumber = !Number.isNaN(entryID);
      if (isNumber) {
        db.query('SELECT * FROM entries WHERE user_id=$1 AND id=$2', [id, entryID], (err, result) => {
          const oldTitle = result.rows[0].title;
          const oldContent = result.rows[0].content;

          const newTitle = title ? title : oldTitle;
          const newContent = content ? content : oldContent;

          const resultLength = Object.keys(result.rows).length;
          const valid = restrictUpdate(result.rows[0].created);
          if (resultLength === 1 && valid) {
            db.query(queryString, [newTitle, newContent, updatedAt, id, entryID], (error, resp) => {
              res.send({
                entry: resp.rows[0],
                message: 'Edited Diary Entry Successfully',
              });
            });
          } else if (!valid) {
            res.status(403).send({ message: 'Time has elapsed for updating this entry' });
          } else if (resultLength > 1) {
            res.status(500).send({ error: 'An error occurred while updating the entry' });
          } else {
            res.status(404).send({ message: 'Entry not found' });
          }
        });
      } else {
        res.status(400).send({ error: 'Invalid request, ensure route parameters are correct' });
      }
    } catch (error) {
      next(error);
    }
  },
  deleteEntry(req, res, next) {
    try {
      const queryString = 'DELETE FROM entries WHERE id=$1 AND user_id=$2';
      const entryID = parseInt(req.params.id, 10);
      const id = req.userID;
      const isNumber = !Number.isNaN(entryID);
      if (isNumber) {
        db.query('SELECT * FROM entries WHERE user_id=$1 AND id=$2', [id, entryID], (err, result) => {
          const resultLength = Object.keys(result.rows).length;
          if (resultLength === 1) {
            db.query(queryString, [entryID, id], () => {
              res.send({
                message: 'Deleted Diary Entry Successfully',
              });
            });
          } else if (resultLength > 1) {
            res.status(500).send({ error: 'An error occurred while updating the entry' });
          } else {
            res.status(404).send({ message: 'Entry not found' });
          }
        });
      } else {
        res.status(400).send({ error: 'Invalid request, ensure route parameters are correct' });
      }
    } catch (error) {
      next(error);
    }
  },
};
