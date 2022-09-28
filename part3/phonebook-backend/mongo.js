const mongoose = require('mongoose')

if ((process.argv.length != 3) && (process.argv.length != 5)) {
    console.log('Usage: node mongo.js <password> [<name> <number>]');
    console.log(process.argv.length)
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.qgfuncv.mongodb.net/phonebookApp?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length == 3) {
    mongoose.connect(url)
    Person.find({})
        .then((result) => {
            console.log('Phonebook:')
            result.forEach(person => {
                console.log(`${person.name} ${person.number}`)
            })
            mongoose.connection.close()
    })
} else if (process.argv.length == 5) {
    mongoose
    .connect(url)
    .then((result) => {
            const newPerson = new Person({
                name: process.argv[3],
                number: process.argv[4],
            })
            newPerson.save().then(result => {
                console.log(`added ${newPerson.name} number ${newPerson.number} to phonebook`)
                mongoose.connection.close()
            })
        })
    .catch((err) => console.log(err))
}