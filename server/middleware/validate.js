const checkFields = data => Object.keys(data).some(field => !data[field]);

export default {
  entryPost(req, res, next) {
    const { authorID, title, content } = req.body;
    const len = Object.keys(req.body).length;
    const missing = checkFields({ authorID, title, content });

    if (missing) {
      return res.status(400).send({ error: 'Missng field/s' });
    }
    if (len > 3) {
      return res.status(400).send({ error: 'Too many fields' });
    }

    next();
  },
  entryUpdate(req, res, next) {
    const { title, content } = req.body;
    const len = Object.keys(req.body).length;
    const missing = checkFields({ title, content });

    if (missing) {
      return res.status(400).send({ error: 'Missng field/s' });
    }
    if (len > 2) {
      return res.status(400).send({ error: 'Too many fields' });
    }

    next();
  },
};
