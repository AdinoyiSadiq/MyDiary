window.onload = () => {
  const name = document.getElementById('name');
  const surname = document.getElementById('surname');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const passwordConfirm = document.getElementById('passwordConfirm');

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
        } else if (field === 'confirm') {
          errors[field] = 'Please confirm your password';
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


  function signup(event) {
    event.preventDefault();

    const values = {
      name: name.value,
      surname: surname.value,
      email: email.value,
      password: password.value,
      confirm: passwordConfirm.value,
    };

    clearError(values);
    const errorMessages = validate(values);
    showError(errorMessages);
  }

  document.getElementById('signup').addEventListener('click', signup, false);
};
