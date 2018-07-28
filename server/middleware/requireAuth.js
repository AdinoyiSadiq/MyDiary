import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default {
  auth(req, res, next) {
    const token = req.headers.authorization;
    if (token) {
      jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
          res.status(401).send({ message: 'Session has expired' });
        } else {
          req.userID = decoded.id;
          next();
        }
      });
    } else {
      return res.status(401).send({ message: 'Unauthorized request, please login' });
    }
  },
};
