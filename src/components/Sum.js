import React from 'react'

const Sum = (props) => {
 
  return (
    <p>
      total of {props.objectArray.reduce((total, current)=> total + current.exercises, 0)} exercises
    </p>
  )
}

export default Sum