import React from 'react'
import { useNavigate } from 'react-router-dom'
import './styles.css'

const Home = () => {
  const navigate = useNavigate()

  const handleStart = () => {
    navigate('/round1') // Navigate to Round1 page
  }

  return (
    <div className="home-container">
      <div className='start-container'>
        <h1 className="title">Welcome to the Values Card Sort</h1>
        <h3 className='subtitle'>Based on the card set by W.R. Miller, J. C’de Baca, D.B. Matthews, P.L.Wilbourne</h3>
        <h4 className='subtitle subtitle-2'>at the University of New Mexico, 2001</h4>
        <button className="start-button" onClick={handleStart}>
          <span>
          Start
          </span>
        </button>
      </div>
    </div>
  )
}

export default Home
