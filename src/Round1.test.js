import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { BrowserRouter } from 'react-router-dom'
import Round1 from './Round1'
import { questions } from './questions'

// Mock useNavigate
const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}))

// Mock the questions data
jest.mock('./questions', () => ({
  questions: [
    'Question 1',
    'Question 2',
    'Question 3'
  ],
}))

describe('Round1 Component', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
  })

  test('renders all questions with radio buttons', () => {
    render(
      <BrowserRouter>
        <Round1 />
      </BrowserRouter>
    )

    questions.forEach((question, index) => {
      expect(screen.getByText(`${index + 1}. ${question}`)).toBeInTheDocument()

      const notImportantRadioButtons = screen.getAllByLabelText('Not Important')
      const somewhatImportantRadioButtons = screen.getAllByLabelText('Somewhat Important')
      const importantRadioButtons = screen.getAllByLabelText('Important')
      const veryImportantRadioButtons = screen.getAllByLabelText('Very Important')

      expect(notImportantRadioButtons[index]).toBeInTheDocument()
      expect(somewhatImportantRadioButtons[index]).toBeInTheDocument()
      expect(importantRadioButtons[index]).toBeInTheDocument()
      expect(veryImportantRadioButtons[index]).toBeInTheDocument()
    })
  })

  test('initializes all radio buttons with "Not Important" checked', () => {
    render(
      <BrowserRouter>
        <Round1 />
      </BrowserRouter>
    )

    questions.forEach((_, index) => {
      const notImportantRadioButtons = screen.getAllByLabelText('Not Important')
      expect(notImportantRadioButtons[index]).toBeChecked()
    })
  })

  test('updates localStorage when importance is changed', () => {
    render(
      <BrowserRouter>
        <Round1 />
      </BrowserRouter>
    )

    const radio = screen.getByLabelText('Somewhat Important', { selector: `input[name="importance-0"]` })
    act(() => {
      fireEvent.click(radio)
    })

    expect(localStorage.getItem('importance')).toContain('"somewhat important"')
  })

  test('handles the "Clear & Restart" button', () => {
    render(
      <BrowserRouter>
        <Round1 />
      </BrowserRouter>
    )

    // Change a radio button
    const radio = screen.getByLabelText('Somewhat Important', { selector: `input[name="importance-0"]` })
    act(() => {
      fireEvent.click(radio)
    })

    // Click the "Clear & Restart" button
    const button = screen.getByText('Clear & Restart')
    act(() => {
      fireEvent.click(button)
    })

    // Check if all radio buttons are reset to "Not Important"
    questions.forEach((_, index) => {
      const radio = screen.getByLabelText('Not Important', { selector: `input[name="importance-${index}"]` })
      expect(radio).toBeChecked()
    })

    // Ensure localStorage is updated
    expect(localStorage.getItem('importance')).toContain('"not important"')
  })

  test('handleSubmit sends the user to Round2 with appropriate questions in state', () => {
    render(
      <BrowserRouter>
        <Round1 />
      </BrowserRouter>
    )

    // Simulate changes to importance
    fireEvent.click(screen.getAllByLabelText('Very Important')[0]) // Set question 1 to 'Very Important'
    fireEvent.click(screen.getAllByLabelText('Very Important')[1]) // Set question 2 to 'Very Important'

    // Simulate the submit button click
    const submitButton = screen.getByText('Submit & Go to Round 2')
    fireEvent.click(submitButton)

    // Assert that navigate was called with the correct arguments
    expect(mockNavigate).toHaveBeenCalledWith('/round2', {
      state: { importantQuestions: ['Question 1', 'Question 2'] }, // Only the questions marked as 'very important' should be included
    })
  })
})
