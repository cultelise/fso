import React from 'react'
import ListItem from './ListItem'
const Persons = (props) => {
  return (
    <ul>
    {props.persons.map((x) => (
      <ListItem key={x.id}
        content={x.name + ': ' + x.number}
        onClick={(event) => props.onClick(event)}
        id={x.id}
      />
      
    ))}
  </ul>
  )
}

export default Persons