import { db } from '../models/entry';

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
};
