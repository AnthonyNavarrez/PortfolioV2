import homebodyBg from '../assets/homebody-bg.png'
import homebodyBgHover from '../assets/homebody-bg-hover.png'
import homebodyLogo from '../assets/homebody-logo.png'
import homebodyMushroom from '../assets/homebody-mushroom.png'
import homebodyPlayButton from '../assets/homebody-play-button.png'
import homebodyGithubButton from '../assets/homebody-github-button.png'
import homebodyGameplayScreenshot from '../assets/homebody-gameplay-screenshot.png'
import phaserIcon from '../assets/Phaser_Logo.png'
import viteIcon from '../assets/homebody-icon-vite.png'
import wsIcon from '../assets/homebody-icon-ws.png'
import tsIcon from '../assets/homebody-icon-ts.png'
import tsxIcon from '../assets/homebody-icon-tsx.png'

export {
  homebodyBg,
  homebodyBgHover,
  homebodyLogo,
  homebodyMushroom,
  homebodyPlayButton,
  homebodyGithubButton,
  homebodyGameplayScreenshot,
}

export const homebodyPlayUrl = 'https://last-human-1.onrender.com'
export const homebodyGithubUrl = 'https://github.com/AnthonyNavarrez/Homebody'

export const homebodyDescription = 'Browser videogame, no installation'

export const homebodyOverviewParagraphs = [
  'Homebody is a 2D top-down pixel-art survival wave-defense game, playable solo or in multiplayer directly in the browser, no install required.',
  'The game runs on a day/night cycle. During the day, explore an open world map and gather resources to prepare your gear and defenses. At night, waves of enemies attack you and your house. Each night gets harder to survive, so the pressure to prep defenses during the day keeps ramping.',
]

export const homebodyProcessSteps = [
  'Brainstorming on a Google Doc. Worked out core game logic, mechanics, and rough feature ideas. Fed the brainstorm into Claude to refine and expand into fuller mechanics, and balance-patch numbers/systems that needed tuning.',
  "Existing asset packs were sourced as the visual reference/base for game art. AI (Reve, Google Flow) image generation was used to fill in the gaps, creating custom art for anything the asset packs didn't cover.",
  'Claude Code running in the VS Code IDE, implemented handoff step by step. Each feature was built then debugged/edited. Game was then deployed and tested end-to-end.',
  'Claude created a PRD. I reviewed and reprioritized by hand to lock in the non-negotiables — no-install browser play, ease of access, multiplayer support — before implementation began. Created a handoff MD file for Claude Code.',
]

export const homebodySkills = [
  { name: 'Phaser 3', icon: phaserIcon },
  { name: 'Vite', icon: viteIcon },
  { name: 'WS', icon: wsIcon },
  { name: 'TypeScript', icon: tsIcon },
  { name: 'TSX', icon: tsxIcon },
]

export interface TechStackItem {
  name: string
  icon: string
  description: string
}

export const homebodyTechStack: TechStackItem[] = [
  {
    name: 'Phaser 3',
    icon: phaserIcon,
    description: 'Scene management, physics, animation, input handling',
  },
  {
    name: 'Vite',
    icon: viteIcon,
    description:
      'Near-instant hot reload while iterating, produces optimized static build that gets deployed',
  },
  {
    name: 'ws',
    icon: wsIcon,
    description:
      'WebSocket server library, room creation/joining, real-time state broadcast to connected clients',
  },
  {
    name: 'Typescript',
    icon: tsIcon,
    description:
      'Type safety across client, server, and shared network protocol. Catch mismatches between client and server packet shapes at compile time',
  },
  {
    name: 'TSX',
    icon: tsxIcon,
    description: 'Runs and hot-reloads the TypeScript multiplayer server directly in development',
  },
]
