import React from 'react'

const FilteringFunction = (props) => {
    return (
        <div>
            <p>
                {props.text} <input value={props.value} onChange={props.onChange} />
            </p>
        </div>
    )
}

export default FilteringFunction