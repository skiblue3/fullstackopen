import React, { useState } from 'react'

const Button = (props) => {
  return (
    <>
      <button onClick={props.handleClick}>
        {props.text}
      </button>
    </>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({array}) => {
  let good, neutral, bad

  [good, neutral, bad] = array

  if (array.join('') === '000') {
    return (
      <div>
        <h1>statistics</h1>

        No feedback given
      </div>
    )
  }

  let total = good + neutral + bad
  let average = ((good * 1) + (neutral * 0) + (bad * -1)) / total
  average = Math.round(average * 10) / 10
  let positive = (good / total) * 100
  positive = positive.toFixed(1)

  return (
    <div>
      <h1>statistics</h1>

      <table>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={total} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive + ' %'} />
      </table>

    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>

      <Button text="good" handleClick= {() => setGood(good + 1)} />
      <Button text="neutral" handleClick= {() => setNeutral(neutral + 1)} />
      <Button text="bad" handleClick= {() => setBad(bad + 1)} />

      <Statistics array={[good, neutral, bad]} />

    </div>
  )
}

export default App