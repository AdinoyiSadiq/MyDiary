const checkFields = data => Object.keys(data).filter(field => !data[field]);

export default {
  entryPost(req, res, next) {
    const { authorID, title, content } = req.body;
    const len = Object.keys(req.body).length;
    const missing = checkFields({ authorID, title, content });

    if (authorID || title || content) {
      if (missing.length === 1) {
        return res.status(400).send({ message: `Please fill the ${missing[0]} field` });
      }
      if (missing.length === 2) {
        return res.status(400).send({ message: `Please fill the ${missing[0]} and ${missing[1]} fields` });
      }
    } else {
      return res.status(400).send({ message: `Please fill the ${missing[0]}, ${missing[1]} and ${missing[2]} fields` });
    }

    if (len > 3) {
      return res.status(400).send({ message: 'Too many fields' });
    }

    next();
  },
  entryUpdate(req, res, next) {
    const { title, content } = req.body;
    const len = Object.keys(req.body).length;
    const missing = checkFields({ title, content });

    if (title || content) {
      if (missing.length === 1) {
        return res.status(400).send({ message: `Please fill the ${missing[0]} field` });
      }
    } else {
      return res.status(400).send({ message: `Please fill the ${missing[0]} and ${missing[1]} fields` });
    }

    if (len > 2) {
      return res.status(400).send({ message: 'Too many fields' });
    }

    next();
  },
};
