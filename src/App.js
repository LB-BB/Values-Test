import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Home'
import Round1 from './Round1'
import Round2 from './Round2'
import Round3 from './Round3'
import Results from './Results'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/round1' element={<Round1 />} />
        <Route path='/round2' element={<Round2 />} />
        <Route path='/round3' element={<Round3 />} />
        <Route path='/results' element={<Results />} />
      </Routes>
    </Router>
  )
}

export default App
