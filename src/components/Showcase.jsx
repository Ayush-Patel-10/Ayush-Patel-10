import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { showcase } from '../data.js'
import Explainer from './Explainer.jsx'
import ProjectLink from './ProjectLink.jsx'
import { scenes } from './Scenes.jsx'

function Card({ item, i, n, progress }) {
  const target = 1 - (n - 1 - i) * 0.03
  const scale = useTransform(progress, [i / n, 1], [1, Math.min(1, target)])

  const spot = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <div className="stack-slot" style={{ top: `${80 + i * 14}px` }}>
      <motion.article className="pcard" style={{ scale }} onPointerMove={spot}>
        <div className="pcard-info">
          <p className="pk"><span>{String(i + 1).padStart(2, '0')}</span> {item.kind}</p>
          <h3>{item.title}</h3>
          <p className="pw">{item.where}</p>
          <p className="pb">{item.blurb}</p>
          <div className="chips">{item.stack.map((s) => <span className="chip" key={s}>{s}</span>)}</div>
          <ProjectLink id={item.id} className="btn small primary">Read the full story</ProjectLink>
        </div>
        <Explainer steps={item.steps} Scene={scenes[item.scene]} label={item.title} />
      </motion.article>
    </div>
  )
}

export default function Showcase() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  return (
    <section id="projects" className="section">
      <div className="wrap">
        <h2>Selected work, explained</h2>
        <p className="section-lede">Each project plays through how it works. Hover to pause, click a step to jump, or open the full story.</p>
        <div className="stack" ref={ref}>
          {showcase.map((item, i) => (
            <Card key={item.id} item={item} i={i} n={showcase.length} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  )
}
