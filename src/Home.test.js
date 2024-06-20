import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router, MemoryRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import userEvent from '@testing-library/user-event'
import Round1 from './Round1' 

describe('Home Component', () => {
  test('renders the title', () => {
    render(
      <Router>
        <Home />
      </Router>
    )
    const valuesElement = screen.getByText(/Welcome to the Values Card Sort/i)
    expect(valuesElement).toBeInTheDocument()
  })

  test('renders the "Start" button', () => {
    render(
      <Router>
        <Home />
      </Router>
    )
    expect(screen.getByText('Start')).toBeInTheDocument()
  })

  test('navigates to Round1 page on button click', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/round1' element={<Round1 />} />
        </Routes>
      </MemoryRouter>
    )

    userEvent.click(screen.getByText('Start'))
    expect(await screen.findByText('Round 1: 102 Values')).toBeInTheDocument()
  })
})