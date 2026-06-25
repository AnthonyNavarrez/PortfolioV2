import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import HomieCaseStudy from './components/HomieCaseStudy'
import MomentoCaseStudy from './components/MomentoCaseStudy'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/homie" element={<HomieCaseStudy />} />
        <Route path="/momento" element={<MomentoCaseStudy />} />
      </Routes>
    </>
  )
}

export default App
