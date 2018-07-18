import express from 'express';
import entriesController from '../controllers/entriesController';
import validate from '../middleware/validate';

const router = express.Router();

router.get('/entries', entriesController.getAllEntries);
router.get('/entries/:id', entriesController.getEntry);
router.post('/entries', validate.entryPost, entriesController.createEntry);

export default router;
