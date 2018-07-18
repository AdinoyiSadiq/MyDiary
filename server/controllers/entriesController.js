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
  getEntry(req, res, next) {
    try {
      const entryID = parseInt(req.params.id, 10);
      const entry = entries.filter(singleEntry => singleEntry.id === entryID);

      if (entry.length === 1) {
        res.send({
          entry,
          message: 'Diary Entry Retrieved Successfully',
        });
      } else {
        res.status(404).send({ error: 'Entry not found' });
      }
    } catch (error) {
      next(error);
    }
  },
};
