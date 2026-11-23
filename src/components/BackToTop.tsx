import iconCaretLeft from '../assets/v4/icon-caret-left.svg'
import './BackToTop.css'

export default function BackToTop() {
  return (
    <button
      className="back-to-top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <img src={iconCaretLeft} alt="" className="back-to-top__icon" />
      Back to top
    </button>
  )
}
