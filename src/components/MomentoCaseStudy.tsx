import { useSections } from '../contexts/NavSidebarContext'
import BackToTop from './BackToTop'
import MomentoIcon from './MomentoIcon'
import Reveal from './Reveal'
import iconEmoji   from '../assets/v3/icon-emoji.svg'
import iconClock   from '../assets/v3/icon-clock.svg'
import iconUsers   from '../assets/v3/icon-users.svg'
import iconSpanner from '../assets/v3/icon-spanner.svg'
import momentoBg from '../assets/momento-bg.webp'
import momentoPolaroidPhoto from '../assets/momento-polaroid-photo.webp'
import momentoPin from '../assets/momento-pin.svg'
import ipadFrame from '../assets/momento-cs/ipad-mockup.png'
import ipadScreenshot from '../assets/momento-cs/ipad-screenshot.png'
import { momentoJourneys, momentoVisualDirection } from '../data/momento'
import './MomentoCaseStudy.css'

const PROBLEMS = [
  {
    num: '1',
    title: 'Photos and locations are disconnected.',
    body: "Camera rolls bury locations in clutter, while apps like Instagram don't connect photos to places by default.",
  },
  {
    num: '2',
    title: 'No collective view of where people go.',
    body: 'Discovery on social media relies on curated "top 10" lists and influencer content, not real, organic behavior.',
  },
  {
    num: '3',
    title: 'No sense of activity over time.',
    body: "Existing data is static. There's no way to see trends shift week to week or season to season.",
  },
]

const SWATCHES = [
  { hex: '#FF7A33', label: '#FF7A33' },
  { hex: '#FDA831', label: '#FDA831' },
  { hex: '#208BEA', label: '#208BEA' },
  { hex: '#3B7DD8', label: '#3B7DD8' },
]

function MomentoCaseStudy() {
  useSections([
    { id: 'mc-problem',  label: 'Problem' },
    { id: 'mc-solution', label: 'Solution' },
    { id: 'mc-journeys', label: 'User Journeys' },
    { id: 'mc-visual',   label: 'Visual Direction' },
    { id: 'mc-design',   label: 'Design System' },
  ])

  return (
    <div className="mc-page">
      <main className="mc-main">
        <div className="mc-content">

          {/* ── Title + Hero + Problem ── */}
          <div className="mc-top-group">
            <Reveal><h1 className="mc-title">Momento</h1></Reveal>
            <Reveal delay={0.05}><p className="mc-tagline">A map-based photo journal that connects personal memories with local discovery.</p></Reveal>

            {/* Hero card */}
            <Reveal delay={0.1}>
              <div className="mc-hero">
                <div className="mc-hero__map" aria-hidden="true">
                  <img src={momentoBg} alt="" className="mc-hero__map-img" />
                </div>
                <div className="mc-hero__logo">
                  <span className="mc-hero__logo-icon"><MomentoIcon /></span>
                  <span className="mc-hero__logo-text">MOMENTO</span>
                </div>
                <div className="mc-hero__ipad-wrap">
                  <div className="mc-hero__ipad-portrait">
                    <img src={ipadFrame} alt="" className="mc-hero__ipad-frame" />
                    <div className="mc-hero__ipad-screen">
                      <div className="mc-hero__ipad-screen-inner">
                        <img src={ipadScreenshot} alt="Momento app" className="mc-hero__ipad-screenshot" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Meta description */}
            <Reveal delay={0.05}>
              <div className="mc-meta">
                <div className="mc-meta__item">
                  <div className="mc-meta__label">
                    <img src={iconEmoji} alt="" className="mc-meta__icon" />
                    <span>Role</span>
                  </div>
                  <p className="mc-meta__value">Product Designer</p>
                  <p className="mc-meta__value">Developer</p>
                </div>
                <div className="mc-meta__item">
                  <div className="mc-meta__label">
                    <img src={iconClock} alt="" className="mc-meta__icon" />
                    <span>Timeline</span>
                  </div>
                  <p className="mc-meta__value">March – June 2026</p>
                </div>
                <div className="mc-meta__item">
                  <div className="mc-meta__label">
                    <img src={iconUsers} alt="" className="mc-meta__icon" />
                    <span>Team</span>
                  </div>
                  <p className="mc-meta__value">2 Product Managers</p>
                  <p className="mc-meta__value">4 Designers</p>
                  <p className="mc-meta__value">3 Developers</p>
                </div>
                <div className="mc-meta__item">
                  <div className="mc-meta__label">
                    <img src={iconSpanner} alt="" className="mc-meta__icon" />
                    <span>Tools</span>
                  </div>
                  <p className="mc-meta__value">Figma</p>
                  <p className="mc-meta__value">Claude Code</p>
                </div>
              </div>
            </Reveal>

            {/* Problem */}
            <section id="mc-problem" className="mc-problem">
              <Reveal><p className="mc-label">PROBLEM</p></Reveal>
              <Reveal delay={0.05}><h2 className="mc-h2">Photos capture moments. Places get lost.</h2></Reveal>
              <Reveal delay={0.08}>
                <p className="mc-body">
                  We take more photos than ever, yet they tell us almost nothing about where we've been.
                  People expected to take about 2.1 trillion photos in 2025, 94% of them on phones.
                  Meanwhile, finding where to go next is handed to feeds built for engagement, not accuracy.
                </p>
              </Reveal>
              <div className="mc-pain-points">
                {PROBLEMS.map((p, i) => (
                  <Reveal key={p.num} delay={i * 0.08}>
                    <div className="mc-pain-card">
                      <p className="mc-pain-card__num">{p.num} •</p>
                      <p className="mc-pain-card__title">{p.title}</p>
                      <p className="mc-pain-card__body">{p.body}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>
          </div>

          {/* ── Solution ── */}
          <section id="mc-solution" className="mc-solution">
            <Reveal>
              <div className="mc-solution__left">
                <div className="mc-polaroid-wrap">
                  <div className="mc-polaroid__bg" aria-hidden="true">
                    <img src={momentoBg} alt="" />
                  </div>
                  <div className="mc-polaroid__card">
                    <img src={momentoPolaroidPhoto} alt="Matcha pop up at DTLA" className="mc-polaroid__photo" />
                    <p className="mc-polaroid__caption">{'Matcha pop up at\nDTLA'}</p>
                  </div>
                  <img src={momentoPin} alt="" className="mc-polaroid__pin" />
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mc-solution__right">
                <h2 className="mc-h2">Your memories get mapped</h2>
                <p className="mc-body">
                  Momento ties photos directly to map locations. Users pin uploads to coordinates on an interactive
                  Leaflet map, building a personal visual log of where they've been, with searchable and filterable galleries.
                </p>
                <p className="mc-body">
                  A public "Explore" feed and a community heatmap aggregate public photos to reveal activity across
                  the city and help people discover new places worth visiting.
                </p>
                <p className="mc-label mc-label--spaced">HEATMAP VIEWS</p>
                <div className="mc-filter-pills">
                  {['Week', 'Month', 'Year', 'All time'].map(f => (
                    <span key={f} className="mc-filter-pill">{f}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          </section>

          {/* ── User Journeys ── */}
          <section id="mc-journeys" className="mc-section">
            <Reveal><h2 className="mc-h2">From making plans to looking back.</h2></Reveal>
            <Reveal delay={0.05}><p className="mc-body">Mapping user journeys</p></Reveal>
            <Reveal delay={0.1}>
              <div className="mc-journey-table">
                <div className="mc-journey-table__header">
                  <span>Moment</span>
                  <span>What's the user doing?</span>
                  <span>What can Momento do?</span>
                </div>
                {momentoJourneys.map((j, i) => (
                  <div
                    key={i}
                    className={`mc-journey-table__row${i % 2 === 1 ? ' mc-journey-table__row--alt' : ''}`}
                  >
                    <span className="mc-journey-table__moment">{j.moment}</span>
                    <span>{j.doing}</span>
                    <span className="mc-journey-table__action">{j.momento}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </section>

          {/* ── Visual Direction ── */}
          <section id="mc-visual" className="mc-section">
            <Reveal><h2 className="mc-h2">From a photo to a keepsake.</h2></Reveal>
            <Reveal delay={0.05}><p className="mc-body">Visual direction</p></Reveal>
            <Reveal delay={0.08}><p className="mc-body">{momentoVisualDirection}</p></Reveal>
          </section>

          {/* ── Design System ── */}
          <section id="mc-design" className="mc-section">
            <Reveal><h2 className="mc-h2">An identity made for exploring.</h2></Reveal>

            <Reveal delay={0.05}>
              <div className="mc-design-block">
                <p className="mc-subsection-h">Color</p>
                <p className="mc-body">Energetic orange leads the logo, pins and main actions. Blue is its complement.</p>
                <div className="mc-swatches">
                  {SWATCHES.map(s => (
                    <div key={s.hex} className="mc-swatch">
                      <div className="mc-swatch__color" style={{ background: s.hex }} />
                      <p className="mc-swatch__label">{s.label}</p>
                    </div>
                  ))}
                </div>
                <p className="mc-body">
                  Momento is about getting out and exploring, so the palette should feel energetic and alive.
                  Vibrant orange #FF7A33 and blue #208BEA pair with softer #FDA831 and #3B7DD8 for text and backgrounds.
                </p>
              </div>
            </Reveal>

            <div className="mc-divider" />

            <Reveal delay={0.05}>
              <div className="mc-design-block">
                <p className="mc-subsection-h">Typography</p>
                <div className="mc-type-row">
                  <div className="mc-type-col">
                    <p className="mc-label">DISPLAY / JUST ANOTHER HAND</p>
                    <p className="mc-type-display">Just Another Hand.</p>
                    <p className="mc-body">
                      Just Another Hand is a handwritten display face used for titles. It gives Momento a playful,
                      scrapbook-like feel, like a note scribbled on a photo.
                    </p>
                  </div>
                  <div className="mc-type-col">
                    <p className="mc-label">HEADINGS &amp; BODY / INTER</p>
                    <p className="mc-type-inter">Inter</p>
                    <p className="mc-body">
                      Inter is neutral, calm, and a web standard. It balances the handwriting and stays readable
                      at small sizes over a map.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </section>

          <BackToTop />
        </div>
      </main>
    </div>
  )
}

export default MomentoCaseStudy
