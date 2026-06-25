import homieGetStartedScreen from '../assets/homie-get-started-screen.webp'
import homieMockupFrame from '../assets/homie-mockup-frame.webp'
import homieTextConvoScreen from '../assets/homie-text-convo-screen.webp'
import './HomieDescriptionMockup.css'

interface Props {
  showGetStarted?: boolean
}

function HomieDescriptionMockup({ showGetStarted }: Props) {
  return (
    <div className="homie-description-mockup">
      <img
        className="homie-description-mockup__frame"
        src={homieMockupFrame}
        alt=""
      />
      <div className="homie-description-mockup__screen">
        <img
          className="homie-description-mockup__screen-img"
          src={homieTextConvoScreen}
          alt="Text conversation between roommates about chores and chore-related conflict"
        />
        <img
          className={`homie-description-mockup__screen-img homie-description-mockup__screen-img--overlay${showGetStarted ? ' homie-description-mockup__screen-img--visible' : ''}`}
          src={homieGetStartedScreen}
          alt="Homie onboarding welcome screen"
        />
      </div>
    </div>
  )
}

export default HomieDescriptionMockup
