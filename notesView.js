class NotesView {
  constructor(model) {
    this.model = model;
    this.mainContainerEl = document.querySelector('#main-container');

    // const input = document.querySelector('#note-input');
    // document.querySelector('#note-button').addEventListener('click', () => {
    //   model.addNote(input.value);
    //   this.displayNotes();
    //   input.value = '';
    // });
  }
  
  displayNotes() {
    // document.querySelectorAll('.note').forEach(note => {
    //   note.remove();
    // });
    const notes = this.model.getNotes()

    // For each note, create and append a new element on the main container
    notes.forEach((note) => {
      const newnote = document.createElement("div");
      newnote.textContent = note;
      newnote.className = "note";
      console.log(newnote)
      this.mainContainerEl.append(newnote);
    });
  }
}


module.exports = NotesView;