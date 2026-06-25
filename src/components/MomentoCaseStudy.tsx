import { Link } from 'react-router-dom'
import AnimatedContent from './AnimatedContent'
import MomentoIcon from './MomentoIcon'
import {
  momentoBg,
  momentoBackendStack,
  momentoFrontendStack,
  momentoPin,
  momentoPolaroidCaption,
  momentoPolaroidPhoto,
  momentoProblems,
  momentoSolutionParagraphs,
} from '../data/momento'
import './MomentoCaseStudy.css'

function MomentoCaseStudy() {
  return (
    <article className="momento-case-study">
      <Link className="momento-case-study__back" to="/">
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
              <div className="momento-case-study__tech-item" key={item.name}>
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
              <div className="momento-case-study__tech-item" key={item.name}>
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
