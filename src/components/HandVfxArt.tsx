import { handvfxBgLayers, handvfxTracker } from '../data/handvfx'
import './HandVfxArt.css'

// Hand VFX card art (rest: node 628:1338, hover: node 623:900). Rest is
// just the left-hand crop of the full hover scene, so everything here is
// pinned to the slot's size and the growing card reveals the rest.
function HandVfxArt() {
  return (
    <>
      {handvfxBgLayers.map((layer) => (
        <img className="hand-vfx-art__bg" src={layer} alt="" key={layer} />
      ))}
      <span className="hand-vfx-art__title">Hand VFX</span>
      <img className="hand-vfx-art__tracker" src={handvfxTracker} alt="" />
    </>
  )
}

export default HandVfxArt
