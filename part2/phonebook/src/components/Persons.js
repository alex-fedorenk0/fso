import { Person } from "./Person";

export const Persons = ({ persons }) => {
    return (
        <div>
            {persons.map(person => <Person key={person.id} person={person} />)}
        </div>
    );
};
