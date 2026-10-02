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
import minecraftIcon from '../assets/homebody-cs/minecraft.webp'
import robloxIcon from '../assets/homebody-cs/roblox.webp'
import moomooIcon from '../assets/homebody-cs/moomoo.webp'
import homebodyPawnRun from '../assets/homebody-cs/pawn-run.png'
import homebodyPawnShadow from '../assets/homebody-cs/pawn-shadow.svg'
// Web-compressed, muted copies of assets/Homebody*.mp4 (960px, CRF 27;
// the overview bow clip at 1404px),
// with first-frame posters.
import combatVideo from '../assets/homebody-cs/combat.mp4'
import combatPoster from '../assets/homebody-cs/combat-poster.webp'
import resourcesVideo from '../assets/homebody-cs/resources.mp4'
import resourcesPoster from '../assets/homebody-cs/resources-poster.webp'
import craftingVideo from '../assets/homebody-cs/crafting.mp4'
import craftingPoster from '../assets/homebody-cs/crafting-poster.webp'
import buildingVideo from '../assets/homebody-cs/building.mp4'
import buildingPoster from '../assets/homebody-cs/building-poster.webp'
import biome1Video from '../assets/homebody-cs/biome-1.mp4'
import biome1Poster from '../assets/homebody-cs/biome-1-poster.webp'
import biome2Video from '../assets/homebody-cs/biome-2.mp4'
import biome2Poster from '../assets/homebody-cs/biome-2-poster.webp'
import homebodyOverviewVideo from '../assets/homebody-cs/bow.mp4'
import homebodyOverviewPoster from '../assets/homebody-cs/bow-poster.webp'

export {
  homebodyBg,
  homebodyBgHover,
  homebodyLogo,
  homebodyMushroom,
  homebodyPlayButton,
  homebodyGithubButton,
  homebodyGameplayScreenshot,
  homebodyOverviewVideo,
  homebodyOverviewPoster,
  homebodyPawnRun,
  homebodyPawnShadow,
}

// Case study content below — synced from Figma (node 693:2949).
export const homebodyPainPoints = [
  {
    title: 'Getting friends into a game is hard',
    body: 'Downloads, accounts and server setup kill a spontaneous "want to play?" before it starts.',
  },
  {
    title: 'Sessions need a reason to keep going',
    body: "Open-ended sandboxes can drift. Without a clock or a threat, there's no pressure to plan, and no story to tell after.",
  },
  {
    title: 'Too much freedom drifts, too much story boxes you in',
    body: 'Heavily scripted games go the other way, with a set path that leaves no room for your own plans. Homebody needed the middle',
  },
]

// Each game: what Homebody borrowed (pro, green) and what it fixes (con, red).
export const homebodyInspirations = [
  {
    key: 'minecraft',
    name: 'Minecraft',
    icon: minecraftIcon,
    pro: 'Resource gathering, tiered crafting: weapons, armor, structures.',
    con: 'Weak story line that does not provide agency for the user leaving a lot of room to drift.',
  },
  {
    key: 'roblox',
    name: 'Roblox - 99 nights in the Forest',
    icon: robloxIcon,
    pro: 'The day/night loop with waves of enemies, escalating nights, a home base you protect, resource gathering, technically 1 life',
    con: 'Low ceiling for player level and base upgrades, low variety in enemies, boring wave progression',
  },
  {
    key: 'moomoo',
    name: 'moomoo.io',
    icon: moomooIcon,
    pro: 'Browser access no download or sign up, 2D top-down view, base building, crafting, technically 1 life.',
    con: 'No agency, PvP focused so relies on many people on at once',
  },
]

export interface HomebodyClip {
  label: string
  src: string
  poster: string
}

// Final Designs: four labeled clips, then the two biome clips.
export const homebodyClips: HomebodyClip[] = [
  { label: 'Combat', src: combatVideo, poster: combatPoster },
  { label: 'Resource gathering', src: resourcesVideo, poster: resourcesPoster },
  { label: 'Crafting', src: craftingVideo, poster: craftingPoster },
  { label: 'Base Building', src: buildingVideo, poster: buildingPoster },
  { label: 'Biome exploration (1)', src: biome1Video, poster: biome1Poster },
  { label: 'Biome exploration (2)', src: biome2Video, poster: biome2Poster },
]

export const homebodyPlayUrl = 'https://last-human-1.onrender.com'
export const homebodyGithubUrl = 'https://github.com/AnthonyNavarrez/Homebody'

export const homebodyDescription = 'Browser videogame, no installation'

export const homebodyOverviewParagraphs = [
  'Homebody is a 2D top-down pixel-art survival wave-defense game, playable solo or in multiplayer directly in the browser, no install required.',
  'The game runs on a day/night cycle. During the day, explore an open world map and gather resources to prepare your gear and defenses. At night, waves of enemies attack you and your house. Each night gets harder to survive, so the pressure to prep defenses during the day keeps ramping.',
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
  // Column width in px from Figma (node 701:3128).
  width?: number
}

export const homebodyTechStack: TechStackItem[] = [
  {
    name: 'Phaser 3',
    width: 167,
    icon: phaserIcon,
    description: 'Scene management, physics, animation, input handling',
  },
  {
    name: 'Vite',
    width: 209,
    icon: viteIcon,
    description:
      'Near-instant hot reload while iterating, produces optimized static build that gets deployed',
  },
  {
    name: 'ws',
    width: 239,
    icon: wsIcon,
    description:
      'WebSocket server library, room creation/joining, real-time state broadcast to connected clients',
  },
  {
    name: 'Typescript',
    width: 273,
    icon: tsIcon,
    description:
      'Type safety across client, server, and shared network protocol. Catch mismatches between client and server packet shapes at compile time',
  },
  {
    name: 'TSX',
    width: 205,
    icon: tsxIcon,
    description: 'Runs and hot-reloads the TypeScript multiplayer server directly in development',
  },
]
