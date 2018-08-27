const url = 'http://localhost:3090/api/v1/entries';
const token = window.localStorage.getItem('token');

const emptyListModal = document.querySelector('.emptyList');
const entryListModal = document.querySelector('.entryList');

const deleteModal = document.querySelector('.deleteModal');
const deleteButton = document.querySelector('#deleteButton');
const cancelButton = document.querySelector('#cancelButton');
const entriesList = document.getElementById('list');

let id;
let listString = '';

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

function deleteEntry(event) {
  event.preventDefault();
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

function generateEntries(entries, listString) {
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
  });
  return listString;
}

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
        listString = generateEntries(entries, listString)
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

deleteButton.addEventListener('click', deleteEntry, false);
cancelButton.addEventListener('click', hideDeleteEntryModal, false);
getAllEntries();


