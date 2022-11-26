import "./App.css";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Filter from "./components/Filter";
import Countries from "./components/Countries";

const App = (props) => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState([])

  useEffect(() => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountries(response.data)
    })
  }, [])

  const getNewFilter = (event) => {
    setNewFilter(event.target.value);
    getFilteredEntries(event.target.value);
  };

  const getFilteredList = (value) => {
    console.log(value)
    setNewFilter(value);
    getFilteredEntries();
  };

  const filteredList = (value) => {
    if (countries === []) return;
    if (countries !== [] && value === undefined) return countries;
    else return getFilteredList(value);
  }

  const getFilteredEntries = () => {
     return countries.filter((x) => {
      return x.name.common.toLowerCase().includes(newFilter.toLowerCase())
      }
    );
  };

  return (
    <div>
      <Filter label={'countries'} value={newFilter} onChange={getNewFilter}/>
      <Countries countries={getFilteredEntries()} />
    </div>
  )
};

export default App;
