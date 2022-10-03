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
  Person.find({}).then(persons => {
    response.setHeader('Content-Type', 'text/html; charset=utf-8');
    response.write(`<p>Phonebook has info for ${persons.length} people</p>`)
    response.write(`<p>${request.getTimestamp}</p>`)
    response.end()
  })  
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
app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
    )
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
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
app.post('/api/persons', (request, response, next) => {
  const body = request.body

  const newPerson = new Person ({
    name: body.name,
    number: body.number,
  })

  newPerson.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
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
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({error: error.message})
  }
  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})