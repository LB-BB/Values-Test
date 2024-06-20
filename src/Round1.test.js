import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { BrowserRouter } from 'react-router-dom'
import Round1 from './Round1'
import { questions } from './questions'

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
      expect(screen.getByText(`${index + 1}: ${question}`)).toBeInTheDocument()

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

  test('initializes all radio buttons with "very important" checked', () => {
    render(
      <BrowserRouter>
        <Round1 />
      </BrowserRouter>
    )

    questions.forEach((_, index) => {
      const veryImportantRadioButtons = screen.getAllByLabelText('Very Important')
      expect(veryImportantRadioButtons[index]).toBeChecked()
    })
  })

  test('updates localStorage when importance is changed', () => {
    render(
      <BrowserRouter>
        <Round1 />
      </BrowserRouter>
    )

    const radio = screen.getByLabelText('Not Important', { selector: `input[name="importance-0"]` })
    act(() => {
      fireEvent.click(radio)
    })

    expect(localStorage.getItem('importance')).toContain('"not important"')
  })

  test('handles the "Clear & Restart" button', () => {
    render(
      <BrowserRouter>
        <Round1 />
      </BrowserRouter>
    )

    // Change a radio button
    const radio = screen.getByLabelText('Not Important', { selector: `input[name="importance-0"]` })
    act(() => {
      fireEvent.click(radio)
    })

    // Click the "Clear & Restart" button
    const button = screen.getByText('Clear & Restart')
    act(() => {
      fireEvent.click(button)
    })

    // Check if all radio buttons are reset to "very important"
    questions.forEach((_, index) => {
      const radio = screen.getByLabelText('Very Important', { selector: `input[name="importance-${index}"]` })
      expect(radio).toBeChecked()
    })

    // Ensure localStorage is updated
    expect(localStorage.getItem('importance')).toContain('"very important"')
  })
})
