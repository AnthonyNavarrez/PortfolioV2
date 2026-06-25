import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import HomieCaseStudy from './components/HomieCaseStudy'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/homie" element={<HomieCaseStudy />} />
    </Routes>
  )
}

export default App
