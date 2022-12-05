import './App.css';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import personService from './services/persons';
import login from './services/login';
import Notification from './components/Notification';
import noteService from './services/notes';
import LoginForm from './components/Login';
import Togglable from './components/Togglable';
import NoteForm from './components/NoteForm';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [errorMessage, setErrorMessage] = useState();
  const [errorClass, setErrorClass] = useState('hide');
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
          setErrorClass('success show');
          setErrorMessage(`${newName} updated.`);
          setTimeout(() => {
            setErrorMessage('');
            setErrorClass('hide');
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
        setErrorClass('success show');
        setErrorMessage(`${newName} added.`);
        setTimeout(() => {
          setErrorMessage('');
          setErrorClass('hide');
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
        setErrorClass('error show');
        setErrorMessage(`${person.name} deleted.`);
        setTimeout(() => {
          setErrorMessage('');
          setErrorClass('hide');
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
      if (user) {
        setErrorClass('show success');
        setErrorMessage('Login Successful');
        setTimeout(() => {
          setErrorClass('hide');
          setErrorMessage('');
        }, 3000);
      }
    } catch (error) {
      setErrorClass('show error');
      setErrorMessage('Wrong Credentials');
      setTimeout(() => {
        setErrorClass('hide');
        setErrorMessage('');
      }, 3000);
    }
  };

 

  const logOut = () => {
    window.localStorage.clear()
    setUser(null)
    setErrorClass('success show')
    setErrorMessage('Successfully Logged Out')
    setTimeout(() => {
      setErrorClass('hide');
      setErrorMessage('');
    }, 3000);
  }

  const loginForm = () => {
    return (
        <div>
          <Togglable buttonLabel='Login' >
            <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ value }) => setUsername(value)}
            handlePasswordChange={({ value }) => setPassword(value)}
            handleLogin={handleLogin}
              />
          </Togglable>
          <Notification className={errorClass} message={errorMessage} />
        </div>
    )
  };

  const noteForm = () => {
    return (
      <div>
         <p>{user.name} is logged in
          <button onClick={logOut}>log out</button></p>
          <Notification className={errorClass} message={errorMessage} />
          <NoteForm />
       </div>
    )
  };



  return (
    <div>
      { user === null
      ? loginForm()
      : noteForm()
      }
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
