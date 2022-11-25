import React from 'react'
import Input from './Input'

const Filter = (props) => {
  return (
    <Input
        label={"filter shown with"}
        value={props.newFilter}
        onChange={props.onChange}
      />
  )
}

export default Filter