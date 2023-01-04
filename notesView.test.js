/**
 * @jest-environment jsdom
 */

const fs = require('fs');

const NotesModel = require('./notesModel');
const NotesView = require('./notesView'); 

describe('Notes view', () => {
  beforeEach(() => {
    document.body.innerHTML = fs.readFileSync('./index.html');
  });

  xit('displays 0 notes', () => {
    

    // 1. Setting up model and view
    const model = new NotesModel();
    const view = new NotesView(model);
    
    // 2. Display the notes on the page
    view.displayNotes();

    // 3. There should now be 2 div.note on the page
    expect(document.querySelectorAll('div.note').length).toBe(0);
  });

  it("displays 2 notes", () => {
    const model = new NotesModel();
    const view = new NotesView(model);

    model.addNote("Buy milk");
    model.addNote("Go to the gym");

    view.displayNotes();

    expect(document.querySelectorAll("div.note").length).toBe(2);
  });
});