import React, { useState, useEffect } from "react";
import axios from "axios";
import Contacts from "./components/Contacts";
import Filter from "./components/Filter";
import ContactForm from "./components/ContactForm";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredName, setfilteredName] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const addName = (event) => {
    event.preventDefault();
    if (persons.map((p) => p.name).indexOf(newName) === -1) {
      setPersons(persons.concat({ name: newName, number: newNumber }));
      setNewName("");
      setNewNumber("");
    } else {
      window.alert(`${newName} is already added to phonebook`);
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setfilteredName(event.target.value.toLowerCase());
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filteredName} onChange={handleFilterChange} />
      <h3>add a new</h3>
      <ContactForm
        name={newName}
        handleNumberChange={handleNumberChange}
        number={newNumber}
        handleNameChange={handleNameChange}
        addName={addName}
      />
      <h3>Numbers</h3>
      <Contacts persons={persons} filteredName={filteredName} />
    </div>
  );
};

export default App;
