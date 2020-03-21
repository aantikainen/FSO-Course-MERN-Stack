import React from 'react'

const ShowPersons = (props) => {
    let showables = props.persons
    if (props.filter) {
         showables = showables.filter(p => p.name.toLowerCase().includes(props.filter.toLowerCase()))
    }
    return (
        <div>
            <ul>
        {showables.map((person) =>
          <li key={person.name} > {person.name} {person.number}</li> 
        )}
      </ul>
        </div>
    )
}

export default ShowPersons