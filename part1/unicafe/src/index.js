import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
      return <button onClick={props.handleClick}>
        {props.text}
      </button>
}

const Statistic = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
      <td>{props.unit}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  let total = good + neutral + bad
  let average = ((good - bad) / total).toFixed(1)
  let positive = (good / total * 100.0).toFixed(1)
  return (
    <div>
      <h2>statistics</h2>
      {total === 0 ? 
      <p>No feedback given</p> 
      :
      <table>
        <tbody>
      <Statistic text="good" value={good} unit=""/>
      <Statistic text="neutral" value={neutral} unit=""/>
      <Statistic text="bad" value={bad} unit=""/>
      <Statistic text="all" value={total} unit=""/>
      <Statistic text="average" value={average} unit=""/>
      <Statistic text="positive" value={positive} unit="%"/>
        </tbody>
      </table>
      }
    </div>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad"/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)