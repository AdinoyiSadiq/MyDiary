import passport from 'passport';
import LocalStrategy from 'passport-local';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import dotenv from 'dotenv';
import db from '../db';
import bcrypt from '../helpers/bcrypt';

dotenv.config();

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

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.SECRET,
};

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  db.query('SELECT * FROM users WHERE id=$1', [payload.sub], async (err, resp) => {
    if (err) { return done(err, false); }

    if (resp.rowCount > 0) {
      done(null, resp.rows[0]);
    } else {
      done(null, false);
    }
  });
});

passport.use(jwtLogin);
passport.use(localLogin);
