import React from 'react'

const ShowPersons = (props) => {
    const persons = props.personslist
    const filter = props.filter
    const res = persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
    return (
        <div>
            {res.map((person, i) =>
                <p key={i} value={person.name} > {person.name} {person.number}</p>
            )}
        </div>
    )
}

export default ShowPersons