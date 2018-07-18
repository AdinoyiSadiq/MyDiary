import express from 'express';
import entriesController from '../controllers/entriesController';

const router = express.Router();

router.get('/', (req, res) => res.status(200).json({ message: 'Welcome to my diary app' }));
router.get('/entries', entriesController.getAllEntries);

export default router;
