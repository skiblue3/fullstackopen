import React, { useEffect, useState } from 'react'
import contactService from './services/persons'

const Notification = ({message, error}) => {

  const notificationStyle =  {
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: (error) ? 'red' : 'green'
  }
  

  if(message === null) {
    return null
  }

  if(error) {

  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

// to display single contact details
const Contact = ({person, handleDelete}) => {
  return (
    <div> 
      {person.name} {person.number} <button value={person.id} onClick={() => handleDelete(person)}>Delete</button>
    </div>
  )
}

// to manage search filter
const Filter = ({search, handleSearch}) => {
  return (
    <div>
      filter shown with <input value={search} onChange={handleSearch} />
    </div>
  )
}

// to add new contact to contacts
const PersonForm = ({values}) => {
  const [addContact, newName, handleNameChange, newNumber, handleNumberChange] = values

  return (
    <div>
      <form onSubmit={addContact}>
        <div>name: <input value={newName} onChange={handleNameChange} /></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div><button type="submit" >add</button>
        </div>
      </form> 
    </div>
  )
}

// to display every contacts
const Persons = ({searchPerson, handleDelete}) => {
  return (
    <div>
      {searchPerson.map(person => 
          <Contact key={person.name} person={person} handleDelete={handleDelete}/> )
      }
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState(null) 
  const [ error, setError ] = useState(true)

  // to get All contacts from server
  useEffect(() => {
    contactService
      .getAll()
      .then(returnedContacts => {
        console.log('promise fulfilled')
        setPersons(returnedContacts)
      })
  }, [])

  // to filter based on the search box
  const searchPerson = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

  // callback functions to help events
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleDelete = (delContact) => {
    contactService
      .deleteContact(delContact.id)
      .then(() => {
        const changedPersons = persons.filter(person => person.id !== delContact.id)
        setPersons(changedPersons)
      })
      .catch(() => {
        console.log("error occured while deleting element which doesn't exist on server")
        setError(true)
        setErrorMessage(`Information of ${delContact.name} has already been removed from server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setPersons(persons.filter(person => person.id !== delContact.id))
      })
  }

  // manages add contact in every possible way
  const addContact = (event) => {
    event.preventDefault()

    const nameArray = persons.reduce((arr, person) => arr.concat(person.name.toLowerCase()), [])

    if(nameArray.includes(newName.trim().toLowerCase())) {
      // to handle replacing of number

      const confirm = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if(!confirm) {
        return
      }

      const duplicate = persons.find(person => person.name.toLowerCase() === newName.trim().toLowerCase())
      const changedDuplicate = {...duplicate, number: newNumber}
      
      contactService
        .replaceContact(changedDuplicate)  
        .then(returnedContact => {
          setPersons(persons.map(person => (person.id !== returnedContact.id) ? person : returnedContact))
          
          setNewName('')
          setNewNumber('')
          // to handle notification for replaced number
          setError(false)
          setErrorMessage(`Replaced the number of ${returnedContact.name}`)  
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })      
    } 
    else {
      const newContact = {
        name: newName.trim(),
        number: newNumber,
      }
  
      contactService
        .create(newContact)
        .then(returnedContact => {
          setPersons(persons.concat(returnedContact))
          setNewName('')
          setNewNumber('')

          // to handle notification for added contact
          setError(false)
          setErrorMessage(`Added ${returnedContact.name}`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={errorMessage} error={error}/>

      <Filter search={search} handleSearch={event => setSearch(event.target.value)} />

      <h2> add a new </h2>
      <PersonForm values={[addContact, newName, handleNameChange, newNumber, handleNumberChange]} />

      <h2>Numbers</h2>
      <Persons searchPerson={searchPerson} handleDelete={handleDelete}/>
    </div>
  )
}

export default App