class NotesView {
  constructor(model, client) {
    this.model = model;
    this.client = client;
    this.mainContainerEl = document.querySelector('#main-container');
    this.buttonEl = document.querySelector('#add-note-button');

    this.buttonEl.addEventListener('click', () => {
      const newnote = document.querySelector('#add-note-input').value;
      this.model.addNote(newnote);
      this.displayNotes();
      this.client.createNote(newnote, () => this.displayNotesFromApi())
      document.querySelector('#add-note-input').value = '';
   });

    const input = document.querySelector('#add-note-input');
    // document.querySelector('#note-button').addEventListener('click', () => {
    //   model.addNote(input.value);
    //   this.displayNotes();
    //   input.value = '';
    // });
  }
  
  displayNotes() {
    document.querySelectorAll('div.note').forEach( note => {
      note.remove();
    });
    const notes = this.model.getNotes()

    // For each note, create and append a new element on the main container
    notes.forEach((note) => {
      const newnote = document.createElement('div');
      newnote.textContent = note;
      newnote.className = 'note';
      document.querySelector('#add-note-input').value = '';
      this.mainContainerEl.append(newnote);
    });
  }

  displayNotesFromApi() {
    this.client.loadNotes(notes => {
      this.model.setNotes(notes);
      this.client.createNote(notes);
      // console.log(this.model.getNotes())
      this.displayNotes();
    });
  }
}

module.exports = NotesView;