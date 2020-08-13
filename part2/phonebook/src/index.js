import React, { useState } from 'react'
import ReactDOM from 'react-dom';
import Contact from './components/Contact'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setfilterName ] = useState('')

  const addName = (event) => {
    event.preventDefault()
    if (persons.map(p => p.name).indexOf(newName) === -1) {
      setPersons(persons.concat({ name: newName, number: newNumber}))
      setNewName('')
      setNewNumber('')
    } else {
      window.alert(`${newName} is already added to phonebook`) 
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setfilterName(event.target.value.toLowerCase())
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <div>
          filter shown with: <input
            value={filterName}
            onChange={handleFilterChange} />
        </div>
      <h2>add a new</h2>
      <form>
        <div>
          name: <input
            value={newName}
            onChange={handleNameChange} />
        </div>
        <div>number: <input 
            value={newNumber}
            onChange={handleNumberChange}/></div>
        <div>
          <button type="submit" onClick={addName}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        persons.filter(person => person.name.toLowerCase().includes(filterName)).map((person, i) => (
        <Contact 
        key={i} name={person.name} number={person.number}
        />)
        )
      }
    </div>
  )
}

export default App

ReactDOM.render(<App />, document.getElementById('root'))