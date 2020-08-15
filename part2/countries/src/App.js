import React, { useState, useEffect } from "react";
import Search from "./components/Search";
import Countries from "./components/Countries";
import axios from "axios";

function App() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setFilteredCountries(
      countries.filter((country) =>
        country.name.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };

  return (
    <div className="App">
      <Search value={search} onChange={handleSearchChange} />
      <Countries filteredCountries={filteredCountries} />
    </div>
  );
}

export default App;
