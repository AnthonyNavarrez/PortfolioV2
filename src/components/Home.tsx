import About from './About'
import Designs from './Designs'
import Hero from './Hero'
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
      <About />
    </>
  )
}

export default Home
