import './HomieAnnotation.css'

function HomieAnnotation() {
  return (
    <div className="homie-annotation">
      <svg
        className="homie-annotation__swirl"
        width="185"
        height="169"
        viewBox="0 0 185 169"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M113.238 68.3023C96.3766 72.7608 80.8701 74.2631 81.9314 86.356C82.3609 91.2495 86.9407 94.5279 90.6322 95.0231C96.1413 95.7622 100.804 90.426 101.434 87.3983C102.949 80.1131 97.4538 74.6279 90.0391 74.4365C76.0733 74.0761 73.6762 75.7352 71.1055 76.9958"
          stroke="#53453A"
          strokeWidth="2.10163"
          strokeLinecap="round"
        />
      </svg>
      <p className="homie-annotation__label">Your entire household in one place</p>
    </div>
  )
}

export default HomieAnnotation
