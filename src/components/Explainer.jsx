import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

// Plays a scene through captioned steps. Autoplays while visible, pauses on hover/focus,
// and the step pills let you jump around.
export default function Explainer({ steps, Scene, label }) {
  const [step, setStep] = useState(0)
  const [hold, setHold] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.4 })
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (reduce || hold || !inView) return
    const id = setTimeout(() => setStep((s) => (s + 1) % steps.length), 3600)
    return () => clearTimeout(id)
  }, [step, hold, inView, reduce, steps.length])

  const cur = steps[step]
  return (
    <div className="expl" ref={ref} onPointerEnter={() => setHold(true)} onPointerLeave={() => setHold(false)} onFocus={() => setHold(true)} onBlur={() => setHold(false)}>
      <div className="stage" role="img" aria-label={`${label}: ${cur.t}. ${cur.d}`}>
        <Scene step={step} />
      </div>
      <div className="cap" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
            <b>{step + 1}. {cur.t}</b>
            <p>{cur.d}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="pills" role="tablist" aria-label={`${label} steps`}>
        {steps.map((s, i) => (
          <button key={s.t} role="tab" aria-selected={i === step} aria-label={`Step ${i + 1}: ${s.t}`} className={i === step ? 'on' : i < step ? 'past' : ''} onClick={() => setStep(i)}>
            <span className="fill" style={i === step && !hold && inView && !reduce ? { animationDuration: '3.6s' } : undefined} />
          </button>
        ))}
      </div>
    </div>
  )
}
