const NotesClient = require('./notesClient');

// This makes `fetch` available to our test
// (it is not by default, as normally `fetch` is only
// available within the browser)
require('jest-fetch-mock').enableMocks()

describe('NoteClient class', () => {
  it('calls fetch and loads data', (done) => {
    // 1. Instantiate the class
    const client = new NotesClient();

    // 2. We mock the response from `fetch`
    // The mocked result will depend on what your API
    // normally returns — you want your mocked response
    // to "look like" as the real response as closely as
    // possible (it should have the same fields).
    fetch.mockResponseOnce(JSON.stringify({
      name: ["This note is coming from the server"]
    }));

    // 3. We call the method, giving a callback function.
    // When the HTTP response is received, the callback will be called.
    // We then use `expect` to assert the data from the server contain
    // what it should.
    client.loadNotes((note) => {
      expect(note.name).toEqual(["This note is coming from the server"]);
      // expect(fetch).toHaveBeenCalledWith('http://localhost:3000/notes');

      // 4. Tell Jest our test can now end.
      done();
    });
  });

  // it('saves the created note onto the page', () => {
  //   fetch.mockResponseOnce(JSON.stringify([
  //     "This note is coming from the server"
  //   ]));

  //   client.createNote('This note is coming from the server');

  //   expect(fetch).toHaveBeenCalledWith(
  //     'http://localhost:3000/notes',
  //     expect.objectContaining({
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({'content': 'This note is coming from the server'}),
  //     })
  //   );
  // });

  it('saves a note to the page', (done) => {
    const client = new NotesClient();
    client.createNote('note');
    expect(fetch.mock.calls.length).toEqual(2)
    done();
  })
});