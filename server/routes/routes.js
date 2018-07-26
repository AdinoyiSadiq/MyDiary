import express from 'express';
import passport from 'passport';
import entriesController from '../controllers/entriesController';
import authController from '../controllers/authController';
import validate from '../middleware/validate';
import '../services/passport';


const router = express.Router();

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

/* auth routes */

router.post('/auth/signup', validate.signupPost, authController.signup);
router.post('/auth/signin', validate.signinPost, requireSignin, authController.signin);

/* main routes */

router.post('/entries', requireAuth, validate.entryPost, entriesController.createEntry);

router.get('/entries', entriesController.getAllEntries);
router.get('/entries/:id', entriesController.getEntry);

router.put('/entries/:id', validate.entryUpdate, entriesController.editEntry);
router.delete('/entries/:id', entriesController.deleteEntry);

router.all('*', (req, res) => {
  res.status(404).json({
    message: 'Invalid request, Route does not exist',
  });
});

export default router;
