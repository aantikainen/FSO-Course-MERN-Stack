import React from 'react'

const Filter = (props) => {
    return (
        <div>
        filter <input onChange={props.onChange} value={props.value}/>
        </div>
    )
}

export default Filter