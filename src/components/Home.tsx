import Contact from './Contact'
import Designs from './Designs'
import Hero from './Hero'
import PhotoCards from './PhotoCards'
import './Home.css'
import Projects from './Projects'
import Stars from './Stars'

function Home() {
  return (
    <>
      <div className="home__stars" aria-hidden="true">
        <Stars factor={0.05} speed={50} starColor="#443F69" pointerEvents={false} />
      </div>
      <Hero />
      <Projects />
      <Designs />
      {/* Mobile only — on desktop the pile lives in the hero. */}
      <PhotoCards placement="footer" />
      <Contact />
    </>
  )
}

export default Home
