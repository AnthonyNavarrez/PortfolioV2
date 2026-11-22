import { useSections } from '../contexts/NavSidebarContext'
import iconEmoji   from '../assets/v3/icon-emoji.svg'
import iconClock   from '../assets/v3/icon-clock.svg'
import iconUsers   from '../assets/v3/icon-users.svg'
import iconSpanner from '../assets/v3/icon-spanner.svg'
import {
  homebodyInspirations,
  homebodyClips,
  homebodyOverviewVideo,
  homebodyOverviewPoster,
  homebodyPawnRun,
  homebodyPawnShadow,
  homebodyTechStack,
  homebodyPainPoints,
} from '../data/homebody'
import Reveal from './Reveal'
import './HomebodyCaseStudy.css'

const NON_NEGOTIABLES = [
  { num: '01', title: 'No-install browser play' },
  { num: '02', title: 'Getting in fast' },
  { num: '03', title: 'Multiplayer' },
]

const PIPELINE_STEPS = [
  { num: '01', title: 'Generate a base image', body: 'Start in Reve or Google Flow.' },
  { num: '02', title: 'Pixelate the image', body: 'Use Pixel Art Village to establish the pixel treatment.' },
  { num: '03', title: 'Clean up & redraw', body: 'Refine details by hand in Piskel.' },
  { num: '04', title: 'Match existing sprites', body: 'Edit asset-pack sprites so old and new artwork belong together.' },
  { num: '05', title: 'Draw from scratch', body: 'Create some sprites directly in Piskel.' },
  { num: '06', title: 'Unify the tile grid', body: 'Strip backgrounds and fit everything to one 16-pixel tile grid.' },
]

const GAMEPLAY_SYSTEMS = [
  { num: '01', title: 'Combat', body: 'Defend yourself and your house when waves of enemies arrive.' },
  { num: '02', title: 'Resource gathering', body: 'Gather resources during the day to prepare your gear and defenses.' },
  { num: '03', title: 'Crafting', body: 'Prepare for the next night with the resources you collect.' },
  { num: '04', title: 'Base building', body: "Build up your home's defenses before the next wave." },
  { num: '05', title: 'Biome exploration', body: 'Explore the open-world map during the day.' },
]

function GameVideo({ src, poster, label }: { src: string; poster: string; label: string }) {
  return (
    <video
      className="hb-video"
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={label}
    />
  )
}

function HomebodyCaseStudy() {
  const [combat, resources, crafting, building, biome1, biome2] = homebodyClips

  useSections([
    { id: 'hb-game-loop',  label: 'The Game Loop' },
    { id: 'hb-pain-points', label: 'Pain Points' },
    { id: 'hb-process',    label: 'Process' },
    { id: 'hb-visual',     label: 'Visual Direction' },
    { id: 'hb-gameplay',   label: 'Gameplay Systems' },
    { id: 'hb-tech',       label: 'Tech Stack' },
  ])

  return (
    <div className="hb-page">
      <main className="hb-main">
        <div className="hb-content">

          {/* ── Overview ── */}
          <div className="hb-overview">
            <Reveal><h1 className="hb-title">Homebody</h1></Reveal>
            <Reveal delay={0.05}><p className="hb-tagline">A cozy world. A home worth defending.</p></Reveal>
            <Reveal delay={0.1}>
              <div className="hb-hero">
                <GameVideo src={homebodyOverviewVideo} poster={homebodyOverviewPoster} label="Homebody gameplay: bow combat" />
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="hb-meta">
                <div className="hb-meta__item">
                  <div className="hb-meta__label">
                    <img src={iconEmoji} alt="" className="hb-meta__icon" />
                    <span>Role</span>
                  </div>
                  <p className="hb-meta__value">Designer</p>
                  <p className="hb-meta__value">Developer</p>
                </div>
                <div className="hb-meta__item">
                  <div className="hb-meta__label">
                    <img src={iconClock} alt="" className="hb-meta__icon" />
                    <span>Timeline</span>
                  </div>
                  <p className="hb-meta__value">Jun – Aug 2026</p>
                </div>
                <div className="hb-meta__item">
                  <div className="hb-meta__label">
                    <img src={iconUsers} alt="" className="hb-meta__icon" />
                    <span>Team</span>
                  </div>
                  <p className="hb-meta__value">Solo project</p>
                </div>
                <div className="hb-meta__item">
                  <div className="hb-meta__label">
                    <img src={iconSpanner} alt="" className="hb-meta__icon" />
                    <span>Tools</span>
                  </div>
                  <p className="hb-meta__value">Figma</p>
                  <p className="hb-meta__value">Claude Code</p>
                  <p className="hb-meta__value">Reve AI</p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ── 01 · The game loop ── */}
          <section id="hb-game-loop" className="hb-section">
            <Reveal><p className="hb-label">OVERVIEW</p></Reveal>
            <Reveal delay={0.05}><h2 className="hb-h2">Prepare by day.<br />Defend by night.</h2></Reveal>
            <Reveal delay={0.08}>
              <p className="hb-body">
                Homebody is a 2D top-down pixel-art survival wave-defense game, playable solo or in multiplayer directly in the browser, with no install required.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="hb-body">
                The game runs on a day/night cycle. During the day, explore an open-world map and gather resources to prepare your gear and defenses. At night, waves of enemies attack you and your house. Each night gets harder to survive, so the pressure to prepare defenses during the day keeps ramping.
              </p>
            </Reveal>
            <div className="hb-two-col">
              <Reveal delay={0}>
                <div className="hb-loop-card">
                  <p className="hb-loop-card__phase">DAY</p>
                  <p className="hb-loop-card__title">Explore. Gather. Prepare.</p>
                  <p className="hb-loop-card__body">Explore the open world, gather resources, and prepare your gear and defenses.</p>
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <div className="hb-loop-card">
                  <p className="hb-loop-card__phase">NIGHT</p>
                  <p className="hb-loop-card__title">Defend. Survive. Repeat.</p>
                  <p className="hb-loop-card__body">Protect yourself and your house from enemy waves. Each night gets harder.</p>
                </div>
              </Reveal>
            </div>
          </section>

          {/* ── 02 · Pain points & inspirations ── */}
          <section id="hb-pain-points" className="hb-section">
            <Reveal><p className="hb-label">PAIN POINTS &amp; INSPIRATIONS</p></Reveal>
            <Reveal delay={0.05}><h2 className="hb-h2">Easy to join. A reason to stay.</h2></Reveal>
            <div className="hb-three-col">
              {homebodyPainPoints.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.08}>
                  <div className="hb-pain-card">
                    <p className="hb-pain-card__title">{p.title}</p>
                    <p className="hb-pain-card__body">{p.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal><h3 className="hb-h3">Learning from familiar worlds</h3></Reveal>
            <div className="hb-inspirations">
              {homebodyInspirations.map((game, i) => (
                <Reveal key={game.key} delay={i * 0.06}>
                  <div className="hb-inspiration">
                    <img src={game.icon} alt={game.name} className={`hb-inspiration__icon hb-inspiration__icon--${game.key}`} />
                    <div className="hb-inspiration__body">
                      <p className="hb-inspiration__name">{game.name}</p>
                      <p className="hb-inspiration__pro">{game.pro}</p>
                      <p className="hb-inspiration__con">{game.con}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* ── 03 · Process ── */}
          <section id="hb-process" className="hb-section">
            <Reveal><p className="hb-label">PROCESS</p></Reveal>
            <Reveal delay={0.05}><h2 className="hb-h2">From a brainstorm to playable iterations.</h2></Reveal>
            <Reveal delay={0.08}><h3 className="hb-h3">Brainstorm &amp; scope</h3></Reveal>
            <Reveal delay={0.1}>
              <p className="hb-body">
                I started with a Google Doc brainstorm of mechanics, enemies, and recipes. I used Claude to push half-formed ideas further and balance the numbers, then turned it into a PRD that I reprioritized by hand.
              </p>
            </Reveal>
            <Reveal delay={0.05}><p className="hb-subsection">Three non-negotiables</p></Reveal>
            <div className="hb-three-col">
              {NON_NEGOTIABLES.map((n, i) => (
                <Reveal key={n.num} delay={i * 0.08}>
                  <div className="hb-non-neg-card">
                    <p className="hb-non-neg-card__num">{n.num}</p>
                    <p className="hb-non-neg-card__title">{n.title}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal><h3 className="hb-h3">Build one playable feature at a time.</h3></Reveal>
            <Reveal delay={0.05}>
              <p className="hb-body">
                I built Homebody one playable feature at a time, testing each before starting the next.
              </p>
            </Reveal>
          </section>

          {/* ── 04 · Visual direction ── */}
          <section id="hb-visual" className="hb-section">
            <Reveal><p className="hb-label">VISUAL DIRECTION</p></Reveal>
            <Reveal delay={0.05}><h2 className="hb-h2">A cozy, fun world</h2></Reveal>
            <Reveal delay={0.08}>
              <div className="hb-visual-split">
                <div className="hb-visual-split__text">
                  <p className="hb-body">
                    I wanted a cute, vibrant pixel-art style with medieval characters, enemies, and buildings. A 2D top-down view suits a cozy browser game: it's readable at a glance and keeps every player's base in view.
                  </p>
                  <p className="hb-body">
                    A public asset pack gave me a baseline, but it didn't cover everything the design needed. I filled the gaps with my own pipeline.
                  </p>
                </div>
                <div className="hb-pawn" aria-hidden="true">
                  <img className="hb-pawn__shadow" src={homebodyPawnShadow} alt="" />
                  <span className="hb-pawn__sprite" style={{ backgroundImage: `url(${homebodyPawnRun})` }} />
                </div>
              </div>
            </Reveal>
            <Reveal><h3 className="hb-h3">The pixel-art pipeline</h3></Reveal>
            <div className="hb-pipeline-grid">
              {PIPELINE_STEPS.map((step, i) => (
                <Reveal key={step.num} delay={i * 0.06}>
                  <div className="hb-pipeline-card">
                    <p className="hb-pipeline-card__num">{step.num}</p>
                    <p className="hb-pipeline-card__title">{step.title}</p>
                    <p className="hb-pipeline-card__body">{step.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.05}>
              <div className="hb-callout">
                <p className="hb-callout__heading">A starting point—not an asset shortcut.</p>
                <p className="hb-body">
                  I used Homebody to test where AI belongs in a design workflow. Generation was great for getting a starting point fast, but nothing went in as-is. Every generated asset went through my own pixel pass so it matched the rest.
                </p>
              </div>
            </Reveal>
          </section>

          {/* ── 05 · Gameplay systems ── */}
          <section id="hb-gameplay" className="hb-section">
            <Reveal><p className="hb-label">GAMEPLAY SYSTEMS</p></Reveal>
            <Reveal delay={0.05}><h2 className="hb-h2">A world built around the next night.</h2></Reveal>
            <div className="hb-video-grid">
              {[
                { label: 'Combat',             src: combat.src,    poster: combat.poster,    ariaLabel: 'Combat gameplay' },
                { label: 'Resource gathering', src: resources.src, poster: resources.poster, ariaLabel: 'Resource gathering gameplay' },
                { label: 'Crafting',           src: crafting.src,  poster: crafting.poster,  ariaLabel: 'Crafting gameplay' },
                { label: 'Base Building',      src: building.src,  poster: building.poster,  ariaLabel: 'Base building gameplay' },
                { label: 'Biome Exploration',  src: biome1.src,    poster: biome1.poster,    ariaLabel: 'Biome exploration gameplay' },
                { label: '',                   src: biome2.src,    poster: biome2.poster,    ariaLabel: 'Biome exploration gameplay 2' },
              ].map((v, i) => (
                <Reveal key={v.ariaLabel} delay={i * 0.06}>
                  <div className="hb-video-item">
                    {v.label && <p className="hb-video-item__label">{v.label}</p>}
                    <GameVideo src={v.src} poster={v.poster} label={v.ariaLabel} />
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal><p className="hb-subsection">Explore, gather, craft, and defend your home.</p></Reveal>
            <div className="hb-systems">
              {GAMEPLAY_SYSTEMS.map((s, i) => (
                <Reveal key={s.num} delay={i * 0.06}>
                  <div className="hb-system">
                    <p className="hb-system__num">{s.num}</p>
                    <div>
                      <p className="hb-system__title">{s.title}</p>
                      <p className="hb-system__body">{s.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* ── 06 · Tech stack ── */}
          <section id="hb-tech" className="hb-section">
            <Reveal><p className="hb-label">TECH STACK</p></Reveal>
            <Reveal delay={0.05}><h2 className="hb-h2">Built for the browser.<br />Connected in real time.</h2></Reveal>
            <div className="hb-tech-row hb-tech-row--three">
              {homebodyTechStack.slice(0, 3).map((item, i) => (
                <Reveal key={item.name} delay={i * 0.08}>
                  <div className="hb-tech-card">
                    <div className="hb-tech-card__head">
                      <img src={item.icon} alt="" className="hb-tech-card__icon" />
                      <p className="hb-tech-card__name">{item.name}</p>
                    </div>
                    <p className="hb-tech-card__body">{item.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <div className="hb-tech-row hb-tech-row--two">
              {homebodyTechStack.slice(3).map((item, i) => (
                <Reveal key={item.name} delay={i * 0.08}>
                  <div className="hb-tech-card">
                    <div className="hb-tech-card__head">
                      <img src={item.icon} alt="" className="hb-tech-card__icon" />
                      <p className="hb-tech-card__name">{item.name}</p>
                    </div>
                    <p className="hb-tech-card__body">{item.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

        </div>

        <button className="hb-back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          ↑ Back to top
        </button>
      </main>
    </div>
  )
}

export default HomebodyCaseStudy
