const id = window.location.hash.substring(1);
const url = `http://localhost:3090/api/v1/entries/${id}`;
const token = window.localStorage.getItem('token');
const entryArticle = document.querySelector('.entry');
const deleteModal = document.querySelector('.deleteModal');
const deleteButton = document.querySelector('#deleteButton');
const cancelButton = document.querySelector('#cancelButton');

let entryString = '';

function showDeleteEntryModal() {
  deleteModal.style.display = 'block';
}

function hideDeleteEntryModal() {
  deleteModal.style.display = 'none';
}

function deleteEntry(event) {
  event.preventDefault();
  window.fetch(url, {
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
      console.log(data)
      if (data.message === 'Deleted Diary Entry Successfully') {
        window.location.href = './entries.html';
      }
    });
}

function generateEntry(entry, entryString) {
  const date = new Date(parseInt(entry.created));
  entryString = `
    <h3 class="title">${entry.title}</h3>
    <p class="date">${date.toString().substring(0, 15)}</p>
    <p class="content">${entry.content}</p>
    <div class="actions">
      <a title="Edit" href="./updateEntry.html#${entry.id}"><i class="far fa-edit"></i></a>
      <a title="Delete"><i class="far fa-trash-alt" id="delete"></i></a>
    </div>
  `;
  return entryString;
}

function getEntry() {
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
      if (response.status === 404) {
        window.location.replace('./entries.html');
        return;
      }
      return response.json();
    })
    .then((data) => {
      if (data.entry) {
        const { entry } = data;
        entryString = generateEntry(entry, entryString); 
        entryArticle.innerHTML = entryString;
      }
    });
}

document.querySelector('.entry').addEventListener('click', (event) => {
  const { target } = event;
  if (target.tagName.toLowerCase() === 'i') {
    if (target.attributes.id.value === 'delete') {
      showDeleteEntryModal();
    }
  }
});

deleteButton.addEventListener('click', deleteEntry, false);
cancelButton.addEventListener('click', hideDeleteEntryModal, false);

getEntry();
