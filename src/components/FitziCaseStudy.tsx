import { useSections } from '../contexts/NavSidebarContext'
import iconEmoji   from '../assets/v3/icon-emoji.svg'
import iconClock   from '../assets/v3/icon-clock.svg'
import iconUsers   from '../assets/v3/icon-users.svg'
import iconSpanner from '../assets/v3/icon-spanner.svg'

// Hero
import heroBg from '../assets/fitzi/hero-bg.png'

// Wireframes
import wireframesLowFi       from '../assets/fitzi/wireframes-low-fi.png'
import wireframesOutfitBuilder from '../assets/fitzi/wireframes-outfit-builder.png'

// Competitive refs
import refSocial1 from '../assets/fitzi/ref-social-1.png'
import refSocial2 from '../assets/fitzi/ref-social-2.png'
import refSocial3 from '../assets/fitzi/ref-social-3.png'
import refSocial4 from '../assets/fitzi/ref-social-4.png'
import refAvatar  from '../assets/fitzi/ref-avatar.png'

// Brand
import moodboard        from '../assets/fitzi/moodboard.png'
import typographyColors from '../assets/fitzi/typography-colors.png'

// Hi-fi
import hifiDiscovery    from '../assets/fitzi/hifi-discovery.png'
import hifiOutfitBuilder from '../assets/fitzi/hifi-outfit-builder.png'

// Marketing
import marketingStyleAnywhere  from '../assets/fitzi/marketing-style-anywhere.png'
import marketingVirtualTryon   from '../assets/fitzi/marketing-virtual-tryon.png'
import marketingFitziSorts     from '../assets/fitzi/marketing-fitzi-sorts.png'
import marketingYourAvatar     from '../assets/fitzi/marketing-your-avatar.png'

import Reveal from './Reveal'
import './FitziCaseStudy.css'

const MARKETING = [
  { src: marketingStyleAnywhere, caption: 'Style anything, anywhere' },
  { src: marketingVirtualTryon,  caption: 'Virtual try-on' },
  { src: marketingFitziSorts,    caption: 'Fitzi sorts. You style.' },
  { src: marketingYourAvatar,    caption: 'Your avatar' },
]

function FitziCaseStudy() {
  useSections([
    { id: 'fc-problem',     label: 'Problem & Solution' },
    { id: 'fc-wireframes',  label: 'Wireframing' },
    { id: 'fc-competitive', label: 'Competitive Refs' },
    { id: 'fc-brand',       label: 'Brand Identity' },
    { id: 'fc-hifi',        label: 'High-Fidelity' },
    { id: 'fc-marketing',   label: 'Marketing' },
  ])

  return (
    <div className="fc-page">
      <main className="fc-main">
        <div className="fc-content">

          {/* ── Overview ── */}
          <div className="fc-overview">
            <Reveal><h1 className="fc-title">Fitzi</h1></Reveal>
            <Reveal delay={0.05}><p className="fc-tagline">An AI-powered digital wardrobe. You stay the stylist.</p></Reveal>
            <Reveal delay={0.1}>
              <div className="fc-hero">
                <img src={heroBg} alt="Fitzi app" className="fc-hero__img" />
              </div>
            </Reveal>
          </div>

          {/* ── Meta ── */}
          <Reveal delay={0.05}>
            <div className="fc-meta">
              <div className="fc-meta__item">
                <div className="fc-meta__label">
                  <img src={iconEmoji} alt="" className="fc-meta__icon" />
                  <span>Role</span>
                </div>
                <p className="fc-meta__value">Product Designer</p>
              </div>
              <div className="fc-meta__item">
                <div className="fc-meta__label">
                  <img src={iconClock} alt="" className="fc-meta__icon" />
                  <span>Timeline</span>
                </div>
                <p className="fc-meta__value">Jun – Aug 2026</p>
              </div>
              <div className="fc-meta__item">
                <div className="fc-meta__label">
                  <img src={iconUsers} alt="" className="fc-meta__icon" />
                  <span>Team</span>
                </div>
                <p className="fc-meta__value">2 Product Managers</p>
                <p className="fc-meta__value">1 Developer</p>
                <p className="fc-meta__value">2 Designers</p>
              </div>
              <div className="fc-meta__item">
                <div className="fc-meta__label">
                  <img src={iconSpanner} alt="" className="fc-meta__icon" />
                  <span>Tools</span>
                </div>
                <p className="fc-meta__value">Figma</p>
                <p className="fc-meta__value">Claude Code</p>
              </div>
            </div>
          </Reveal>

          {/* ── 01 Problem & Solution ── */}
          <section id="fc-problem" className="fc-section">
            <Reveal><p className="fc-label">PROBLEM &amp; SOLUTION</p></Reveal>
            <Reveal delay={0.05}><h2 className="fc-h2">Try it on before you buy.<br />Keep the creative control.</h2></Reveal>
            <Reveal delay={0.08}>
              <p className="fc-body">
                Fashion-conscious people love styling but can't see how clothes will look on their body or with what they already own before buying. That leads to costly returns, forgotten pieces, and outfit planning that only works at home. Existing AI tools either try on one item at a time or pick outfits for you, taking away the creative control users enjoy.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="fc-callout">
                <h3 className="fc-callout__heading">The AI handles the effort.<br />You stay the stylist.</h3>
                <p className="fc-body">
                  Fitzi is an AI-powered digital wardrobe where users style a personalized avatar with their own clothes. It automatically organizes garments from outfit photos and lets users mix, layer, and try on both owned and prospective pieces anywhere. The AI handles the effort, and the user stays the stylist.
                </p>
              </div>
            </Reveal>
          </section>

          {/* ── 02 Wireframing ── */}
          <section id="fc-wireframes" className="fc-section">
            <Reveal><p className="fc-label">WIREFRAMING</p></Reveal>
            <Reveal delay={0.05}><h2 className="fc-h2">Making room for personal style.</h2></Reveal>
            <Reveal delay={0.08}>
              <p className="fc-body">
                Low- to mid-fidelity wireframes were used to map out the user flow, focusing on minimizing friction for stylists and making features and navigation intuitive.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="fc-body">
                The central challenge was the Outfit Builder: fitting the avatar, the closet, and styling controls onto a mobile screen. I explored numerous layouts.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="fc-image-card">
                <img src={wireframesLowFi} alt="Low-fidelity mobile user flow" className="fc-image-card__img" />
              </div>
            </Reveal>
            <Reveal delay={0.14}>
              <div className="fc-image-card">
                <img src={wireframesOutfitBuilder} alt="Outfit Builder layout and interaction explorations" className="fc-image-card__img" />
              </div>
            </Reveal>
          </section>

          {/* ── 03 Competitive References ── */}
          <section id="fc-competitive" className="fc-section">
            <Reveal><p className="fc-label">COMPETITIVE REFERENCES</p></Reveal>
            <Reveal delay={0.05}><h2 className="fc-h2">Familiar patterns. A styling-first lens.</h2></Reveal>
            <Reveal delay={0.08}>
              <p className="fc-body">
                Analyzed leading social media, styling, and shopping mobile app interfaces, including Snapchat's avatar builder, TikTok, Instagram, and Shein.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="fc-two-col">
                <div className="fc-ref-card">
                  <h3 className="fc-h3">Social &amp; shopping</h3>
                  <div className="fc-ref-grid">
                    <img src={refSocial1} alt="" className="fc-ref-grid__img" />
                    <img src={refSocial2} alt="" className="fc-ref-grid__img" />
                    <img src={refSocial3} alt="" className="fc-ref-grid__img" />
                    <img src={refSocial4} alt="" className="fc-ref-grid__img" />
                  </div>
                </div>
                <div className="fc-ref-card">
                  <h3 className="fc-h3">Avatar &amp; wardrobe</h3>
                  <img src={refAvatar} alt="Avatar and wardrobe reference board" className="fc-ref-single__img" />
                </div>
              </div>
            </Reveal>
          </section>

          {/* ── 04 Brand Identity ── */}
          <section id="fc-brand" className="fc-section">
            <Reveal><p className="fc-label">BRAND IDENTITY</p></Reveal>
            <Reveal delay={0.05}><h2 className="fc-h2">Chic. Digital. Future-facing.</h2></Reveal>
            <Reveal delay={0.08}>
              <p className="fc-body">
                While exploring references, I leaned toward glassmorphism and chic, digital, futuristic design styles. Blue complements these styles, while the simple, sophisticated Inter and Poppins typefaces support a minimalist approach.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="fc-brand-cols">
                <div className="fc-brand-col fc-brand-col--wide">
                  <h3 className="fc-h3">Visual references</h3>
                  <img src={moodboard} alt="Fitzi brand moodboard" className="fc-brand__img" />
                </div>
                <div className="fc-brand-col fc-brand-col--narrow">
                  <h3 className="fc-h3">Typography &amp; palette</h3>
                  <img src={typographyColors} alt="Fitzi typography and colors" className="fc-brand__img" />
                  <p className="fc-brand__type-name">Inter + Poppins</p>
                  <p className="fc-body">Minimal typography and a blue palette support the digital, futuristic direction.</p>
                </div>
              </div>
            </Reveal>
          </section>

          {/* ── 05 High-Fidelity ── */}
          <section id="fc-hifi" className="fc-section">
            <Reveal><p className="fc-label">HIGH-FIDELITY EXPLORATIONS</p></Reveal>
            <Reveal delay={0.05}><h2 className="fc-h2">Your wardrobe, reimagined.</h2></Reveal>
            <Reveal delay={0.08}><h3 className="fc-h3">Discovery, shopping &amp; the Fit Vault</h3></Reveal>
            <Reveal delay={0.1}>
              <div className="fc-image-card">
                <img src={hifiDiscovery} alt="Discovery, shopping and the Fit Vault screens" className="fc-image-card__img" />
              </div>
            </Reveal>
            <Reveal><h3 className="fc-h3">Outfit Builder &amp; collections</h3></Reveal>
            <Reveal delay={0.05}>
              <div className="fc-image-card">
                <img src={hifiOutfitBuilder} alt="Outfit Builder and collections screens" className="fc-image-card__img" />
              </div>
            </Reveal>
          </section>

          {/* ── 06 Marketing ── */}
          <section id="fc-marketing" className="fc-section">
            <Reveal><p className="fc-label">MARKETING DESIGNS</p></Reveal>
            <Reveal delay={0.05}><h2 className="fc-h2">A wardrobe worth sharing.</h2></Reveal>
            <Reveal delay={0.08}><p className="fc-body">Style anything, anywhere. Fitzi sorts. You style.</p></Reveal>
            <div className="fc-marketing-grid">
              {MARKETING.map((m, i) => (
                <Reveal key={m.caption} delay={i * 0.08}>
                  <div className="fc-marketing-item">
                    <img src={m.src} alt={m.caption} className="fc-marketing-item__img" />
                    <p className="fc-marketing-item__caption">{m.caption}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

        </div>

        <button className="fc-back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          ↑ Back to top
        </button>
      </main>
    </div>
  )
}

export default FitziCaseStudy
