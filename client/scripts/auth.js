const profileUrl = 'http://localhost:3090/api/v1/profile';
const navProfile = document.querySelector('.navProfile');

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

getProfile();