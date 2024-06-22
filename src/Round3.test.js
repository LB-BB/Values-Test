import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Round3 from './Round3'
import Round2 from './Round2'
import Results from './Results'

const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useLocation: () => ({
    state: {
      mostImportantQuestions: ['Question 1', 'Question 2', 'Question 3'],
    },
  }),
}))

describe('Round3 Component', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Round3 />} />
          <Route path='/round2' element={<Round2 />} />
          <Route path='/results' element={<Results />} />
        </Routes>
      </BrowserRouter>
    )
  })

  test('renders the component correctly with initial questions', () => {
    expect(screen.getByText('Round 3')).toBeInTheDocument()
    expect(screen.getByText('Rank the questions from most to least important:')).toBeInTheDocument()
    expect(screen.getByText('Question 1')).toBeInTheDocument()
    expect(screen.getByText('Question 2')).toBeInTheDocument()
    expect(screen.getByText('Question 3')).toBeInTheDocument()
  })

  test('moves a question up in the ranking', () => {
    const moveUpButton = screen.getAllByText('▲')[1] // Button for moving 'Question 2' up
    fireEvent.click(moveUpButton)

    const rankedQuestions = screen.getAllByRole('listitem')
    expect(rankedQuestions[0]).toHaveTextContent('Question 2')
    expect(rankedQuestions[1]).toHaveTextContent('Question 1')
  })

  test('moves a question down in the ranking', () => {
    const moveDownButton = screen.getAllByText('▼')[0] // Button for moving 'Question 1' down
    fireEvent.click(moveDownButton)

    const rankedQuestions = screen.getAllByRole('listitem')
    expect(rankedQuestions[0]).toHaveTextContent('Question 2')
    expect(rankedQuestions[1]).toHaveTextContent('Question 1')
  })

  test('submits the ranked questions and navigates to the results page', () => {
    const submitButton = screen.getByText('Submit Rankings')
    fireEvent.click(submitButton)

    expect(mockNavigate).toHaveBeenCalledWith('/results', {
      state: {
        rankedQuestions: ['Question 1', 'Question 2', 'Question 3'],
      },
    })
  })

  test('returns to Round 2 with the current rankings', () => {
    const returnButton = screen.getByText('Return to Round 2')
    fireEvent.click(returnButton)

    expect(mockNavigate).toHaveBeenCalledWith('/round2', {
      state: {
        importantQuestions: ['Question 1', 'Question 2', 'Question 3'],
        importance: ['Question 1', 'Question 2', 'Question 3'],
      },
    })
  })
})
