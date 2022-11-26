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
    if (newFilter === "") {
      return []
    } else {
      if (
        countries.filter((x)=>x.name.common.toLowerCase().includes(newFilter.toLowerCase())).length >
        10
      ) {
        console.log(countries)
        return [{name: {common: "Be More Specific!"}}];
      } else return countries.filter((x)=>x.name.common.toLowerCase().includes(newFilter.toLowerCase()))
  };}

  return (
    <div>
      <Filter label={"countries"} value={newFilter} onChange={getNewFilter} />
      <Countries countries={getFilteredEntries()} />
    </div>
  );
};

export default App;
