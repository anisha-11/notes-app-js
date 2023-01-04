const NotesModel = require("./notesModel");
const NotesView = require("./notesView");

console.log('Notes App in use');

const model = new NotesModel();
model.addNote('This is an example note');

const view = new NotesView(model);
view.displayNotes();