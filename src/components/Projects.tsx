import {
  homieBg,
  homieDescription,
  homiePhoneMockup,
  homiePhoneMockup2,
  homieSkills,
} from '../data/homie'
import {
  momentoBg,
  momentoDescription,
  momentoLandingScreen,
  momentoMockup,
  momentoSkills,
} from '../data/momento'
import {
  homebodyBg,
  homebodyBgHover,
  homebodyDescription,
  homebodyLogo,
  homebodyMushroom,
  homebodySkills,
} from '../data/homebody'
import { handvfxSkills } from '../data/handvfx'
import AcmDesignArt from './AcmDesignArt'
import FitziArt from './FitziArt'
import HandVfxArt from './HandVfxArt'
import HomieIcon from './HomieIcon'
import MomentoIcon from './MomentoIcon'
import ProjectCard from './ProjectCard'
import ProjectCardPlaceholder from './ProjectCardPlaceholder'
import './Projects.css'

function Projects() {
  return (
    <section className="projects" id="projects">
      <h2 className="projects__heading">Projects</h2>
      <div className="projects__grid">
        <ProjectCard
          background={homieBg}
          icon={<HomieIcon />}
          title="HOMIE"
          description={homieDescription}
          skills={homieSkills}
          mockups={[homiePhoneMockup, homiePhoneMockup2]}
          href="/homie"
          variant="homie"
        />
        <ProjectCard
          background={momentoBg}
          icon={<MomentoIcon />}
          title="MOMENTO"
          description={momentoDescription}
          skills={momentoSkills}
          mockups={[momentoLandingScreen]}
          mobileMockup={momentoMockup}
          href="/momento"
          variant="momento"
        />
        <ProjectCardPlaceholder
          expand="left"
          background={homebodyBg}
          hoverBackground={homebodyBgHover}
          logo={homebodyLogo}
          logoAlt="Homebody"
          description={homebodyDescription}
          mockup={homebodyMushroom}
          skills={homebodySkills}
          href="/homebody"
        />
      </div>
      {/* Second row: placeholders until Figma frames are supplied. */}
      <div className="projects__grid">
        <ProjectCardPlaceholder
          expand="right"
          variant="hand-vfx"
          href="/handvfx"
          skills={handvfxSkills}
          skillsVariant="chips"
        >
          <HandVfxArt />
        </ProjectCardPlaceholder>
        <ProjectCardPlaceholder expand="center" variant="acm-design" href="/acm-design">
          <AcmDesignArt />
        </ProjectCardPlaceholder>
        <ProjectCardPlaceholder expand="left" variant="fitzi" href="/fitzi">
          <FitziArt />
        </ProjectCardPlaceholder>
      </div>
    </section>
  )
}

export default Projects
