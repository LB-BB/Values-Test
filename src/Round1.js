import React, { useState, useEffect } from 'react'
import { questions } from './questions'
import { useNavigate } from 'react-router-dom'
import './styles.css'

const Round1 = () => {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(0)
  const questionsPerPage = 8 // Number of questions per page
  const totalPages = Math.ceil(questions.length / questionsPerPage)
  const [importance, setImportance] = useState(() => {
    // Initialize the importance state with 'not important' for all questions
    const savedImportance = localStorage.getItem('importance')
    return savedImportance ? JSON.parse(savedImportance) : Array(questions.length).fill('not important')
  })

  useEffect(() => {
    // Save to localStorage whenever importance state changes
    localStorage.setItem('importance', JSON.stringify(importance))
  }, [importance])

  const clear = () => {
    localStorage.clear()
    const newImportance = Array(questions.length).fill('not important')
    setImportance(newImportance)
    localStorage.setItem('importance', JSON.stringify(newImportance))
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

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  const startIndex = currentPage * questionsPerPage
  const currentQuestions = questions.slice(startIndex, startIndex + questionsPerPage)

  return (
    <div className='container'>
      <div className='page-title-container'>
        <h1 className='page-title'>Round 1: 102 Values</h1>
        <h3>Rank these values from "Not Important" to "Very Important".</h3>
        <h4>Page {currentPage + 1} of {totalPages}</h4>
      </div>
      <div>
        <ul>
          {currentQuestions.map((question, index) => (
            <li key={startIndex + index} className='question-container'>
              <span className='question-text'>{`${startIndex + index + 1}. `}{question}</span>
              <div className='radio-buttons'>
                <input
                  type='radio'
                  id={`not-important-${startIndex + index}`}
                  name={`importance-${startIndex + index}`}
                  value='not important'
                  checked={importance[startIndex + index] === 'not important'}
                  onChange={() => handleImportanceChange(startIndex + index, 'not important')}
                />
                <label htmlFor={`not-important-${startIndex + index}`}>Not Important</label>
                <input
                  type='radio'
                  id={`somewhat-important-${startIndex + index}`}
                  name={`importance-${startIndex + index}`}
                  value='somewhat important'
                  checked={importance[startIndex + index] === 'somewhat important'}
                  onChange={() => handleImportanceChange(startIndex + index, 'somewhat important')}
                />
                <label htmlFor={`somewhat-important-${startIndex + index}`}>Somewhat Important</label>
                <input
                  type='radio'
                  id={`important-${startIndex + index}`}
                  name={`importance-${startIndex + index}`}
                  value='important'
                  checked={importance[startIndex + index] === 'important'}
                  onChange={() => handleImportanceChange(startIndex + index, 'important')}
                />
                <label htmlFor={`important-${startIndex + index}`}>Important</label>
                <input
                  type='radio'
                  id={`very-important-${startIndex + index}`}
                  name={`importance-${startIndex + index}`}
                  value='very important'
                  checked={importance[startIndex + index] === 'very important'}
                  onChange={() => handleImportanceChange(startIndex + index, 'very important')}
                />
                <label htmlFor={`very-important-${startIndex + index}`}>Very Important</label>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className='button-container'>
        <div className='clear-button-container'>
          <button className='page-button' onClick={clear}>Clear & Restart</button>
        </div>
        <div className='nav-button-container'>
        {currentPage > 0 && (
            <button className='page-button' onClick={handlePreviousPage} disabled={currentPage === 0}>Previous</button>
          )}
          {currentPage < totalPages - 1 && (
            <button className='page-button' onClick={handleNextPage} disabled={currentPage === totalPages - 1}>Next</button>
          )}
          {currentPage === totalPages - 1 && (
            <button className='page-button' onClick={handleSubmit}>Submit & Go to Round 2</button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Round1
