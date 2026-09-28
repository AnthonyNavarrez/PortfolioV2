import acmDesignCardBg from '../assets/acm-design-card-bg.webp'
import './AcmDesignArt.css'

// Row 2 middle card art (rest: node 631:1673) — a blurred, dimmed
// screenshot of the acm.design site.
function AcmDesignArt() {
  return (
    <>
      <img className="acm-design-art__bg" src={acmDesignCardBg} alt="" />
      {/* Node 631:1676 */}
      <div className="acm-design-art__status">
        <span className="acm-design-art__status-title">In Development</span>
        <span className="acm-design-art__status-subtitle">coming soon</span>
      </div>
    </>
  )
}

export default AcmDesignArt
