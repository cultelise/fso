import React from 'react'
import ListItem from './ListItem'
const Persons = (props) => {
  return (
    <ul>
    {props.persons.map((x) => (
      <ListItem key={x.id}
        content={x.name + ': ' + x.number}
      />
    ))}
  </ul>
  )
}

export default Persons