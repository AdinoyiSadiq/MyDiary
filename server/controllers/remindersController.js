import Reminder from '../models/reminder';
import db from '../db';

export default {
  createReminder(req, res, next) {
    try {
      const queryString = 'INSERT INTO public.reminders(user_id, content, date, viewed, created) VALUES ($1, $2, $3, $4, $5) RETURNING *';
      const id = req.userID;
      const { content, date } = req.body;
      const reminder = new Reminder(id, content, date);
      db.query(queryString,
        [reminder.authorID, reminder.content, reminder.date, reminder.viewed, reminder.createdAt],
        (err, result) => {
          res.status(201).send({
            reminder: result.rows[0],
            message: 'Diary Reminder Created Successfully',
          });
        });
    } catch (error) {
      next(error);
    }
  },
  getReminders(req, res, next) {
    try {
      const queryString = 'SELECT * FROM reminders WHERE user_id=$1 AND date<=$2 AND viewed=$3';
      const id = req.userID;
      const time = Date.now();
      db.query(queryString, [id, time, 'false'], (err, result) => {
        res.send({
          reminders: result.rows,
          message: 'All Pending Reminders Retrieved Successfully',
        });
      });
    } catch (error) {
      next(error);
    }
  },
  getReminderTime(req, res, next) {
    try {
      const queryString = 'SELECT reminders.date FROM reminders WHERE user_id=$1 AND date=(SELECT MIN(date) FROM reminders WHERE viewed=$2)';
      const id = req.userID;
      const time = Date.now();
      db.query(queryString, [id, 'false'], (err, result) => {
        res.send({
          date: result.rows,
          message: 'Reminder Time Retrieved Successfully',
        });
      });
    } catch (error) {
      next(error);
    }
  },
  updateReminder(req, res, next) {
    try {
      const queryString = 'UPDATE reminders SET viewed=$1 WHERE user_id=$2 AND id=$3 RETURNING *';
      const reminderID = parseInt(req.params.id, 10);
      const id = req.userID;
      const isNumber = !Number.isNaN(reminderID);
      
      if (isNumber) {
        db.query('SELECT * FROM reminders WHERE user_id=$1 AND id=$2', [id, reminderID], (err, result) => {
          const resultLength = Object.keys(result.rows).length;
          if (resultLength) {
            db.query(queryString, ['true', id, reminderID], (error, resp) => {
              res.send({ message: 'Updated Diary Reminder Successfully' });
            });
          } else if (resultLength > 1) {
            res.status(500).send({ error: 'An error occurred while updating the entry' });
          } else {
            res.status(404).send({ message: 'Reminder not found' });
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