import { Link } from 'react-router-dom'
import AnimatedContent from './AnimatedContent'
import {
  homebodyBgHover,
  homebodyGameplayScreenshot,
  homebodyGithubButton,
  homebodyGithubUrl,
  homebodyLogo,
  homebodyOverviewParagraphs,
  homebodyPlayButton,
  homebodyPlayUrl,
  homebodyProcessSteps,
  homebodyTechStack,
} from '../data/homebody'
import './HomebodyCaseStudy.css'

function HomebodyCaseStudy() {
  return (
    <article className="homebody-case-study">
      <Link className="homebody-case-study__back" to="/">
        Back to Projects
      </Link>

      <section
        className="homebody-case-study__hero"
        style={{ backgroundImage: `url(${homebodyBgHover})` }}
      >
        <div className="homebody-case-study__hero-fade" aria-hidden="true" />

        <img className="homebody-case-study__logo" src={homebodyLogo} alt="Homebody" />

        <div className="homebody-case-study__actions">
          <a href={homebodyPlayUrl} target="_blank" rel="noreferrer">
            <img
              className="homebody-case-study__button homebody-case-study__button--play"
              src={homebodyPlayButton}
              alt="Play"
            />
          </a>
          <a href={homebodyGithubUrl} target="_blank" rel="noreferrer">
            <img
              className="homebody-case-study__button homebody-case-study__button--github"
              src={homebodyGithubButton}
              alt="GitHub"
            />
          </a>
        </div>
      </section>

      <section className="homebody-case-study__overview">
        <AnimatedContent
          className="homebody-case-study__overview-text"
          direction="vertical"
          distance={40}
          duration={0.8}
          threshold={0.3}
        >
          <h3 className="homebody-case-study__heading">Overview</h3>
          {homebodyOverviewParagraphs.map((paragraph) => (
            <p className="homebody-case-study__overview-paragraph" key={paragraph}>
              {paragraph}
            </p>
          ))}
        </AnimatedContent>

        <AnimatedContent direction="horizontal" distance={50} duration={0.9} threshold={0.2}>
          <img
            className="homebody-case-study__screenshot"
            src={homebodyGameplayScreenshot}
            alt="Homebody gameplay screenshot"
          />
        </AnimatedContent>
      </section>

      <section className="homebody-case-study__process">
        <AnimatedContent direction="vertical" distance={40} duration={0.8} threshold={0.3}>
          <h3 className="homebody-case-study__heading">Process</h3>
        </AnimatedContent>

        <div className="homebody-case-study__process-grid">
          {homebodyProcessSteps.map((step, index) => (
            <AnimatedContent
              key={step}
              direction="vertical"
              distance={40}
              duration={0.8}
              delay={index * 0.1}
              threshold={0.2}
            >
              <div className="homebody-case-study__process-card">
                <p>{step}</p>
              </div>
            </AnimatedContent>
          ))}
        </div>
      </section>

      <section className="homebody-case-study__tech">
        <AnimatedContent direction="vertical" distance={40} duration={0.8} threshold={0.3}>
          <h3 className="homebody-case-study__tech-heading">Tech Stack</h3>
        </AnimatedContent>

        <AnimatedContent
          className="homebody-case-study__tech-row"
          direction="vertical"
          distance={30}
          duration={0.8}
          threshold={0.2}
        >
          {homebodyTechStack.map((item) => (
            <div className="homebody-case-study__tech-item" key={item.name}>
              <span className="homebody-case-study__tech-item-head">
                <img src={item.icon} alt="" />
                <span>{item.name}</span>
              </span>
              <p>{item.description}</p>
            </div>
          ))}
        </AnimatedContent>
      </section>
    </article>
  )
}

export default HomebodyCaseStudy
