import "./App.css";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Filter from "./components/Filter";
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const getNewFilter = (event) => {
    setNewFilter(event.target.value);
    getFilteredEntries(event.target.value);
  };

  const getFilteredEntries = () => {
    const filteredCountries = countries.filter((x) =>
      x.name.common.toLowerCase().includes(newFilter.toLowerCase())
    );
    if (newFilter === "") {
      return [];
    } else {
      if (filteredCountries.length > 10) {
        return [{ name: { common: "Be More Specific!" } }];
      } else if (filteredCountries.length === 1) {
        displayCountry();
        return filteredCountries;
      } else return filteredCountries;
    }
  };

  const displayCountry = () => {};

  return (
    <div>
      <Filter label={"countries"} value={newFilter} onChange={getNewFilter} />
      <Countries countries={getFilteredEntries()} />
    </div>
  );
};

export default App;
