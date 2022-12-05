import React from 'react'

const Notification = ({message, handleChange, className}) => {
  if (message === null) {
    return null
  }

  return (
    <div onLoad={handleChange} className={className}>
      {message}
    </div>
  )
}

export default Notification