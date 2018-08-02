import bcrypt from 'bcrypt-nodejs';
import dotenv from 'dotenv';

import db from '../db';
import User from '../models/user';
import utility from '../helpers/utility';

dotenv.config();

export default {
  signup(req, res, next) {
    const queryString = 'INSERT INTO users (email, password,  firstname, lastname) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = utility.trimValues(req.body);
    const {
      email,
      password,
      firstName,
      lastName,
    } = values;

    db.query('SELECT * FROM users WHERE email=$1', [email], (error, response) => {
      if (error) { return next(error); }
      if (response.rowCount > 0) {
        return res.status(409).json({ message: 'Email is in use' });
      }

      const user = new User(email, password, firstName, lastName);

      user.encryptPassword();
      return db.query(
        queryString,
        [user.email, user.password, user.firstName, user.lastName],
        (err, resp) => {
          if (err) { return next(err); }

          res.status(201).send({
            message: 'Successfully created a your account',
            token: utility.createToken(resp.rows[0].id),
          });
        },
      );
    });
  },
  signin(req, res, next) {
    const values = utility.trimValues(req.body);
    const { email, password } = values;
    db.query('SELECT * FROM users WHERE email=$1', [email], (error, resp) => {
      if (error) { return next(error); }
      if (resp.rowCount > 0) {
        bcrypt.compare(password, resp.rows[0].password, (err, match) => {
          if (err) { return next(err); }
          if (match) {
            res.status(200).send({
              message: 'Successfully signed in',
              token: utility.createToken(resp.rows[0].id),
            });
          } else {
            res.status(400).send({ message: 'Invalid email or password' });
          }
        });
      } else {
        res.status(400).send({ message: 'Invalid email or password' });
      }
    });
  },
};
