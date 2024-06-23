import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom'
import Results from './Results'
import Round3 from './Round3'
import Round1 from './Round1'

const renderWithRouter = (ui, { route = '/results' } = {}) => {
  window.history.pushState({}, 'Test page', route)

  return render(ui, { wrapper: BrowserRouter })
}

describe('Results Component', () => {
  test('renders the ranked questions', () => {
    const rankedQuestions = ['Question 1', 'Question 2', 'Question 3']

    render(
      <MemoryRouter initialEntries={[{ pathname: '/results', state: { rankedQuestions } }]}>
        <Routes>
          <Route path='/results' element={<Results />} />
        </Routes>
      </MemoryRouter>
    )
    expect(screen.getByText('Your Values, Ranked')).toBeInTheDocument()
    rankedQuestions.forEach((question, index) => {
      expect(screen.getByText(`${index + 1}. ${question}`)).toBeInTheDocument()
    })
  })

  test('renders return to Round 3 and start from Round 1 buttons', () => {
    renderWithRouter(<Results />)

    expect(screen.getByText('Return to Round 3')).toBeInTheDocument()
    expect(screen.getByText('Return to Round 1')).toBeInTheDocument()
  })

  test('navigates to Round 3 with ranked questions state', () => {
    const rankedQuestions = ['Question 1', 'Question 2', 'Question 3']

    render(
      <MemoryRouter initialEntries={[{ pathname: '/results', state: { rankedQuestions } }]}>
        <Routes>
          <Route path='/results' element={<Results />} />
          <Route path='/round3' element={<Round3 />} />
        </Routes>
      </MemoryRouter>
    )

    fireEvent.click(screen.getByText('Return to Round 3'))

    expect(screen.getByText('Round 3')).toBeInTheDocument()
  })

  test('navigates to Round 1', () => {
    render(
      <MemoryRouter initialEntries={['/results']}>
        <Routes>
          <Route path='/results' element={<Results />} />
          <Route path='/round1' element={<Round1 />} />
        </Routes>
      </MemoryRouter>
    )

    fireEvent.click(screen.getByText('Return to Round 1'))

    expect(screen.getByText('Round 1: 102 Values')).toBeInTheDocument()
  })
})
