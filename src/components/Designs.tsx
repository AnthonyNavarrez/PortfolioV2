import { useEffect, useState } from 'react'
import design1 from '../assets/design1.png'
import design2 from '../assets/design2.png'
import design3 from '../assets/design3.png'
import design4 from '../assets/design4.png'
import designIgFireside from '../assets/designs/design-ig-fireside.webp'
import designIgWeeklyWorkshops from '../assets/designs/design-ig-weeklyworkshops.webp'
import designW1 from '../assets/designs/design-w1.webp'
import designW2 from '../assets/designs/design-w2.webp'
import designW3 from '../assets/designs/design-w3.webp'
import designW6 from '../assets/designs/design-w6.webp'
import designW7 from '../assets/designs/design-w7.webp'
import designW8 from '../assets/designs/design-w8.webp'
import InfiniteImageField from './InfiniteImageField'
import './Designs.css'

const designImages = [
  design1,
  design2,
  design3,
  design4,
  designW1,
  designW2,
  designW3,
  designW6,
  designW7,
  designW8,
  designIgFireside,
  designIgWeeklyWorkshops,
]

function Designs() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 1024px)')
    const update = () => setIsMobile(mql.matches)
    update()
    mql.addEventListener('change', update)
    return () => mql.removeEventListener('change', update)
  }, [])

  return (
    <section className="designs">
      <h2 className="designs__heading">Designs</h2>
      <div className="designs__field">
        <InfiniteImageField
          images={designImages}
          imageWidth={isMobile ? 180 : 216}
          imageHeight={isMobile ? 225 : 270}
          borderRadius={12}
        />
      </div>
    </section>
  )
}

export default Designs
