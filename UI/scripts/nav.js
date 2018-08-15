const profile = document.querySelector('#profile');
const profileModal = document.querySelector('.profileModal');

	function showProfileModal() {
  if(profileModal.style.display === 'none') {
    profileModal.style.display = 'block';
  } else {
    profileModal.style.display = 'none';
  }
}

profile.addEventListener('click', showProfileModal, false);

showProfileModal();

profileModal.style.display = 'none';
