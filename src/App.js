import "./App.css";
import { useState } from "react";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";
import { useEffect } from "react";
import Filter from "./components/Filter";

const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
  }, [])

  useEffect(() => {
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        setNotes(response.data)
      })
  }, [])
  

  const getNewName = (event) => {
    setNewName(event.target.value);
  };

  const getNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const getNewFilter = (event) => {
    setNewFilter(event.target.value);
    getFilteredEntries();
  };

  const getFilteredEntries = (event) => {
    return persons.filter((x) =>
      x.name.toLowerCase().includes(newFilter.toLowerCase())
    );
  };

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.find((object) => object.name === newName)) {
      return alert(`${newName} is already in the phonebook!`);
    }
    setPersons(
      persons.concat({
        name: newName,
        id: persons.length + 1,
        number: newNumber,
      })
    );
    setNewName("");
    setNewNumber("");
  };

  const handleKeyDown = (event) => {
    console.log(event.target);
    if (event.key === "enter") addPerson();
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter persons={persons} newFilter={newFilter} getNewFilter={getNewFilter} />
      <h2>Add New</h2>
      <PersonForm newName={newName} getNewName={getNewName}
      newNumber={newNumber} getNewNumber={getNewNumber}
      addPerson={addPerson} handleKeyDown={handleKeyDown}
      />
      <h2>Numbers</h2>
      <Persons persons={getFilteredEntries()} />
      <p>{props.notes}</p>
    </div>
  );
};

export default App;
