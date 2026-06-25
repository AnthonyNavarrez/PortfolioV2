import designIgFireside from '../assets/designs/design-ig-fireside.webp'
import designIgWeeklyWorkshops from '../assets/designs/design-ig-weeklyworkshops.webp'
import designW1 from '../assets/designs/design-w1.webp'
import designW2 from '../assets/designs/design-w2.webp'
import designW3 from '../assets/designs/design-w3.webp'
import designW4 from '../assets/designs/design-w4.webp'
import designW6 from '../assets/designs/design-w6.webp'
import designW7 from '../assets/designs/design-w7.webp'
import designW8 from '../assets/designs/design-w8.webp'
import designWinterRecap from '../assets/designs/design-winterrecap.webp'
import InfiniteImageField from './InfiniteImageField'
import './Designs.css'

const designImages = [
  designW1,
  designW2,
  designW3,
  designW4,
  designW6,
  designW7,
  designW8,
  designIgFireside,
  designIgWeeklyWorkshops,
  designWinterRecap,
]

function Designs() {
  return (
    <section className="designs">
      <h2 className="designs__heading">Designs</h2>
      <div className="designs__field">
        <InfiniteImageField
          images={designImages}
          imageWidth={216}
          imageHeight={270}
          borderRadius={12}
        />
      </div>
    </section>
  )
}

export default Designs
