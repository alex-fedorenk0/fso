require('dotenv').config()

const Person = require('./models/person')

const express = require('express')
const app = express()

app.use(express.static('build'))
app.use(express.json())

const cors = require('cors')
app.use(cors())

const morgan = require('morgan')
morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// let persons = [
//     { 
//       "id": 1,
//       "name": "Arto Hellas", 
//       "number": "040-123456"
//     },
//     { 
//       "id": 2,
//       "name": "Ada Lovelace", 
//       "number": "39-44-5323523"
//     },
//     { 
//       "id": 3,
//       "name": "Dan Abramov", 
//       "number": "12-43-234345"
//     },
//     { 
//       "id": 4,
//       "name": "Mary Poppendieck", 
//       "number": "39-23-6423122"
//     }
// ]

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })  
})

const getTimestamp = (request, response, next) => {
  const timestamp = new Date()
  request.getTimestamp = timestamp.toString()
  next()
}

app.use(getTimestamp)

app.get('/info', (request, response) => {
  response.setHeader('Content-Type', 'text/html; charset=utf-8');
  response.write(`<p>Phonebook has info for ${persons.length} people</p>`)
  response.write(`<p>${request.getTimestamp}</p>`)
  response.end()
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
    .then(person => {
      response.json(person)
    })
    .catch(error => {
      console.log(error)
    })
  // const id = Number(req.params.id)
  // const person = persons.find(person => person.id === id)
  // if (person) {
  //   res.json(person)
  // } else {
  //   res.status(204).end()
  // }
})

app.put('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const body = request.body
  const index = persons.findIndex(person => person.id === id)
  const newPerson = {
    id: body.id,
    name: body.name,
    number: body.number
  }
  persons[index] = newPerson
  response.json(newPerson)
  })

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)
  res.status(204).end()
})

// const generateId = () => {
//   return Math.floor(Math.random() * 10000)
// }

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number missing"
    })
  }
  // if (persons.find(person => person.name === body.name)) {
  //   return res.status(400).json({
  //     error: "name must be unique"
  //   })
  // }

  const newPerson = new Person ({
    name: body.name,
    number: body.number,
  })
  newPerson.save().then(savedPerson => {
    response.json(savedPerson)
  })
})


const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})