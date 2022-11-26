import React from 'react'
import ListItem from './ListItem'

const Countries = (props) => {
  return (
    <ul onChange={props.onChange}>
    {props.countries.map((x) => (
      <ListItem key={x.name.common}
        content={x.name.common}
      />
    ))}
  </ul>
  )
}

export default Countries