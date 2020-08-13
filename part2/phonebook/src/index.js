import React, { useState } from 'react'
import ReactDOM from 'react-dom';
import Contact from './components/Contact'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addName = (event) => {
    event.preventDefault()
    if (persons.map(p => p.name).indexOf(newName) === -1) {
      setPersons(persons.concat({ name: newName }))
      setNewName('')
    } else {
      window.alert(`${newName} is already added to phonebook`) 
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input
            value={newName}
            onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit" onClick={addName}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        persons.map((person, i) => <Contact key={i} name={person.name}/>)
      }
    </div>
  )
}

export default App

ReactDOM.render(<App />, document.getElementById('root'))