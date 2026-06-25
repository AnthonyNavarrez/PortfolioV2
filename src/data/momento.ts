import momentoBg from '../assets/momento-bg.webp'
import momentoLandingScreen from '../assets/momento-landing-screen.svg'
import momentoPolaroidPhoto from '../assets/momento-polaroid-photo.webp'
import momentoPin from '../assets/momento-pin.svg'
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

export { momentoBg, momentoLandingScreen, momentoPolaroidPhoto, momentoPin }

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

export const momentoProblems = [
  {
    title: 'Photos and location are disconnected.',
    body: "Camera rolls and apps like Instagram don't link photos to exactly where they were taken.",
  },
  {
    title: 'No collective view of where people go.',
    body: 'Discovery relies on curated "top 10" lists and influencer content, not real, organic behavior.',
  },
  {
    title: 'No sense of activity over time.',
    body: "Existing data is static, there's no way to see trends shift week to week or season to season.",
  },
]

export const momentoSolutionParagraphs = [
  "ties photos directly to map locations. Users pin uploads to coordinates on an interactive Leaflet map, building a personal visual log of where they've been, with searchable/filterable galleries.",
  'A public "Explore" feed and a community heatmap (toggleable by week/month/year/all-time) aggregate public photos so users can see activity density across the city and discover new places others have found worth visiting.',
]

export const momentoPolaroidCaption = 'Matcha pop up at\nDTLA'

export interface TechStackItem {
  name: string
  icon: string
  description: string
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
    icon: reactRouterIcon,
    description: 'Auth-gated routes, protected route redirects',
  },
  {
    name: 'React Leaflet',
    icon: reactLeafletIcon,
    description: 'Interactive mapping library',
  },
  { name: 'Axios', icon: axiosIcon, description: 'interceptors, error handling' },
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
    icon: mongodbIcon,
    description:
      'flexible schema for variable photo docs, managed hosting, validation/model layer',
  },
  {
    name: 'JWT + bcrypt',
    icon: jwtIcon,
    description: 'stateless auth via Bearer tokens, slow salted password hashing',
  },
  {
    name: 'Cloudinary + Multer',
    icon: cloudinaryIcon,
    description:
      'handles multipart uploads, CDN storage/transforms, survives redeploys',
  },
]
