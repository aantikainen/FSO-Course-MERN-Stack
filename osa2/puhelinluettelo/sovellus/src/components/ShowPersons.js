import React from 'react'

const ShowPersons = (props) => {
    const persons = props.personslist
    const filter = props.filter
    const res = persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))

    return (
        <div>
            {res.map((person, i) =>
                <p key={i} value={person.name} > {person.name} {person.number} <button name={person.name} onClick={props.removePerson}>delete</button></p>
            )}
        </div>
    )
}

export default ShowPersons