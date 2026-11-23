import { useSections } from '../contexts/NavSidebarContext'
import BackToTop from './BackToTop'
import Reveal from './Reveal'
import iconEmoji from '../assets/v3/icon-emoji.svg'
import iconClock from '../assets/v3/icon-clock.svg'
import iconUsers from '../assets/v3/icon-users.svg'
import iconSpanner from '../assets/v3/icon-spanner.svg'
import appShowcase from '../assets/v3/homie/app-showcase.png'
import homieOnboarding  from '../assets/Homie-onboarding.mp4'
import homieDashboard   from '../assets/Homie-dashboard.mp4'
import homieShoping     from '../assets/Homie-Shopping.mp4'
import homiePantry      from '../assets/Homie-Pantry.mp4'
import homieChores      from '../assets/Homie-Chores.mp4'
import homieCalendar    from '../assets/Homie-Calendar.mp4'
import earlyFlows from '../assets/v3/homie/early-flows.png'
import midFidelityFlows from '../assets/v3/homie/mid-fidelity-flows.png'
import screenExplorations from '../assets/v3/homie/screen-explorations.png'
import catHouseMark from '../assets/v3/homie/cat-house-mark.svg'
import './HomieCaseStudyV3.css'

const FEATURES = [
  { title: 'Onboarding',     video: homieOnboarding, body: 'Get started with the app by setting up your account. Create a new household and invite roommates with a room code, or join an existing Room. Customize your name and your household name.' },
  { title: 'Dashboard',      video: homieDashboard,  body: 'Each feature shows up as a widget with one glanceable line: "Your chore this week: bathroom," "Milk expires in 2 days," "Game night Monday 7pm." The most important information is readable in two seconds without opening anything.' },
  { title: 'Shopping List',  video: homieShoping,    body: "Each request holds an item name, who it's for, due date, type (grocery, cleaning, etc), who claimed it, and a note. The list sorts by urgency. Bought items go into a purchase history." },
  { title: 'Pantry',         video: homiePantry,     body: 'Each item holds a name, quantity, expiration date, and a tag. Users can add items manually or by scanning barcodes. The overview sorts by soonest expiration.' },
  { title: 'Chores',         video: homieChores,     body: 'Adding a chore takes a name, an assignee, due date, and a frequency. Chores can also be added to the household calendar. Completions are represented visually with a donut graph.' },
  { title: 'Calendar',       video: homieCalendar,   body: 'Each event holds a name, date and time, recurrence, and notes. The calendar has a week and month view. Tapping an event opens a detail sheet — the owner sees Edit, everyone else sees details.' },
]

function HomieCaseStudyV3() {
  useSections([
    { id: 'intro',           label: 'Intro' },
    { id: 'problem',         label: 'Problem' },
    { id: 'solution',        label: 'Solution' },
    { id: 'personas',        label: 'Personas' },
    { id: 'comp-analysis',   label: 'Comp. analysis' },
    { id: 'direction',       label: 'Direction' },
    { id: 'process',         label: 'Process' },
    { id: 'visual-identity', label: 'Visual Identity' },
  ])

  return (
    <div className="cs-page">

      <main className="cs-main">
        <div className="cs-content">

          {/* ── Hero ── */}
          <section id="intro" className="cs-section">
            <Reveal><h1 className="cs-title">Homie</h1></Reveal>
            <Reveal delay={0.05}><p className="cs-subtitle">A digital household facilitating roommate coordination</p></Reveal>

            <Reveal delay={0.1}>
              <div className="cs-hero-image">
                <img src={appShowcase} alt="Homie app showcase" className="cs-hero-image__bg" />
                <div className="cs-phone-wrap">
                  <video src={homieOnboarding} autoPlay muted loop playsInline className="cs-phone-video" />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="cs-meta">
                <div className="cs-meta__item">
                  <div className="cs-meta__label">
                    <img src={iconEmoji} alt="" />
                    <span>Role</span>
                  </div>
                  <p>Product Designer</p>
                  <p>Developer</p>
                </div>
                <div className="cs-meta__item">
                  <div className="cs-meta__label">
                    <img src={iconClock} alt="" />
                    <span>Timeline</span>
                  </div>
                  <p>March – June 2026</p>
                </div>
                <div className="cs-meta__item">
                  <div className="cs-meta__label">
                    <img src={iconUsers} alt="" />
                    <span>Team</span>
                  </div>
                  <p>2 Product Managers</p>
                  <p>4 Designers</p>
                  <p>3 Developers</p>
                </div>
                <div className="cs-meta__item">
                  <div className="cs-meta__label">
                    <img src={iconSpanner} alt="" />
                    <span>Tools</span>
                  </div>
                  <p>Figma</p>
                  <p>Claude Code</p>
                </div>
              </div>
            </Reveal>
          </section>

          {/* ── The Problem ── */}
          <section id="problem" className="cs-section">
            <Reveal><p className="cs-eyebrow">THE PROBLEM</p></Reveal>
            <Reveal delay={0.05}>
            <div className="cs-problem">
              <div className="cs-problem__left">
                <h2 className="cs-h2">Conflict stems from poor communication &amp; confusion</h2>
                <p className="cs-body">
                  As college students, we've heard of and even experienced first-hand, countless roommate struggles.
                  <br /><br />
                  Roommate conflict usually stem from poor communication and confusion.
                  <br /><br />
                  Most students manage their roommate situation through scattered text messages and assumptions leading to tension, forgotten responsibilities, wasted food, and even arguments.
                </p>
              </div>
              <div className="cs-problem__right">
                <p className="cs-body--white">We surveyed 65+ college students</p>
                <div className="cs-stats">
                  <div className="cs-stat-card">
                    <span className="cs-stat-card__number">92%</span>
                    <p className="cs-stat-card__label">had never used an app to manage their living situation</p>
                  </div>
                  <div className="cs-stat-card">
                    <span className="cs-stat-card__number">77%</span>
                    <p className="cs-stat-card__label">coordinate with roommates over iMessage or in person</p>
                  </div>
                  <div className="cs-stat-card cs-stat-card--tall">
                    <p className="cs-stat-card__heading">Top Complaints</p>
                    <p className="cs-stat-card__label">coordinate with roommates over iMessage or in person</p>
                  </div>
                </div>
              </div>
            </div>
            </Reveal>
          </section>

          {/* ── Solution ── */}
          <section id="solution" className="cs-section">
            <Reveal><p className="cs-eyebrow">SOLUTION</p></Reveal>
            <Reveal delay={0.05}><h2 className="cs-h2">One unified home with everything in view.</h2></Reveal>

            <div className="cs-feature-list">
              {FEATURES.map((f, i) => (
                <Reveal key={f.title} delay={i * 0.05}>
                  <div className="cs-feature">
                    <div className="cs-feature__phone">
                      <video src={f.video} autoPlay muted loop playsInline className="cs-feature__video" />
                    </div>
                    <div className="cs-feature__info">
                      <p className="cs-feature__title">{f.title}</p>
                      <p className="cs-body--muted">{f.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* ── Personas ── */}
          <section id="personas" className="cs-section">
            <Reveal><p className="cs-eyebrow">PERSONAS</p></Reveal>
            <Reveal delay={0.05}><h2 className="cs-h2">Two roommates. Shared needs.</h2></Reveal>

            <Reveal delay={0.08}>
            <div className="cs-personas">
              <div className="cs-persona-card">
                <p className="cs-persona-card__name">Paola</p>
                <p className="cs-body--muted">Paola is the social butterfly in the apartment. She has friends over most weekends and wants her roommates to feel included. Today she tried to coordinate over iMessage and hopes people see.</p>
                <p className="cs-label">GOALS</p>
                <p className="cs-body--muted">Give roommates a heads-up early, know if a plan is a problem before it happens, keep the shared space feeling shared</p>
                <p className="cs-label">STRUGGLES</p>
                <p className="cs-body--muted">messages get buried, no clear way to ask "is this okay?", finding out after the fact that someone was annoyed</p>
              </div>
              <div className="cs-persona-card">
                <p className="cs-persona-card__name">Kathy</p>
                <p className="cs-body--muted">Kathy is juggling a heavy course load and a part-time job. She doesn't want to police anyone, she just needs to know what's happening at home and when she can count on quiet.</p>
                <p className="cs-label">GOALS</p>
                <p className="cs-body--muted">Request quiet time for exams and interviews, remember her chore week without thinking about it, use her groceries before they expire</p>
                <p className="cs-label">STRUGGLES</p>
                <p className="cs-body--muted">Forgetting rotations, food going bad in the back of the fridge, feeling like the nag when she reminds people</p>
              </div>
            </div>
            </Reveal>

            <Reveal><h3 id="comp-analysis" className="cs-h3">Competitive analysis</h3></Reveal>
            <Reveal delay={0.05}>
              <div className="cs-table">
                <div className="cs-table__header">
                  <span className="cs-table__col--tool">TOOL</span>
                  <span className="cs-table__col--works">WHAT WORKS</span>
                  <span className="cs-table__col--missing">WHAT'S MISSING FOR ROOMMATES</span>
                </div>
                {[
                  { tool: 'iMessage', works: 'Everyone already has it, instant', missing: 'Plans and requests get buried, no shared state of the house' },
                  { tool: 'Google Calendar', works: 'Familiar, reliable scheduling', missing: 'No house-level view, no way to ask "is this okay?"' },
                  { tool: 'Splitwise', works: 'Strong at splitting bills', missing: 'Bills only, no chores, lists or calendar, free tier now capped' },
                  { tool: 'OurHome', works: 'Chores, shopping list and calendar in one', missing: 'Point-based rewards can feel childish for adults, dated interface' },
                ].map((row) => (
                  <div className="cs-table__row" key={row.tool}>
                    <span className="cs-table__col--tool">{row.tool}</span>
                    <span className="cs-table__col--works">{row.works}</span>
                    <span className="cs-table__col--missing">{row.missing}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </section>

          {/* ── Product Direction ── */}
          <section id="direction" className="cs-section">
            <Reveal><p className="cs-eyebrow">PRODUCT DIRECTION</p></Reveal>
            <Reveal delay={0.05}><h2 className="cs-h2">Visibility over conversation.</h2></Reveal>
            <Reveal delay={0.08}><p className="cs-body--muted cs-body--lg">Homie is a mobile app designed for roommates to organize all household logistics in one place. Through features such as a chore tracker, a shared calendar for the house, and a combined shopping list, Homie creates a space for accountability and clear management.</p></Reveal>

            {[
              { num: '01', title: 'Make responsibilities visible', body: 'A chore system the house writes itself, with rotations everyone can see, so no one has to ask whose turn it is.' },
              { num: '02', title: 'Make the fridge visible', body: "Track what's expiring and what's up for grabs, and coordinate who's buying what before the store run." },
              { num: '03', title: 'Make plans visible before they happen', body: 'A shared calendar where hosting plans and quiet hours meet early, with a way to raise a concern.' },
            ].map((p, i) => (
              <Reveal key={p.num} delay={i * 0.08}>
                <div className="cs-principle">
                  <span className="cs-principle__num">{p.num}</span>
                  <div>
                    <p className="cs-principle__title">{p.title}</p>
                    <p className="cs-body--muted cs-body--lg">{p.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </section>

          {/* ── Process ── */}
          <section id="process" className="cs-section">
            <Reveal><p className="cs-eyebrow">PROCESS</p></Reveal>
            <Reveal delay={0.05}><h2 className="cs-h2">From priorities to user flows.</h2></Reveal>
            <Reveal delay={0.08}><p className="cs-body--muted cs-body--lg">Brainstormed from the survey and other research, then created a short PRD for each feature. Every requirement got a priority. Prioritizing forced the decisions that shaped the product.</p></Reveal>

            <div className="cs-priority-cards">
              {[
                { level: 'P0', desc: 'Must ship for MVP' },
                { level: 'P1', desc: 'Makes it delightful' },
                { level: 'P2', desc: 'Nice to have' },
              ].map((p, i) => (
                <Reveal key={p.level} delay={i * 0.08}>
                  <div className="cs-priority-card">
                    <p className="cs-priority-card__level">{p.level}</p>
                    <p className="cs-body--muted">{p.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal><h3 className="cs-h3">Mapping user flows in low / mid fidelity</h3></Reveal>
            <Reveal delay={0.05}>
              <div className="cs-gallery-card">
                <img src={earlyFlows} alt="Early mobile flows" />
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="cs-gallery-card">
                <img src={midFidelityFlows} alt="Mid-fidelity feature flows" />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="cs-gallery-card">
                <img src={screenExplorations} alt="Additional screen explorations" />
              </div>
            </Reveal>
          </section>

          {/* ── Visual Language ── */}
          <section id="visual-identity" className="cs-section">
            <Reveal><p className="cs-eyebrow">VISUAL LANGUAGE</p></Reveal>
            <Reveal delay={0.05}><h2 className="cs-h2">A friendly space, not another task manager.</h2></Reveal>
            <Reveal delay={0.08}><p className="cs-body--muted cs-body--lg">The visual language was aimed to feel like a friendly, shared space, and less of a soulless productivity tool. Chores and rent are stressful enough already. An early concept for the dashboard was magnets on a fridge, inspired by the place roommates already leave notes for each other, but felt too childish in high fidelity.</p></Reveal>

            <Reveal delay={0.1}>
            <div className="cs-design-system">
              <p className="cs-design-system__label">Homie / Design system</p>
              <p style={{ fontFamily: "'Gowun Batang', serif", fontWeight: 700, fontSize: 32, color: '#2e0800', lineHeight: 1 }}>Header 1 - 32 pt Gowun Batang (Bold)</p>
              <p style={{ fontFamily: "'Gowun Batang', serif", fontWeight: 700, fontSize: 22, color: '#2e0800', lineHeight: 1.3 }}>Header 2 - 22 pt Gowun Batang (Bold)</p>
              <p style={{ fontFamily: "'Gowun Batang', serif", fontWeight: 700, fontSize: 16, color: '#2e0800', lineHeight: 1.2 }}>Body 1 - 16 pt Gowun Batang (Bold)</p>
              <p style={{ fontFamily: "'Albert Sans', sans-serif", fontWeight: 500, fontSize: 14, color: '#2e0800' }}>Body Medium - 14 pt Albert Sans (Medium)</p>
              <p style={{ fontFamily: "'Albert Sans', sans-serif", fontWeight: 400, fontSize: 14, color: '#2e0800' }}>Body Regular - 14 pt Albert Sans (Regular)</p>
              <p style={{ fontFamily: "'Albert Sans', sans-serif", fontWeight: 400, fontSize: 12, color: '#2e0800' }}>Small - 12 pt Albert Sans (Regular)</p>
              <div className="cs-color-palette">
                <div className="cs-color-swatch" style={{ background: '#2e0800' }} />
                <div className="cs-color-swatch" style={{ background: 'rgba(46,8,0,0.67)' }} />
                <div className="cs-color-swatch" style={{ background: '#d0bcb2' }} />
                <div className="cs-color-swatch" style={{ background: '#4d797e' }} />
                <div className="cs-color-swatch" style={{ background: '#fcf5ee' }} />
                <div className="cs-color-swatch cs-color-swatch--wide" style={{ background: 'linear-gradient(151deg, #ffd2cd 1.6%, #fffbe4 56%, #7cebff 100%)' }} />
              </div>
            </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="cs-brand">
                <img src={catHouseMark} alt="Homie cat and house logo mark" className="cs-brand__mark" />
                <div className="cs-brand__text">
                  <p className="cs-h3" style={{ marginBottom: 16 }}>Homey, by design.</p>
                  <p className="cs-body--muted cs-body--lg">The logo combines a house outline and a cat, one of the most common house pets. It plays on "Homie," meaning a good friend, and "homey," meaning cozy, comfortable, and inviting. Pets bring a sense of warmth and calmness—the feeling Homie aims to bring to the user.</p>
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

export default HomieCaseStudyV3
