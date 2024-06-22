import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter, useNavigate, useLocation } from 'react-router-dom'
import Round2 from './Round2'

// Mock useNavigate
const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useLocation: () => ({
    state: {
      importantQuestions: [
        "Question 1",
        "Question 2",
        "Question 3",
        "Question 4",
        "Question 5",
        "Question 6",
        "Question 7",
        "Question 8",
        "Question 9",
        "Question 10",
        "Question 11",
        "Question 12",
      ],
      importance: Array(12).fill('very important')
    }
  }),
}))

describe('Round2 Component', () => {
  beforeEach(() => {
    localStorage.clear() // Clear localStorage before each test
  })

  test('renders Round2 with initial state', () => {
    render(
      <BrowserRouter>
        <Round2 />
      </BrowserRouter>
    )

    expect(screen.getByText('Round 2')).toBeInTheDocument()
    expect(screen.getByText('Mark the questions as \'very important\' or \'most important\'. You may select only 10 \'most important\' questions.')).toBeInTheDocument()
    expect(screen.getByText('1: Question 1')).toBeInTheDocument()
    expect(screen.getByText('6: Question 6')).toBeInTheDocument()
    expect(screen.getByText('12: Question 12')).toBeInTheDocument()
  })

  test('changes importance of a question', () => {
    render(
      <BrowserRouter>
        <Round2 />
      </BrowserRouter>
    )

    const firstQuestionMostImportantRadio = screen.getByLabelText('Most Important', { selector: 'input[name="importance-0"]' })
    fireEvent.click(firstQuestionMostImportantRadio)

    expect(firstQuestionMostImportantRadio.checked).toBe(true)
  })

  test('shows error when more than 10 questions are marked as most important', () => {
    render(
      <BrowserRouter>
        <Round2 />
      </BrowserRouter>
    )

    // Mark 11 questions as 'most important'
    for (let i = 0; i < 11; i++) {
      fireEvent.click(screen.getByLabelText('Most Important', { selector: `input[name="importance-${i}"]` }))
    }

    const submitButton = screen.getByText('Submit & Go to Round 3')
    fireEvent.click(submitButton)

    expect(screen.getByText('You can only select up to 10 questions as \'most important\'.')).toBeInTheDocument()
  })

  test('submits and navigates to Round 3 with appropriate state', () => {
    render(
      <BrowserRouter>
        <Round2 />
      </BrowserRouter>
    )

    const firstQuestionMostImportantRadio = screen.getByLabelText('Most Important', { selector: 'input[name="importance-0"]' })
    fireEvent.click(firstQuestionMostImportantRadio)

    const submitButton = screen.getByText('Submit & Go to Round 3')
    fireEvent.click(submitButton)

    expect(mockNavigate).toHaveBeenCalledWith('/round3', {
      state: { mostImportantQuestions: ['Question 1'] },
    })
  })
})
