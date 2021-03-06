const checkFields = data => Object.keys(data).filter(field => (!data[field] || !/\S/.test(data[field])));

const generateString = (missing, errorString) => {
   missing.forEach((field) => {
      if (missing[missing.length - 1] === field && missing.length !== 1) {
        errorString += `and ${field} fields`;
      } else if (missing.length === 1) {
        errorString += `${field} field`;
      } else {
        errorString += `${field}, `;
      }
    });
   return errorString;
}

export default {
  entryPost(req, res, next) {
    const { title, content } = req.body;
    const fieldLength = Object.keys(req.body).length;
    const missing = checkFields({ title, content });
    
    if (missing.length > 0) {
      if (missing.length === 1) {
        return res.status(400).send({ message: `Please fill the ${missing[0]} field` });
      }
      return res.status(400).send({ message: `Please fill the ${missing[0]} and ${missing[1]} fields` });
    }

    if (fieldLength > 2) {
      return res.status(400).send({ message: 'Too many fields' });
    }

    next();
  },
  entryUpdate(req, res, next) {
    const { title, content } = req.body;
    const fieldLength = Object.keys(req.body).length;
    const missing = checkFields({ title, content });
    
    if (missing.length === 2) {
      return res.status(400).send({ message: `Please fill the ${missing[0]} and ${missing[1]} fields` });
    }

    if (fieldLength > 2) {
      return res.status(400).send({ message: 'Too many fields' });
    }

    next();
  },
  signupPost(req, res, next) {
    const { firstName, lastName, email, password } = req.body;
    const fieldLength = Object.keys(req.body).length;
    const missing = checkFields({ firstName, lastName, email, password });
    let errorString = 'Please fill the ';
    errorString = generateString(missing, errorString);
    if (missing.length > 0) {
      return res.status(400).send({ message: errorString });
    }
    if ((/[^a-z]/i.test(firstName)) || (/[^a-z]/i.test(lastName))) {
      return res.status(400).send({ message: 'Please enter a valid name' });
    }
    if (!email.match(/[A-z0-9.]+@[A-z]+\.(com|me)/)) {
      return res.status(400).send({ message: 'Please enter a valid email' });
    }
    if (password.length < 5) {
      return res.status(400).send({ message: 'Passwords must be greater than four characters' });
    }
    if (fieldLength > 4) {
      return res.status(400).send({ message: 'Too many fields' });
    }
    next();
  },
  signinPost(req, res, next) {
    const { email, password } = req.body;
    const fieldLength = Object.keys(req.body).length;
    const missing = checkFields({ email, password });
    
    if (missing.length > 0) {
      if (missing.length === 1) {
        return res.status(400).send({ message: `Please fill the ${missing[0]} field` });
      }
      return res.status(400).send({ message: `Please fill the ${missing[0]} and ${missing[1]} fields` });
    }

    if (!email.match(/[A-z0-9.]+@[A-z]+\.(com|me)/)) {
      return res.status(400).send({ message: 'Please enter a valid email' });
    }

    if (password.length < 5) {
      return res.status(400).send({ message: 'Passwords must be greater than four characters' });
    }

    if (fieldLength > 2) {
      return res.status(400).send({ message: 'Too many fields' });
    }

    next();
  },
  reminderPost(req, res, next) {
    const { content, date } = req.body;
    const fieldLength = Object.keys(req.body).length;
    const missing = checkFields({ content, date });
    const currentTime = Date.now();

    if (missing.length > 0) {
      if (missing.length === 1) {
        return res.status(400).send({ message: `Please fill the ${missing[0]} field` });
      }
      return res.status(400).send({ message: `Please fill the ${missing[0]} and ${missing[1]} fields` });
    }

    if (isNaN(parseFloat(date)) && !isFinite(date)) {
      return res.status(400).send({ message: 'Please enter a valid date for reminder' });
    }

    if (currentTime > date) {
      return res.status(400).send({ message: 'Please enter a valid date for reminder' });
    }

    if (fieldLength > 2) {
      return res.status(400).send({ message: 'Too many fields' });
    }
    
    next();
  },
};
