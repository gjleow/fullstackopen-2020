import React from "react";

const ContactForm = ({
  name,
  number,
  handleNumberChange,
  handleNameChange,
  addName,
}) => {
  return (
    <form>
      <div>
        name: <input value={name} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={number} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit" onClick={addName}>
          add
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
