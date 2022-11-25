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
    getFilteredEntries();
  };

  const getFilteredEntries = (event) => {
    return countries.filter((x) => {
    console.log(x.name.common.toLowerCase())
     return x.name.common.toLowerCase().includes(newFilter.toLowerCase())
    }
    );
  };

  return (
    <div>
      <Filter label={'countries'} onChange={getNewFilter}/>
      <Countries countries={countries} />
    </div>
  )
};

export default App;
