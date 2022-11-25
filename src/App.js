import "./App.css";
import { useState } from "react";
import Input from "./components/Input";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", id: 1, number: "123-321-4567" }, { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

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
      <Input
        label={"filter shown with"}
        value={newFilter}
        onChange={getNewFilter}
      />
      <h2>Add New</h2>
      <PersonForm newName={newName} getNewName={getNewName}
      newNumber={newNumber} getNewNumber={getNewNumber}
      addPerson={addPerson} handleKeyDown={handleKeyDown}
      />
      <h2>Numbers</h2>
      <Persons persons={getFilteredEntries()} />
    </div>
  );
};

export default App;
