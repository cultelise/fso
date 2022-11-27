import React from 'react'

const ListItem = (props) => {
  return (
    <li>{props.content}<button id={props.id} onClick={(event) => props.onClick(event)}>delete person</button></li>
  )
}

export default ListItem