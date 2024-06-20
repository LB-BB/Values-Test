import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Home'
import Round1 from './Round1'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/round1' element={<Round1 />} />
      </Routes>
    </Router>
  )
}

export default App
