window.onload = () => {
  const profileUrl = 'http://localhost:3090/api/v1/profile';
  const reminderUrl = 'http://localhost:3090/api/v1/reminders';
  const updateReminderUrl = 'http://localhost:3090/api/v1/reminder/';
  const profile = document.querySelector('#profile');
  const profileModal = document.querySelector('.profileModal');
  const navProfile = document.querySelector('.navProfile');
  const notificationList = document.querySelector('#list');
  const token = window.localStorage.getItem('token');

  let listString = '';

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

  function getReminders() {
    window.fetch(reminderUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.reminders) {
          const { reminders } = data;
          reminders.map((reminder) => {
            const date = new Date(parseInt(reminder.date));
            listString += `
              <article class="notification">
                <div class="content">
                  <p class="date">${date.toString().substring(0, 25)}</p>
                  <p class="reminderContent" reminderID=${reminder.id}>
                    ${reminder.content}
                  </p>
                </div>
              </article>
            `;
            return listString;
          });
          notificationList.innerHTML = listString;
          localStorage.removeItem('reminderTime');
        }
      }); 
  }

  function markAsViewed(id) {
    window.fetch(`${updateReminderUrl}${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const { message } = data;
        if (message === 'Updated Diary Reminder Successfully') {
          window.location.href = './addEntry.html';
        }
      });
  }

  function viewNotification(event) {
    const { target } = event;
    if (target.tagName.toLowerCase() === 'p') {
      if (target.attributes.class.value === 'reminderContent') {
        id = target.getAttribute('reminderID');
        markAsViewed(id);
      }
    }
  }

  profile.addEventListener('click', showProfileModal, false);
  notificationList.addEventListener('click', viewNotification, false);

  showProfileModal();
  getProfile();
  getReminders();

  profileModal.style.display = 'none';
};
