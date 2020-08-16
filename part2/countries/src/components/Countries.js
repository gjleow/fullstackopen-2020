import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ weather }) => {
  return (
    <>
      <h3>Weather in {weather.location.name}</h3>
      <p>
        <b>temperature: </b>
        {weather.current.temperature} Celsius
      </p>
      {weather.current.weather_icons.length > 0 && (
        <img src={weather.current.weather_icons[0]} alt="weather icon"></img>
      )}
      <p>
        <b>wind: </b>
        {weather.current.wind_speed} km/h direction {weather.current.wind_dir}
      </p>
    </>
  );
};

const Country = ({ country }) => {
  const countryFlag = `${country.name} flag`;
  const api_key = process.env.REACT_APP_API_KEY;
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get("http://api.weatherstack.com/current", {
        params: {
          access_key: api_key,
          query: country.capital,
        },
      })
      .then((response) => {
        setWeather(response.data);
      });
  }, [api_key, country.capital]);

  return (
    <>
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>Spoken Languages</h3>
      <ul>
        {country.languages.map((language, index) => (
          <li key={index}>{language.name}</li>
        ))}
      </ul>
      <img src={country.flag} alt={countryFlag} width="300"></img>
      {weather && <Weather weather={weather} />}
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
