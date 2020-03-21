import React from 'react'

const Notification = ({message}) => {
    const messageStyle = {
        color: 'green',
        fontSize: 50,
        backgroundColor: 'lightgrey',
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 5,
        textAlign: 'center'
    }

if (message === null) {
    return (
        <div>

        </div>
    )
  }
  
  return (
    <div style={messageStyle}>
      {message}
    </div>
  )
}

export default Notification