import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Input from './Input'
import ShowCountries from './ShowCountries'

const App = () => {

  // Defining states for JSON countries and input filter
  const [state, setState] = useState([])
  const [filter, setFilter] = useState('')

  //GET api and store JSON to state by setState (useState))
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setState(response.data)
      })
  }, [])

  //By writing on input, it gets stored as a filter by setFilter (useState)
  const filterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <Input text="Find countries" onChange={filterChange} />
      <ShowCountries setFilter={setFilter} filter={filter} countries={state} />
    </div>
  )
}

export default App