import { Route, Routes, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { FooterStarsProvider } from './contexts/FooterStarsContext'
import { NavSidebarProvider } from './contexts/NavSidebarContext'
import NavSidebar from './components/NavSidebar'
import CustomCursor from './components/CustomCursor'
import WorkPage from './components/WorkPage'
import WorkPageV4 from './components/WorkPageV4'
import AcmDesignCaseStudy from './components/AcmDesignCaseStudy'
import FitziCaseStudy from './components/FitziCaseStudy'
import HandVfxCaseStudy from './components/HandVfxCaseStudy'
import HomieCaseStudyV3 from './components/HomieCaseStudyV3'
import HomebodyCaseStudy from './components/HomebodyCaseStudy'
import WishesPage from './components/WishesPage'
import MomentoCaseStudy from './components/MomentoCaseStudy'
import GcalCaseStudy from './components/GcalCaseStudy'
import AboutPage from './components/AboutPage'
import ResumePage from './components/ResumePage'
import DesignsPage from './components/DesignsPage'
import ScrollToTop from './components/ScrollToTop'
import MessagePage from './components/MessagePage'
import ScrollReveal from './components/ScrollReveal'
import LoadingScreen from './components/LoadingScreen'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<WorkPageV4 />} />
      <Route path="/v3" element={<WorkPage />} />
      <Route path="/homie" element={<HomieCaseStudyV3 />} />
      <Route path="/momento" element={<MomentoCaseStudy />} />
      <Route path="/gcal" element={<GcalCaseStudy />} />
      <Route path="/homebody" element={<HomebodyCaseStudy />} />
      <Route path="/handvfx" element={<HandVfxCaseStudy />} />
      <Route path="/fitzi" element={<FitziCaseStudy />} />
      <Route path="/acm-design" element={<AcmDesignCaseStudy />} />
      <Route path="/message" element={<MessagePage />} />
      <Route path="/wishes" element={<WishesPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/resume" element={<ResumePage />} />
      <Route path="/designs" element={<DesignsPage />} />
    </Routes>
  )
}

function App() {
  const [loading, setLoading] = useState(true)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const hide = () => {
      setLoading(false)
      setTimeout(() => setVisible(false), 500)
    }
    if (document.readyState === 'complete') {
      setTimeout(hide, 600)
    } else {
      window.addEventListener('load', () => setTimeout(hide, 600), { once: true })
    }
  }, [])

  return (
    <FooterStarsProvider>
      <NavSidebarProvider>
        {visible && <LoadingScreen visible={loading} />}
        <div className="bottom-blur" />
        <CustomCursor />
        <ScrollToTop />
        <ScrollReveal />
        <NavSidebar />
        <AnimatedRoutes />
      </NavSidebarProvider>
    </FooterStarsProvider>
  )
}

export default App
