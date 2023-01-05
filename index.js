const NotesClient = require("./notesClient");
const NotesModel = require("./notesModel");
const NotesView = require("./notesView");

console.log('Notes App in use');

const client = new NotesClient();
const model = new NotesModel();
// model.addNote('This is an example note');

const view = new NotesView(model);
view.displayNotesFromApi();

const getRepoInfo = (callback => {
  fetch('http://localhost:3000/notes')
  .then(response => response.json())
  .then(data => {
    callback(data);
  });
});

getRepoInfo(repoData => {
  console.log(repoData);
});

// view.displayNotes