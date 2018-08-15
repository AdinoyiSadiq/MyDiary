const url = 'http://localhost:3090/api/v1/entries';
const token = window.localStorage.getItem('token');
const createEntryError = document.getElementById('createEntryError');
const title = document.getElementById('title');
const content = document.getElementById('content');

function createEntry(event) {
  event.preventDefault();
  const values = {
    title: title.value,
    content: content.value,
  };
  window.fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: token,
    },
    body: JSON.stringify({
      title: values.title,
      content: values.content,
    }),
  })
    .then((response) => {
      if (response.status === 500) {
        createEntryError.innerHTML = 'An error occurred while processing this request';
        return;
      }
      return (response.json());
    })
    .then((data) => {
      const { message } = data;
      if (message.startsWith('Please fill')) {
        createEntryError.innerHTML = message;
      } else if (message === 'Diary Entry Created Successfully') {
        window.location.replace(`./entry.html#${data.entry.id}`);
      }
    });
}

function cancelEntry() {
  title.value = '';
  content.value = '';
}

document.getElementById('save').addEventListener('click', createEntry, false);
document.getElementById('cancel').addEventListener('click', cancelEntry, false);

