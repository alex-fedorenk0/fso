const { request, response } = require('express')
const express = require('express')

const app = express()

app.use(express.json())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

const getTimestamp = (request, response, next) => {
  const timestamp = new Date()
  console.log(timestamp)
  console.log(timestamp.toString())
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

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    res.json(person)
  } else {
    res.status(204).end()
  }
})

app.get('/', (request, response) => {
    response.send('<h1>Hello</h1>')
})

const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})