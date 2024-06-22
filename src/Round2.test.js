import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter, useNavigate, useLocation } from 'react-router-dom'
import Round2 from './Round2'
import { questions } from './questions'

const importantQuestions = questions.slice(0, 12)

// Mock useNavigate
const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useLocation: () => ({
    state: {
      importantQuestions: [
        "ACCEPTANCE: to be accepted as I am",
        "ACCURACY: to be correct in my opinions and beliefs",
        "ACHIEVEMENT: to have important accomplishments",
        "ADVENTURE: to have new and exciting experiences",
        "ART: to appreciate or express myself in art",
        "AUTHORITY: to be in charge of others",
        "BEAUTY: to appreciate beauty around me",
        "ACCURACY: to be correct in my opinions and beliefs",
        "ADVENTURE: to have new and exciting experieces",
        "ATTRACTIVENESS: to be physically attractive",
        "AUTONOMY: to be self-determined and independent",
        "BELONGING: to have a sense of belonging, being part of",
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
    expect(screen.getByText(`1: ${importantQuestions[0]}`)).toBeInTheDocument()
    expect(screen.getByText(`6: ${importantQuestions[5]}`)).toBeInTheDocument()
    expect(screen.getByText(`12: ${importantQuestions[11]}`)).toBeInTheDocument()
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
      state: { mostImportantQuestions: [importantQuestions[0]] },
    })
  })
})
