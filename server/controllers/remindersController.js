import Reminder from '../models/reminder';
import db from '../db';

export default {
  createReminder(req, res, next) {
    try {
      const queryString = 'INSERT INTO public.reminders(user_id, content, date, viewed, created) VALUES ($1, $2, $3, $4, $5) RETURNING *';
      const id = req.userID;
      const { content, date } = req.body;
      const reminder = new Reminder(id, content, date);
      const reminderDate = Date.now() + 86400000;
      db.query(queryString,
        [reminder.authorID, reminder.content, reminderDate, reminder.viewed, reminder.createdAt],
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
      const queryString = 'SELECT reminders.date FROM reminders WHERE user_id=$1 AND viewed=$2 AND date=(SELECT MIN(date) FROM reminders)';
      const id = req.userID;
      const time = Date.now();
      db.query(queryString, [id, 'false'], (err, result) => {
        res.send({
          date: result.rows[0].date,
          message: 'Reminder Time Retrieved Successfully',
        });
      });
    } catch (error) {
      next(error);
    }
  },
};