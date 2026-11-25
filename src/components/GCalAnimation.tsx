import { motion } from 'motion/react'
import gcalImage  from '../assets/v4/gcal-anim/gcal-image.png'
import iconPeople from '../assets/v4/gcal-anim/icon-people.svg'

const DUR = 5.798
const INF = { repeat: Infinity } as const

export default function GCalAnimation() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: 'white', borderRadius: '10px' }}>
      <div style={{
        position: 'absolute',
        width: '453px',
        height: '303px',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%) scale(0.75)',
        transformOrigin: '50% 50%',
      }}>

        {/* ── Bar chart group ─────────────────────────────────────────────── */}
        <div style={{ position: 'absolute', left: '90.84px', top: '25.43px', width: '271.52px', height: '241.24px', overflow: 'visible' }}>
          <motion.div
            style={{ position: 'relative', width: '100%', height: '100%', transformOrigin: '50% 50%' }}
            initial={{ opacity: 0, scale: 1.3 }}
            animate={{
              opacity: [0, 0, 1, 1, 0, 0],
              scale: [1.3, 1.3, 1.22484, 1.121344, 1.083619, 1.060537, 1.044538, 1.032801, 1.023934, 1.017141, 1.011921, 1.007935, 1.004946, 1.002778, 1.001299, 1.000406, 1.000051, 1.227342, 1.388375, 2.027475, 2.31303, 2.428541, 2.47774, 2.496452, 2.5, 2.5],
            }}
            transition={{
              opacity: { duration: DUR, times: [0, 0.2224, 0.3153, 0.48, 0.5576, 1], ease: ['linear', 'easeOut', 'linear', [0.15, 0.85, 0.3, 1], 'linear'], ...INF },
              scale:   { duration: DUR, times: [0, 0.2224, 0.2242, 0.2415, 0.2587, 0.2759, 0.2932, 0.3104, 0.3277, 0.3449, 0.3622, 0.3794, 0.3967, 0.4139, 0.4312, 0.4484, 0.4627, 0.4657, 0.468, 0.4829, 0.5002, 0.5174, 0.5347, 0.5519, 0.5662, 1], ease: 'linear', ...INF },
            }}
          >
            {/* Each bar: outer div clips, motion.div grows height */}
            {([
              { l:   0,    t:  49.53, h: 115.2, times: [0, 0.2528, 0.3015, 1] },
              { l:  55.95, t:  60.54, h: 180,   times: [0, 0.3047, 0.344,  1] },
              { l:  55.95, t:   0,    h: 116.1,  times: [0, 0.2876, 0.3176, 1] },
              { l:   0,    t: 127.5,  h: 116.1,  times: [0, 0.2224, 0.2643, 1] },
              { l: 110.99, t:  49.53, h: 180,   times: [0, 0.333,  0.3794, 1] },
              { l: 110.99, t:  76.13, h: 180,   times: [0, 0.353,  0.399,  1] },
              { l: 110.99, t: 133.92, h:  57.6,  times: [0, 0.3357, 0.3835, 1] },
              { l: 166.03, t:   6.42, h: 180,   times: [0, 0.241,  0.2837, 1] },
              { l: 166.03, t: 106.4,  h:  99,    times: [0, 0.344,  0.3869, 1] },
              { l: 221.98, t:  17.43, h: 240,   times: [0, 0.2837, 0.3408, 1] },
              { l: 221.98, t:  74.3,  h: 164.7,  times: [0, 0.312,  0.3675, 1] },
            ] as const).map(({ l, t, h, times }, i) => (
              <div key={i} style={{ position: 'absolute', left: `${l}px`, top: `${t}px`, width: '49.533px', overflow: 'hidden' }}>
                <motion.div
                  style={{ background: 'rgba(65,205,51,0.53)', width: '49.533px', borderRadius: '8.256px' }}
                  initial={{ height: 0 }}
                  animate={{ height: [0, 0, h, h] }}
                  transition={{ height: { duration: DUR, times, ease: 'linear', ...INF } }}
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Rotating calendar image ──────────────────────────────────────── */}
        <motion.div
          style={{ position: 'absolute', left: '126px', top: '51px', width: '201px', height: '201px', transformOrigin: '50% 50%' }}
          initial={{ opacity: 0, rotate: 0, scale: 1, y: -60 }}
          animate={{
            opacity: [0, 0.05887, 0.28106, 0.64719, 0.90991, 0.99771, 1, 1, 0.51204, 0.5, 0.5, 0.50331, 0.55127, 0.62228, 0.56934, 0.32726, 0.13815, 0.113, 0.02076, 0, 0],
            rotate: [0, 360, 360],
            scale:  [1, 1, 0.8, 0.8, 1, 1],
            y: [-60, 0, 0],
          }}
          transition={{
            opacity: { duration: DUR, times: [0, 0.0172, 0.0345, 0.0517, 0.069, 0.0862, 0.0899, 0.2021, 0.207, 0.2098, 0.221, 0.2242, 0.2338, 0.2415, 0.2587, 0.2759, 0.2932, 0.2961, 0.3104, 0.32, 1], ease: 'linear', ...INF },
            rotate: { duration: DUR, times: [0, 0.1724, 1], ease: [[0.5, 0, 0.1, 1], 'linear'], ...INF },
            scale:  { duration: DUR, times: [0, 0.2012, 0.2098, 0.221, 0.3047, 1], ease: ['linear', [0.15, 0.85, 0.3, 1], 'linear', [0.3, 0, 0.5, 1], 'linear'], ...INF },
            y:      { duration: DUR, times: [0, 0.1913, 1], ease: [(t: number) => 1 - Math.exp(-t * 7.222) * (Math.cos(t * 19.5574) + 0.3693 * Math.sin(t * 19.5574)), 'linear'], ...INF },
          }}
        >
          <img alt="" src={gcalImage} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </motion.div>

        {/* ── Card (Group 8) ───────────────────────────────────────────────── */}
        <div style={{ position: 'absolute', left: '108px', top: '33px', width: '237.6px', height: '237.6px', overflow: 'visible' }}>
          <motion.div
            style={{ position: 'relative', width: '100%', height: '100%', transformOrigin: '50% 50%' }}
            initial={{ opacity: 0, scale: 1, y: -40 }}
            animate={{
              opacity: [0, 0, 1, 1, 0, 0],
              scale:   [1, 1, 0.6, 0.6],
              y:       [-40, -40, 0, 0],
            }}
            transition={{
              opacity: { duration: DUR, times: [0, 0.468, 0.537, 0.8982, 0.9845, 1], ease: ['linear', [0.5, 0, 0.5, 1], 'linear', [0.7, 0, 0.85, 0.15], 'linear'], ...INF },
              scale:   { duration: DUR, times: [0, 0.881, 0.9845, 1], ease: ['linear', [0.7, 0, 0.85, 0.15], 'linear'], ...INF },
              y:       { duration: DUR, times: [0, 0.468, 0.5715, 1], ease: ['linear', [0.05, 0.4, 0.5, 1], 'linear'], ...INF },
            }}
          >
            {/* Card background */}
            <div style={{ position: 'absolute', inset: 0, background: '#f0f4f9', borderRadius: '16px', boxShadow: '0px 3.2px 9.36px 0px rgba(0,0,0,0.19)' }} />

            {/* Header row: people icon + "Available" + count */}
            <div style={{ position: 'absolute', left: '16.8px', top: '16px', width: '18.318px', height: '14.829px' }}>
              <img alt="" src={iconPeople} style={{ display: 'block', width: '100%', height: '100%' }} />
            </div>
            <span style={{ position: 'absolute', left: '40.72px', top: '16px', fontFamily: 'Roboto, sans-serif', fontWeight: 400, fontSize: '15.2px', color: '#5f6368', whiteSpace: 'nowrap' }}>Available</span>
            <span style={{ position: 'absolute', left: '116px', top: '16px', fontFamily: 'Roboto, sans-serif', fontWeight: 400, fontSize: '13.6px', color: '#1967d2', whiteSpace: 'nowrap' }}>/4</span>

            {/* Count: "2" fades out, "3" appears then fades, "4" stays */}
            <motion.span style={{ position: 'absolute', left: '108px', top: '16px', fontFamily: 'Roboto, sans-serif', fontWeight: 400, fontSize: '13.6px', color: '#1967d2' }}
              initial={{ opacity: 1 }}
              animate={{ opacity: [1, 1, 0, 0] }}
              transition={{ opacity: { duration: DUR, times: [0, 0.5721, 0.6017, 1], ease: ['linear', 'easeOut', 'linear'], ...INF } }}
            >2</motion.span>
            <motion.span style={{ position: 'absolute', left: '108px', top: '16px', fontFamily: 'Roboto, sans-serif', fontWeight: 400, fontSize: '13.6px', color: '#1967d2', transformOrigin: '50% 50%' }}
              initial={{ opacity: 1, scale: 0 }}
              animate={{ opacity: [1, 1, 0, 0], scale: [0, 0, 1, 1] }}
              transition={{
                opacity: { duration: DUR, times: [0, 0.7369, 0.7707, 1], ease: ['linear', 'easeOut', 'linear'], ...INF },
                scale:   { duration: DUR, times: [0, 0.5715, 0.7267, 1], ease: ['linear', [0.4, 1.75, 0.3, 1], 'linear'], ...INF },
              }}
            >3</motion.span>
            <motion.span style={{ position: 'absolute', left: '108px', top: '16px', fontFamily: 'Roboto, sans-serif', fontWeight: 400, fontSize: '13.6px', color: '#1967d2', transformOrigin: '50% 50%' }}
              initial={{ scale: 0 }}
              animate={{ scale: [0, 0, 1, 1] }}
              transition={{ duration: DUR, times: [0, 0.7369, 0.8921, 1], ease: ['linear', [0.4, 1.75, 0.3, 1], 'linear'], ...INF }}
            >4</motion.span>

            {/* Confirmed attendees */}
            <div style={{ position: 'absolute', left: '25.6px', top: '43.2px', display: 'flex', flexDirection: 'column', gap: '8.8px' }}>
              {[
                { bg: '#285c9a', initial: 'A', email: 'pnav6546@g.ucla.edu',  fs: '15.2px' },
                { bg: '#d28045', initial: 'J', email: 'jasonyu29@g.ucla.edu', fs: '15.2px' },
              ].map(({ bg, initial, email, fs }) => (
                <div key={email} style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                  <div style={{ background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '10.8px', flexShrink: 0, width: '21.6px', height: '21.6px' }}>
                    <span style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 400, fontSize: fs, color: 'white', lineHeight: 1 }}>{initial}</span>
                  </div>
                  <span style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 400, fontSize: '13.6px', color: '#5f6368', whiteSpace: 'nowrap' }}>{email}</span>
                </div>
              ))}
            </div>

            {/* Awaiting section */}
            <div style={{ position: 'absolute', left: '26.4px', top: '130.4px', width: '148.8px', overflow: 'visible', display: 'flex', flexDirection: 'column', gap: '5.6px' }}>
              <motion.span
                style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 400, fontSize: '15.2px', color: '#5f6368', display: 'block', transformOrigin: '50% 50%' }}
                initial={{ opacity: 1, scale: 1, y: 0 }}
                animate={{ opacity: [1, 1, 0, 0], scale: [1, 1, 0.6, 0.6], y: [0, 0, 33, 33] }}
                transition={{
                  opacity: { duration: DUR, times: [0, 0.7369, 0.7743, 1], ease: ['linear', [0.7, 0, 0.85, 0.15], 'linear'], ...INF },
                  scale:   { duration: DUR, times: [0, 0.7196, 0.7743, 1], ease: ['linear', [0.7, 0, 0.85, 0.15], 'linear'], ...INF },
                  y:       { duration: DUR, times: [0, 0.5823, 0.6852, 1], ease: ['linear', (t: number) => 1 - Math.exp(-t * 7.6657) * (Math.cos(t * 6.7605) + 1.1339 * Math.sin(t * 6.7605)), 'linear'], ...INF },
                }}
              >Awating</motion.span>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8.8px', overflow: 'visible' }}>
                {/* Muyitang row — slides up, avatar turns red */}
                <motion.div
                  style={{ display: 'flex', gap: '4px', alignItems: 'center', width: '144px', transformOrigin: '50% 50%', overflow: 'visible' }}
                  initial={{ y: 0 }}
                  animate={{ y: [0, 0, -49.8, -49.8] }}
                  transition={{ duration: DUR, times: [0, 0.5721, 0.675, 1], ease: ['linear', (t: number) => 1 - Math.exp(-t * 7.1866) * (Math.cos(t * 22.3441) + 0.3216 * Math.sin(t * 22.3441)), 'linear'], ...INF }}
                >
                  <motion.div
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '10.8px', flexShrink: 0, width: '21.6px', height: '21.6px' }}
                    initial={{ backgroundColor: '#9F9C9C' }}
                    animate={{ backgroundColor: ['#9F9C9C', '#9F9C9C', '#FF7B7B', '#FF7B7B'] }}
                    transition={{ backgroundColor: { duration: DUR, times: [0, 0.5721, 0.675, 1], ease: ['linear', [0.5, 0, 0.5, 1], 'linear'], ...INF } }}
                  >
                    <span style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 400, fontSize: '13.6px', color: 'white', lineHeight: 1 }}>M</span>
                  </motion.div>
                  <motion.span
                    style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 400, fontSize: '12px', whiteSpace: 'nowrap' }}
                    initial={{ color: '#AFB2B6' }}
                    animate={{ color: ['#AFB2B6', '#AFB2B6', '#5F6368', '#5F6368'] }}
                    transition={{ color: { duration: DUR, times: [0, 0.5721, 0.675, 1], ease: ['linear', [0.5, 0, 0.5, 1], 'linear'], ...INF } }}
                  >Muyitang@gmail.com</motion.span>
                </motion.div>

                {/* Shaktiwid row — slides up, avatar turns green */}
                <motion.div
                  style={{ display: 'flex', gap: '4px', alignItems: 'center', transformOrigin: '50% 50%', overflow: 'visible' }}
                  initial={{ y: 0 }}
                  animate={{ y: [0, 0, -52.2, -52.2] }}
                  transition={{ duration: DUR, times: [0, 0.7369, 0.8261, 1], ease: ['linear', (t: number) => 1 - Math.exp(-t * 7.3499) * (Math.cos(t * 13.2192) + 0.556 * Math.sin(t * 13.2192)), 'linear'], ...INF }}
                >
                  <motion.div
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '10.8px', flexShrink: 0, width: '21.6px', height: '21.6px' }}
                    initial={{ backgroundColor: '#9F9C9C' }}
                    animate={{ backgroundColor: ['#9F9C9C', '#9F9C9C', '#69B142', '#69B142'] }}
                    transition={{ backgroundColor: { duration: DUR, times: [0, 0.7369, 0.8261, 1], ease: ['linear', [0.5, 0, 0.5, 1], 'linear'], ...INF } }}
                  >
                    <span style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 400, fontSize: '14.4px', color: 'white', lineHeight: 1 }}>S</span>
                  </motion.div>
                  <motion.span
                    style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 400, fontSize: '12px', whiteSpace: 'nowrap' }}
                    initial={{ color: '#AFB2B6' }}
                    animate={{ color: ['#AFB2B6', '#AFB2B6', '#5F6368', '#5F6368'] }}
                    transition={{ color: { duration: DUR, times: [0, 0.7367, 0.8261, 1], ease: ['linear', [0.5, 0, 0.5, 1], 'linear'], ...INF } }}
                  >Shaktiwid@g.ucla.com</motion.span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  )
}
