import jwt from 'jwt-simple';
import dotenv from 'dotenv';

import db from '../db';
import User from '../models/user';

dotenv.config();

function tokenForUser(userID) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: userID, iat: timestamp }, process.env.SECRET);
}

export default {
  signup(req, res, next) {
    const queryString = 'INSERT INTO users (email, password,  firstname, lastname) VALUES ($1, $2, $3, $4) RETURNING *';
    const {
      email,
      password,
      firstName,
      lastName,
    } = req.body;

    db.query('SELECT * FROM users WHERE email=$1', [email], async (error, response) => {
      if (error) { return next(error); }

      if (response.rowCount > 0) {
        return res.status(422).json({ message: 'Email is in use' });
      }

      const user = new User(email, password, firstName, lastName);

      user.encryptPassword();

      return db.query(
        queryString,
        [user.email, user.password, user.firstName, user.lastName],
        (err, resp) => {
          if (err) { return next(err); }

          res.send({ token: tokenForUser(resp.rows[0].id) });
        },
      );
    });
  },
};
