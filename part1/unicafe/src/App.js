import { useState } from 'react'

const Button = ({ clickHandle, text }) => {
  return (
    <button onClick={clickHandle}>{text}</button>
  )
}

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>

  )
}

const Statistics = ({ good, neutral, bad }) => {
  const total = () => good + bad + neutral
  const average = () => (good - bad) / total()
  const positive = () => good / total() * 100
  
  if (total() === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  
  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticsLine text='good' value={good}/>
          <StatisticsLine text='neutral' value={neutral}/>
          <StatisticsLine text='bad' value={bad}/>
          <StatisticsLine text='all' value={total()}/>
          <StatisticsLine text='average' value={average()}/>
          <StatisticsLine text='positive' value={positive()+'%'}/> 
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button clickHandle={handleGoodClick} text='good'/>
      <Button clickHandle={handleNeutralClick} text='neutral'/>
      <Button clickHandle={handleBadClick} text='bad'/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App