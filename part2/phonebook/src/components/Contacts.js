import React from "react";

const Contact = ({ name, number }) => {
  return (
    <p>
      {name} {number}
    </p>
  );
};

const Contacts = ({ persons, filteredName }) => {
  return persons
    .filter((person) => person.name.toLowerCase().includes(filteredName))
    .map((person, i) => (
      <Contact key={i} name={person.name} number={person.number} />
    ));
};

export default Contacts;
