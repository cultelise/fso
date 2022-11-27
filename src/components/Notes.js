import { useState } from "react";
import { useEffect } from "react";
import Note from "./Note";
import noteService from "../services/notes";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    const getInitialNotes = async () => {
      const initialNotes = await noteService.getAll()
      setNotes(initialNotes);
    } 
    getInitialNotes()
  }, []);

  const handleNoteInput = (event) => {
    setNewNote(event.target.value);
  };

  const addNote = async (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    };
    const returnedNote = await noteService.create(noteObject);
    setNotes(notes.concat(returnedNote));
    setNewNote("");
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  const toggleImportanceOf = async (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };
    const updatedNote = await noteService.update(id, changedNote)
    setNotes(notes.map((n) => (n.id !== id ? n : updatedNote)));
  };

  return (
    <div>
      <form action="" onSubmit={addNote}>
        <label htmlFor="note">note</label>
        <input id="note" value={newNote} onChange={handleNoteInput}></input>
        <button type="submit">add note</button>
      </form>
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? "important" : "all"}
      </button>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default Notes;
