import contactGlow from '../assets/contact/glow.svg'
import { aboutContactLinks } from '../data/about'
import ScanPortrait from './ScanPortrait'
import './Contact.css'

// Page footer — synced from Figma (node 666:1525): "Contact Me", the
// contact links in a row, and the scan-box portrait rising from the
// bottom edge.
function Contact() {
  return (
    <footer className="contact">
      <img className="contact__glow" src={contactGlow} alt="" aria-hidden="true" />

      <h2 className="contact__heading">Contact Me</h2>

      <ul className="contact__links">
        {aboutContactLinks.map((link) => (
          <li key={link.name}>
            <a className="contact__link" href={link.href} target="_blank" rel="noreferrer">
              <img className="contact__link-icon" src={link.icon} alt="" />
              <span>{link.label}</span>
            </a>
          </li>
        ))}
      </ul>

      <ScanPortrait className="contact__portrait" />
    </footer>
  )
}

export default Contact
