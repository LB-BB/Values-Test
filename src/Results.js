import React from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'

const Results = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const rankedQuestions = location.state?.rankedQuestions || []

  const handleReturnToRound3 = () => {
    // Navigate back to Round 3 and pass the current rankings state
    navigate('/round3', { state: { mostImportantQuestions: rankedQuestions } })
  }

  return (
    <div>
      <h1>Your Values, Ranked</h1>
      <div>
        <ul>
          {rankedQuestions.map((item, index) => (
            <li key={index}>
              <span>{index + 1}. {item}</span>
            </li>
          ))}
        </ul>
        <div>
          <button onClick={handleReturnToRound3}><Link to='/round3'>Return to Round 3</Link></button>
          <button ><Link to='/round1'>Start from Round 1</Link></button>
        </div>
      </div>
    </div>
  )
}

export default Results
