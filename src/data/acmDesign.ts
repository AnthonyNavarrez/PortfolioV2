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

export { acmWordmarkLogo, acmWebsiteTexture }

// "Sneak peak" clips (Figma: video placeholders 1-5). Entries without a
// `src` render as a grey placeholder.
export const acmSneakPeeks: { src?: string; poster?: string }[] = [
  { src: heroVideo, poster: heroPoster },
  { src: whoAreWeVideo, poster: whoAreWePoster },
  { src: carouselVideo, poster: carouselPoster },
  { src: footerVideo, poster: footerPoster },
  { src: sleepyFoxVideo, poster: sleepyFoxPoster },
]
