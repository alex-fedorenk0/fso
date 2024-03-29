import { useState } from 'react'

const Button = ({ clickHandle, text }) => {
  return (
    <button onClick={clickHandle}>{text}</button>
  )
}

const Anecdote = ({text, votes}) => {
  return (
    <div>
      <div>
        {text}
      </div>
      <div>
        has {votes} votes
      </div>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))

  const handleNextAnecdote = () => setSelected(Math.floor(Math.random() * anecdotes.length))
  const handleVote = () => {
    const copyPoints = [...points]
    copyPoints[selected] += 1
    setPoints(copyPoints)
  }

  let maxVoted = points.indexOf(Math.max(...points))

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote text={anecdotes[selected]} votes={points[selected]}/>
      <Button clickHandle={handleVote} text={'vote'}/>
      <Button clickHandle={handleNextAnecdote} text={'next anecdote'}/>
      <h1>Anecdote with most votes</h1>
      <Anecdote text={anecdotes[maxVoted]} votes={points[maxVoted]}/>
    </div>
    )
      
}

export default App