import React, { useState } from 'react'

const Button = ({text, func}) => {
  return (
    <>
        <button onClick={func}>{text}</button>
    </>
  )
}

const DisplayVote = ({vote}) => {
  return (
    <div>
      has {vote} votes
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))     // to fill an array with n zeros i.e. here number is size of anecdotes

  const copy = [...votes]
  const maxVoteIndex = votes.indexOf(Math.max(...votes))

  const handleVote = () => {
    copy[selected] += 1
    setVotes(copy)
  }

  const handleIndex = () => {
    const random = Math.floor(Math.random() * anecdotes.length)
    setSelected(random)
  }

  return (
    <div>
      
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <div>
        <Button text='vote' func={handleVote} />
        <Button text='next anecdote' func={handleIndex} />
        <DisplayVote vote={votes[selected]} />
      </div>  

      <h1>Anecdote with most votes</h1>
      {anecdotes[maxVoteIndex]}
      <DisplayVote vote={votes[maxVoteIndex]} />
      
    </div>
  )
}

export default App
