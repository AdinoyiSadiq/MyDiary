window.onload = () => {
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


  function signin(event) {
    event.preventDefault();

    const values = {
      email: email.value,
      password: password.value,
    };

    clearError(values);
    const errorMessages = validate(values);
    showError(errorMessages);
  }

  document.getElementById('signin').addEventListener('click', signin, false);
};
