import React from "react";

const Contact = ({ name, number, handleOnDelete, id }) => {
  return (
    <p>
      {name} {number}
      <button onClick={() => handleOnDelete(id, name)} key={id}>
        delete
      </button>
    </p>
  );
};

const Contacts = ({ persons, filteredName, handleOnDelete }) => {
  return persons
    .filter((person) => person.name.toLowerCase().includes(filteredName))
    .map((person) => (
      <Contact
        key={person.id}
        id={person.id}
        name={person.name}
        number={person.number}
        handleOnDelete={handleOnDelete}
      />
    ));
};

export default Contacts;
