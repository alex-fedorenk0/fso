import { useState, useEffect } from "react";
import { Filter } from "./components/Filter";
import { Form } from "./components/Form";
import { Persons } from "./components/Persons";
import phonebookService from './services/phonebook'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')

    useEffect(() => {
        phonebookService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])

    const addPerson = (event) => {
        event.preventDefault()
        if (persons.find(person => person.name === newName)) {
            window.alert(`${newName} is already added to phonebook`)
        } else {
            const personObject = {
                name: newName,
                number: newNumber,
                id: persons.length + 1,
            }
            phonebookService
                .create(personObject)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setNewName('')
                    setNewNumber('')
                })
        }
    }

    const deletePerson = (id, name) => {
        if (window.confirm(`Delete ${name}?`)) {
            phonebookService
                .remove(id)
                .then(() => {
                    setPersons(persons.filter(person => person.id !== id))
                })
        }
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
    }

    const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter value={newFilter} onChange={handleFilterChange}/>
            <h2>add a new</h2>
            <Form onSubmit={addPerson} 
                newName={newName} 
                handleNameChange={handleNameChange}
                newNumber={newNumber}
                handleNumberChange={handleNumberChange}/>
            <h2>Numbers</h2>
            <Persons persons={personsToShow} deletePerson={deletePerson}/>
        </div>
    )
}

export default App