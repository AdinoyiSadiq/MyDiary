import db from '../db';

export default {
  resetDB() {
    db.connect((err, client, done) => {
      client.query('DELETE FROM entries; DELETE FROM users', () => {
        done();
      });
    });
  },
};
