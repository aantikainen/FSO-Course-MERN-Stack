import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (<div>
        <h1>
            {props.course.name}
        </h1>

    </div>)
}

const Content = (props) => {
    var content = props.course.parts
    return (
    <div>
        <ul>
            {content.map(content =>
            <li key={content.id}>
                {content.name}  {content.exercises}
            </li>)}
        </ul>
    </div>)
}

const Total = (props) => {
    var parts = props.course.parts.map(course => course.exercises)
    return (
        <p>yhteensä {parts.reduce((s, p) => s + p)} tehtävää</p>
    )
}

const Course = (props) => {
    return (
        <div>
            <Header course={props.course} />
            <Content course={props.course} />
            <Total course={props.course} />
        </div>
    )
}

const App = () => {
    const course = {
        name: 'Half Stack application development',
        id: 1,
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10,
                id: 1
            },
            {
                name: 'Using props to pass data',
                exercises: 7,
                id: 2
            },
            {
                name: 'State of a component',
                exercises: 14,
                id: 3
            }
        ]
    }

    return (
        <div>
            <Course course={course} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))