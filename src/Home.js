import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  const handleStart = () => {
    navigate('/round1') // Navigate to Round1 page
  }

  return (
    <div>
      <div>
        <h1 >Welcome to the Values Card Sort</h1>
        <h3>Based on the card set by W.R. Miller, J. C’de Baca, D.B. Matthews, P.L.Wilbourne</h3>
        <h4>at the University of New Mexico, 2001</h4>
        <button onClick={handleStart}>Start</button>
      </div>
    </div>
  )
}

export default Home
