import './LoadingScreen.css'

export default function LoadingScreen({ visible }: { visible: boolean }) {
  return (
    <div className={`loading-screen${visible ? '' : ' loading-screen--hidden'}`}>
      <div className="loading-blob-wrap">
        <div className="loading-blob">
          <span className="loading-blob__text">Loading</span>
        </div>
      </div>
    </div>
  )
}
