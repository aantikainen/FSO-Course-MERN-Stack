import React, { useState, useEffect } from 'react'
import Header from './Header'
import ShowPersons from './ShowPersons'
import AddForm from './AddForm'
import Filter from './Filter'
import Notification from './Notification'
import axios from 'axios'
import personHandlingService from '../services/personHandlingService'

const App = () => {
    const [persons, setPersons] = useState([
        {
            name: 'aantikainen',
            number: '1231231231',
            id: 1
        },
        {
            name: 'Ada Lovelace',
            number: '1800-CALLME',
            id: 2
        }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')
    const [errorMessage, setErrorMessage] = useState('Welcome to phonebook app!')

    useEffect(() => {
        console.log('effect')
        axios.get('/api/persons').then(response => {
            console.log('promise fulfilled')
            setPersons(response.data)
        })
    }, [])

    const handleClick = (event) => {
        event.preventDefault()
        const person = { name: newName, number: newNumber, id: Math.floor(Math.random(99999)) }
        if (persons.find(p => p.name === person.name)) {
            const result = window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one ?`);
            if (result) {
                const prevPerson = persons.find(p => p.name === person.name)
                personHandlingService
                    .update(prevPerson.id, { ...prevPerson, number: newNumber })
                    .then(updatedPerson => {
                        setPersons(
                            persons.map(n => (n.name === newName ? updatedPerson : n))
                        );
                        setErrorMessage(
                            `Person '${person.name}' 's phonenumber has been updated!`
                        )
                        setTimeout(() => {
                            setErrorMessage(null)
                        }, 5000)
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        } else {
            personHandlingService
                .create(person)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setNewName("")
                    setNewNumber("")
                    setErrorMessage(
                        `Person '${person.name}' added!`
                    )
                    setTimeout(() => {
                        setErrorMessage(null)
                    }, 5000)
                }).catch(error => {
                    console.log(error.response.data)
                })
        }
    }

    const handleDeleteClick = (event) => {
        event.preventDefault()
        const person = persons.find(p => p.name === event.target.value)
        const result = window.confirm(`Do you really want to delete ${person.name} ?`);
        if (result) {
            personHandlingService
                .deletePerson(person.id)
                .then(() => {
                    setPersons(persons.filter(p => p.id !== person.id));
                    setNewName("");
                    setNewNumber("");
                    setErrorMessage(
                        `Person '${person.name}' deleted!`
                    )
                    setTimeout(() => {
                        setErrorMessage(null)
                    }, 5000)
                })
                .catch(error => {
                    console.log(error)
                    setPersons(persons.filter(p => p.name !== person.name));
                    setErrorMessage(`User ${person.name} has already been removed!`);
                })
        }
    }

    const handleNameChange = (event) => {
        event.preventDefault()
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        event.preventDefault()
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        event.preventDefault()
        setNewFilter(event.target.value)
    }

    return (
        <div>
            <Notification message={errorMessage} />
            <Header text="Phonebook" />
            <Filter onChange={handleFilterChange} value={newFilter} filter={newFilter} />
            <Header text="Add a new" />
            <AddForm onChangeNumber={handleNumberChange} newNumber={newNumber} input={newName} onChange={handleNameChange} onClick={handleClick} />
            <Header text="Numbers" />
            <ShowPersons filter={newFilter} persons={persons} onClick={handleDeleteClick} />
        </div>
    )
}

export default App