const id = window.location.hash.substring(1);
const url = `http://localhost:3090/api/v1/entries/${id}`;
const token = window.localStorage.getItem('token');
const entryArticle = document.querySelector('.entry');
let entryString = '';

function generateEntry(entry, entryString) {
  entryString = `
    <h3 class="title">${entry.title}</h3>
    <p class="date">${Date(entry.created).substring(0, 15)}</p>
    <p class="content">${entry.content}</p>
    <div class="actions">
      <a title="Edit" href="./updateEntry.html#${entry.id}"><i class="far fa-edit"></i></a>
      <a title="Delete" href="#"><i class="far fa-trash-alt"></i></a>
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

getEntry();
