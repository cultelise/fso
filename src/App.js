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
  const [button, setButton] = useState(false)
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const getNewFilter = (event) => {
    setButton(false)
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

  const displayCountry = (para = selected) => {
    const country = filteredCountries[para]
    if (filteredCountries.length === 1 || button) {
      const img = country.flags.svg;
      const langs= []
      for (let language in country.languages) {
        langs.push(language)
      }
      return (
        <div>
          <h2>{country.name.common}</h2>
          <p>Capital: {country.capital[0]}</p>
          <p>Area: {country.area} </p>
          <h4>Languages:</h4>
          <ul> 
            {langs.map(x => <li key={country.languages[x]}>{country.languages[x]}</li>)}
          </ul>
          <img alt='country flag' src={img}></img>  
        </div>
      );
    } else return "";
  };

  const showCountry = (event) => {
    setButton(true)
    setSelected(event.target.id)
  }

  return (
    <div>
      <Filter label={"countries"} value={newFilter} onChange={getNewFilter} />
      <Countries countries={getFilteredEntries()} onClick={(event) => showCountry(event)}/>
      <DisplayCountry
        className="display-country"
        displayCountry={displayCountry()}
      />
    </div>
  );
};

export default App;
