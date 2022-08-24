import { useState } from "react";

const Person = ({person}) => {
    return (
        <div>{person.name}</div>
    )
}

const App = () => {
    const [persons, setPerson] = useState([])
    const [newName, setNewName] = useState('')

    const addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName,
            number: '',
            id: persons.length + 1,
        }
        setPerson(persons.concat(personObject))
        setNewName('')
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={ addPerson }>
                <div>
                    name: <input value={newName} onChange={handleNameChange}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {persons.map(person => <Person key={person.id} person={person}/>)}
        </div>
    )
}

export default App