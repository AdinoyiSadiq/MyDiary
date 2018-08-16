const reminderUrl = 'http://localhost:3090/api/v1/reminders';
const updateReminderUrl = 'http://localhost:3090/api/v1/reminder/';
const notificationList = document.querySelector('#list');
const emptyListModal = document.querySelector('.emptyList');
const token = window.localStorage.getItem('token');

let listString = '';

function showNoEntriesModal(reminders) {
  if (reminders.length === 0) {
    emptyListModal.style.display = 'block';
    notificationList.style.display = 'none';
  } else {
    emptyListModal.style.display = 'none';
    notificationList.style.display = 'block';
  }
}

function generateReminders(reminders, listString) {
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
  });
  return listString;
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
        showNoEntriesModal(reminders);
        listString = generateReminders(reminders, listString)
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

notificationList.addEventListener('click', viewNotification, false);

getReminders();

