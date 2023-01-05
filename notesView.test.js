/**
 * @jest-environment jsdom
 */

const fs = require('fs');
// const { default: JSDOMEnvironment } = require('jest-environment-jsdom');

const NotesClient = require('./notesClient');
const NotesModel = require('./notesModel');
const NotesView = require('./notesView'); 

jest.mock('./notesClient');

describe('Notes view', () => {
  beforeEach(() => {
    NotesClient.mockClear();
    document.body.innerHTML = fs.readFileSync('./index.html');
  });

  it('displays 0 notes', () => {
    

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

  it('adds note by button click', () => {
    const model = new NotesModel();
    const view = new NotesView(model);

    const inputEl = document.querySelector('#add-note-input');
    inputEl.value = 'Testing note';

    const buttonEl = document.querySelector('#add-note-button');
    buttonEl.click();

    expect(document.querySelectorAll('div.note').length).toBe(1);
    expect(document.querySelectorAll('div.note')[0].textContent).toEqual('Testing note');
  });

  it('adds 2 notes by button click', () => {
    const model = new NotesModel();
    const view = new NotesView(model);

    const inputEl = document.querySelector('#add-note-input');
    inputEl.value = 'Testing note';

    const buttonEl = document.querySelector('#add-note-button');
    buttonEl.click();
    buttonEl.click();

    expect(document.querySelectorAll('div.note').length).toBe(2);
    expect(document.querySelectorAll('div.note')[0].textContent).toEqual('Testing note');
  });

  it('clears the list of previous notes before displaying', () => {
    const model = new NotesModel();
    const view = new NotesView(model);

    model.addNote('one');
    model.addNote('two');

    view.displayNotes();
    view.displayNotes();

    expect(document.querySelectorAll('div.note').length).toEqual(2);
  });

  it('displays info from the server', () => {
    // const client = new NotesClient();
    const model = new NotesModel();
    const client = {
      loadNotes: (callback) => callback(['This note is coming from the server'])
    };
    const view = new NotesView(model, client);

    // client.loadnotes.mockImplementation(callback => {
    //   callback(['This note is coming from the server']);
    // });
    view.displayNotesFromApi();
    expect(document.querySelector('div.note').textContent).toEqual('This note is coming from the server')

    // expect(client.loadnotes).toHaveBeenCalled();
    // expect(model.getNotes()).toEqual(['This note is coming from the server']);
  });
}); 

    

    


 

 
   
