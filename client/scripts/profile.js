const url = 'http://localhost:3090/api/v1/entries';
const profileUrl = 'http://localhost:3090/api/v1/profile';
const reminderUrl = 'http://localhost:3090/api/v1/reminders';
const token = window.localStorage.getItem('token');

const navProfile = document.querySelector('.current');
const profileFullName = document.querySelector('#fullname'); 
const profileFirstName = document.querySelector('#firstname'); 
const profileLastName = document.querySelector('#lastname');
const profileEmail = document.querySelector('#email');
const profileEntryNo = document.querySelector('#entryno');
const reminderText = document.querySelector('#reminderText');
const addReminderButton = document.querySelector('.addReminder');
const cancelButton = document.querySelector('.cancelReminder');
const reminderError = document.querySelector('#reminderError');
const reminderSuccess = document.querySelector('#reminderSuccess');

let hour;
let minute;
let am = false;
let pm = false;

const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const minutes = [00, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

const reminderToggle = document.querySelector('#reminderToggle');
const profileToggle = document.querySelector('#profileToggle');

const clockModal = document.querySelector('#clock');
const myProfileModal = document.querySelector('.myProfile');

const hourClock = document.querySelector('.hourClock');
const minuteClock = document.querySelector('.minuteClock');

const hourElement = document.getElementById('hr');
const minuteElement = document.getElementById('min');

const amElement = document.getElementById('am');
const pmElement = document.getElementById('pm');

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
        profileFullName.innerHTML = `${data.profile.firstname} ${data.profile.lastname}`
        navProfile.innerHTML = data.profile.firstname;
        profileFirstName.innerHTML = data.profile.firstname;
        profileLastName.innerHTML = data.profile.lastname;
        profileEmail.innerHTML = data.profile.email;
        profileEntryNo.innerHTML = data.profile.entryCount;
      }
    });
}

function setReminderHour() {
  if (hour == 12 && am) {
    hour = parseInt(hour)
  } else if (hour == 12 && pm) {
    hour = 0
  } else {
    hour = pm ? (parseInt(hour) + 12) : parseInt(hour);
  }
}

function setReminder() {
  const date = new Date();
  setReminderHour();
  console.log(hour)
  const reminderTime = new Date(date.getFullYear(), date.getMonth(), (date.getDate() + 1), hour, minute);
  window.fetch(reminderUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: token,
    },
    body: JSON.stringify({
      content: reminderText.value,
      date: reminderTime.getTime()
    }),
  })
   .then((response) => response.json())
   .then((data) => {
 	  if (data.message.startsWith('Please fill')) {
 	      reminderSuccess.innerHTML = '';
 		  reminderError.innerHTML = data.message;
          setCurrentTime();
 	  } else if (data.message === 'Diary Reminder Created Successfully') {
 		  reminderError.innerHTML = '';
 		  reminderText.value = '';
 		  reminderSuccess.innerHTML = data.message;
          setCurrentTime();
 	  }
   });
}

function setCurrentTime() {
	let d, h, m;

	d = new Date;
	h = d.getHours();
	m = d.getMinutes();

	if(h >= 12) {
		setTimePM();
	} else {
		setTimeAM();
	}

	if(h != 12) {
		h %=12
	}

	setHour(h);
	setAttr('hourHand', h);

	setMinute(m);
	setAttr('minuteHand', m, true);
}

function setAttr(id, value, realMin=false) {
	let degrees;

	if (realMin) {
		degrees = 6 * value;
	} else {
		degrees = 30 * value;
	}

	let v = `rotate(${degrees}, 82, 82)`;
	document.getElementById(id).setAttribute('transform', v);
}

function setHour(time) {
	hour = time;
	if (time < 10) {
		hourElement.innerHTML = `0${time}`;
	} else {
		hourElement.innerHTML = time;
	}
}

function setMinute(time) {
	minute = time;
	if (time < 10) {
		minuteElement.innerHTML = `0${time}`;
	} else {
		minuteElement.innerHTML = time;
	}
}

function setTimeAM() {
	amElement.style.color = '#3FC2B9';
	pmElement.style.color = 'black';
	am = true;
	pm = false;
}

function setTimePM() {
	pmElement.style.color = '#3FC2B9';
	amElement.style.color = 'black';
	pm = true;
	am = false;
}

function showHourClock() {
	hourElement.style.color = '#3FC2B9';
	minuteElement.style.color = 'black';
    hourClock.style.display = 'block';
    minuteClock.style.display = 'none';
}

function showMinuteClock() {
	minuteElement.style.color = '#3FC2B9';
	hourElement.style.color = 'black';
	hourClock.style.display = 'none';
	minuteClock.style.display = 'block';
}

function showClockModal() {
	clockModal.style.display = 'block';
	reminderToggle.classList.add('active');

	profileToggle.classList.remove('active');
	myProfileModal.style.display = 'none';
}

function showMyProfileModal() {
	clockModal.style.display = 'none';
	reminderToggle.classList.remove('active');

	profileToggle.classList.add('active');
	myProfileModal.style.display = 'block';
}


document.querySelector('.hourClock').addEventListener('click', function(e) {
	let value = e.toElement.innerHTML;
	if (hours.includes(parseInt(value))) {
		setAttr('hourHand', parseInt(value))
		setHour(value);
	}
}, false);

document.querySelector('.minuteClock').addEventListener('click', function(e) {
	let value = e.toElement.innerHTML;
	if (minutes.includes(parseInt(value))) {
		value = parseInt(value);
		setMinute(value);
		setAttr('minuteHand', (value / 5));
	}
}, false);

reminderToggle.addEventListener('click', showClockModal, false);
profileToggle.addEventListener('click', showMyProfileModal, false);
hourElement.addEventListener('click', showHourClock, false);
minuteElement.addEventListener('click', showMinuteClock, false);
amElement.addEventListener('click', setTimeAM, false);
pmElement.addEventListener('click', setTimePM, false);
addReminderButton.addEventListener('click', setReminder, false);
cancelButton.addEventListener('click', showMyProfileModal, false);

showMyProfileModal();
setCurrentTime();
getProfile();
