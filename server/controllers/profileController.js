import db from '../db';

export default {
  getProfile(req, res, next) {
    try {
      const queryString = 'SELECT * FROM users WHERE id=$1';
      const countEntriesString = 'SELECT COUNT(*) FROM (users INNER JOIN entries ON users.id = entries.user_id)';
      const id = req.userID;
      db.query(queryString, [id], (err, result) => {
        const user = result.rows[0];
        if (user) {
          db.query(countEntriesString, (error, resp) => {
            const entryCount = resp.rows[0].count;
            const profile = {
              entryCount,
              firstname: user.firstname,
              lastname: user.lastname,
              email: user.email,
            };
            res.send({
              profile,
              message: 'Retrieved User Profile Successfully',
            });
          });
        }
      });
    } catch (error) {
      next(error);
    }
  },
};
