import express from 'express';
import entriesController from '../controllers/entriesController';
import authController from '../controllers/authController';
import profileController from '../controllers/profileController';
import validate from '../middleware/validate';
import requireAuth from '../middleware/requireAuth';

const router = express.Router();

/* auth routes */

router.post('/auth/signup', validate.signupPost, authController.signup);
router.post('/auth/signin', validate.signinPost, authController.signin);

/* main routes */

router.post('/entries', requireAuth.auth, validate.entryPost, entriesController.createEntry);
router.get('/entries', requireAuth.auth, entriesController.getAllEntries);

router.get('/entries/:id', requireAuth.auth, entriesController.getEntry);
router.put('/entries/:id', requireAuth.auth, validate.entryUpdate, entriesController.editEntry);

router.delete('/entries/:id', requireAuth.auth, entriesController.deleteEntry);

router.get('/profile', requireAuth.auth, profileController.getProfile);

router.all('*', (req, res) => {
  res.status(404).json({
    message: 'Invalid request, Route does not exist',
  });
});

export default router;
