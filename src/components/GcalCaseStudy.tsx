import React, { useRef, useState } from 'react'
import step5Img from '../assets/gcal/step5-autobook.png'
import pollingPlaceholder from '../assets/Polling selected (1).png'
import { useSections } from '../contexts/NavSidebarContext'
import Reveal from './Reveal'
import iconEmoji   from '../assets/v3/icon-emoji.svg'
import iconClock   from '../assets/v3/icon-clock.svg'
import iconUsers   from '../assets/v3/icon-users.svg'
import iconSpanner from '../assets/v3/icon-spanner.svg'
import overviewVideo from '../assets/Gcal polling demo.mp4'
import BackToTop from './BackToTop'
import './GcalCaseStudy.css'

const PAIN_POINTS = [
  {
    accent: '#ce8d38',
    title: "Free time isn't narrowed down.",
    body: "Calendar can show people's open slots, but it doesn't pick one. You're left scanning a wall of open times with no clear best choice.",
  },
  {
    accent: '#885ca8',
    title: 'Coordination lives outside the calendar.',
    body: 'When2meet links, Slack reacts and group chats all sit outside Calendar. That means extra tabs, manual entry and replies that get lost.',
  },
  {
    accent: '#3059d2',
    title: 'One person carries the load.',
    body: 'Someone ends up chasing replies, comparing schedules and sending the invite. All the coordination falls on one person.',
  },
]

const STEPS = [
  {
    num: '01',
    label: 'Create a plan',
    title: 'Create a plan.',
    body: 'The organizer sets an event poll, same UI as natural GCal. Decide how many time slots are suggested, and toggle auto scheduling the highest voted time by a certain date.',
    videoStart: 0,
    videoEnd: 20,
  },
  {
    num: '02',
    label: 'Get best times',
    title: 'Get the best times.',
    body: "GCal Polling reads everyone's free/busy blocks and ranks the top few slots. This solves pain point 1: no more scanning a wall of open times.",
    videoStart: 20,
    videoEnd: 25,
  },
  {
    num: '03',
    label: 'Vote in one tap',
    title: 'Vote in one tap.',
    body: 'Everyone votes on the suggested times from their GCal or link, no account needed. This keeps coordination inside Calendar instead of across tabs and chats (pain point 2).',
    videoStart: 25,
    videoEnd: 31,
  },
  {
    num: '04',
    label: 'Hold & nudge',
    title: 'Hold and nudge.',
    body: "Each option shows on everyone's calendar as a tentative hold so nobody double-books it. People who haven't voted get automatic reminders.",
    videoStart: 32,
    videoEnd: 36,
  },
  {
    num: '05',
    label: 'Auto-book',
    title: 'Book automatically.',
    body: 'At a set date/time, the top time becomes a scheduled event with invites sent and the other holds cleared. Nobody has to chase replies or send the invite by hand (pain point 3).',
    videoStart: null,
    videoEnd: null,
  },
]

const AUDIENCES = [
  {
    group: 'Professionals',
    benefit: "Ends back-and-forth emails by suggesting open times from everyone's calendars, holding them, and booking the winner automatically.",
  },
  {
    group: 'Student orgs',
    benefit: "Members have clashing class schedules and calendars, so the app finds a time that works for everyone and books it. No officer has to chase replies across GroupMe, Slack and iMessage.",
  },
  {
    group: 'Friend groups',
    benefit: "Turns \"we should hang out sometime\" into a real plan, with one-tap voting and nudges so it doesn't die in the group chat.",
  },
]

const COMPETITORS = [
  { app: 'When2meet',          readsCalendars: 'No',          groupVoting: 'Heatmap',  autoCreates: 'No',     holdsNudges: 'No',         worksAcross: 'Yes', isGcal: false },
  { app: 'Doodle',             readsCalendars: 'Paid tiers',  groupVoting: 'Yes',      autoCreates: 'Partly', holdsNudges: 'Reminders',  worksAcross: 'Yes', isGcal: false },
  { app: 'Calendly',           readsCalendars: 'Yes',         groupVoting: '1:1 only', autoCreates: 'Yes',    holdsNudges: 'No',         worksAcross: 'Yes', isGcal: false },
  { app: 'GCal "Find a time"', readsCalendars: 'Yes (orgs)',  groupVoting: 'No',       autoCreates: 'Yes',    holdsNudges: 'No',         worksAcross: 'No',  isGcal: false },
  { app: 'GCal Polling',       readsCalendars: 'Yes',         groupVoting: 'Yes',      autoCreates: 'Yes',    holdsNudges: 'Yes',        worksAcross: 'Yes', isGcal: true  },
]

const METRICS = [
  {
    metric: 'Plan completion rate',
    measures: "% of plans that become real events on everyone's calendar, instead of fizzling out in the group chat",
    goal: '70%+',
  },
  {
    metric: '24-hr response rate',
    measures: '% of invitees who vote within a day, showing that nudges and one-tap voting cut the usual wait on slow responders',
    goal: '80%+',
  },
  {
    metric: 'Steps saved',
    measures: "Fewer clicks and messages to lock in a plan, compared to today's When2meet + group chat + manual invite workflow",
    goal: 'Fewer than today',
  },
  {
    metric: 'Viral growth',
    measures: '% of people who voted without an account and later create their own plan, plus % of users who create events more often after trying it. When picking a time together is easy, people schedule more plans of their own, and every invite brings in new users for free.',
    goal: 'Open question',
  },
]

const RISKS = [
  {
    risk: 'Privacy: people are uneasy sharing calendar access',
    mitigation: 'We only read free/busy blocks, never event titles or details, and access is opt-in',
  },
  {
    risk: 'Adoption: not everyone uses Google Calendar',
    mitigation: 'No-account voting link, plus manual availability entry for anyone',
  },
  {
    risk: 'Google builds it themselves',
    mitigation: 'That validates the problem. Our edge is working across calendar apps and serving casual groups, not just companies',
  },
  {
    risk: 'Notification fatigue: nudges feel spammy',
    mitigation: 'Capped reminders, a clear deadline, and auto-booking once enough people vote, so it ends fast',
  },
  {
    risk: 'Holds clutter calendars',
    mitigation: 'Holds clear automatically the moment a time is booked',
  },
]

const VIDEO_START = 20

function StepMedia({ start, end, wide }: { start: number | null; end: number | null; wide?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [ready, setReady] = useState(false)
  const cls = `gc-step-row__media${wide ? ' gc-step-row__media--wide' : ''}`

  if (start === null) {
    return <img src={step5Img} alt="" className={cls} />
  }

  return (
    <div className={`gc-step-media-wrap${wide ? ' gc-step-media-wrap--wide' : ''}`}>
      {!ready && <div className="gc-step-media__spinner" />}
      <video
        ref={ref}
        src={overviewVideo}
        className={cls}
        autoPlay
        muted
        playsInline
        style={{ opacity: ready ? 1 : 0 }}
        onCanPlay={() => setReady(true)}
        onLoadedMetadata={() => { if (ref.current) ref.current.currentTime = start }}
        onTimeUpdate={() => {
          if (ref.current && end !== null && ref.current.currentTime >= end) {
            ref.current.currentTime = start
            ref.current.play()
          }
        }}
      />
    </div>
  )
}

export default function GcalCaseStudy() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoReady, setVideoReady] = useState(false)

  useSections([
    { id: 'gc-problem',    label: 'Problem' },
    { id: 'gc-solution',   label: 'Solution' },
    { id: 'gc-audience',   label: 'Target Audience' },
    { id: 'gc-competitive', label: 'Competitive Analysis' },
    { id: 'gc-success',    label: 'Defining Success' },
    { id: 'gc-risks',      label: 'Risks' },
  ])

  return (
    <div className="gc-page">
      <main className="gc-main">
        <div className="gc-content">

          {/* ── Title + Overview + Meta ── */}
          <div className="gc-top-group">
            <Reveal>
              <h1 className="gc-title">
                Google Calendar Polling{' '}
                <span className="gc-title__suffix">| Concept</span>
              </h1>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="gc-tagline">Turning speculative plans into scheduled events</p>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="gc-overview">
                {!videoReady && (
                  <div className="gc-overview__placeholder">
                    <img src={pollingPlaceholder} alt="" className="gc-overview__placeholder-img" />
                    <div className="gc-overview__spinner" />
                  </div>
                )}
                <video
                  ref={videoRef}
                  src={overviewVideo}
                  autoPlay
                  muted
                  playsInline
                  style={{ opacity: videoReady ? 1 : 0 }}
                  onCanPlay={() => setVideoReady(true)}
                  onLoadedMetadata={() => { if (videoRef.current) videoRef.current.currentTime = VIDEO_START }}
                  onEnded={() => { if (videoRef.current) { videoRef.current.currentTime = VIDEO_START; videoRef.current.play() } }}
                />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="gc-meta">
                <div className="gc-meta__item">
                  <div className="gc-meta__label">
                    <img src={iconEmoji} alt="" className="gc-meta__icon" />
                    <span>Role</span>
                  </div>
                  <p className="gc-meta__value">Product Designer</p>
                </div>
                <div className="gc-meta__item">
                  <div className="gc-meta__label">
                    <img src={iconClock} alt="" className="gc-meta__icon" />
                    <span>Timeline</span>
                  </div>
                  <p className="gc-meta__value">Oct – Nov 2026</p>
                </div>
                <div className="gc-meta__item">
                  <div className="gc-meta__label">
                    <img src={iconUsers} alt="" className="gc-meta__icon" />
                    <span>Team</span>
                  </div>
                  <p className="gc-meta__value">2 Product Managers</p>
                  <p className="gc-meta__value">1 Product Growth</p>
                  <p className="gc-meta__value">1 Designer</p>
                </div>
                <div className="gc-meta__item">
                  <div className="gc-meta__label">
                    <img src={iconSpanner} alt="" className="gc-meta__icon" />
                    <span>Tools</span>
                  </div>
                  <p className="gc-meta__value">Figma</p>
                  <p className="gc-meta__value">Cursor</p>
                  <p className="gc-meta__value">Claude Code</p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ── Problem ── */}
          <section id="gc-problem" className="gc-section">
            <Reveal><p className="gc-label">PROBLEM</p></Reveal>
            <Reveal delay={0.05}><h2 className="gc-h2">The bottleneck is finding times for events</h2></Reveal>
            <Reveal delay={0.08}>
              <p className="gc-body">
                Google Calendar is great at storing confirmed events, but it doesn't help a group <strong>get there</strong>. We found three pain points:
              </p>
            </Reveal>
            <div className="gc-pain-cards">
              {PAIN_POINTS.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.08}>
                  <div className="gc-pain-card" style={{ '--accent': p.accent } as React.CSSProperties}>
                    <div className="gc-pain-card__header">
                      <p className="gc-pain-card__title">{p.title}</p>
                    </div>
                    <p className="gc-pain-card__body">{p.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* ── Solution ── */}
          <section id="gc-solution" className="gc-section">
            <Reveal><p className="gc-label">OUR SOLUTION</p></Reveal>
            <Reveal delay={0.05}><h2 className="gc-h2">Idea to booked event without leaving Calendar.</h2></Reveal>
            <Reveal delay={0.08}>
              <p className="gc-body">
                Google Calendar polling closes the gap between <strong>deciding on a time</strong> and <strong>getting it on the calendar</strong>. It is a group scheduling feature built into Google Calendar: it reads everyone's availability, suggests the best times, lets the group vote, and books the winning time automatically.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="gc-stepper">
                {STEPS.map(s => (
                  <div key={s.num} className="gc-stepper__item">
                    <p className="gc-stepper__num">{s.num}</p>
                    <p className="gc-stepper__label">{s.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
            <div className="gc-steps">
              {STEPS.map((s, i) => (
                <Reveal key={s.num} delay={i * 0.06}>
                  <div className="gc-step-row">
                    <StepMedia start={s.videoStart} end={s.videoEnd} wide={i === 2} />
                    <div className="gc-step-row__text">
                      <p className="gc-step-row__title">{s.title}</p>
                      <p className="gc-step-row__body">{s.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* ── Target Audience ── */}
          <section id="gc-audience" className="gc-section">
            <Reveal><p className="gc-label">TARGET AUDIENCE</p></Reveal>
            <Reveal delay={0.05}><h2 className="gc-h2">For groups that keep making plans.</h2></Reveal>
            <Reveal delay={0.08}>
              <p className="gc-body">GCal Polling is built for groups that schedule together often.</p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="gc-table-wrap">
                {AUDIENCES.map((a, i) => (
                  <div key={a.group} className={`gc-table__row${i % 2 === 1 ? '' : ''}`}>
                    <div className="gc-audience__label">{a.group}</div>
                    <div className="gc-audience__benefit">{a.benefit}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </section>

          {/* ── Competitive Analysis ── */}
          <section id="gc-competitive" className="gc-section">
            <Reveal><p className="gc-label">COMPETITIVE ANALYSIS</p></Reveal>
            <Reveal delay={0.05}><h2 className="gc-h2">Five jobs in one complete flow.</h2></Reveal>
            <Reveal delay={0.08}>
              <p className="gc-body">
                GCal Polling is the only option in our comparison that does all five jobs. Each competitor solves one piece and leaves the rest to the organizer.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="gc-competitive-scroll">
              <div className="gc-table-wrap">
                <div className="gc-table__row gc-table__row--header">
                  <div className="gc-table__cell gc-table__cell--head" style={{ width: 160 }}>App</div>
                  <div className="gc-table__cell gc-table__cell--head" style={{ flex: 1 }}>Reads calendars</div>
                  <div className="gc-table__cell gc-table__cell--head" style={{ flex: 1 }}>Group voting</div>
                  <div className="gc-table__cell gc-table__cell--head" style={{ flex: 1 }}>Auto-creates event</div>
                  <div className="gc-table__cell gc-table__cell--head" style={{ flex: 1 }}>Holds / nudges</div>
                  <div className="gc-table__cell gc-table__cell--head" style={{ flex: 1 }}>Works across apps</div>
                </div>
                {COMPETITORS.map(c => (
                  <div
                    key={c.app}
                    className={`gc-table__row${c.isGcal ? ' gc-table__row--highlight' : ''}`}
                  >
                    <div className={`gc-table__cell${c.isGcal ? ' gc-table__cell--label gc-table__cell--highlight' : ''}`} style={{ width: 160 }}>{c.app}</div>
                    <div className={`gc-table__cell gc-table__cell--center${c.isGcal ? ' gc-table__cell--highlight' : ''}`} style={{ flex: 1 }}>{c.readsCalendars}</div>
                    <div className={`gc-table__cell gc-table__cell--center${c.isGcal ? ' gc-table__cell--highlight' : ''}`} style={{ flex: 1 }}>{c.groupVoting}</div>
                    <div className={`gc-table__cell gc-table__cell--center${c.isGcal ? ' gc-table__cell--highlight' : ''}`} style={{ flex: 1 }}>{c.autoCreates}</div>
                    <div className={`gc-table__cell gc-table__cell--center${c.isGcal ? ' gc-table__cell--highlight' : ''}`} style={{ flex: 1 }}>{c.holdsNudges}</div>
                    <div className={`gc-table__cell gc-table__cell--center${c.isGcal ? ' gc-table__cell--highlight' : ''}`} style={{ flex: 1 }}>{c.worksAcross}</div>
                  </div>
                ))}
              </div>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="gc-callout">
                <p className="gc-callout__title">The closest gap is already in Calendar.</p>
                <p className="gc-callout__body">
                  The closest gap is Google's own "Find a time": it reads calendars inside an organization, but it has no voting and doesn't work for groups on mixed calendars.
                </p>
              </div>
            </Reveal>
          </section>

          {/* ── Defining Success ── */}
          <section id="gc-success" className="gc-section">
            <Reveal><p className="gc-label">DEFINING SUCCESS</p></Reveal>
            <Reveal delay={0.05}><h2 className="gc-h2">Less waiting. More plans that happen.</h2></Reveal>
            <Reveal delay={0.08}>
              <p className="gc-body">
                Success means groups go from "we should meet" to a confirmed calendar event faster, and more of those plans actually happen.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="gc-north-star">
                <p className="gc-north-star__label">NORTH STAR / TIME-TO-CONFIRMED</p>
                <p className="gc-north-star__value">Under 24 hours</p>
                <p className="gc-north-star__body">
                  The time from when a plan is created to when the event is locked on everyone's calendar. Goal: from days of back-and-forth to under 24 hours.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="gc-table-wrap">
                <div className="gc-table__row gc-table__row--header">
                  <div className="gc-table__cell gc-table__cell--head" style={{ width: 200 }}>Metric</div>
                  <div className="gc-table__cell gc-table__cell--head" style={{ flex: 1 }}>What it measures</div>
                  <div className="gc-table__cell gc-table__cell--head" style={{ width: 160 }}>Goal</div>
                </div>
                {METRICS.map(m => (
                  <div key={m.metric} className="gc-table__row">
                    <div className="gc-table__cell gc-table__cell--label" style={{ width: 200 }}>{m.metric}</div>
                    <div className="gc-table__cell" style={{ flex: 1 }}>{m.measures}</div>
                    <div className="gc-table__cell" style={{ width: 160 }}>{m.goal}</div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="gc-footnote">
                <strong>Targets for now, not measured outcomes.</strong><br />
                The goals are targets for now. We'll replace them with baselines from our user research.
              </p>
            </Reveal>
          </section>

          {/* ── Risks & Mitigations ── */}
          <section id="gc-risks" className="gc-section">
            <Reveal><p className="gc-label">RISKS &amp; MITIGATIONS</p></Reveal>
            <Reveal delay={0.05}><h2 className="gc-h2">Make coordination easier while keeping trust intact.</h2></Reveal>
            <Reveal delay={0.08}>
              <p className="gc-body">
                The biggest risk is trust, so we treated the privacy model as a design decision from day one.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="gc-table-wrap">
                <div className="gc-table__row gc-table__row--header">
                  <div className="gc-table__cell gc-table__cell--head" style={{ flex: 2 }}>Risk</div>
                  <div className="gc-table__cell gc-table__cell--head" style={{ flex: 3 }}>Mitigation</div>
                </div>
                {RISKS.map(r => (
                  <div key={r.risk} className="gc-table__row">
                    <div className="gc-table__cell gc-table__cell--label" style={{ flex: 2 }}>{r.risk}</div>
                    <div className="gc-table__cell" style={{ flex: 3 }}>{r.mitigation}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </section>

          <BackToTop />
        </div>
      </main>
    </div>
  )
}
