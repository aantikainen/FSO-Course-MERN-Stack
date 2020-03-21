import React, { useState } from 'react'
import Header from './Header'
import ShowPersons from './ShowPersons'
import AddForm from './AddForm'
import Filter from './Filter'

const App = () => {
    const [ persons, setPersons] = useState([
      { name: 'Arto Hellas',
        number: '1231231231' },
      { name: 'Ada Lovelace',
        number: 'Call me'}
    ]) 
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ newFilter, setNewFilter ] = useState('')

    const handleClick = (event) => {
        event.preventDefault()
        const person = {name:newName, number:newNumber}
        if (persons.find(p => p.name === person.name)) {
            window.alert(`${person.name} is already added to phonebook`);
        } else {
            setPersons(persons.concat(person))
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
      <Header text = "Phonebook" />
      <Filter onChange={handleFilterChange} value={newFilter} filter={newFilter} />
      <Header text = "Add a new" />
        <AddForm onChangeNumber={handleNumberChange} newNumber={newNumber} input = {newName} onChange={handleNameChange} onClick={handleClick}/>
        <Header text = "Numbers" />
        <ShowPersons filter={newFilter} persons={persons} />
      </div>
    )
  
  }
  
  export default App