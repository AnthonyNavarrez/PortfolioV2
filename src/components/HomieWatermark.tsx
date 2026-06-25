import HomieIcon from './HomieIcon'
import './HomieWatermark.css'

function HomieWatermark() {
  return (
    <div className="homie-watermark" aria-hidden="true">
      <span className="homie-watermark__icon">
        <HomieIcon />
      </span>
      <span className="homie-watermark__text">HOMIE</span>
    </div>
  )
}

export default HomieWatermark
