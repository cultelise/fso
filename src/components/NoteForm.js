import { useEffect, useState} from 'react';
import Note from './Note';
import noteService from '../services/notes';
import Notification from './Notification';
import Togglable from './Togglable';

const NoteForm = (props) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState();
  const [errorClass, setErrorClass] = useState('hide');
  useEffect(() => {
    const getInitialNotes = async () => {
      const initialNotes = await noteService.getAll();
      setNotes(initialNotes);
    };
    getInitialNotes();
  }, []);

  const handleNoteInput = (event) => {
    setNewNote(event.target.value);
  };

  const addNote = async (event) => {
    event.preventDefault();
    try {
    const noteObject = {
      id: notes.length + 1,
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    };

    const returnedNote = await noteService.create(noteObject);
    setNotes(notes.concat(returnedNote));
    setNewNote('');
    setErrorClass('success show')
    setErrorMessage('Note successfully added.')
    setTimeout(() => {
      setErrorClass('hide')
      setErrorMessage('')
    }, 3000)
    } catch(error) {
      if (newNote === '') {
        setErrorClass('error show')
        setErrorMessage('Cannot add empty note.')
        setTimeout(() => {
          setErrorClass('hide')
          setErrorMessage('')
        }, 3000)
      }
    }
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  const toggleImportanceOf = async (event) => {
    const note = notes.find((n) => n.id === event.target.className);
    const changedNote = { ...note, important: !note.important };
    const updatedNote = await noteService.update(event.target.className, changedNote);
    setNotes(notes.map((n) => (n.id !== event.target.className ? n : updatedNote)));
  };

  const deleteNote = async (event) => {
      const note = notes.find((p) => {
        return p.id === event.target.className;
      });
      try {
        if (window.confirm(`Delete ${note.content}?`)) {
          noteService.remove(event.target.className);
          const modifiedNotes = await noteService.getAll();
          setNotes(modifiedNotes);
          setErrorClass('error show');
          setErrorMessage(`${note.content} deleted.`);
          setTimeout(() => {
            setErrorMessage('');
            setErrorClass('hide');
          }, 3000);
        }
      } catch (error) {
        console.log(error)
        // setErrorMessage('note already deleted');
      }
    };


  return (
    <div>
      <h1>Notes</h1>
      <Togglable buttonLabel={'add note'}>
      <form action='' onSubmit={addNote}>
        <label htmlFor='note'>note:</label>
        <input
          type='text'
          id='note'
          value={newNote}
          onChange={handleNoteInput}
        ></input>
        <button type='submit'>add note</button>
      <Notification className={errorClass} message={errorMessage}/>
      </form>
      </Togglable>
      <ul>
        {notesToShow.map((note) => (
          <Note
            className={note.id}
            key={note.id}
            note={note}
            toggleImportance={(event) => toggleImportanceOf(event)}
            deleteNote={(event) => deleteNote(event)}
          />
        ))}
      </ul>
      
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}
      </button>
    </div>
  );
};

export default NoteForm;
