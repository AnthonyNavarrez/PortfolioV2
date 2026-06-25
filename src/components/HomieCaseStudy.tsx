import { Link } from 'react-router-dom'
import AnimatedContent from './AnimatedContent'
import Grainient from './Grainient'
import HomieAnnotation from './HomieAnnotation'
import HomieDescriptionMockup from './HomieDescriptionMockup'
import HomieHeroMockup from './HomieHeroMockup'
import HomieWatermark from './HomieWatermark'
import './HomieCaseStudy.css'

function HomieCaseStudy() {
  return (
    <article className="homie-case-study">
      <div className="homie-case-study__background" aria-hidden="true">
        <Grainient
          color1="#fcbbb3"
          color2="#fbe8b0"
          color3="#7CEBFF"
          timeSpeed={1.15}
          colorBalance={0.0}
          warpStrength={1.0}
          warpFrequency={5.0}
          warpSpeed={2.0}
          warpAmplitude={50.0}
          blendAngle={0.0}
          blendSoftness={0.05}
          rotationAmount={500.0}
          noiseScale={2.0}
          grainAmount={0.15}
          grainScale={2.0}
          grainAnimated={false}
          contrast={1.5}
          gamma={1.0}
          saturation={0.95}
          centerX={0.0}
          centerY={0.0}
          zoom={0.9}
        />
      </div>

      <Link className="homie-case-study__back" to="/">
        ← Back to projects
      </Link>

      <section className="homie-case-study__hero">
        <HomieWatermark />

        <div className="homie-case-study__mockup-wrap">
          <HomieHeroMockup />

          <div className="homie-case-study__actions">
            <HomieAnnotation />

            <a
              className="homie-case-study__button homie-case-study__button--filled"
              href="https://homie-d6km.onrender.com"
              target="_blank"
              rel="noreferrer"
            >
              Try it Live
            </a>
            <a
              className="homie-case-study__button homie-case-study__button--outline"
              href="https://github.com/AnthonyNavarrez/CL_Homie"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>

      <section className="homie-case-study__description">
        <div className="homie-case-study__description-text-col">
          <AnimatedContent
            direction="vertical"
            distance={60}
            duration={0.9}
            threshold={0.2}
          >
            <p className="homie-case-study__description-label">Problem</p>
            <p className="homie-case-study__description-text">
              As college students, we’ve heard of, or even experienced
              first-hand, the countless roommate nightmares and struggles.
            </p>
            <p className="homie-case-study__description-text">
              Roommate conflict is usually the result of{' '}
              <strong>poor communication</strong> and{' '}
              <strong>confusion</strong>. Most students manage their roommate
              situation through <strong>scattered</strong> text messages and
              assumptions leading to tension,{' '}
              <strong>forgotten responsibilities</strong>, wasted food, and{' '}
              <strong>even arguments</strong>.
            </p>
          </AnimatedContent>

          <AnimatedContent
            direction="vertical"
            distance={60}
            duration={0.9}
            threshold={0.3}
          >
            <p className="homie-case-study__description-label">Solution</p>
            <p className="homie-case-study__description-text">
              Homie is a mobile app designed for roommates to organize all
              household logistics in one place. Through features such as a
              chore tracker, a shared calendar for the house, and a combined
              shopping list, Homie creates a space for accountability and
              clear management.
            </p>
          </AnimatedContent>
        </div>

        <AnimatedContent
          className="homie-case-study__description-mockup"
          direction="horizontal"
          distance={60}
          duration={0.9}
          delay={0.15}
          threshold={0.2}
        >
          <HomieDescriptionMockup />
        </AnimatedContent>
      </section>
    </article>
  )
}

export default HomieCaseStudy
