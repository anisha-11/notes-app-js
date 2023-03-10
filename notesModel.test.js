const NotesModel = require("./notesModel");

describe('NotesModel', () => {
  
  it('returns empty array', () => {
    const model = new NotesModel();
    expect(model.getNotes()).toEqual([]);
  });

  it('adds a note to the model', () => {
    const model = new NotesModel();
    model.addNote('Buy milk');
    model.addNote('Go to the gym');
    expect(model.getNotes()).toEqual(['Buy milk', 'Go to the gym']);
  });

  it('resets all notes to an empty model', () => {
    const model = new NotesModel();
    model.addNote('Buy milk');
    model.addNote('Go to the gym');
    model.reset();
    expect(model.getNotes()).toEqual([]);
  });
})