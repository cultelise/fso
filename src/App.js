import './App.css';
import { useState } from 'react';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import { useEffect } from 'react';
import Filter from './components/Filter';
import Notes from './components/Notes';
import personService from './services/persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [errorMessage, setErrorMessage] = useState();
  const [classNames, setClassNames] = useState('hide');

  useEffect(() => {
    const getInitialPersons = async () => {
      const initialPersons = await personService.getAll();
      setPersons(initialPersons);
    };
    getInitialPersons();
  }, []);

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

  const getFilteredEntries = () => {
    return persons.filter((x) =>
      x.name.toLowerCase().includes(newFilter.toLowerCase())
    );
  };

  const addPerson = async (event) => {
    event.preventDefault();
    if (persons.find((object) => object.name === newName)) {
      if (
        window.confirm(
          `${newName} is already in the phonebook! Replace the old number with a new one?`
        )
      ) {
        const person = persons.find((object) => object.name === newName);
        const newPersonNumber = {
          ...person,
          phone: newNumber,
        };
        const updatedPerson = await personService.update(
          person.id,
          newPersonNumber
        );
        setPersons(
          persons.map((person) =>
            person.name !== newName ? person : updatedPerson
          )
        );
        setNewName('');
        setNewNumber('');
      }
      setClassNames('success show');
      setErrorMessage(`${newName} added.`);
      setTimeout(() => {
        setErrorMessage('');
        setClassNames('hide');
      }, 3000);
    } else {
      const newPersonObject = {
        name: newName,
        phone: newNumber,
      };
      const returnedPerson = await personService.create(newPersonObject);
      setPersons(persons.concat(returnedPerson));
      setNewName('');
      setNewNumber('');
      setClassNames('success show');
      setErrorMessage(`${newName} added.`);
      setTimeout(() => {
        setErrorMessage('');
        setClassNames('hide');
      }, 3000);
    }
  };

  const deletePerson = async (event) => {
    const person = persons.find((p) => {
      return p.id.toString() === event.target.id;
    });
    try {
      if (window.confirm(`Delete ${person.name}?`)) {
        personService.remove(event.target.id);
        const modifiedPersons = await personService.getAll();
        setPersons(modifiedPersons);
        setClassNames('error show');
        setErrorMessage(`${person.name} deleted.`);
        setTimeout(() => {
          setErrorMessage('');
          setClassNames('hide');
        }, 3000);
      }
    } catch (error) {
      setErrorMessage('Person already deleted');
    }
  };

  const handleKeyDown = (event) => {
    console.log(event.target);
    if (event.key === 'enter') addPerson();
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter
        persons={persons}
        newFilter={newFilter}
        getNewFilter={getNewFilter}
      />
      <h2>Add Person</h2>
      <Notification classNames={classNames} message={errorMessage} />
      <PersonForm
        newName={newName}
        getNewName={getNewName}
        newNumber={newNumber}
        getNewNumber={getNewNumber}
        addPerson={addPerson}
        handleKeyDown={handleKeyDown}
      />
      <h2>Numbers</h2>
      <Persons
        persons={getFilteredEntries()}
        onClick={(event) => deletePerson(event)}
      />
      <h1>Notes</h1>
      <Notes />
    </div>
  );
};

export default App;
