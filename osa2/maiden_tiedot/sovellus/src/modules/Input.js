import React from 'react'

const Input = (props) => {
    return (
      <div>
        {props.text}  
        <br/>
        <input onChange={props.onChange} />
      </div>
    )
}

export default Input