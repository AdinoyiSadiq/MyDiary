window.onload = () => {
  const url = 'http://localhost:3090/api/v1/entries';
  const profileUrl = 'http://localhost:3090/api/v1/profile';
  const reminderUrl = 'http://localhost:3090/api/v1/reminders';
  const getTimeUrl = 'http://localhost:3090/api/v1/reminder/time';
  const token = window.localStorage.getItem('token');

  const emptyListModal = document.querySelector('.emptyList');
  const entryListModal = document.querySelector('.entryList');
  const navProfile = document.querySelector('.navProfile');


  const profile = document.querySelector('#profile');
  const profileModal = document.querySelector('.profileModal');
  const deleteModal = document.querySelector('.deleteModal');
  const deleteButton = document.querySelector('#deleteButton');
  const cancelButton = document.querySelector('#cancelButton');
  const notificationBadge = document.querySelector('.badge');

  const entriesList = document.getElementById('list');

  let id;
  let listString = '';

  function showProfileModal() {
    if (profileModal.style.display === 'none') {
      profileModal.style.display = 'block';
    } else {
      profileModal.style.display = 'none';
    }
  }

  function showNoEntriesModal(entries) {
    if (entries.length === 0) {
      emptyListModal.style.display = 'block';
      entryListModal.style.display = 'none';
    } else {
      emptyListModal.style.display = 'none';
      entryListModal.style.display = 'block';
    }
  }

  function showDeleteEntryModal() {
    deleteModal.style.display = 'block';
  }

  function hideDeleteEntryModal() {
    deleteModal.style.display = 'none';
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

  function deleteEntry() {
    const deleteURL = `${url}/${id}`;
    window.fetch(deleteURL, {
      method: 'DELETE',
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
        if (data.message === 'Deleted Diary Entry Successfully') {
          window.location.reload();
        }
      });
  }

  function getAllEntries() {
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
        return response.json();
      })
      .then((data) => {
        if (data.entries) {
          const { entries } = data;
          showNoEntriesModal(entries);
          entries.map((entry) => {
            listString += `
                <article class="entry">
                  <div class="content">
                    <a href="./entry.html#${entry.id}">
                      <h3 class="title">${entry.title}</h3>
                      <p class="date">${Date(entry.created).substring(0, 15)}</p>
                      <p class="entryContent">${(entry.content).substring(0, 100)}</p>
                    </a>
                    <div class="actions">
                      <a title="Edit" href="./updateEntry.html#${entry.id}"><i class="far fa-edit"></i></a>
                      <a title="Delete"><i class="far fa-trash-alt" id="delete" entryID=${entry.id}></i></a>
                    </div>
                  </div>
                </article>
            `;
            return listString;
          });
          entriesList.innerHTML = listString;
        }
      });
  }

  function createNotification() {
    notificationBadge.style.display = 'block';
    notificationBadge.dataset.count = '1';
  }

  function setTime() {
    const currentTime = Date.now();
    const reminderTime = parseInt(localStorage.reminderTime)

    if (currentTime >= reminderTime) {
      setTimeout(createNotification, 1000)
    } else {
      const timeDiff = reminderTime - currentTime;
      setTimeout(createNotification, timeDiff);
    }
  }

  function getReminderTime() {
    let reminderTime;

    window.fetch(getTimeUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.date) {
          reminderTime = data.date;
          localStorage.setItem('reminderTime', reminderTime);
          setTime();
        }
      });  
  }

  function checkReminders() {
    if (localStorage.reminderTime) {
      setTime();
    } else {
      getReminderTime();
    }
  }

  document.querySelector('.entryList').addEventListener('click', (event) => {
    const { target } = event;
    if (target.tagName.toLowerCase() === 'i') {
      if (target.attributes.id.value === 'delete') {
        id = target.getAttribute('entryID');
        showDeleteEntryModal();
      }
    }
  });
  profile.addEventListener('click', showProfileModal, false);
  deleteButton.addEventListener('click', deleteEntry, false);
  cancelButton.addEventListener('click', hideDeleteEntryModal, false);
  getAllEntries();
  showProfileModal();
  getProfile();
  checkReminders();

  profileModal.style.display = 'none';
  notificationBadge.style.display = 'none';
};
