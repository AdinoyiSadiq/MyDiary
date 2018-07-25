import bcrypt from 'bcrypt-nodejs';

export default {
  comparePassword(candidatePassword, password, callback) {
    bcrypt.compare(candidatePassword, password, (err, isMatch) => {
      if (err) { return callback(err); }

      callback(null, isMatch);
    });
  },
};
