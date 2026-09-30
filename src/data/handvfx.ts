import handvfxBgLayer1 from '../assets/handvfx-bg-layer-1.svg'
import handvfxBgLayer2 from '../assets/handvfx-bg-layer-2.svg'
import handvfxBgLayer3 from '../assets/handvfx-bg-layer-3.svg'
import handvfxBgLayer4 from '../assets/handvfx-bg-layer-4.svg'
import handvfxTracker from '../assets/handvfx-tracker.svg'
// Web-compressed, muted copy of assets/handFVX demo.mp4 (1600px, CRF 28).
import handvfxHeroVideo from '../assets/handvfx/hero-demo.mp4'
import handvfxHeroPoster from '../assets/handvfx/hero-demo-poster.webp'
import reactIcon from '../assets/handvfx/icon-react.png'
import typescriptIcon from '../assets/handvfx/icon-typescript.png'
import threejsIcon from '../assets/handvfx/icon-threejs.png'
import mediapipeIcon from '../assets/handvfx/icon-mediapipe.png'
import webglIcon from '../assets/handvfx/icon-webgl.png'
import r3fIcon from '../assets/handvfx/icon-r3f.png'
import glslIcon from '../assets/handvfx/icon-glsl.png'
import motionIcon from '../assets/handvfx/icon-motion.png'
import viteIcon from '../assets/handvfx/icon-vite.png'

// Blurred color blobs from node 623:900, stacked in Figma's layer order
// over the card's #06221e base.
export const handvfxBgLayers = [
  handvfxBgLayer1,
  handvfxBgLayer2,
  handvfxBgLayer3,
  handvfxBgLayer4,
]

export { handvfxTracker }

export { handvfxHeroVideo, handvfxHeroPoster }

export const handvfxLiveUrl = 'https://hand-tracking-vfx-1.vercel.app/'
export const handvfxGithubUrl = 'https://github.com/AnthonyNavarrez/Hand-tracking-VFX1'

export const handvfxOverview =
  "Hand-Tracking VFX is a browser app where your hands are the controller. You point a webcam at yourself and your gestures drive real-time video effects and a gallery of images. There's no mouse, no keyboard and no on-screen buttons to learn. It has two tools:"

export const handvfxTools = [
  {
    name: 'Hand VFX',
    url: 'https://hand-tracking-vfx-1.vercel.app/hand-vfx',
    description:
      'A "lens" stretched between your thumbs and index fingers shows your live video with inverted colors. Pinches, raised fingers, crossed hands and an open palm add or swap effects: pixelation, dithering, chromatic aberration, posterization, a lit 3D sphere lens, and swarms of particles that react to your hands.',
  },
  {
    name: 'Image VFX',
    url: 'https://hand-tracking-vfx-1.vercel.app/image-fx',
    description:
      'A gallery of Images you browse with hand gestures. A thumbs-up reveals the images, your index finger acts as the pointer, and a pinch selects an image. It has several layouts: tilted cards, a dome, a circular carousel and a scattered layout.',
  },
]

export interface HandvfxTechItem {
  icon: string
  name: string
  description: string
  // Icon box size in Figma px (node 628:1351).
  iconWidth: number
  iconHeight: number
  // Figma's crop of the source image inside that box, as % of the box
  // (left, top, width, height). Omitted when the image just covers it.
  iconCrop?: [number, number, number, number]
}

// Two rows, as laid out in Figma.
export const handvfxTechStack: HandvfxTechItem[][] = [
  [
    { icon: reactIcon, name: 'React', description: 'UI, routing between dashboard/tools, shared camera + tracking state', iconWidth: 39, iconHeight: 35 },
    { icon: typescriptIcon, name: 'TypeScript', description: 'type-safe hand landmarks, gesture logic + config values', iconWidth: 40, iconHeight: 35 },
    { icon: threejsIcon, name: 'Three.js', description: '3D scene, video textures, lens quad, sphere and particle meshes', iconWidth: 40, iconHeight: 40 },
    { icon: mediapipeIcon, name: 'MediaPipe', description: 'real-time hand landmark detection from the webcam, for both hands', iconWidth: 35, iconHeight: 35 },
    { icon: webglIcon, name: 'WebGL', description: 'GPU rendering for the effects and image galleries', iconWidth: 77, iconHeight: 35, iconCrop: [-32.79, -80.92, 162.34, 265.02] },
  ],
  [
    { icon: r3fIcon, name: 'React Three Fiber', description: 'Three.js scenes written as React components, per-frame animation loop', iconWidth: 39, iconHeight: 34, iconCrop: [-48.48, -43.79, 310.3, 198.62] },
    { icon: glslIcon, name: 'GLSL', description: 'custom shaders, pixelation, dithering, chromatic aberration, posterization and lighting', iconWidth: 55, iconHeight: 34 },
    { icon: motionIcon, name: 'Motion', description: 'spring animations for the tilted cards and gallery transitions', iconWidth: 32, iconHeight: 33, iconCrop: [-36.96, 0, 173.91, 166.76] },
    { icon: viteIcon, name: 'Vite', description: 'dev server with hot reload, production build', iconWidth: 34, iconHeight: 33 },
  ],
]

// Same stack, as one row for the home card's stage-2 carousel.
export const handvfxSkills = handvfxTechStack.flat()
