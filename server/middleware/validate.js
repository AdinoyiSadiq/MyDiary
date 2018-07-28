const checkFields = data => Object.keys(data).filter(field => !data[field]);

export default {
  entryPost(req, res, next) {
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
  signupPost(req, res, next) {
    const {
      firstName,
      lastName,
      email,
      password,
    } = req.body;

    const len = Object.keys(req.body).length;
    const missing = checkFields({
      firstName,
      lastName,
      email,
      password,
    });

    let errorString = 'Please fill the ';

    missing.forEach((field) => {
      if (missing[missing.length - 1] === field && missing.length !== 1) {
        errorString += `and ${field} fields`;
      } else if (missing.length === 1) {
        errorString += `${field} field`;
      } else {
        errorString += `${field}, `;
      }
    });

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).send({ message: errorString });
    }
    if (len > 4) {
      return res.status(400).send({ message: 'Too many fields' });
    }

    next();
  },
  signinPost(req, res, next) {
    const { email, password } = req.body;
    const len = Object.keys(req.body).length;
    const missing = checkFields({ email, password });

    if (email || password) {
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
