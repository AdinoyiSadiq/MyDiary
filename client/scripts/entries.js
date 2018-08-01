window.onload = () => {
  const url = 'http://localhost:3090/api/v1/entries';
  const token = window.localStorage.getItem('token');

  const emptyListModal = document.querySelector('.emptyList');
  const entryListModal = document.querySelector('.entryList');

  const profile = document.querySelector('#profile');
  const profileModal = document.querySelector('.profileModal');

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

  const entriesList = document.getElementById('list');
  let listString = '';
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
                <article class="entry" entryid=${entry.id}>
                  <div class="content">
                    <a href="./entry.html">
                      <h3 class="title">${entry.title}</h3>
                      <p class="date">${Date(entry.created).substring(0, 15)}</p>
                      <p>${entry.content}</p>
                    </a>
                    <div class="actions">
                      <a title="Edit" href="./addEntry.html"><i class="far fa-edit"></i></a>
                      <a title="Delete" href="#"><i class="far fa-trash-alt"></i></a>
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

  profile.addEventListener('click', showProfileModal, false);
  getAllEntries();
  showProfileModal();

  profileModal.style.display = 'none';
};
