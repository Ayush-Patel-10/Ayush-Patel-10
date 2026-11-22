import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { profile } from '../data.js'

// Drifting particle network. Particles link when close and are drawn toward the cursor,
// which connects to nearby nodes as it glides.
function Particles() {
  const ref = useRef(null)
  useEffect(() => {
    const c = ref.current
    const ctx = c.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0, h = 0, raf = 0, parts = []
    const mouse = { x: -9999, y: -9999 }
    const palette = ['88,166,255', '86,211,100', '210,168,255']

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = c.clientWidth; h = c.clientHeight
      c.width = w * dpr; c.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const n = Math.max(24, Math.min(90, Math.floor((w * h) / 17000)))
      parts = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
        r: 1.4 + Math.random() * 1.8, col: palette[(Math.random() * 3) | 0],
      }))
    }

    const frame = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of parts) {
        const dx = mouse.x - p.x, dy = mouse.y - p.y, d = Math.hypot(dx, dy)
        if (d < 190 && d > 1) { p.vx += (dx / d) * 0.012; p.vy += (dy / d) * 0.012 }
        p.vx *= 0.995; p.vy *= 0.995
        p.x += p.vx; p.y += p.vy
        if (p.x < -10) p.x = w + 10; if (p.x > w + 10) p.x = -10
        if (p.y < -10) p.y = h + 10; if (p.y > h + 10) p.y = -10
      }
      for (let i = 0; i < parts.length; i++) {
        const a = parts[i]
        for (let j = i + 1; j < parts.length; j++) {
          const b = parts[j], d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < 130) {
            ctx.strokeStyle = `rgba(${a.col},${(1 - d / 130) * 0.35})`
            ctx.lineWidth = 1
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
          }
        }
        const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y)
        if (dm < 170) {
          ctx.strokeStyle = `rgba(255,255,255,${(1 - dm / 170) * 0.5})`
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke()
        }
        ctx.fillStyle = `rgba(${a.col},0.9)`
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2); ctx.fill()
      }
      if (!reduce) raf = requestAnimationFrame(frame)
    }

    const move = (e) => { const r = c.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top }
    const leave = () => { mouse.x = mouse.y = -9999 }
    const vis = () => { cancelAnimationFrame(raf); if (!document.hidden && !reduce) raf = requestAnimationFrame(frame) }
    resize(); frame()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerleave', leave)
    document.addEventListener('visibilitychange', vis)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerleave', leave)
      document.removeEventListener('visibilitychange', vis)
    }
  }, [])
  return <canvas ref={ref} className="particles" aria-hidden="true" />
}

const roles = [
  'ships document AI to production',
  'builds MLOps platforms',
  'designs pricing and decisioning models',
  'evaluates LLM systems',
  'monitors models so they stay right',
]

function RotatingRole() {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setI((x) => (x + 1) % roles.length), 2600)
    return () => clearInterval(t)
  }, [])
  return (
    <p className="role" aria-live="off">
      <span className="role-pre">Machine Learning Engineer who</span>
      <span className="role-slot">
        <AnimatePresence mode="wait">
          <motion.span key={i} className="role-word" initial={{ y: 22, opacity: 0, filter: 'blur(6px)' }} animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }} exit={{ y: -22, opacity: 0, filter: 'blur(6px)' }} transition={{ duration: 0.35 }}>
            {roles[i]}
          </motion.span>
        </AnimatePresence>
      </span>
    </p>
  )
}

const intro = 'Currently at United Wholesale Mortgage, building the models and platforms behind pricing, document AI and MLOps.'

// Word-by-word reveal: each word fades in, un-blurs and rises, one after another.
function IntroLine() {
  const words = intro.split(' ')
  return (
    <p className="intro">
      {words.map((w, i) => (
        <motion.span key={i} className="iw"
          initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.9 + i * 0.07, duration: 0.5, ease: 'easeOut' }}>
          {w}
        </motion.span>
      ))}
    </p>
  )
}

export default function Hero() {
  return (
    <section className="hero">
      <Particles />
      <div className="hero-fade" aria-hidden="true" />
      <div className="wrap hero-inner">
        <motion.h1 className="name" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}>
          Ayush Patel
        </motion.h1>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <RotatingRole />
        </motion.div>
        <IntroLine />
        <motion.div className="cta" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
          <a className="btn primary" href="#projects">See the work</a>
          <a className="btn" href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
          <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        </motion.div>
      </div>
      <a href="#about" className="scroll-cue" aria-label="Scroll down"><span /></a>
    </section>
  )
}
