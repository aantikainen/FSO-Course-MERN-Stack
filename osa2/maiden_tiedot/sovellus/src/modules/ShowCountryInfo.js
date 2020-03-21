import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ShowWeather from './ShowWeather'

const ShowCountryInfo = (props) => {
    const [weather, setWeather] = useState('')
    const api_key = process.env.REACT_APP_API_KEY
    const capital = props.capital
    console.log(api_key)

    useEffect(() => {
        axios
            .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
            .then(response => {
                setWeather(response.data)
            })
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <h2>
                {props.name}
            </h2>
            <p>Capital {props.capital}</p>
            <p>Population {props.population}</p>
            <h3>Languages</h3>
            {props.languages}
            <br />
            <img alt="flag" src={props.flag} width="150" height="150" />
            <h3>
                Weather in {capital}
            </h3>
            <ShowWeather weather={weather} />
        </div>
    )
}

export default ShowCountryInfo