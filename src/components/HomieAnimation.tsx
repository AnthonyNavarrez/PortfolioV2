import { motion } from 'motion/react'

import bgImage       from '../assets/v4/homie-anim/bg-image.png'
import mobileScreen  from '../assets/v4/homie-anim/mobile-screen.png'
import newEventCard  from '../assets/v4/homie-anim/new-event-card.png'
import avatarJordan  from '../assets/v4/homie-anim/avatar-jordan.png'
import avatarSophia  from '../assets/v4/homie-anim/avatar-sophia.png'
import avatarCaitlin from '../assets/v4/homie-anim/avatar-caitlin.png'
import avatarRachel  from '../assets/v4/homie-anim/avatar-rachel.png'
import avatarKayla   from '../assets/v4/homie-anim/avatar-kayla.png'
import iconPartyHorn from '../assets/v4/homie-anim/icon-party-horn.svg'
import avatarCircle  from '../assets/v4/homie-anim/avatar-circle.svg'
import iconToilet    from '../assets/v4/homie-anim/icon-toilet.svg'

const DUR = 10.035
const INF = { repeat: Infinity } as const

function AvatarBadge({ src, label }: { src: string; label: string }) {
  return (
    <>
      <img src={src} alt={label} style={{ width: '70.175px', height: '70.175px', borderRadius: '50%', display: 'block' }} />
      <span style={{ fontFamily: 'Albert Sans, sans-serif', fontWeight: 500, fontSize: '16.8px', color: '#2e0800', textAlign: 'center', width: '70.175px', display: 'block' }}>{label}</span>
    </>
  )
}

function AssigneeRow() {
  return (
    <div style={{ display: 'flex', gap: '7.28px', alignItems: 'center' }}>
      <div style={{ position: 'relative', width: '16.618px', height: '16.618px', flexShrink: 0 }}>
        <img src={avatarCircle} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
        <span style={{ position: 'absolute', top: '3.11px', left: '6.22px', fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '8.303px', color: 'white' }}>J</span>
      </div>
      <span style={{ fontFamily: 'Albert Sans, sans-serif', fontSize: '12.48px', color: 'rgba(46,8,0,0.67)', whiteSpace: 'nowrap' }}>Assigned to Jordan</span>
    </div>
  )
}

export default function HomieAnimation() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      {/* Background fills the full card, outside the scaled canvas */}
      <img alt="" src={bgImage} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }} />

      {/* Inner 453×303 Figma canvas, scaled down and centered */}
      <div style={{
        position: 'absolute',
        width: '453px',
        height: '303px',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%) scale(0.75)',
        transformOrigin: '50% 50%',
      }}>

        {/* ── New Event card (single pre-rendered image) ───────────────────── */}
        <motion.div
          style={{ position: 'absolute', left: '131px', top: '39px', width: '181px', height: '220px', transformOrigin: '50% 50%', boxShadow: '4px 4px 13px 0 rgba(0,0,0,0.25)' }}
          initial={{ opacity: 0, scale: 1, x: 0, y: 200 }}
          animate={{
            opacity: [0, 1, 1, 0, 0],
            scale: [1, 1.2, 1.2],
            x: [0, 0, -8.487, -49.781, -115.588, -173.193, -198.848, -200, -200],
            y: [200, 71.959, 50.987, 38.914, 30.731, 24.74, 20.15, 16.528, 13.611, 11.226, 9.255, 7.614, 6.239, 5.904, 5.083, 4.109, 3.288, 2.596, 2.015, 1.873, 1.528, 1.123, 0.788, 0.515, 0.295, 0.122, 0, 0],
          }}
          transition={{
            opacity: { duration: DUR, times: [0, 0.0498, 0.1398, 0.1897, 1], ease: ['easeOut', 'linear', 'easeOut', 'linear'], ...INF },
            scale:   { duration: DUR, times: [0, 0.1295, 1], ease: ['easeOut', 'linear'], ...INF },
            x: { duration: DUR, times: [0, 0.1223, 0.1296, 0.1395, 0.1495, 0.1594, 0.1694, 0.1721, 1], ease: 'linear', ...INF },
            y: { duration: DUR, times: [0, 0.01, 0.0199, 0.0299, 0.0399, 0.0498, 0.0598, 0.0698, 0.0797, 0.0897, 0.0997, 0.1096, 0.1196, 0.1223, 0.1296, 0.1395, 0.1495, 0.1594, 0.1694, 0.1721, 0.1794, 0.1893, 0.1993, 0.2093, 0.2192, 0.2292, 0.2383, 1], ease: 'linear', ...INF },
          }}
        >
          <img alt="" src={newEventCard} style={{ width: '100%', height: '100%', display: 'block' }} />
        </motion.div>

        {/* ── Task card: House warming party ───────────────────────────────── */}
        <motion.div
          style={{ position: 'absolute', background: 'white', display: 'flex', height: '67.618px', alignItems: 'center', left: '55px', overflow: 'hidden', padding: '12px', borderRadius: '24px', top: '115px', width: '355px', transformOrigin: '50% 50%', boxSizing: 'border-box' }}
          initial={{ opacity: 0, x: 200 }}
          animate={{
            opacity: [0, 0, 1, 1, 0, 0],
            x: [200, 200, 49.46, 23.069, 12.14, 6.339, 2.991, 1.012, -0.138, -0.761, -1.04, -1.095, -1.004, -0.823, -0.592, -0.338, -0.083, -0.043, 2.25, 8.824, 11.236, -0.67, -39.767, -122.325, -189.036, -210.366, -208.845, -200, -200],
          }}
          transition={{
            opacity: { duration: DUR, times: [0, 0.153, 0.2383, 0.3006, 0.3859, 1], ease: ['linear', 'easeOut', 'linear', 'easeOut', 'linear'], ...INF },
            x: { duration: DUR, times: [0, 0.153, 0.1594, 0.1694, 0.1794, 0.1893, 0.1993, 0.2093, 0.2192, 0.2292, 0.2392, 0.2491, 0.2591, 0.2691, 0.279, 0.289, 0.299, 0.3006, 0.3023, 0.3089, 0.3189, 0.3289, 0.3388, 0.3488, 0.3588, 0.3687, 0.3787, 0.3859, 1], ease: 'linear', ...INF },
          }}
        >
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center', width: '188px' }}>
            <div style={{ background: '#fcf5ee', display: 'flex', alignItems: 'flex-end', padding: '8.187px 9.211px', borderRadius: '1022px', flexShrink: 0, width: '35px', height: '34.795px', boxSizing: 'border-box' }}>
              <img src={iconPartyHorn} alt="" style={{ width: '19px', height: '19px' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1, minWidth: 0 }}>
              <span style={{ fontFamily: 'Albert Sans, sans-serif', fontWeight: 500, fontSize: '14px', color: '#2e0800', whiteSpace: 'nowrap' }}>House warming party</span>
              <AssigneeRow />
            </div>
          </div>
        </motion.div>

        {/* ── Task card: Take out the trash ────────────────────────────────── */}
        <motion.div
          style={{ position: 'absolute', background: 'white', display: 'flex', gap: '68px', height: '67.618px', alignItems: 'center', left: '55px', overflow: 'hidden', padding: '12px', borderRadius: '24px', top: '28px', width: '355px', transformOrigin: '50% 50%', boxSizing: 'border-box' }}
          initial={{ opacity: 0, x: 200 }}
          animate={{
            opacity: [0, 0, 1, 1, 0, 0],
            x: [200, 200, 102.669, 46.898, 29.16, 19.416, 13.229, 9.022, 6.05, 3.907, 2.345, 1.207, 0.383, -0.203, -0.606, -0.868, -1.021, -1.077, -1.421, -7.974, -23.436, -47.794, -79.314, -114.04, -146.733, -172.979, -190.513, -198.991, -200.028, -200, -200],
          }}
          transition={{
            opacity: { duration: DUR, times: [0, 0.1398, 0.2376, 0.288, 0.3859, 1], ease: ['linear', 'easeOut', 'linear', 'easeOut', 'linear'], ...INF },
            x: { duration: DUR, times: [0, 0.1378, 0.1395, 0.1495, 0.1594, 0.1694, 0.1794, 0.1893, 0.1993, 0.2093, 0.2192, 0.2292, 0.2392, 0.2491, 0.2591, 0.2691, 0.279, 0.2861, 0.289, 0.299, 0.3089, 0.3189, 0.3289, 0.3388, 0.3488, 0.3588, 0.3687, 0.3787, 0.3839, 0.3859, 1], ease: 'linear', ...INF },
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1, minWidth: 0 }}>
            <span style={{ fontFamily: 'Albert Sans, sans-serif', fontWeight: 500, fontSize: '14px', color: '#2e0800', whiteSpace: 'nowrap' }}>Take out the trash</span>
            <AssigneeRow />
          </div>
          <div style={{ background: '#afccd8', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4.17px 10px', borderRadius: '16.68px', flexShrink: 0, height: '22.88px', boxSizing: 'border-box' }}>
            <span style={{ fontFamily: 'Albert Sans, sans-serif', fontWeight: 500, fontSize: '12.48px', color: 'white', whiteSpace: 'nowrap' }}>Due 4/27</span>
          </div>
        </motion.div>

        {/* ── Task card: Cleaning the bathroom ─────────────────────────────── */}
        <motion.div
          style={{ position: 'absolute', background: 'white', display: 'flex', gap: '68px', height: '67.618px', alignItems: 'center', left: '55px', overflow: 'hidden', padding: '12px', borderRadius: '24px', top: '202px', width: '355px', transformOrigin: '50% 50%', boxSizing: 'border-box' }}
          initial={{ opacity: 0, x: 200 }}
          animate={{
            opacity: [0, 0, 1, 1, 0, 0],
            x: [200, 200, 103.001, 44.047, 26.369, 16.901, 11.027, 7.126, 4.443, 2.565, 1.247, 0.329, -0.296, -0.704, -0.947, -1.068, -1.095, -2.016, -13.036, -37.253, -73.205, -115.019, -153.699, -181.981, -197.102, -200.058, -200.011, -200, -200],
          }}
          transition={{
            opacity: { duration: DUR, times: [0, 0.1679, 0.2488, 0.3085, 0.3893, 1], ease: ['linear', 'easeOut', 'linear', 'easeOut', 'linear'], ...INF },
            x: { duration: DUR, times: [0, 0.1679, 0.1694, 0.1794, 0.1893, 0.1993, 0.2093, 0.2192, 0.2292, 0.2392, 0.2491, 0.2591, 0.2691, 0.279, 0.289, 0.299, 0.305, 0.3089, 0.3189, 0.3289, 0.3388, 0.3488, 0.3588, 0.3687, 0.3787, 0.3859, 0.3887, 0.3893, 1], ease: 'linear', ...INF },
          }}
        >
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center', flex: 1, minWidth: 0 }}>
            <div style={{ background: '#fcf5ee', display: 'flex', alignItems: 'center', padding: '8px 9px', borderRadius: '999px', flexShrink: 0 }}>
              <img src={iconToilet} alt="" style={{ width: '16.2px', height: '18px' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1, minWidth: 0 }}>
              <span style={{ fontFamily: 'Albert Sans, sans-serif', fontWeight: 500, fontSize: '14px', color: '#2e0800', whiteSpace: 'nowrap' }}>Cleaning the bathroom</span>
              <AssigneeRow />
            </div>
          </div>
          <div style={{ background: '#afccd8', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4.17px 10px', borderRadius: '16.68px', flexShrink: 0, height: '22.88px', boxSizing: 'border-box' }}>
            <span style={{ fontFamily: 'Albert Sans, sans-serif', fontWeight: 500, fontSize: '12.48px', color: 'white', whiteSpace: 'nowrap' }}>Due 5/30</span>
          </div>
        </motion.div>

        {/* ── Mobile phone ─────────────────────────────────────────────────────
            Layout wrapper handles CSS centering. Inner motion.div handles animation. */}
        <div style={{ position: 'absolute', left: 'calc(50% - 0.24px)', top: 'calc(50% + 0.05px)', transform: 'translateX(-50%) translateY(-50%)', width: '114.522px', height: '247.1px' }}>
          <motion.div
            style={{ position: 'relative', width: '100%', height: '100%', transformOrigin: '50% 50%', border: '3.134px solid #53453a', borderRadius: '15.672px', overflow: 'hidden', boxSizing: 'border-box' }}
            initial={{ opacity: 0, scaleX: 1, scaleY: 1, x: 200, y: 0 }}
            animate={{
              opacity: [0, 0, 1, 1, 0, 0],
              scaleX: [1, 1, 1.84, 1.84],
              scaleY: [1, 1, 1.839999, 1.839999],
              x: [200, 200, 66.166, 38.68, 36.977, 25.617, 17.699, 12.405, 8.678, 5.974, 3.978, 2.491, 1.383, 0.561, -0.04, -0.47, -0.765, -0.85, -0.953, -1.058, -1.096, -1.083, -1.03, -0.945, -0.838, -0.714, -0.579, -0.438, -0.294, -0.151, -0.122, -0.07, -0.011, 0, 0],
              y: [0, 0, 52.17, 67.583, 76.405, 82.148, 86.079, 88.82, 90.725, 92.017, 92.849, 93.325, 93.525, 93.506, 93.45, 62.281, 31.041, 6.023, -14.976, -32.77, -47.791, -60.307, -70.503, -78.51, -84.428, -88.334, -90.289, -90.45, -114.68, -140.704, -145.322, -194.976, -239.903, -273.203, -289.975, -290.55, -290.55],
            }}
            transition={{
              opacity: { duration: DUR, times: [0, 0.3458, 0.4483, 0.6049, 0.6547, 1], ease: ['linear', 'easeOut', 'linear', [0, 1.05, 0, 1.018], 'linear'], ...INF },
              scaleX: { duration: DUR, times: [0, 0.3598, 0.4822, 1], ease: ['linear', 'easeInOut', 'linear'], ...INF },
              scaleY: { duration: DUR, times: [0, 0.3598, 0.4822, 1], ease: ['linear', 'easeInOut', 'linear'], ...INF },
              x: { duration: DUR, times: [0, 0.3422, 0.3488, 0.3588, 0.3598, 0.3687, 0.3787, 0.3887, 0.3986, 0.4086, 0.4186, 0.4285, 0.4385, 0.4484, 0.4584, 0.4684, 0.4783, 0.4822, 0.4883, 0.4983, 0.5082, 0.5182, 0.5282, 0.5381, 0.5481, 0.5581, 0.568, 0.578, 0.588, 0.5979, 0.5999, 0.6036, 0.6079, 0.6087, 1], ease: 'linear', ...INF },
              y: { duration: DUR, times: [0, 0.3598, 0.3687, 0.3787, 0.3887, 0.3986, 0.4086, 0.4186, 0.4285, 0.4385, 0.4484, 0.4584, 0.4684, 0.4783, 0.4822, 0.4883, 0.4983, 0.5082, 0.5182, 0.5282, 0.5381, 0.5481, 0.5581, 0.568, 0.578, 0.588, 0.5979, 0.5999, 0.6036, 0.6079, 0.6087, 0.6179, 0.6278, 0.6378, 0.6478, 0.6497, 1], ease: 'linear', ...INF },
            }}
          >
            <img alt="" src={mobileScreen} style={{ position: 'absolute', height: '142.69%', left: '-0.03%', maxWidth: 'none', top: '0.01%', width: '100%' }} />
          </motion.div>
        </div>

        {/* ── Avatar: Jordan ───────────────────────────────────────────────── */}
        <motion.div
          style={{ position: 'absolute', display: 'flex', flexDirection: 'column', gap: '8.4px', alignItems: 'center', left: '187px', top: '107px', width: '70.175px', filter: 'drop-shadow(5.6px 5.6px 2.8px rgba(0,0,0,0.25))', transformOrigin: '50% 50%' }}
          initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
          animate={{
            opacity: [0, 0, 1, 1],
            scale: [0, 0, 0.104299, 0.37076, 0.622669, 0.846323, 1.020031, 1.123211, 1.158611, 1.151944, 1.127427, 1.098443, 1.070974, 1.065422, 1.047084, 1.026803, 1.010137, 0.996784, 0.986279, 0.980857, 0.977823, 0.968159, 0.956374, 0.942479, 0.926713, 0.909612, 0.891996, 0.87481, 0.858894, 0.844814, 0.832832, 0.822978, 0.815143, 0.809155, 0.804824, 0.801965, 0.800409, 0.8, 0.8],
            x: [0, 0, -0.018, -0.018],
            y: [0, 0, -5.857, -5.857],
          }}
          transition={{
            opacity: { duration: DUR, times: [0, 0.6221, 0.7836, 1], ease: ['linear', 'easeOut', 'linear'], ...INF },
            scale: { duration: DUR, times: [0, 0.624, 0.6278, 0.6378, 0.6478, 0.6577, 0.6677, 0.6777, 0.6876, 0.6976, 0.7076, 0.7175, 0.7275, 0.7297, 0.7375, 0.7474, 0.7574, 0.7673, 0.7773, 0.7836, 0.7873, 0.7972, 0.8072, 0.8172, 0.8271, 0.8371, 0.8471, 0.857, 0.867, 0.877, 0.8869, 0.8969, 0.9069, 0.9168, 0.9268, 0.9368, 0.9467, 0.9554, 1], ease: 'linear', ...INF },
            x: { duration: DUR, times: [0, 0.7297, 0.9554, 1], ease: 'linear', ...INF },
            y: { duration: DUR, times: [0, 0.7297, 0.9554, 1], ease: 'linear', ...INF },
          }}
        >
          <AvatarBadge src={avatarJordan} label="Jordan" />
        </motion.div>

        {/* ── Avatar: Sophia ───────────────────────────────────────────────── */}
        <motion.div
          style={{ position: 'absolute', display: 'flex', flexDirection: 'column', gap: '8.4px', alignItems: 'center', left: '309px', top: '170px', width: '70.175px', filter: 'drop-shadow(5.6px 5.6px 2.8px rgba(0,0,0,0.25))', transformOrigin: '50% 50%' }}
          initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
          animate={{
            opacity: [0, 0, 1, 1],
            scale: [0, 0, 0.005931, 0.37076, 0.706924, 0.975179, 1.121392, 1.146777, 1.113981, 1.066257, 1.018091, 0.969995, 0.914451, 0.867021, 0.847887, 0.843235, 0.829749, 0.820632, 0.814148, 0.809431, 0.805988, 0.803511, 0.801797, 0.8007, 0.800116, 0.799964],
            x: [0, 0, -44.018, -44.018],
            y: [0, 0, -3.857, -3.857],
          }}
          transition={{
            opacity: { duration: DUR, times: [0, 0.7074, 0.7725, 1], ease: ['linear', 'easeOut', 'linear'], ...INF },
            scale: { duration: DUR, times: [0, 0.7074, 0.7076, 0.7175, 0.7275, 0.7375, 0.7474, 0.7574, 0.7673, 0.7773, 0.7873, 0.7972, 0.8072, 0.8172, 0.8245, 0.8271, 0.8371, 0.8471, 0.857, 0.867, 0.877, 0.8869, 0.8969, 0.9069, 0.9168, 1], ease: 'linear', ...INF },
            x: { duration: DUR, times: [0, 0.7045, 0.9302, 1], ease: ['linear', [0.566, 0.167, 0.221, 0.927], 'linear'], ...INF },
            y: { duration: DUR, times: [0, 0.7045, 0.9302, 1], ease: ['linear', [0.566, 0.167, 0.221, 0.927], 'linear'], ...INF },
          }}
        >
          <AvatarBadge src={avatarSophia} label="Sophia" />
        </motion.div>

        {/* ── Avatar: Caitlin ──────────────────────────────────────────────── */}
        <motion.div
          style={{ position: 'absolute', display: 'flex', flexDirection: 'column', gap: '8.4px', alignItems: 'center', left: '78px', top: '185px', width: '70.175px', filter: 'drop-shadow(5.6px 5.6px 2.8px rgba(0,0,0,0.25))', transformOrigin: '50% 50%' }}
          initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
          animate={{
            opacity: [0, 0, 1, 1],
            scale: [0, 0, 0.019169, 0.374409, 0.6926, 0.928959, 1.022774, 1.002599, 0.953904, 0.906072, 0.867055, 0.838111, 0.818602, 0.807492, 0.804161, 0.803511, 0.801797, 0.8007, 0.800116, 0.799964],
            x: [0, 0, 23.982, 23.982],
            y: [0, 0, -15.857, -15.857],
          }}
          transition={{
            opacity: { duration: DUR, times: [0, 0.7668, 0.8319, 1], ease: ['linear', 'easeOut', 'linear'], ...INF },
            scale: { duration: DUR, times: [0, 0.7668, 0.7673, 0.7773, 0.7873, 0.7972, 0.8072, 0.8172, 0.8271, 0.8371, 0.8471, 0.857, 0.867, 0.877, 0.884, 0.8869, 0.8969, 0.9069, 0.9168, 1], ease: 'linear', ...INF },
            x: { duration: DUR, times: [0, 0.7045, 0.9302, 1], ease: ['linear', [0.751, 0.014, 0.145, 1.016], 'linear'], ...INF },
            y: { duration: DUR, times: [0, 0.7045, 0.9302, 1], ease: ['linear', [0.751, 0.014, 0.145, 1.016], 'linear'], ...INF },
          }}
        >
          <AvatarBadge src={avatarCaitlin} label="Caitlin" />
        </motion.div>

        {/* ── Avatar: Rachel ───────────────────────────────────────────────── */}
        <motion.div
          style={{ position: 'absolute', display: 'flex', flexDirection: 'column', gap: '8.4px', alignItems: 'center', left: '90px', top: '22px', width: '70.175px', filter: 'drop-shadow(5.6px 5.6px 2.8px rgba(0,0,0,0.25))', transformOrigin: '50% 50%' }}
          initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
          animate={{
            opacity: [0, 0, 1, 1],
            scale: [0, 0, 0.073256, 0.382774, 0.649407, 0.846592, 0.937859, 0.941444, 0.910519, 0.875013, 0.844848, 0.822487, 0.808049, 0.800982, 0.799985, 0.799964],
            x: [0, 0, 23.982, 23.982],
            y: [0, 0, 20.143, 20.143],
          }}
          transition={{
            opacity: { duration: DUR, times: [0, 0.805, 0.8701, 1], ease: ['linear', 'easeOut', 'linear'], ...INF },
            scale: { duration: DUR, times: [0, 0.805, 0.8072, 0.8172, 0.8271, 0.8371, 0.8471, 0.857, 0.867, 0.877, 0.8869, 0.8969, 0.9069, 0.9168, 0.9222, 1], ease: 'linear', ...INF },
            x: { duration: DUR, times: [0, 0.7045, 0.9302, 1], ease: ['linear', [0.751, 0.014, 0.145, 1.016], 'linear'], ...INF },
            y: { duration: DUR, times: [0, 0.7045, 0.9302, 1], ease: ['linear', [0.751, 0.014, 0.145, 1.016], 'linear'], ...INF },
          }}
        >
          <AvatarBadge src={avatarRachel} label="Rachel" />
        </motion.div>

        {/* ── Avatar: Kayla ────────────────────────────────────────────────── */}
        <motion.div
          style={{ position: 'absolute', display: 'flex', flexDirection: 'column', gap: '8.4px', alignItems: 'center', left: '303px', top: '22px', width: '70.175px', filter: 'drop-shadow(5.6px 5.6px 2.8px rgba(0,0,0,0.25))', transformOrigin: '50% 50%' }}
          initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
          animate={{
            opacity: [0, 0, 1, 1],
            scale: [0, 0, 0.159896, 0.448796, 0.69771, 0.867743, 0.931255, 0.923364, 0.89233, 0.860328, 0.834286, 0.815818, 0.811243, 0.804681, 0.800162, 0.8],
            x: [0, 0, -30.623, -30.623],
            y: [0, 0, 21.696, 21.696],
          }}
          transition={{
            opacity: { duration: DUR, times: [0, 0.8319, 0.897, 1], ease: ['linear', 'easeOut', 'linear'], ...INF },
            scale: { duration: DUR, times: [0, 0.8319, 0.8371, 0.8471, 0.857, 0.867, 0.877, 0.8869, 0.8969, 0.9069, 0.9168, 0.9268, 0.9302, 0.9368, 0.9467, 1], ease: 'linear', ...INF },
            x: { duration: DUR, times: [0, 0.7045, 0.9302, 1], ease: ['linear', [0.751, 0.014, 0.145, 1.016], 'linear'], ...INF },
            y: { duration: DUR, times: [0, 0.7045, 0.9302, 1], ease: ['linear', [0.751, 0.014, 0.145, 1.016], 'linear'], ...INF },
          }}
        >
          <AvatarBadge src={avatarKayla} label="Kayla" />
        </motion.div>

      </div>
    </div>
  )
}
