import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import AnimatedContent from './AnimatedContent'
import {
  homebodyBgHover,
  homebodyClips,
  homebodyGithubButton,
  homebodyGithubUrl,
  homebodyInspirations,
  homebodyLogo,
  homebodyOverviewParagraphs,
  homebodyOverviewPoster,
  homebodyOverviewVideo,
  homebodyPainPoints,
  homebodyPawnRun,
  homebodyPawnShadow,
  homebodyPlayButton,
  homebodyPlayUrl,
  homebodyTechStack,
  type HomebodyClip,
} from '../data/homebody'
import './HomebodyCaseStudy.css'

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

function Clip({ clip }: { clip: HomebodyClip }) {
  return (
    <video
      className="homebody-case-study__clip"
      src={clip.src}
      poster={clip.poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={clip.label}
    />
  )
}

// Synced from Figma (node 693:2949).
function HomebodyCaseStudy() {
  const [combat, resources, crafting, building, biome1, biome2] = homebodyClips

  return (
    <article className="homebody-case-study">
      <Link className="homebody-case-study__back" to="/" state={{ scrollTo: 'projects' }}>
        Back to Projects
      </Link>

      <section
        className="homebody-case-study__hero"
        style={{ backgroundImage: `url(${homebodyBgHover})` }}
      >
        <div className="homebody-case-study__hero-fade" aria-hidden="true" />

        <img className="homebody-case-study__logo" src={homebodyLogo} alt="Homebody" />

        <div className="homebody-case-study__actions">
          <a href={homebodyPlayUrl} target="_blank" rel="noreferrer">
            <img
              className="homebody-case-study__button homebody-case-study__button--play"
              src={homebodyPlayButton}
              alt="Play"
            />
          </a>
          <a href={homebodyGithubUrl} target="_blank" rel="noreferrer">
            <img
              className="homebody-case-study__button homebody-case-study__button--github"
              src={homebodyGithubButton}
              alt="GitHub"
            />
          </a>
        </div>
      </section>

      <div className="homebody-case-study__body">
        <section className="homebody-case-study__overview">
          <Reveal className="homebody-case-study__overview-text">
            <h2 className="homebody-case-study__heading">Overview</h2>
            {homebodyOverviewParagraphs.map((paragraph) => (
              <p className="homebody-case-study__text" key={paragraph}>
                {paragraph}
              </p>
            ))}
          </Reveal>
          <Reveal className="homebody-case-study__gameplay-wrap" delay={0.1}>
            <video
              className="homebody-case-study__gameplay"
              src={homebodyOverviewVideo}
              poster={homebodyOverviewPoster}
              autoPlay
              muted
              loop
              playsInline
              aria-label="Homebody gameplay: fighting with a bow"
            />
          </Reveal>
        </section>

        <section className="homebody-case-study__pain-points">
          <Reveal>
            <h2 className="homebody-case-study__heading">Gaming Pain Points</h2>
          </Reveal>
          <div className="homebody-case-study__pain-grid">
            {homebodyPainPoints.map((point, index) => (
              <Reveal className="homebody-case-study__pain-card" delay={index * 0.1} key={point.title}>
                <p className="homebody-case-study__pain-title">{point.title}</p>
                <p className="homebody-case-study__text">{point.body}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="homebody-case-study__inspirations">
          <Reveal>
            <h2 className="homebody-case-study__heading">Inspirations</h2>
          </Reveal>
          <div className="homebody-case-study__inspiration-list">
            {homebodyInspirations.map((game, index) => (
              <Reveal className="homebody-case-study__inspiration" delay={index * 0.08} key={game.name}>
                <img
                  className={`homebody-case-study__inspiration-icon homebody-case-study__inspiration-icon--${game.key}`}
                  src={game.icon}
                  alt=""
                />
                <div>
                  <p className="homebody-case-study__inspiration-name">{game.name}</p>
                  <p className="homebody-case-study__text homebody-case-study__text--pro">{game.pro}</p>
                  <p className="homebody-case-study__text homebody-case-study__text--con">{game.con}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="homebody-case-study__process">
          <Reveal>
            <h2 className="homebody-case-study__process-heading">Process</h2>
          </Reveal>

          <div className="homebody-case-study__steps">
            <Reveal className="homebody-case-study__step">
              <div className="homebody-case-study__step-body">
                <h3 className="homebody-case-study__step-title">Brainstorm and Scope</h3>
                <p className="homebody-case-study__text">
                  I started with a Google Doc brainstorm of mechanics, enemies and recipes. I used
                  Claude to push half-formed ideas further and balance the numbers, then turned it
                  into a PRD that I reprioritized by hand.
                </p>
                <p className="homebody-case-study__text">Three things were non-negotiable:</p>
                <ul className="homebody-case-study__bullets">
                  <li>no-install browser play,</li>
                  <li>getting in fast</li>
                  <li>multiplayer</li>
                </ul>
              </div>
            </Reveal>

            <Reveal className="homebody-case-study__step">
              <div className="homebody-case-study__step-body">
                <h3 className="homebody-case-study__step-title">Playable Iterations</h3>
                <p className="homebody-case-study__text">
                  I built Homebody one playable feature at a time, testing each before starting the
                  next
                </p>
              </div>
            </Reveal>

            <Reveal className="homebody-case-study__step homebody-case-study__step--visual">
              <div className="homebody-case-study__step-body">
                <h3 className="homebody-case-study__step-title">Visual Direction</h3>
                <p className="homebody-case-study__text">
                  I wanted a cute, vibrant pixel-art style with medieval characters, enemies and
                  buildings. A 2D top-down view suits a cozy browser game: it&apos;s readable at a
                  glance and keeps every player&apos;s base in view.
                </p>
                <p className="homebody-case-study__text">
                  A public asset pack gave me a baseline, but it didn&apos;t cover everything the
                  design needed. I filled the gaps with my own pipeline:
                </p>
                <ol className="homebody-case-study__pipeline">
                  <li>Generate a base image in Reve or Google Flow</li>
                  <li>Pixelate it with Pixel Art Village</li>
                  <li>Clean it up and redraw details by hand in Piskel</li>
                  <li>Edit asset-pack sprites the same way so old and new match</li>
                  <li>Draw some sprites from scratch in Piskel</li>
                  <li>Strip backgrounds and fit everything to one 16-pixel tile grid</li>
                </ol>
                <p className="homebody-case-study__text">
                  I used Homebody to test where AI belongs in a design workflow. Generation was
                  great for getting a starting point fast but nothing went in as-is, every generated
                  asset went through my own pixel pass so it matched the rest.
                </p>
              </div>
              {/* Pawn sprite running in place (node 699:3062). */}
              <div className="homebody-case-study__pawn" aria-hidden="true">
                <img className="homebody-case-study__pawn-shadow" src={homebodyPawnShadow} alt="" />
                <span
                  className="homebody-case-study__pawn-sprite"
                  style={{ backgroundImage: `url(${homebodyPawnRun})` }}
                />
              </div>
            </Reveal>
          </div>
        </section>

        <section className="homebody-case-study__final">
          <Reveal>
            <h2 className="homebody-case-study__heading">Final Designs</h2>
          </Reveal>

          <div className="homebody-case-study__clip-grid">
            {[combat, resources, crafting, building].map((clip, index) => (
              <Reveal className="homebody-case-study__clip-card" delay={(index % 2) * 0.1} key={clip.label}>
                <p className="homebody-case-study__clip-label">{clip.label}</p>
                <Clip clip={clip} />
              </Reveal>
            ))}
          </div>

          <Reveal className="homebody-case-study__biome">
            <p className="homebody-case-study__clip-label homebody-case-study__clip-label--center">
              Biome Exploration
            </p>
            <div className="homebody-case-study__biome-row">
              <Clip clip={biome1} />
              <Clip clip={biome2} />
            </div>
          </Reveal>
        </section>
      </div>

      <section className="homebody-case-study__tech">
        <Reveal>
          <h2 className="homebody-case-study__tech-heading">Tech Stack</h2>
        </Reveal>

        <Reveal className="homebody-case-study__tech-row">
          {homebodyTechStack.map((item) => (
            <div className="homebody-case-study__tech-item" style={{ width: item.width }} key={item.name}>
              <span className="homebody-case-study__tech-item-head">
                <img src={item.icon} alt="" />
                <span>{item.name}</span>
              </span>
              <p>{item.description}</p>
            </div>
          ))}
        </Reveal>
      </section>
    </article>
  )
}

export default HomebodyCaseStudy
