import passport from 'passport';
import LocalStrategy from 'passport-local';
import db from '../db';
import bcrypt from '../helpers/bcrypt';

const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  db.query('SELECT * FROM users WHERE email=$1', [email], (error, response) => {
    if (error) { return done(error); }
    if (response.rowCount === 0) {
      return done(null, false);
    }

    bcrypt.comparePassword(password, response.rows[0].password, (err, isMatch) => {
      if (err) { return done(err); }
      if (!isMatch) { return done(null, false); }

      return done(null, response.rows[0].password);
    });
  });
});

passport.use(localLogin);
