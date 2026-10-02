import acmWordmarkLogo from '../assets/acm/wordmark-logo.svg'
import acmWebsiteTexture from '../assets/acm/website-text.webp'
// Web-compressed, muted copies of assets/{Hero,WhoAreWe,Carousel,footer,
// sleepyFox}.mp4 (max 1600px wide, CRF 26), with first-frame posters.
import heroVideo from '../assets/acm/hero.mp4'
import heroPoster from '../assets/acm/hero-poster.webp'
import whoAreWeVideo from '../assets/acm/who-are-we.mp4'
import whoAreWePoster from '../assets/acm/who-are-we-poster.webp'
import carouselVideo from '../assets/acm/carousel.mp4'
import carouselPoster from '../assets/acm/carousel-poster.webp'
import footerVideo from '../assets/acm/footer.mp4'
import footerPoster from '../assets/acm/footer-poster.webp'
import sleepyFoxVideo from '../assets/acm/sleepy-fox.mp4'
import sleepyFoxPoster from '../assets/acm/sleepy-fox-poster.webp'

import acmColors from '../assets/acm/ds/colors.webp'
import acmTypeTable from '../assets/acm/ds/type-table.webp'
import acmSpacing from '../assets/acm/ds/spacing.webp'
import acmFontsA from '../assets/acm/ds/fonts-a.webp'
import acmFontsB from '../assets/acm/ds/fonts-b.webp'

export { acmWordmarkLogo, acmWebsiteTexture }
export { acmColors, acmTypeTable, acmSpacing, acmFontsA, acmFontsB }

export const acmIntro =
  'ACM Design shapes the visual identity for all of ACM at UCLA, so our own website has to set the tone: as bold, confident, and, design-led. My approach is to build an immersive experience without overwhelming the visitor. Instead of loud, full-screen effects, I focused on micro-interactions like subtle animations, floating UI elements, and responsive hover states. These small moments reward exploration and pull users in, so the site feels alive while the content stays clear and easy to navigate.'

// Type specimen card (Figma node 703:3183), drawn at half scale.
export const acmTypeSpecimen = [
  { label: 'Heading 1 (Poppins SemiBold 72px)', modifier: 'h1' },
  { label: 'Heading 2 (Poppins Regular 56px)', modifier: 'h2' },
  { label: 'Heading 3', modifier: 'h3' },
  { label: 'Subtitle 1', modifier: 'subtitle' },
  { label: 'Subtitle 1', modifier: 'subtitle' },
  { label: 'Label (Poppins Regular 16px)', modifier: 'label' },
  { label: 'Body Text (Open Sans Regular 16px)', modifier: 'body' },
]

// "Sneak peak" clips (Figma: video placeholders 1-5). Entries without a
// `src` render as a grey placeholder.
export const acmSneakPeeks: { src?: string; poster?: string }[] = [
  { src: heroVideo, poster: heroPoster },
  { src: whoAreWeVideo, poster: whoAreWePoster },
  { src: carouselVideo, poster: carouselPoster },
  { src: footerVideo, poster: footerPoster },
  { src: sleepyFoxVideo, poster: sleepyFoxPoster },
]
