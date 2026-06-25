import reactIcon from '../assets/skills/skill-react.webp'
import expoIcon from '../assets/skills/skill-expo.webp'
import zustandIcon from '../assets/skills/skill-zustand.webp'
import tanstackIcon from '../assets/skills/skill-tanstack.webp'
import firestoreIcon from '../assets/skills/skill-firestore.webp'
import firebaseAuthIcon from '../assets/skills/skill-firebase-auth.png'
import typescriptIcon from '../assets/skills/skill-typescript.webp'
import javascriptIcon from '../assets/skills/skill-javascript.webp'
import './HomieTechStack.css'

interface TechItem {
  icon: string
  name: string
  description?: string
}

interface TechGroup {
  label: string
  items: TechItem[]
}

const FRONTEND: TechGroup = {
  label: 'Frontend',
  items: [
    { icon: reactIcon,    name: 'React Native',   description: 'cross-platform mobile UI from one codebase' },
    { icon: expoIcon,     name: 'Expo (SDK 54)',   description: 'managed RN tooling, simplifies build/dev workflow' },
    { icon: expoIcon,     name: 'Expo Router v3',  description: 'file-based routing, less boilerplate than React Navigation' },
    { icon: zustandIcon,  name: 'Zustand',         description: 'lightweight global state (auth/house stores)' },
    { icon: tanstackIcon, name: 'TanStack Query',  description: 'client-side cache wrapping Firestore listeners' },
  ],
}

const BACKEND: TechGroup = {
  label: 'Backend',
  items: [
    { icon: firestoreIcon,   name: 'Firestore',     description: 'realtime NoSQL DB, fits multi-user "house" sync model' },
    { icon: firebaseAuthIcon, name: 'Firebase Auth', description: 'managed email/password auth, no custom server' },
  ],
}

const LANGUAGES: TechGroup = {
  label: 'Languages',
  items: [
    { icon: typescriptIcon, name: 'TypeScript' },
    { icon: javascriptIcon, name: 'JavaScript' },
  ],
}

function TechGroup({ group }: { group: TechGroup }) {
  return (
    <div className="homie-tech-stack__group">
      <div className="homie-tech-stack__label-wrap">
        <span className="homie-tech-stack__label">{group.label}</span>
        <div className="homie-tech-stack__divider" />
      </div>
      <div className="homie-tech-stack__items">
        {group.items.map(item => (
          <div key={item.name} className="homie-tech-stack__item">
            <div className="homie-tech-stack__item-header">
              <img src={item.icon} alt={item.name} className="homie-tech-stack__icon" />
              <span className="homie-tech-stack__name">{item.name}</span>
            </div>
            {item.description && (
              <p className="homie-tech-stack__description">{item.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function HomieTechStack() {
  return (
    <div className="homie-tech-stack">
      <TechGroup group={FRONTEND} />
      <div className="homie-tech-stack__row">
        <TechGroup group={BACKEND} />
        <TechGroup group={LANGUAGES} />
      </div>
    </div>
  )
}

export default HomieTechStack
