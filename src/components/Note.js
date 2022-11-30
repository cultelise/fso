import React from 'react'

const Note = ({note, toggleImportance, deleteNote, className}) => {
  const label = note.important ? 'make not important' : 'make important'
  return (
    <li>
      {note.content}
      <button className={className} onClick={(event) => toggleImportance(event)}>{label}</button>
      <button className={className} onClick={(event) => deleteNote(event)}>delete note</button>
    </li>
  )
}

export default Note