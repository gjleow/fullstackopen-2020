import React from 'react'

const Header = ({ name }) => {
  return <h2>{name}</h2>
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => <Part key={part.id} name={part.name} exercises={part.exercises}/>)}
      <Total total={parts.reduce((a, b) => a + b.exercises, 0)}/>
    </div>
  )
}

const Total = ({total}) => {
  return (
    <h3>Total of {total} exercises</h3>
  )
}

const Part = ({name, exercises}) => {
  return (
    <p>
      {name} {exercises}
    </p>    
  )
}

const Course = ({ course }) => {
  return (
    <>
    <Header name={course.name}/>
    <Content parts={course.parts}/>
    </>
  )
}


export default Course