const getTimeUrl = 'http://localhost:3090/api/v1/reminder/time';
const notificationBadge = document.querySelector('.badge');

function createNotification() {
  notificationBadge.style.display = 'block';
  // notificationBadge.dataset.count = '1';
}

function setTime() {
  const currentTime = Date.now();
  const reminderTime = parseInt(localStorage.reminderTime);

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
      console.log(data)
      if (data.date.length > 0) {
        reminderTime = data.date[0].date;
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

checkReminders();

notificationBadge.style.display = 'none';
