import React from 'react'

const ShowWeather = (props) => {
    if (!props.weather) {
        return (
            <div>

            </div>
        )
    } else {
        return (
            <div>
                <p>Temperature: {props.weather.current.temperature} C</p>
                <p><img src={props.weather.current.weather_icons[0]} alt="icons" /></p>
                <p>Wind: {props.weather.current.wind_speed} mph, direction {props.weather.current.wind_dir}</p>
            </div>
        )
    }
}

export default ShowWeather