import './App.css';
import { useState } from 'react';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import { useEffect } from 'react';
import Filter from './components/Filter';
import Notes from './components/Notes';
import personService from './services/persons';
import login from './services/login';
import Notification from './components/Notification';
import noteService from './services/notes';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [errorMessage, setErrorMessage] = useState();
  const [classNames, setClassNames] = useState('hide');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getInitialPersons = async () => {
      const initialPersons = await personService.getAll();
      setPersons(initialPersons);
    };
    getInitialPersons();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
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

  const getFilteredEntries = () => {
    return persons.filter((x) =>
      x.name.toLowerCase().includes(newFilter.toLowerCase())
    );
  };

  const addPerson = async (event) => {
    try {
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
          setClassNames('success show');
          setErrorMessage(`${newName} updated.`);
          setTimeout(() => {
            setErrorMessage('');
            setClassNames('hide');
          }, 3000);
        }
      } else {
        const newPersonObject = {
          name: newName,
          phone: newNumber,
        };
        const returnedPerson = await personService.create(newPersonObject);
        console.log(returnedPerson);
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
    } catch (error) {
      console.log(error.message);
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

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await login({ username, password });
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      noteService.setToken(user.token)
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (error) {
      setClassNames('error show');
      setErrorMessage('Wrong Credentials');
      setTimeout(() => {
        setClassNames('hide');
        setErrorMessage('');
      }, 3000);
    }
  };

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <div>
          username
          <input
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    );
  };

  const noteForm = () => {
    return (
      <div>
        <h1>Notes</h1>
        <Notes />
      </div>
    );
  };

  const logOut = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  return (
    <div>
      {
      user === null 
      ? loginForm()
      : <div>
        <p>{user.name} is logged in
        <button onClick={logOut}>log out</button></p>
        {noteForm()}
        </div>
        }

      <Notification classNames={classNames} message={errorMessage} />

      <h1>Phonebook</h1>
      <Filter
        persons={persons}
        newFilter={newFilter}
        getNewFilter={getNewFilter}
      />
      <h2>Add Person</h2>
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
    </div>
  );
};

export default App;
