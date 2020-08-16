import React, { useState, useEffect } from "react";
import Contacts from "./components/Contacts";
import Filter from "./components/Filter";
import ContactForm from "./components/ContactForm";
import Notification from "./components/Notification";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredName, setfilteredName] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  const addName = (event) => {
    event.preventDefault();
    if (persons.map((p) => p.name).indexOf(newName) === -1) {
      const newContact = {
        name: newName,
        number: newNumber,
      };
      personService.create(newContact).then((returnContact) => {
        setPersons(persons.concat(returnContact));
        setNewName("");
        setNewNumber("");
        setMessage(returnContact.name);
        setTimeout(() => {
          setMessage(null);
        }, 1000);
      });
    } else {
      const existingContact = persons.find((person) => person.name === newName);
      if (existingContact.number === newNumber) {
        window.alert(`${newName} is already added to phonebook`);
      } else {
        if (
          window.confirm(
            `${newName} is already added to phonebook, replace the old number with a new one?`
          )
        ) {
          const changedContact = { ...existingContact, number: newNumber };
          personService
            .update(changedContact.id, changedContact)
            .then((returnContact) => {
              setPersons(
                persons.map((person) =>
                  person.id !== returnContact.id ? person : returnContact
                )
              );
              setNewName("");
              setNewNumber("");
            });
        }
      }
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

  const handleOnDelete = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService.deletePerson(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
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
      <Contacts
        persons={persons}
        filteredName={filteredName}
        handleOnDelete={handleOnDelete}
      />
    </div>
  );
};

export default App;
