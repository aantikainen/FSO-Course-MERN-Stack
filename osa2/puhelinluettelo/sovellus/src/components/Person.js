import React from 'react'

const Person = (props) => {

    return (
        <div>
            <p>{props.name} {props.number} <button value={props.name} onClick={props.delete}>delete</button></p>
        </div>
    )
}

export default Person