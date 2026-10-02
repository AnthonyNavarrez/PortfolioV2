import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import flowsA from '../assets/homie-cs/flows-a.webp'
import flowsB from '../assets/homie-cs/flows-b.webp'
import flowsC from '../assets/homie-cs/flows-c.webp'
import homieLogoMark from '../assets/homie-cs/logo.svg'
import personaIcon from '../assets/homie-cs/persona.webp'
import AnimatedContent from './AnimatedContent'
import Grainient from './Grainient'
import HomieAnnotation from './HomieAnnotation'
import HomieHeroMockup from './HomieHeroMockup'
import HomieFeatureCarousel from './HomieFeatureCarousel'
import HomieWatermark from './HomieWatermark'
import './HomieCaseStudy.css'

function Reveal({ className, delay = 0, children }: { className?: string; delay?: number; children: ReactNode }) {
  return (
    <AnimatedContent
      className={className}
      direction="vertical"
      distance={40}
      duration={0.8}
      delay={delay}
      threshold={0.15}
    >
      {children}
    </AnimatedContent>
  )
}

// Content below the hero — synced from Figma (node 671:1426).
const STATS = [
  { value: '92%', label: 'had never used an app to manage their living situation' },
  { value: '77%', label: 'coordinate with roommates over iMessage or in person' },
]

const PERSONAS = [
  {
    name: 'Paola',
    bio: ' is the social butterfly in the apartment. She has friends over most weekends and wants her roommates to feel included. Today she tried to coordinate over iMessage and hopes people see.',
    goals:
      'Give roommates a heads-up early, know if a plan is a problem before it happens, keep the shared space feeling shared',
    pains:
      'Messages get buried, no clear way to ask "is this okay?", finding out after the fact that someone was annoyed',
  },
  {
    name: 'Kathy',
    bio: " is juggling a heavy course load and a part-time job. She doesn't want to police anyone, she just needs to know what's happening at home and when she can count on quiet.",
    goals:
      'Request quiet time for exams and interviews, remember her chore week without thinking about it, use her groceries before they expire',
    pains:
      'Forgetting rotations, food going bad in the back of the fridge, feeling like the nag when she reminds people',
  },
]

const COMPETITORS = [
  ['iMessage', 'Everyone already has it, instant', 'Plans and requests get buried, no shared state of the house'],
  ['Google Calendar', 'Familiar, reliable scheduling', 'No house-level view, no way to ask "is this okay?"'],
  ['SplitWise', 'Strong at splitting bills', 'Bills only, no chores, lists or calendar, free tier now capped'],
  ['OurHome', 'Chores, shopping list and calendar in one', 'Point-based rewards can feel childish for adults, dated interface'],
]

const PRINCIPLES = [
  {
    title: 'Make responsibilities visible',
    text: 'A chore system the house writes itself, with rotations everyone can see, so no one has to ask whose turn it is.',
  },
  {
    title: 'Make the fridge visible',
    text: "Track what's expiring and what's up for grabs, and coordinate who's buying what before the store run.",
  },
  {
    title: 'Make plans visible before they happen',
    text: 'A shared calendar where hosting plans and quiet hours meet early, with a way to raise a concern',
  },
]

const TYPE_SCALE = [
  { label: 'Header 1 - 32 pt Gowun Batang (Bold)', modifier: 'h1' },
  { label: 'Header 2 - 22 pt Gowun Batang (Bold)', modifier: 'h2' },
  { label: 'Body 1 - 16 pt Gowun Batang (Bold)', modifier: 'body1' },
  { label: 'Body Medium - 14 pt Albert Sans (Medium)', modifier: 'body-medium' },
  { label: 'Body Regular - 14 pt Albert Sans (Regular)', modifier: 'body-regular' },
  { label: 'Small - 12 pt Albert Sans (Regular)', modifier: 'small' },
]

const SWATCHES = [
  { color: '#2e0800', name: 'Dark brown' },
  { color: 'rgba(46, 8, 0, 0.67)', name: 'Semi-transparent dark brown' },
  { color: '#d0bcb2', name: 'Card' },
  { color: '#4d797e', name: 'Button teal' },
  { color: '#fcf5ee', name: 'Background off-white' },
]

const GRADIENT_STOPS = ['#ffd2cd', '#fffbe4', '#7cebff']

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

      <Link className="homie-case-study__back" to="/" state={{ scrollTo: 'projects' }}>
        Back to Projects
      </Link>

      <section className="homie-case-study__hero">
        <HomieWatermark />

        <div className="homie-case-study__mockup-wrap">
          <AnimatedContent direction="vertical" distance={60} duration={0.9} threshold={0.01} delay={0.1}>
            <HomieHeroMockup />
          </AnimatedContent>

          <div className="homie-case-study__actions">
            <AnimatedContent direction="horizontal" distance={50} duration={0.7} threshold={0.01} delay={0.3}>
              <HomieAnnotation />
            </AnimatedContent>
            <AnimatedContent direction="horizontal" distance={50} duration={0.7} threshold={0.01} delay={0.45}>
              <a
                className="homie-case-study__button homie-case-study__button--filled"
                href="https://homie-d6km.onrender.com"
                target="_blank"
                rel="noreferrer"
              >
                Try it Live
              </a>
            </AnimatedContent>
            <AnimatedContent direction="horizontal" distance={50} duration={0.7} threshold={0.01} delay={0.55}>
              <a
                className="homie-case-study__button homie-case-study__button--outline"
                href="https://github.com/AnthonyNavarrez/CL_Homie"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </AnimatedContent>
          </div>
        </div>
      </section>

      <div className="homie-case-study__body">
        <Reveal className="homie-case-study__block">
          <h2 className="homie-case-study__label">Problem</h2>
          <p className="homie-case-study__text">
            As college students, we’ve heard of, or even experienced first-hand, the countless
            roommate nightmares and struggles.
          </p>
          <p className="homie-case-study__text">
            Roommate conflict is usually the result of <strong>poor communication</strong> and{' '}
            <strong>confusion</strong>. Most students manage their roommate situation through{' '}
            <strong>scattered</strong> text messages and assumptions leading to tension,{' '}
            <strong>forgotten responsibilities</strong>, wasted food, and{' '}
            <strong>even arguments</strong>.
          </p>
        </Reveal>

        <Reveal className="homie-case-study__block">
          <h2 className="homie-case-study__label">Research</h2>
          <p className="homie-case-study__text">
            About 10.4 million U.S. college students live away from home, and roughly 1 in 3
            college students report roommate problems in a given year. That&apos;s an estimated
            3.5 million students dealing with roommate problems each year
          </p>
          <p className="homie-case-study__text">
            We surveyed 65+ college students about how they manage shared living
          </p>
        </Reveal>

        <div className="homie-case-study__stats">
          {STATS.map((stat, index) => (
            <Reveal className="homie-case-study__card homie-case-study__stat" delay={index * 0.1} key={stat.value}>
              <p className="homie-case-study__stat-value">{stat.value}</p>
              <p className="homie-case-study__stat-label">{stat.label}</p>
            </Reveal>
          ))}
          <Reveal className="homie-case-study__card homie-case-study__stat homie-case-study__stat--list" delay={0.2}>
            <p className="homie-case-study__stat-heading">Top Complaints</p>
            <ul className="homie-case-study__stat-list">
              <li>communication</li>
              <li>chore accountability</li>
              <li>scheduling</li>
            </ul>
          </Reveal>
        </div>

        <section className="homie-case-study__personas">
          <Reveal>
            <h2 className="homie-case-study__label homie-case-study__label--center">User Personas</h2>
          </Reveal>
          <div className="homie-case-study__persona-row">
            {PERSONAS.map((persona, index) => (
              <Reveal className="homie-case-study__persona" delay={index * 0.1} key={persona.name}>
                <img className="homie-case-study__persona-icon" src={personaIcon} alt="" />
                <div className="homie-case-study__card homie-case-study__persona-card">
                  <p className="homie-case-study__persona-bio">
                    <strong>{persona.name}</strong>
                    {persona.bio}
                  </p>
                  <div className="homie-case-study__persona-item">
                    <span className="homie-case-study__persona-key">Goals</span>
                    <p>{persona.goals}</p>
                  </div>
                  <div className="homie-case-study__persona-item">
                    <span className="homie-case-study__persona-key">Struggle</span>
                    <p>{persona.pains}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="homie-case-study__competitive">
          <Reveal>
            <h2 className="homie-case-study__label homie-case-study__label--center">Competitive Analysis</h2>
          </Reveal>
          <Reveal>
            <div className="homie-case-study__card homie-case-study__table-card">
              <div className="homie-case-study__table" role="table">
                <div className="homie-case-study__table-row" role="row">
                  <span className="homie-case-study__table-head" role="columnheader">Tool</span>
                  <span className="homie-case-study__table-head" role="columnheader">What Works</span>
                  <span className="homie-case-study__table-head" role="columnheader">What’s missing for roommates</span>
                </div>
                {COMPETITORS.map((row) => (
                  <div className="homie-case-study__table-row" role="row" key={row[0]}>
                    {row.map((cell) => (
                      <span className="homie-case-study__table-cell" role="cell" key={cell}>
                        {cell}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        <Reveal className="homie-case-study__block">
          <h2 className="homie-case-study__label">Solution</h2>
          <p className="homie-case-study__text">
            Homie is a mobile app designed for roommates to organize all household logistics in
            one place. Through features such as a chore tracker, a shared calendar for the house,
            and a combined shopping list, Homie creates a space for accountability and clear
            management.
          </p>
        </Reveal>

        <section className="homie-case-study__principles">
          <Reveal>
            <h2 className="homie-case-study__label">Emphasis on visibility over conversation</h2>
          </Reveal>
          {PRINCIPLES.map((principle, index) => (
            <Reveal className="homie-case-study__card homie-case-study__principle" delay={index * 0.08} key={principle.title}>
              <p className="homie-case-study__principle-title">{principle.title}</p>
              <p className="homie-case-study__principle-text">{principle.text}</p>
            </Reveal>
          ))}
        </section>

        <Reveal className="homie-case-study__block">
          <h2 className="homie-case-study__label">Process</h2>
          <p className="homie-case-study__text">
            Brainstormed from the survey and other research, then created a short PRD for each
            feature. Every requirement got a priority.
          </p>
          <p className="homie-case-study__text">P0 (must ship for MVP)</p>
          <p className="homie-case-study__text">P1 (makes it delightful)</p>
          <p className="homie-case-study__text">P2 (nice to have).</p>
          <p className="homie-case-study__text">Prioritizing forced the decisions that shaped the product:</p>
        </Reveal>

        <section className="homie-case-study__flows">
          <Reveal>
            <h2 className="homie-case-study__label">Mapping User Flows in Lo/Mid FI</h2>
          </Reveal>
          <Reveal className="homie-case-study__flow-images">
            <img className="homie-case-study__flow homie-case-study__flow--a" src={flowsA} alt="Homie user flow wireframes" />
            <img className="homie-case-study__flow homie-case-study__flow--b" src={flowsB} alt="Homie user flow wireframes" />
            <img className="homie-case-study__flow homie-case-study__flow--c" src={flowsC} alt="Homie user flow wireframes" />
          </Reveal>
        </section>

        <Reveal className="homie-case-study__block">
          <h2 className="homie-case-study__label">Visual Direction</h2>
          <p className="homie-case-study__text homie-case-study__text--large">
            The visual language was aimed to feel like a friendly, shared space, and less of a
            soulless productivity tool. Chores and rent are stressful enough already. An early
            concept for the dashboard was magnets on a fridge, inspired by the place roommates
            already leave notes for each other, but felt too childish in hi-fis.
          </p>
        </Reveal>

        <section className="homie-case-study__design-system">
          <Reveal>
            <h2 className="homie-case-study__label">Design System</h2>
          </Reveal>
          <Reveal className="homie-case-study__type-scale">
            {TYPE_SCALE.map((item) => (
              <p className={`homie-case-study__type homie-case-study__type--${item.modifier}`} key={item.modifier}>
                {item.label}
              </p>
            ))}
          </Reveal>
          <Reveal className="homie-case-study__swatches">
            <div className="homie-case-study__swatch-grid">
              {SWATCHES.map((swatch) => (
                <span
                  className="homie-case-study__swatch"
                  style={{ background: swatch.color }}
                  title={swatch.name}
                  key={swatch.name}
                />
              ))}
            </div>
            <div className="homie-case-study__gradient-swatches">
              <span className="homie-case-study__gradient" />
              <div className="homie-case-study__gradient-stops">
                {GRADIENT_STOPS.map((color) => (
                  <span style={{ background: color }} key={color} />
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal className="homie-case-study__logo-block">
            <img className="homie-case-study__logo-mark" src={homieLogoMark} alt="Homie logo" />
            <p className="homie-case-study__text homie-case-study__text--large">
              The Logo is the side of a house outline on a Cat. Cats are one of the most common
              house pets. It also plays on the word “Homie” also meaning good friend. Pets,
              especially cats, bring a sense of warmth and calmness which also plays on “Homey”
              meaning cozy, comfortable, and inviting which is the goal feeling to bring to the
              user.
            </p>
          </Reveal>
        </section>

        <section className="homie-case-study__final">
          <Reveal>
            <h2 className="homie-case-study__label homie-case-study__label--center">Final Designs</h2>
          </Reveal>
          <HomieFeatureCarousel />
        </section>
      </div>
    </article>
  )
}

export default HomieCaseStudy
