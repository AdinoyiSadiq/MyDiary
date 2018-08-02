import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default {
  createToken(userID) {
    return jwt.sign({ id: userID }, process.env.SECRET, { expiresIn: 86400 });
  },
  trimValues(values) {
    const newValues = {};
    Object.keys(values).map((key) => {
      newValues[key] = values[key].trim();
    });
    return newValues;
  },
};
