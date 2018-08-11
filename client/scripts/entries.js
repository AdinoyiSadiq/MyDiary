window.onload = () => {
  const url = 'http://localhost:3090/api/v1/entries';
  const profileUrl = 'http://localhost:3090/api/v1/profile';
  const token = window.localStorage.getItem('token');

  const emptyListModal = document.querySelector('.emptyList');
  const entryListModal = document.querySelector('.entryList');
  const navProfile = document.querySelector('.navProfile');


  const profile = document.querySelector('#profile');
  const profileModal = document.querySelector('.profileModal');
  const deleteModal = document.querySelector('.deleteModal');
  const deleteButton = document.querySelector('#deleteButton');
  const cancelButton = document.querySelector('#cancelButton');

  let id;

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

  profileModal.style.display = 'none';
};
