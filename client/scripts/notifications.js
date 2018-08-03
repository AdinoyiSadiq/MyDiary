window.onload = () => {
  const profileUrl = 'https://mydiary-server.herokuapp.com/api/v1/profile';
  const profile = document.querySelector('#profile');
  const profileModal = document.querySelector('.profileModal');
  const navProfile = document.querySelector('.navProfile');
  const token = window.localStorage.getItem('token');

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

  profile.addEventListener('click', showProfileModal, false);

  showProfileModal();
  getProfile();

  profileModal.style.display = 'none';
};
