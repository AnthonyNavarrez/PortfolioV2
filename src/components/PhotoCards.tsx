import type { CSSProperties } from 'react'
import { useEffect, useState } from 'react'
import aboutBaby from '../assets/about/about-baby.webp'
import aboutDrinks from '../assets/about/about-drinks.webp'
import aboutHeadshot from '../assets/about/about-headshot.webp'
import aboutLeg from '../assets/about/about-leg.webp'
import aboutResurgance from '../assets/about/about-resurgance.webp'
import aboutSolo from '../assets/about/about-solo.webp'
import aboutTrophy from '../assets/about/about-trophy.webp'
import { DraggableCardBody, DraggableCardContainer } from './DraggableCard'
import './PhotoCards.css'

interface Photo {
  name: string
  src: string
  alt: string
  rotate: number
  caption?: string
}

// Figma node 666:1485, in its layer order (later = on top).
const photos: Photo[] = [
  { name: 'baby', src: aboutBaby, alt: 'Anthony Navarrez as a baby', rotate: 2 },
  { name: 'leg', src: aboutLeg, alt: 'Anthony Navarrez mid-kick', rotate: -1 },
  { name: 'trophy', src: aboutTrophy, alt: 'Anthony Navarrez holding a dance competition trophy', rotate: 0 },
  { name: 'drinks', src: aboutDrinks, alt: 'Two drinks', rotate: -2 },
  { name: 'solo', src: aboutSolo, alt: 'Anthony Navarrez dancing a solo', rotate: 2 },
  { name: 'headshot', src: aboutHeadshot, alt: 'Headshot of Anthony Navarrez', rotate: 2, caption: 'Drag me!' },
  { name: 'resurgance', src: aboutResurgance, alt: 'Anthony Navarrez with his dance team', rotate: -9 },
]

// The hero pile pops up from the bottom on the first page load only —
// coming back from a case study shouldn't replay it.
let heroEntrancePlayed = false

// Draggable polaroid pile. Rendered in the hero on desktop and at the
// bottom of the page on mobile — `placement` picks which one shows.
function PhotoCards({ placement }: { placement: 'hero' | 'footer' }) {
  const [entrance] = useState(() => placement === 'hero' && !heroEntrancePlayed)

  useEffect(() => {
    if (entrance) heroEntrancePlayed = true
  }, [entrance])

  return (
    <DraggableCardContainer
      className={`photo-cards photo-cards--${placement}${entrance ? ' photo-cards--entrance' : ''}`}
    >
      {photos.map((photo, index) => (
        <DraggableCardBody
          className={`photo-cards__card photo-cards__card--${photo.name}`}
          rotate={photo.rotate}
          style={{ '--i': index } as CSSProperties}
          key={photo.name}
        >
          <div className="photo-cards__inset">
            <img className="photo-cards__image" src={photo.src} alt={photo.alt} />
          </div>
          {photo.caption && <span className="photo-cards__caption">{photo.caption}</span>}
        </DraggableCardBody>
      ))}
    </DraggableCardContainer>
  )
}

export default PhotoCards
