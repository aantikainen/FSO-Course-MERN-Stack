import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ text }) => {
    return (
        <div>
            <h2>
                {text}
            </h2>
        </div>
    )
}

const StatisticLine = (props) => {
    return (
        <tr>
            <td>
                {props.text}
            </td>
            <td>
                {props.value}
            </td>
        </tr>
    )
}

const Button = (props) => {
    return (
        <div>
            <button onClick={props.handleClick}>
                {props.text}
            </button>
        </div>
    )
}

const Statistics = (props) => {

    if (props.total === 0) {
        return (
            <div>
                Anna palautetta yllä.
            </div>
        )
    } else {

        let avg = 0
        for (let i = 0; i < props.good; i++) {
            avg += 1
        }
        for (let i = 0; i < props.bad; i++) {
            avg += -1
        }
        avg = avg / props.total

        const lines = [
            {
                id: 1,
                text: <StatisticLine text='Hyviä palautteita' value={props.good} />
            },
            {
                id: 2,
                text: <StatisticLine text='Neutraaleja palautteita' value={props.neutral} />
            },
            {
                id: 3,
                text: <StatisticLine text='Huonoja palautteita' value={props.bad} />
            },
            {
                id: 4,
                text: <StatisticLine text='Kaikki arvostelut yhteensä' value={props.total} />
            },
            {
                id: 5,
                text: <StatisticLine text='Keskiarvo' value={avg} />
            },
            {
                id: 6,
                text: <StatisticLine text='Positiivisia (%) kaikista' value={props.positivesfrom} />
            }
        ]
        return (
            <div>
                <table>
                    <tbody>
                        {lines[0].text}
                        {lines[1].text}
                        {lines[2].text}
                        {lines[3].text}
                        {lines[4].text}
                        {lines[5].text}
                    </tbody>
                </table>
            </div>
        )
    }
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const setToGood = newValue => {
        setGood(newValue)
    }

    const setToNeutral = newValue => {
        setNeutral(newValue)
    }

    const setToBad = newValue => {
        setBad(newValue)
    }

    const total = bad + good + neutral
    const positivesfrom = good * 100 / total

    return (
        <div>
            <Header text={'Anna palautetta'} />
            <Button handleClick={() => setToGood(good + 1)} text='Hyvä palaute' />
            <Button handleClick={() => setToNeutral(neutral + 1)} text='Neutraali palaute' />
            <Button handleClick={() => setToBad(bad + 1)} text='Huono palaute' />
            <Header text={'Statistiikkaa'} />
            <Statistics positivesfrom={positivesfrom} total={total} good={good} neutral={neutral} bad={bad} />

        </div>

    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)