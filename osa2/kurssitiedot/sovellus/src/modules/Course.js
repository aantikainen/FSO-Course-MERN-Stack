import React from 'react'

const Header = (props) => {
    return (<div>
        <h3>
            {props.course.name}
        </h3>

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

export default Course