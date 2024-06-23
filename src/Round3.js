import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

const Round3 = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const mostImportantQuestions = location.state?.mostImportantQuestions || []
  const [rankedQuestions, setRankedQuestions] = useState(mostImportantQuestions)

  const moveUp = (index) => {
    if (index === 0) return; // Already at the top
    const newRankings = [...rankedQuestions];
    [newRankings[index - 1], newRankings[index]] = [newRankings[index], newRankings[index - 1]]
    setRankedQuestions(newRankings)
  }

  const moveDown = (index) => {
    if (index === rankedQuestions.length - 1) return; // Already at the bottom
    const newRankings = [...rankedQuestions];
    [newRankings[index + 1], newRankings[index]] = [newRankings[index], newRankings[index + 1]]
    setRankedQuestions(newRankings)
  }

  const handleSubmit = () => {
    navigate('/results', { state: { rankedQuestions } })
  }

  const handleReturnToRound2 = () => {
    // Navigate back to Round 2 and pass the current rankings state
    navigate('/round2', { state: { importantQuestions: mostImportantQuestions, importance: rankedQuestions } })
  }

  return (
    <div className='container'>
      <div className='page-title-container'>
        <h1 className='page-title'>Round 3</h1>
        <h3>Rank these values from most to least important.</h3>
      </div>
      <ul>
        {rankedQuestions.map((question, index) => (
          <li key={index} className='question-container'>
            <div className='question-content'>
              <span>{question}</span>
            </div>
            <div className='move-buttons'>
              <button onClick={() => moveUp(index)} disabled={index === 0}>▲</button>
              <button onClick={() => moveDown(index)} disabled={index === rankedQuestions.length - 1}>▼</button>
            </div>
          </li>
        ))}
      </ul>
      <div className='button-container'>
        <button className='page-button' onClick={handleReturnToRound2}><Link to='/round2'>Return to Round 2</Link></button>
        <button className='page-button' onClick={handleSubmit}>Submit Rankings</button>
      </div>
    </div>
  )
}

export default Round3
