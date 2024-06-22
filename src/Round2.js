import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

const Round2 = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const importantQuestions = location.state?.importantQuestions || []
  const savedImportance = location.state?.importance || Array(importantQuestions.length).fill('very important')
  const [importance, setImportance] = useState(savedImportance)
  const [error, setError] = useState('')

  useEffect(() => {
    // Retrieve the importance state for Round 2 if available in localStorage
    const savedImportanceFromStorage = localStorage.getItem('importanceRound2')
    if (savedImportanceFromStorage) {
      setImportance(JSON.parse(savedImportanceFromStorage))
    }
  }, [])

  const handleImportanceChange = (index, value) => {
    const newImportance = [...importance]
    newImportance[index] = value
    setImportance(newImportance)
    // Save to localStorage
    localStorage.setItem('importanceRound2', JSON.stringify(newImportance))
    setError('') // Clear any previous error
  }

  const handleSubmit = () => {
    // Filter most important questions
    const mostImportantQuestions = importantQuestions.filter((_, index) => importance[index] === 'most important')
    if (mostImportantQuestions.length > 10) {
      setError('You can only select up to 10 questions as \'most important\'.')
      return
    }
    // Navigate to Round 3
    navigate('/round3', { state: { mostImportantQuestions } })
  }

  return (
    <div>
      <h1>Round 2</h1>
      <p>Mark the questions as 'very important' or 'most important'. You may select only 10 'most important' questions.</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {importantQuestions.map((question, index) => (
          <li key={index}>
            <span>{`${index +1}. `}{question}</span>
            <div>
              <input
                type='radio'
                id={`very-important-${index}`}
                name={`importance-${index}`}
                value='very important'
                checked={importance[index] === 'very important'}
                onChange={() => handleImportanceChange(index, 'very important')}
              />
              <label htmlFor={`very-important-${index}`}>Very Important</label>
              <input
                type='radio'
                id={`most-important-${index}`}
                name={`importance-${index}`}
                value='most important'
                checked={importance[index] === 'most important'}
                onChange={() => handleImportanceChange(index, 'most important')}
              />
              <label htmlFor={`most-important-${index}`}>Most Important</label>
            </div>
          </li>
        ))}
      </ul>
      <div>
        <button>
        <Link to='/round1'>Return to Round 1</Link>
        </button>
        <button onClick={handleSubmit}>Submit & Go to Round 3</button>
      </div>
    </div>
  )
}

export default Round2

