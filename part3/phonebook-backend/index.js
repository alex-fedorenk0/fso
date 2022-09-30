require('dotenv').config()

const Person = require('./models/person')

const express = require('express')
const app = express()

app.use(express.static('build'))
app.use(express.json())

const cors = require('cors')
app.use(cors())

const morgan = require('morgan')
const { response } = require('express')
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

// get all entries
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

// info page
app.get('/info', (request, response) => {
  response.setHeader('Content-Type', 'text/html; charset=utf-8');
  response.write(`<p>Phonebook has info for ${persons.length} people</p>`)
  response.write(`<p>${request.getTimestamp}</p>`)
  response.end()
})

// get person info by id
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      response.json(person)
    })
    .catch(error => next(error))
})

// update entry
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

// delete record
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

// new record
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

// unknown endpoint middleware
const unknownEndpoint = (request, response,next) => {
  response.status(404).send({error: 'unknown endpoint'})
}
app.use(unknownEndpoint)

// error handler middleware
const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({error: 'malformatted id'})
  }
  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})