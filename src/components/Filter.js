import React from 'react'
import Input from './Input'
import { useState } from 'react';

const Filter = (props) => {


  return (
    <Input
        label={"filter shown with"}
        value={props.newFilter}
        onChange={props.getNewFilter}
      />
  )
}

export default Filter