import { useState } from 'react'
import polaroid1 from '../assets/Headshot.JPG'
import polaroid2 from '../assets/about/photo-polaroid-2.png'
import danceResurrection from '../assets/about/dance-resurrection.png'
import dancerPhotoshoot from '../assets/about/dance-photoshoot.png'
import dancerSeniorSolo from '../assets/about/dance-senior-solo.png'
import danceWce from '../assets/about/dance-wce.png'
import cafeCommunityGoods from '../assets/about/cafe-community-goods.png'
import cafeSaba from '../assets/about/cafe-saba.png'
import cafeHeytea from '../assets/about/cafe-heytea.png'
import cafeDavien from '../assets/about/cafe-davien.png'
import miscKayaking from '../assets/about/misc-kayaking.png'
import miscBeach from '../assets/about/misc-beach.png'
import miscDisney from '../assets/about/misc-disney.png'
import miscPinkWall from '../assets/about/misc-pink-wall.png'
import albumOlivia from '../assets/about/album-olivia.png'
import albumAriana from '../assets/about/album-ariana.png'
import albumConan from '../assets/about/album-conan.png'
import albumLaufey from '../assets/about/album-laufey.png'
import album5 from '../assets/about/album-5.png'
import album6 from '../assets/about/album-6.png'
import './AboutPage.css'

const DANCE_PHOTOS = [
  { src: danceResurrection, caption: 'Resurection comp 1st place' },
  { src: dancerPhotoshoot,  caption: 'Dance team photoshoot' },
  { src: dancerSeniorSolo,  caption: 'Senior solo' },
  { src: danceWce,          caption: 'WCE Nationals 1st place' },
]

const CAFE_PHOTOS = [
  { src: cafeCommunityGoods, caption: 'Community Goods' },
  { src: cafeSaba,           caption: 'Saba Coffee' },
  { src: cafeHeytea,         caption: 'HeyTea' },
  { src: cafeDavien,         caption: 'Da Vien coffee' },
  { src: miscKayaking,       caption: 'Kayaking' },
  { src: miscBeach,          caption: 'Beach day' },
]

const SIDE_PHOTOS = [
  { src: miscDisney,   caption: 'Disney' },
  { src: miscPinkWall, caption: 'LA Pink wall' },
]

const ALBUMS = [
  albumOlivia,
  albumAriana,
  albumConan,
  albumLaufey,
  album5,
  album6,
]

function AboutPage() {
  const [stripScrolled,  setStripScrolled]  = useState(false)
  const [albumsScrolled, setAlbumsScrolled] = useState(false)

  return (
    <div className="about-page">
      <main className="about-main">

        {/* ── Intro row: text left, polaroids right ── */}
        <div className="about-intro-row">
          <section className="about-intro">
            <h1 className="about-title">Hi, I'm Anthony!</h1>
            <div className="about-bio">
              <p className="about-bio__p">
                I am a product designer, studying <strong>computer science</strong> at UCLA.
              </p>
              <p className="about-bio__p">
                As a kid I had an insatiable creativity, I was always creating, whether that was creating video games on scratch or choreography in a dance room
              </p>
              <p className="about-bio__p">
                Today I believe there is constant a <strong>gap</strong> between what technology <em>can</em> do and what people actually get to use. I design and build intuitive tools that turn the newest ideas into something anyone can pick up on day one.
              </p>
            </div>
          </section>

          <div className="about-polaroids" aria-hidden>
            <p className="about-polaroid__label about-polaroid__label--top">This is me</p>
            <div className="about-polaroid about-polaroid--large">
              <div className="about-polaroid__frame">
                <div className="about-polaroid__img-clip">
                  <img src={polaroid1} alt="" className="about-polaroid__img" />
                </div>
              </div>
            </div>
            <p className="about-polaroid__label about-polaroid__label--bottom">and me on the inside</p>
            <div className="about-polaroid about-polaroid--small">
              <div className="about-polaroid__frame">
                <img src={polaroid2} alt="" className="about-polaroid__img" />
              </div>
            </div>
          </div>
        </div>

        {/* ── Free time ── */}
        <section className="about-freetime">
          <h2 className="about-title">In my free time you'll find me ...</h2>

          <div
            className={`about-photo-strip${stripScrolled ? ' about-photo-strip--scrolled' : ''}`}
            onScroll={e => setStripScrolled((e.currentTarget as HTMLDivElement).scrollLeft > 0)}
          >
              <div className="about-strip-category">
                <span className="about-strip-label">Dancing</span>
                <div className="about-strip-category__photos">
                  {DANCE_PHOTOS.map(p => (
                    <div key={p.caption} className={`about-strip-item${p.ghost ? ' about-strip-item--ghost' : ''}`}>
                      <img src={p.src} alt={p.caption} className="about-strip-item__img" />
                      <p className="about-strip-item__caption">{p.caption}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="about-strip-category">
                <span className="about-strip-label">Exploring Cafes</span>
                <div className="about-strip-category__photos">
                  {CAFE_PHOTOS.map(p => (
                    <div key={p.caption} className={`about-strip-item${p.ghost ? ' about-strip-item--ghost' : ''}`}>
                      <img src={p.src} alt={p.caption} className="about-strip-item__img" />
                      <p className="about-strip-item__caption">{p.caption}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="about-strip-category">
                <span className="about-strip-label about-strip-label--sidequest">Sidequesting</span>
                <div className="about-strip-category__photos">
                  {SIDE_PHOTOS.map(p => (
                    <div key={p.caption} className="about-strip-item">
                      <img src={p.src} alt={p.caption} className="about-strip-item__img" />
                      <p className="about-strip-item__caption">{p.caption}</p>
                    </div>
                  ))}
                </div>
              </div>
          </div>
        </section>

        {/* ── Albums ── */}
        <section className="about-albums">
          <h2 className="about-title">Albums on repeat</h2>
          <div
            className={`about-albums__row${albumsScrolled ? ' about-albums__row--scrolled' : ''}`}
            onScroll={e => setAlbumsScrolled((e.currentTarget as HTMLDivElement).scrollLeft > 0)}
          >
            {ALBUMS.map((src, i) => (
              <img key={i} src={src} alt="" className="about-albums__cover" />
            ))}
          </div>
        </section>

      </main>
    </div>
  )
}

export default AboutPage
