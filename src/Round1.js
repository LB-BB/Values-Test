import React, { useState, useEffect } from 'react'
import { questions } from './questions'
import { useNavigate } from 'react-router-dom'

const Round1 = () => {
  const navigate = useNavigate()
  const [importance, setImportance] = useState(() => {
    // Initialize the importance state with 'very important' for all questions
    const savedImportance = localStorage.getItem('importance')
    return savedImportance ? JSON.parse(savedImportance) : Array(questions.length).fill('very important')
  })

  useEffect(() => {
    // Save to localStorage whenever importance state changes
    localStorage.setItem('importance', JSON.stringify(importance))
  }, [importance])

  const clear = () => {
    localStorage.clear()
    setImportance(Array(questions.length).fill('very important'))
    localStorage.setItem('importance', JSON.stringify(importance));
    navigate('/')
  }

  const handleImportanceChange = (index, value) => {
    const newImportance = [...importance]
    newImportance[index] = value
    setImportance(newImportance)
    // Save to localStorage
    localStorage.setItem('importance', JSON.stringify(newImportance))
  }

  const handleSubmit = () => {
    const importantQuestions = questions.filter((_, index) => importance[index] === 'very important')
    navigate('/round2', { state: { importantQuestions } })
  }

  return (
    <div>
      <div>
        <div>
          <h1>Round 1: 102 Values</h1>
        </div>
      </div>
      <div>
        <ul>
          {questions.map((question, index) => (
            <li key={index}>
              <span>{`${index +1}: `}{question}</span>
              <div>
                <input
                  type='radio'
                  id={`not-important-${index}`}
                  name={`importance-${index}`}
                  value='not important'
                  checked={importance[index] === 'not important'}
                  onChange={() => handleImportanceChange(index, 'not important')}
                />
                <label htmlFor={`not-important-${index}`}>Not Important</label>
                <input
                  type='radio'
                  id={`somewhat-important-${index}`}
                  name={`importance-${index}`}
                  value='somewhat important'
                  checked={importance[index] === 'somewhat important'}
                  onChange={() => handleImportanceChange(index, 'somewhat important')}
                />
                <label htmlFor={`somewhat-important-${index}`}>Somewhat Important</label>
                <input
                  type='radio'
                  id={`important-${index}`}
                  name={`importance-${index}`}
                  value='important'
                  checked={importance[index] === 'important'}
                  onChange={() => handleImportanceChange(index, 'important')}
                />
                <label htmlFor={`important-${index}`}>Important</label>
                <input
                  type='radio'
                  id={`very-important-${index}`}
                  name={`importance-${index}`}
                  value='very important'
                  checked={importance[index] === 'very important'}
                  onChange={() => handleImportanceChange(index, 'very important')}
                />
                <label htmlFor={`very-important-${index}`}>Very Important</label>
              </div>
            </li>
          ))}
        </ul>
      </div>
        <div>
          <button onClick={clear}>Clear & Restart</button>
          <button onClick={handleSubmit}>Submit & Go to Round 2</button>
        </div>
    </div>
  )
}

export default Round1
