const url = 'http://localhost:3090/api/v1/auth/signin';
const authError = document.getElementById('authError');
const email = document.getElementById('email');
const password = document.getElementById('password');

function clearError(fields) {
  Object.keys(fields).map((field) => {
    document.getElementById(`${field}Field`).childNodes[3].innerHTML = '';
  });
}

function showError(errors) {
  Object.keys(errors).map((field) => {
    document.getElementById(`${field}Field`).childNodes[3].innerHTML = errors[field];
  });
}

function validate(fields) {
  const errors = {};

  Object.keys(fields).map((field) => {
    if (!fields[field] || !fields[field].match(/[a-z]/i)) {
      if (field === 'email') {
        errors[field] = `Please enter an ${field}`;
      } else {
        errors[field] = `Please enter a ${field}`;
      }
    }
  });

  if (!errors.email && !fields.email.match(/[A-z0-9.]+@[A-z]+\.(com|me)/)) {
    errors.email = 'Please enter a valid email';
  }

  return errors;
}

function sendRequest(url, values) {
  window.fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: values.email,
      password: values.password,
    }),
  })
    .then((response) => {
      if (response.status === 400) {
        authError.innerHTML = 'Invalid email or password';
        return;
      }
      return response.json();
    })
    .then((data) => {
      const { token } = data;
      if (token) {
        window.localStorage.setItem('token', token);
        window.location.replace('../main/entries.html');
      }
    });
}


function signin(event) {
  event.preventDefault();
  const values = {
    email: email.value,
    password: password.value,
  };
  clearError(values);
  const errorMessages = validate(values);
  const errorLength = Object.keys(errorMessages).length;

  if (errorLength > 0) {
    showError(errorMessages);
  } else {
    sendRequest(url, values);
  }
}

function clearValidationError(event) {
  document.getElementById(`${event.target.id}Field`).childNodes[3].innerHTML = '';
}

document.getElementById('signin').addEventListener('click', signin, false);
document.getElementById('signinForm').onchange=clearValidationError;
