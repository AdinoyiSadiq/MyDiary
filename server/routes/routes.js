import express from 'express';
import entriesController from '../controllers/entriesController';

const router = express.Router();

router.get('/entries', entriesController.getAllEntries);
router.get('/entries/:id', entriesController.getEntry);

export default router;
