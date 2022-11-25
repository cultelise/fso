import React from 'react'
import Input from './Input'

const PersonForm = (props) => {
  return (
    <form>
      <Input label={"name:"} value={props.newName} onChange={props.getNewName} />
      <Input label={"number:"} value={props.newNumber} onChange={props.getNewNumber} />
      <button type="submit" onClick={props.addPerson} onKeyDown={props.handleKeyDown}>
      add
      </button>
    </form>
  )
}

export default PersonForm