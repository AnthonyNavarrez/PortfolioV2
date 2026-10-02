import momentoBg from '../assets/momento-bg.webp'
import momentoLandingScreen from '../assets/momento-landing-screen.svg'
import momentoMockup from '../assets/momento-mockup.svg'
import momentoPolaroidPhoto from '../assets/momento-polaroid-photo.webp'
import momentoPin from '../assets/momento-pin.svg'
import momentoDesignSystem from '../assets/momento-cs/design-system.webp'
import reactIcon from '../assets/skills/skill-react.webp'
import nodejsIcon from '../assets/skills/skill-nodejs.webp'
import expressIcon from '../assets/skills/skill-express.webp'
import mongodbIcon from '../assets/skills/skill-mongodb.webp'
import cloudinaryIcon from '../assets/skills/skill-cloudinary.webp'
import axiosIcon from '../assets/skills/skill-axios.webp'
import javascriptIcon from '../assets/skills/skill-javascript.webp'
import pythonIcon from '../assets/skills/skill-python.webp'
import reactRouterIcon from '../assets/skills/skill-react-router.webp'
import reactLeafletIcon from '../assets/skills/skill-react-leaflet.webp'
import viteIcon from '../assets/skills/skill-vite.webp'
import jwtIcon from '../assets/skills/skill-jwt-bcrypt.svg'

export {
  momentoBg,
  momentoLandingScreen,
  momentoMockup,
  momentoPolaroidPhoto,
  momentoPin,
  momentoDesignSystem,
}

export const momentoDescription =
  'web app to pin your memories on an interactive LA map'

export const momentoSkills = [
  { name: 'React', icon: reactIcon },
  { name: 'Node.js', icon: nodejsIcon },
  { name: 'Express 5', icon: expressIcon },
  { name: 'MongoDB Atlas', icon: mongodbIcon },
  { name: 'Cloudinary', icon: cloudinaryIcon },
  { name: 'Axios', icon: axiosIcon },
  { name: 'JavaScript', icon: javascriptIcon },
  { name: 'Python', icon: pythonIcon },
  { name: 'React Router', icon: reactRouterIcon },
  { name: 'React Leaflet', icon: reactLeafletIcon },
]

// Problem band intro (Figma node 682:2844); the stat links to its source.
export const momentoProblemIntro = {
  before:
    "We take more photos than ever, yet they tell us almost nothing about where we've been. People expected to take about ",
  linkText: '2.1 trillion photos in 2025',
  linkHref:
    'https://petapixel.com/2025/06/18/the-number-of-photos-taken-in-2025-is-expected-to-exceed-two-trillion/',
  after:
    ', 94% of them on phones. Meanwhile, finding where to go next is handed to feeds built for engagement, not accuracy.',
}

export const momentoProblems = [
  {
    title: 'Photos and location are disconnected.',
    body: 'Camera rolls hide locations under clutter and work for the user similar to apps like Instagram that don’t do it by default',
  },
  {
    title: 'No collective view of where people go.',
    body: 'Discovery on social media relies on curated "top 10" lists and influencer content, not real, organic behavior.',
  },
  {
    title: 'No sense of activity over time.',
    body: "Existing data is static, there's no way to see trends shift week to week or season to season.",
  },
]

// Mapping User Journeys table (Figma node 683:2881).
export const momentoJourneys = [
  {
    moment: 'Friday night, picking a Saturday plan',
    doing: 'Scrolling TikTok for "things to do in LA"',
    momento: 'Open the community heatmap, filter to the past week, see which neighborhoods are active',
  },
  {
    moment: 'Saturday morning, choosing between two areas',
    doing: 'Reading Yelp reviews from 2022',
    momento: 'Open Explore and browse recent public photos to see what it looks like now',
  },
  {
    moment: 'Saturday afternoon, at a new café',
    doing: 'Taking 15 photos that disappear into the camera roll',
    momento: 'Drop a pin on the spot, upload a photo, tag it "cafe"',
  },
  {
    moment: 'Months later, looking back',
    doing: 'Nothing, the photos just sit there',
    momento: 'The personal map shows every neighborhood explored, densest areas first',
  },
]

export const momentoVisualDirection =
  'Momento (spanish for moment) is what this product focuses on, a photo is a moment, and pinning it to a place turns it into a keepsake. The project started as MapScrap but “scrap” read as messy or craft-y, or it described the mechanism instead of the feeling.'

export const momentoSolutionParagraphs = [
  "ties photos directly to map locations. Users pin uploads to coordinates on an interactive Leaflet map, building a personal visual log of where they've been, with searchable/filterable galleries.",
  'A public "Explore" feed and a community heatmap (toggleable by week/month/year/all-time) aggregate public photos so users can see activity density across the city and discover new places others have found worth visiting.',
]

export const momentoPolaroidCaption = 'Matcha pop up at\nDTLA'

export interface TechStackItem {
  name: string
  icon: string
  description: string
  // Column width in px from Figma (node 682:2439); defaults to 154.
  width?: number
}

export const momentoFrontendStack: TechStackItem[] = [
  { name: 'React', icon: reactIcon, description: 'Component based UI' },
  {
    name: 'Vite',
    icon: viteIcon,
    description: 'fast HMR, simple builds served via Express',
  },
  {
    name: 'React Router',
    width: 205,
    icon: reactRouterIcon,
    description: 'Auth-gated routes, protected route redirects',
  },
  {
    name: 'React Leaflet',
    width: 168,
    icon: reactLeafletIcon,
    description: 'Interactive mapping library',
  },
  { name: 'Axios', icon: axiosIcon, description: 'interceptors, error handling', width: 141 },
]

export const momentoBackendStack: TechStackItem[] = [
  {
    name: 'Express 5',
    icon: expressIcon,
    description: 'Node REST framework, native promises, cleaner routing',
  },
  {
    name: 'Node.js',
    icon: nodejsIcon,
    description: 'shared JS across stack, non-blocking I/O for uploads/DB',
  },
  {
    name: 'MongoDB Atlas (mongoose)',
    width: 230,
    icon: mongodbIcon,
    description:
      'flexible schema for variable photo docs, managed hosting, validation/model layer',
  },
  {
    name: 'JWT + bcrypt',
    width: 238,
    icon: jwtIcon,
    description: 'stateless auth via Bearer tokens, slow salted password hashing',
  },
  {
    name: 'Cloudinary + Multer',
    width: 238,
    icon: cloudinaryIcon,
    description:
      'handles multipart uploads, CDN storage/transforms, survives redeploys',
  },
]
