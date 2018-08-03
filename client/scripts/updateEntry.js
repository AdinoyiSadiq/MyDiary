window.onload = () => {
  const id = window.location.hash.substring(1);
  const url = `https://mydiary-server.herokuapp.com/api/v1/entries/${id}`;
  const profileUrl = 'https://mydiary-server.herokuapp.com/api/v1/profile';
  const token = window.localStorage.getItem('token');
  const entryError = document.getElementById('entryError');
  const title = document.getElementById('title');
  const content = document.getElementById('content');

  const profile = document.querySelector('#profile');
  const profileModal = document.querySelector('.profileModal');
  const navProfile = document.querySelector('.navProfile');

  function showProfileModal() {
    if (profileModal.style.display === 'none') {
      profileModal.style.display = 'block';
    } else {
      profileModal.style.display = 'none';
    }
  }

  function getProfile() {
    window.fetch(profileUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    })
      .then((response) => {
        if (response.status === 401) {
          window.location.replace('../authentication/signin.html');
          return;
        }
        return response.json();
      })
      .then((data) => {
        if (data.message === 'Retrieved User Profile Successfully') {
          navProfile.innerHTML = data.profile.firstname;
        }
      });
  }

  function getEntry() {
    window.fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    })
      .then((response) => {
        if (response.status === 401) {
          window.location.replace('../authentication/signin.html');
          return;
        }
        if (response.status === 404) {
          window.location.replace('./entries.html');
          return;
        }
        return response.json();
      })
      .then((data) => {
        if (data.entry) {
          title.value = data.entry.title;
          content.value = data.entry.content;
        }
      });
  }

  function updateEntry(event) {
    event.preventDefault();

    const values = {
      title: title.value,
      content: content.value,
    };

    window.fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
      body: JSON.stringify({
        title: values.title,
        content: values.content,
      }),
    })
      .then((response) => {
        if (response.status === 500) {
          entryError.innerHTML = 'An error occurred while processing this request';
          return;
        }
        return (response.json());
      })
      .then((data) => {
        const { message } = data;
        if (message.startsWith('Please fill')) {
          entryError.innerHTML = message;
        } else if (message === 'Edited Diary Entry Successfully') {
          window.location.replace(`./entry.html#${data.entry.id}`);
        }
      });
  }

  profile.addEventListener('click', showProfileModal, false);
  document.getElementById('save').addEventListener('click', updateEntry, false);

  showProfileModal();
  getEntry();
  getProfile();
  profileModal.style.display = 'none';
};
