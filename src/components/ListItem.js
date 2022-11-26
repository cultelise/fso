import React from "react";

const ListItem = (props) => {
  return (
    <li>
      {props.content}
      <button id={props.id} onClick={(event) => props.onClick(event)}>show</button>
    </li>
  );
};

export default ListItem;
