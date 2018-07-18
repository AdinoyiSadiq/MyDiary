import express from 'express';
import entriesController from '../controllers/entriesController';
import validate from '../middleware/validate';

const router = express.Router();

router.get('/entries', entriesController.getAllEntries);
router.get('/entries/:id', entriesController.getEntry);
router.post('/entries', validate.entryPost, entriesController.createEntry);
router.put('/entries/:id', validate.entryUpdate, entriesController.editEntry);

router.all('*', (req, res) => {
  res.status(404).json({
    error: 'Invalid request, Route does not exist',
  });
});

export default router;
