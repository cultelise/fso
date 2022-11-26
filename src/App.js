import "./App.css";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Filter from "./components/Filter";
import Countries from "./components/Countries";
import DisplayCountry from "./components/DisplayCountry";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newFilter, setNewFilter] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const getNewFilter = (event) => {
    setNewFilter(event.target.value);
    setFilteredCountries(
      countries.filter((x) =>
        x.name.common.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
    getFilteredEntries(event.target.value);
  };

  const getFilteredEntries = () => {
    if (newFilter === "") {
      return [];
    } else {
      if (filteredCountries.length > 10) {
        return [{ name: { common: "Be More Specific!" } }];
      } else if (filteredCountries.length === 1) {
        displayCountry();
        return [];
      } else return filteredCountries;
    }
  };

  const displayCountry = () => {
    const country = filteredCountries[0]
    if (filteredCountries.length === 1) {
      const img = country.flags.svg;
      const langs= []
      for (let language in country.languages) {
        langs.push(language)
      }
      return (
        <div>
          <h2>{country.name.common}</h2>
          <p>Capital: {country.capital[0]}</p>
          <p>Area: {country.area}</p>
          <h4>Languages:</h4>
          <ul> 
            {langs.map(x => <li>{country.languages[x]}</li>)}
          </ul>
          <img alt='country flag' src={img}></img>  
        </div>
      );
    } else return "";
  };

  return (
    <div>
      <Filter label={"countries"} value={newFilter} onChange={getNewFilter} />
      <Countries countries={getFilteredEntries()} />
      <DisplayCountry
        className="display-country"
        displayCountry={displayCountry()}
      />
    </div>
  );
};

export default App;
