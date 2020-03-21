import React, { useState, useEffect} from 'react'
import personsService from './services/persons'
import FilteringFunction from './components/FilteringFunction'
import Header from './components/Header'
import AddPersonForm from './components/AddPersonForm'
import ShowPersons from './components/ShowPersons'


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

    

      const tryToRemovePerson = (event) => {
        const name = event.target.attributes.name.value
        const person = persons.find(p => p.name === name)
        throwAlert(person)
    }

    const throwAlert = (person) => {
        const result = window.confirm(`Delete ${person.name} ?`);
        if (result) {
            removePerson(person)
        }
    }

    const replaceTheOldNumber = (person) => {
        const p = persons.find(p => p.name === person.name)
        const id = p.id
        const result = window.confirm(`${person.name} is already added to phonebook,
         replace the old number with a new one?`)
         if(result) {
            personsService.update(id,person)
         }
    }

      const removePerson = (person) => {
          console.log(person)
          const id = persons.find(p=> p.name===person.name)
          const name = person.name
          personsService.removePerson(id)
              .then(response => {
                  console.log(response)
              }).catch(error => {
                console.log('fail ', error)
                setPersons(persons.filter(p=>p.name!==name))
                setNewNumber('')
                setNewName('')
              })
              setPersons(persons.filter(p=>p.id !== id))
              setNewNumber('')
              setNewName('')
    }

    const addPerson = (event) => {
        event.preventDefault()

        const person = {
            name: newName,
            number: newNumber
        }
        if (persons.some(e => e.name === person.name)) {
            replaceTheOldNumber(person)
        } else {
            personsService.create(person)
            .then(response => {
                console.log(response)
            })
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

    useEffect(() => {
        personsService
          .getAll()
          .then(initialPersons => {
            setPersons(initialPersons)
          })
      }, [])

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
            <ShowPersons personslist={persons} filter={filter} removePerson={tryToRemovePerson} /> 
        </div>
    )
}

export default App