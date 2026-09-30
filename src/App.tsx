import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import AcmDesignCaseStudy from './components/AcmDesignCaseStudy'
import FitziCaseStudy from './components/FitziCaseStudy'
import HandVfxCaseStudy from './components/HandVfxCaseStudy'
import HomieCaseStudy from './components/HomieCaseStudy'
import HomebodyCaseStudy from './components/HomebodyCaseStudy'
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
        <Route path="/homebody" element={<HomebodyCaseStudy />} />
        <Route path="/handvfx" element={<HandVfxCaseStudy />} />
        <Route path="/fitzi" element={<FitziCaseStudy />} />
        <Route path="/acm-design" element={<AcmDesignCaseStudy />} />
      </Routes>
    </>
  )
}

export default App
