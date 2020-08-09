import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content part1={
        {
          part: part1,
          exercises: exercises1,
        }} 
        part2 = {{
          part: part2,
          exercises: exercises2,
        }}
        part3 = {{
          part: part3,
          exercises: exercises3,
        }}
       />
      <Total total={exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

const Header = ({course}) => {
  return (
    <h1>
      {course}
    </h1>
  )
}

const Content = ({part1, part2, part3}) => {
  return (
    <>
    <p>{part1.part} {part1.exercises}</p>
    <p>{part2.part} {part2.exercises}</p>
    <p>{part3.part} {part3.exercises}</p>
    </>
  )
}

const Total = ({total}) => {
  return <p>Number of exercises {total}</p>
}

ReactDOM.render(<App />, document.getElementById('root'))