import React from 'react'
import ListItem from './ListItem'

const Countries = (props) => {
  return (
    <ul onChange={props.onChange}>
    {props.countries.map((x, index) => (
      <ListItem key={x.name.common}
        content={x.name.common} onClick={(event) => props.onClick(event)}
        id={index}
      />
    ))}
  </ul>
  )
}

export default Countries