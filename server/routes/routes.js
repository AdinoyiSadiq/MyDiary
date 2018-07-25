import express from 'express';
import entriesController from '../controllers/entriesController';
import authController from '../controllers/authController';
import validate from '../middleware/validate';

const router = express.Router();

/* auth routes */

router.post('/auth/signup', validate.signupPost, authController.signup);

/* main routes */

router.get('/entries', entriesController.getAllEntries);
router.get('/entries/:id', entriesController.getEntry);
router.post('/entries', validate.entryPost, entriesController.createEntry);
router.put('/entries/:id', validate.entryUpdate, entriesController.editEntry);
router.delete('/entries/:id', entriesController.deleteEntry);

router.all('*', (req, res) => {
  res.status(404).json({
    message: 'Invalid request, Route does not exist',
  });
});

export default router;
