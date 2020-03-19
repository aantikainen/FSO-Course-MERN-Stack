import React, { useState, useEffect} from 'react'
import axios from 'axios'
import FilteringFunction from './FilteringFunction'
import Header from './Header'
import ShowPersons from './ShowPersons'
import AddPersonForm from './AddPersonForm'


const App = () => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [persons, setPersons] = useState([
        {
            name: 'aantikainen',
            number: '044-9722205'
        },
        {
            name: 'Ada Lovelace',
            number: '040-4124571'
        }
    ])

    useEffect(() => {
        axios
          .get('http://localhost:3001/persons')
          .then(response => {
            console.log('promise fulfilled')
            setPersons(response.data)
          })
      }, [])

    const addPerson = (event) => {
        event.preventDefault()
        const person = {
            name: newName,
            number: newNumber
        }
        if (persons.some(e => e.name === person.name)) {
            window.alert(`${newName} is already added to phonebook`)
        } else {
            setPersons(persons.concat(person))
        }
    }

    const handlePersonChange = (event) => {
        event.preventDefault()
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        event.preventDefault()
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        event.preventDefault()
        setFilter(event.target.value)
    }

    return (
        <div>
            <Header text='Phonebook' />
            <FilteringFunction text='Filter shown with' 
            value={filter} onChange={handleFilterChange} />
            <Header text='Add a new' />
            <AddPersonForm onSubmit={addPerson} nameValue ={newName} 
            personChange={handlePersonChange} numberValue={newNumber} 
            numberChange = {handleNumberChange}/>
            <Header text='Numbers' />
            <ShowPersons personslist={persons} filter={filter} />
        </div>
    )
}

export default App