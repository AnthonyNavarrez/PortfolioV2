import { Link } from 'react-router-dom'
import AnimatedContent from './AnimatedContent'
import MomentoIcon from './MomentoIcon'
import {
  momentoBg,
  momentoBackendStack,
  momentoDesignSystem,
  momentoFrontendStack,
  momentoJourneys,
  momentoPin,
  momentoPolaroidCaption,
  momentoPolaroidPhoto,
  momentoProblemIntro,
  momentoProblems,
  momentoSolutionParagraphs,
  momentoVisualDirection,
} from '../data/momento'
import './MomentoCaseStudy.css'

function MomentoCaseStudy() {
  return (
    <article className="momento-case-study">
      <Link className="momento-case-study__back" to="/" state={{ scrollTo: 'projects' }}>
        Back to Projects
      </Link>

      <section
        className="momento-case-study__hero"
        style={{ backgroundImage: `url(${momentoBg})` }}
      >
        <div className="momento-case-study__hero-fade" aria-hidden="true" />

        <div className="momento-case-study__logo">
          <span className="momento-case-study__logo-icon">
            <MomentoIcon />
          </span>
          <span className="momento-case-study__logo-text">MOMENTO</span>
        </div>

        <div className="momento-case-study__actions">
          <a
            className="momento-case-study__button momento-case-study__button--filled"
            href="https://momento-0n13.onrender.com/gallery"
            target="_blank"
            rel="noreferrer"
          >
            Try it Live
          </a>
          <a
            className="momento-case-study__button momento-case-study__button--outline"
            href="https://github.com/AnthonyNavarrez/momento"
            target="_blank"
            rel="noreferrer"
          >
            github
          </a>
        </div>
      </section>

      <section className="momento-case-study__problem">
        <AnimatedContent
          className="momento-case-study__problem-panel"
          direction="vertical"
          distance={0}
          scale={0.8}
          borderRadius="32px"
          animateOpacity={false}
          once={false}
          duration={1}
          ease="power2.out"
          threshold={0.15}
        >
          <AnimatedContent direction="vertical" distance={40} duration={0.8} threshold={0.3}>
            <h3 className="momento-case-study__problem-heading">Problem</h3>
            <p className="momento-case-study__problem-intro">
              {momentoProblemIntro.before}
              <a href={momentoProblemIntro.linkHref} target="_blank" rel="noreferrer">
                {momentoProblemIntro.linkText}
              </a>
              {momentoProblemIntro.after}
            </p>
          </AnimatedContent>

          <div className="momento-case-study__problem-grid">
            {momentoProblems.map((problem, index) => (
              <AnimatedContent
                key={problem.title}
                direction="vertical"
                distance={40}
                duration={0.8}
                delay={index * 0.1}
                threshold={0.2}
              >
                <p className="momento-case-study__problem-title">{problem.title}</p>
                <p className="momento-case-study__problem-body">{problem.body}</p>
              </AnimatedContent>
            ))}
          </div>
        </AnimatedContent>
      </section>

      <section className="momento-case-study__solution">
        <AnimatedContent
          className="momento-case-study__polaroid"
          direction="horizontal"
          distance={50}
          duration={0.9}
          threshold={0.2}
        >
          <div
            className="momento-case-study__polaroid-glow"
            style={{ backgroundImage: `url(${momentoBg})` }}
            aria-hidden="true"
          />
          <div className="momento-case-study__polaroid-card">
            <img
              className="momento-case-study__polaroid-photo"
              src={momentoPolaroidPhoto}
              alt="Matcha pop up at DTLA"
            />
            <p className="momento-case-study__polaroid-caption">
              {momentoPolaroidCaption}
            </p>
          </div>
          <img className="momento-case-study__polaroid-pin" src={momentoPin} alt="" />
        </AnimatedContent>

        <AnimatedContent
          className="momento-case-study__solution-text"
          direction="vertical"
          distance={40}
          duration={0.8}
          threshold={0.2}
        >
          <h3 className="momento-case-study__solution-heading">Solution</h3>
          <p className="momento-case-study__solution-paragraph">
            <strong>Momento</strong> {momentoSolutionParagraphs[0]}
          </p>
          <p className="momento-case-study__solution-paragraph">
            {momentoSolutionParagraphs[1]}
          </p>
        </AnimatedContent>
      </section>

      <section className="momento-case-study__journeys">
        <AnimatedContent direction="vertical" distance={40} duration={0.8} threshold={0.3}>
          <h3 className="momento-case-study__section-heading">Mapping User Journeys</h3>
        </AnimatedContent>

        <AnimatedContent direction="vertical" distance={40} duration={0.8} threshold={0.15}>
          <div className="momento-case-study__journey-table" role="table">
            <div className="momento-case-study__journey-row momento-case-study__journey-row--head" role="row">
              <span role="columnheader">Moment</span>
              <span role="columnheader">What’s the user doing?</span>
              <span role="columnheader">What can Momento do?</span>
            </div>
            {momentoJourneys.map((journey) => (
              <div className="momento-case-study__journey-row" role="row" key={journey.moment}>
                <span role="cell">{journey.moment}</span>
                <span role="cell">{journey.doing}</span>
                <span role="cell">{journey.momento}</span>
              </div>
            ))}
          </div>
        </AnimatedContent>
      </section>

      <section className="momento-case-study__visual">
        <AnimatedContent direction="vertical" distance={40} duration={0.8} threshold={0.3}>
          <h3 className="momento-case-study__section-heading">Visual direction</h3>
          <p className="momento-case-study__visual-text">{momentoVisualDirection}</p>
        </AnimatedContent>
      </section>

      <section className="momento-case-study__design-system">
        <AnimatedContent direction="vertical" distance={40} duration={0.8} threshold={0.3}>
          <h3 className="momento-case-study__section-heading">Design System</h3>
        </AnimatedContent>

        <AnimatedContent direction="vertical" distance={40} duration={0.8} threshold={0.2}>
          <img
            className="momento-case-study__design-system-image"
            src={momentoDesignSystem}
            alt="Momento type scale and color palette"
          />
        </AnimatedContent>

        <AnimatedContent
          className="momento-case-study__design-system-text"
          direction="vertical"
          distance={40}
          duration={0.8}
          threshold={0.2}
        >
          <p>
            <strong>Color</strong>
            <br />
            Vibrant orange <span className="momento-case-study__hex momento-case-study__hex--orange">#FF7A33</span>{' '}
            and blue <span className="momento-case-study__hex momento-case-study__hex--blue">#208BEA</span>, with
            softer <span className="momento-case-study__hex momento-case-study__hex--amber">#FDA831</span> and{' '}
            <span className="momento-case-study__hex momento-case-study__hex--steel">#3B7DD8</span> for text and
            backgrounds. Momento is about getting out and exploring, so the palette should feel energetic and alive.
            Orange leads the logo, pins and the main actions. Blue is its complement.
          </p>
          <p>
            <strong>Typography:</strong>
            <br />
            <span className="momento-case-study__hand">Just Another Hand</span> is a handwritten display face, used
            for titles. It gives Momento a playful scrapbooky feel, like a note scribbled on photo.{' '}
            <span className="momento-case-study__medium">Inter</span> is neutral, calm, and a web standard, so it
            balances the handwriting and stays readable at small sizes over a map.
          </p>
        </AnimatedContent>
      </section>

      <section className="momento-case-study__tech">
        <AnimatedContent direction="vertical" distance={40} duration={0.8} threshold={0.3}>
          <h3 className="momento-case-study__tech-heading">Tech Stack</h3>
        </AnimatedContent>

        <AnimatedContent
          className="momento-case-study__tech-row"
          direction="vertical"
          distance={30}
          duration={0.8}
          threshold={0.2}
        >
          <span className="momento-case-study__tech-label">Frontend</span>
          <div className="momento-case-study__tech-items">
            {momentoFrontendStack.map((item) => (
              <div className="momento-case-study__tech-item" style={{ width: item.width }} key={item.name}>
                <span className="momento-case-study__tech-item-head">
                  <img src={item.icon} alt="" />
                  <span>{item.name}</span>
                </span>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </AnimatedContent>

        <AnimatedContent
          className="momento-case-study__tech-row"
          direction="vertical"
          distance={30}
          duration={0.8}
          delay={0.1}
          threshold={0.2}
        >
          <span className="momento-case-study__tech-label">Backend</span>
          <div className="momento-case-study__tech-items">
            {momentoBackendStack.map((item) => (
              <div className="momento-case-study__tech-item" style={{ width: item.width }} key={item.name}>
                <span className="momento-case-study__tech-item-head">
                  <img src={item.icon} alt="" />
                  <span>{item.name}</span>
                </span>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </AnimatedContent>
      </section>
    </article>
  )
}

export default MomentoCaseStudy
