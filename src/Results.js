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
      <div className='half-circle-container'>
        <div className='half-circle'>
          <h1>Your Values, Ranked</h1>
        </div>
      </div>
      <div className='container'>
        <div className='results-container'>
          <ul className="result-list">
            {rankedQuestions.map((item, index) => (
              <li key={index} className="result-item">
                <span className="result-text">{index + 1}. {item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className='button-container'>
          <button className='page-button' onClick={handleReturnToRound3}><Link to='/round3'>Return to Round 3</Link></button>
          <button className='page-button'><Link to='/round1'>Return to Round 1</Link></button>
        </div>
      </div>
    </div>
  )
}

export default Results
