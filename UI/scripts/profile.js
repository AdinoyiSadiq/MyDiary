window.onload = function() {
	let hour;
	let minute;
	let am = false;
	let pm = false;

	const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
	const minutes = [00, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

	const reminderToggle = document.querySelector('#reminderToggle');
	const profileToggle = document.querySelector('#profileToggle');

	const clockModal = document.querySelector('#clock');
	const profileModal = document.querySelector('#profile');

	const hourClock = document.querySelector('.hourClock');
	const minuteClock = document.querySelector('.minuteClock');

	const hourElement = document.getElementById('hr');
	const minuteElement = document.getElementById('min');

	const amElement = document.getElementById('am');
	const pmElement = document.getElementById('pm');

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
		profileModal.style.display = 'none';
	}

	function showProfileModal() {
		clockModal.style.display = 'none';
		reminderToggle.classList.remove('active');

		profileToggle.classList.add('active');
		profileModal.style.display = 'block';
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
	profileToggle.addEventListener('click', showProfileModal, false);
	hourElement.addEventListener('click', showHourClock, false);
	minuteElement.addEventListener('click', showMinuteClock, false);
	amElement.addEventListener('click', setTimeAM, false);
	pmElement.addEventListener('click', setTimePM, false);

	showProfileModal();
	setCurrentTime();
}