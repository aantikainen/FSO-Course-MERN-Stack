import React from 'react'
import ShowCountryInfo from './ShowCountryInfo'

const ShowCountries = (props) => {
    const countries = props.countries
    const filter = props.filter
    const show = countries.filter(c => c.name.toLowerCase().includes(filter.toLowerCase()))
    const languages = () => show[0].languages.map(language =>
        <li key={language.iso639_1} > {language.name} </li>)

    const handleClick = (event) => {
        props.setFilter(event.target.attributes.country.value)
    }

    if (show.length === 1) {
        return (
            <div>
                <ShowCountryInfo name={show[0].name} capital={show[0].capital}
                    population={show[0].population} languages={languages()}
                    flag={show[0].flag}
                />
            </div>
        )
    } else if (show.length > 10) {
        return (
            <div>
                Too many matches, filter more please
            </div>
        )
    } else {
        return (
            <div>
                <ul>
                    {show.map((country, i) =>
                        <li key={i} value={country.name} > {country.name} <button country={country.name} onClick={handleClick}>show</button></li>
                    )}
                </ul>
            </div>
        )
    }
}

export default ShowCountries