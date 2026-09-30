import clothesBoots from '../assets/fitzi/clothes-boots.webp'
import clothesCap from '../assets/fitzi/clothes-cap.webp'
import clothesJeans from '../assets/fitzi/clothes-jeans.webp'
import clothesNecklace from '../assets/fitzi/clothes-necklace.webp'
import clothesShirtBlue from '../assets/fitzi/clothes-shirt-blue.webp'
import clothesSunglasses from '../assets/fitzi/clothes-sunglasses.webp'
import clothesTee from '../assets/fitzi/clothes-tee.webp'
import swooshA from '../assets/fitzi/swoosh-a.webp'
import swooshB from '../assets/fitzi/swoosh-b.webp'
import swooshC from '../assets/fitzi/swoosh-c.webp'
import swooshHover from '../assets/fitzi/swoosh-hover.webp'
import './FitziArt.css'

// Clothing tiles for stage 2 (node 653:1389). The "back" tiles are
// blurred and sit under the swoosh; the rest float above the wordmark.
const backClothes = [
  { name: 'sunglasses', src: clothesSunglasses },
  { name: 'necklace', src: clothesNecklace },
  { name: 'shirt', src: clothesShirtBlue },
]

const frontClothes = [
  { name: 'cap', src: clothesCap },
  { name: 'tee', src: clothesTee },
  { name: 'boots', src: clothesBoots },
  { name: 'jeans', src: clothesJeans },
]

function ClothesTile({ name, src }: { name: string; src: string }) {
  return (
    <div className={`fitzi-art__clothes fitzi-art__clothes--${name}`}>
      <img src={src} alt="" />
    </div>
  )
}

// Row 2 right card art (rest: node 653:1392, hover: node 653:1389).
function FitziArt() {
  return (
    <>
      <div className="fitzi-art__bg-hover" />

      {backClothes.map((item) => (
        <ClothesTile {...item} key={item.name} />
      ))}

      {/* Two stacked swoosh layers at 23% opacity; the stage-1 and
          stage-2 tints crossfade while the layers scale up. */}
      <div className="fitzi-art__swoosh fitzi-art__swoosh--1">
        <img src={swooshA} alt="" />
        <img className="fitzi-art__swoosh-rest" src={swooshB} alt="" />
        <img className="fitzi-art__swoosh-hover" src={swooshA} alt="" />
      </div>
      <div className="fitzi-art__swoosh fitzi-art__swoosh--2">
        <img className="fitzi-art__swoosh-rest" src={swooshC} alt="" />
        <img className="fitzi-art__swoosh-hover" src={swooshHover} alt="" />
      </div>

      <span className="fitzi-art__title">
        Fit<span className="fitzi-art__title-tail">zi</span>
      </span>
      <span className="fitzi-art__subtitle">AI Fashion App</span>

      {frontClothes.map((item) => (
        <ClothesTile {...item} key={item.name} />
      ))}
    </>
  )
}

export default FitziArt
