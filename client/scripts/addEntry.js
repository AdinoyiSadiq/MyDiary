window.onload = () => {
  const url = 'http://localhost:3090/api/v1/entries';
  const profileUrl = 'http://localhost:3090/api/v1/profile';
  const token = window.localStorage.getItem('token');
  const createEntryError = document.getElementById('createEntryError');
  const title = document.getElementById('title');
  const content = document.getElementById('content');
  const navProfile = document.querySelector('.navProfile');

  const profile = document.querySelector('#profile');
  const profileModal = document.querySelector('.profileModal');

  // function checkAuth() {
  //   window.fetch(url, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       authorization: token,
  //     },
  //   })
  //     .then((response) => {
  //       if (response.status === 401) {
  //         window.location.replace('../authentication/signin.html');
  //       }
  //     });
  // }

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

  function showProfileModal() {
    if (profileModal.style.display === 'none') {
      profileModal.style.display = 'block';
    } else {
      profileModal.style.display = 'none';
    }
  }

  function createEntry(event) {
    event.preventDefault();

    const values = {
      title: title.value,
      content: content.value,
    };

    window.fetch(url, {
      method: 'POST',
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
          createEntryError.innerHTML = 'An error occurred while processing this request';
          return;
        }
        return (response.json());
      })
      .then((data) => {
        const { message } = data;
        if (message.startsWith('Please fill')) {
          createEntryError.innerHTML = message;
        } else if (message === 'Diary Entry Created Successfully') {
          window.location.replace(`./entry.html#${data.entry.id}`);
        }
      });
  }

  function cancelEntry() {
    title.value = '';
    content.value = '';
  }

  showProfileModal();
  // checkAuth();
  getProfile();
  profile.addEventListener('click', showProfileModal, false);
  document.getElementById('save').addEventListener('click', createEntry, false);
  document.getElementById('cancel').addEventListener('click', cancelEntry, false);

  profileModal.style.display = 'none';
};
