import React, { useState } from "react";

const Country = ({ country }) => {
  const countryFlag = `${country.name} flag`;
  return (
    <>
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>languages</h3>
      <ul>
        {country.languages.map((language, index) => (
          <li key={index}>{language.name}</li>
        ))}
      </ul>
      <img src={country.flag} alt={countryFlag} width="300"></img>
    </>
  );
};

const Countries = ({ filteredCountries }) => {
  let numCountry = filteredCountries.length;

  const [showArray, setShowArray] = useState(Array(numCountry).fill(false));
  const handleOnClick = (index) => {
    let newArray = [...showArray];
    newArray[index] = !newArray[index];
    setShowArray(newArray);
  };

  if (numCountry < 10 && numCountry > 0) {
    if (numCountry === 1) {
      return <Country country={filteredCountries[0]} />;
    } else {
      return (
        <ul>
          {filteredCountries.map((country, index) => (
            <li key={index}>
              {country.name}{" "}
              <button onClick={() => handleOnClick(index)} key={index}>
                {showArray[index] ? "hide" : "show"}
              </button>
              {showArray[index] ? <Country country={country} /> : null}
            </li>
          ))}
        </ul>
      );
    }
  } else {
    return <p>Too many matches, specify another filter</p>;
  }
};

export default Countries;
