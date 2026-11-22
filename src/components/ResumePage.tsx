import iconDocumentDownload from '../assets/v3/icon-document-download.svg'
import iconArrowTopRight from '../assets/v3/icon-arrow-top-right.svg'
import resumePdf from '../assets/contact/Anthony Navarrez _ Resume (Digital).pdf'
import './ResumePage.css'

function ResumePage() {
  return (
    <div className="resume-page">
      <main className="resume-page__main">
        <h1 className="resume__heading">Resume</h1>

        <div className="resume__actions">
          <a href={resumePdf} download="Anthony_Navarrez_Resume.pdf" className="resume__action-btn">
            <img src={iconDocumentDownload} alt="" className="resume__action-icon" />
            <span>Download</span>
          </a>
          <a href={resumePdf} target="_blank" rel="noreferrer" className="resume__action-btn">
            <img src={iconArrowTopRight} alt="" className="resume__action-icon" />
            <span>Open PDF</span>
          </a>
        </div>

        <div className="resume__card">
          <iframe src={`${resumePdf}#toolbar=0&navpanes=0&scrollbar=0`} className="resume__iframe" title="Anthony Navarrez Resume" />
        </div>
      </main>
    </div>
  )
}

export default ResumePage
