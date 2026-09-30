import bezier from '../assets/acm/bezier.svg'
import foxBody from '../assets/acm/fox-body.svg'
import foxHead from '../assets/acm/fox-head.svg'
import foxTail from '../assets/acm/fox-tail.svg'
import logoHover from '../assets/acm/logo-hover.svg'
import logoRest from '../assets/acm/logo-rest.svg'
import foxShadow from '../assets/acm/shadow.webp'
import websiteTexture from '../assets/acm/website-text.webp'
import wordmark from '../assets/acm/wordmark.svg'
import './AcmDesignArt.css'

// Row 2 middle card art (rest: node 659:1353, hover: node 659:1354).
function AcmDesignArt() {
  return (
    <>
      <div className="acm-design-art__bg-hover" />

      {/* The logo shrinks into the top-left corner, its gradient fill
          crossfading to flat orange. */}
      <div className="acm-design-art__logo">
        <img className="acm-design-art__logo-rest" src={logoRest} alt="" />
        <img className="acm-design-art__logo-hover" src={logoHover} alt="" />
      </div>

      <span
        className="acm-design-art__website"
        style={{ backgroundImage: `url(${websiteTexture})` }}
      >
        Website
      </span>

      {/* Browser window mock (node 656:1242). */}
      <div className="acm-design-art__browser">
        <span className="acm-design-art__rect acm-design-art__rect--window" />
        <span className="acm-design-art__rect acm-design-art__rect--panel" />
        <span className="acm-design-art__rect acm-design-art__rect--bar" />
        <span className="acm-design-art__rect acm-design-art__rect--tab" />
        <span className="acm-design-art__rect acm-design-art__rect--dot" />
        <span className="acm-design-art__est">Est. 2019</span>
      </div>

      <div className="acm-design-art__fox">
        <img className="acm-design-art__fox-shadow" src={foxShadow} alt="" />
        <img className="acm-design-art__fox-tail" src={foxTail} alt="" />
        <img className="acm-design-art__fox-body" src={foxBody} alt="" />
        <img className="acm-design-art__fox-head" src={foxHead} alt="" />
      </div>

      <div className="acm-design-art__bezier">
        <img src={bezier} alt="" />
      </div>

      <img className="acm-design-art__wordmark" src={wordmark} alt="acm.design" />
    </>
  )
}

export default AcmDesignArt
