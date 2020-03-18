import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
    return (
        <div>
            <button onClick={props.handleClick}>
                {props.text}
    </button>
        </div>
    )
}

const ShowRandom = (props) => {
    return (
        <div>
        {props.text}
        <br/>
        Has {props.points} pts
        </div>
    )
}

const AnecdotePoints = (props) => {
    if(props.max ===0) {
        return (
            <div>
                not yet
            </div>
        )
    } else {
        return (
            <div>
            {props.most}
            <br/>
                Has {props.max} pts
        </div>
        )
    }
}

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [points, setPoints] = useState(Array(6).fill(0))
    const [most, setMost] = useState("")


    const select = () => {
        setSelected(Math.floor(Math.random() * 6))
    }

    const vote = () => {
        let arr = [...points]
        arr[selected]+=1
        setPoints(arr)
        setMost(props.anecdotes[points.indexOf(Math.max(...points))])
    }

    return (
        <div>
        <h2>
            Anecdote of the day
        </h2>
        <Button handleClick={select} text = "random anecdote"/>
        <Button handleClick={vote} text = "vote" />
        <ShowRandom points = {points[selected]} text = {props.anecdotes[selected]} />
            
            <h2>
                Anecdote with most votes
            </h2>
            <AnecdotePoints most = {most} max = {Math.max(...points)}/>
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)