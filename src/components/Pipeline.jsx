import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { stages } from '../data.js'
import ProjectLink from './ProjectLink.jsx'

export default function Pipeline() {
  const [active, setActive] = useState(0)
  const stage = stages[active]

  const onKey = (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => (a + 1) % stages.length) }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => (a - 1 + stages.length) % stages.length) }
  }

  return (
    <section id="work" className="section">
      <div className="wrap">
        <h2>My work is a pipeline</h2>
        <p className="section-lede">
          Production ML is not one model. It is data in, models, serving, evaluation and monitoring.
          Pick a stage to see what I built there at UWM and DNV, and follow the links for the full story.
        </p>

        <div className="pipe" role="tablist" aria-label="ML lifecycle stages" onKeyDown={onKey}>
          {stages.map((s, i) => (
            <div className="pipe-seg" key={s.id}>
              <button
                role="tab"
                id={`tab-${s.id}`}
                aria-selected={i === active}
                aria-controls="stage-panel"
                tabIndex={i === active ? 0 : -1}
                className={'node' + (i === active ? ' on' : '') + (i < active ? ' done' : '')}
                onClick={() => setActive(i)}
              >
                <span className="dot">{i + 1}</span>
                <span className="nlabel">{s.label}</span>
              </button>
              {i < stages.length - 1 && <span className={'link' + (i < active ? ' lit' : '')} aria-hidden="true" />}
            </div>
          ))}
        </div>

        <div id="stage-panel" role="tabpanel" aria-labelledby={`tab-${stage.id}`} className="panel">
          <AnimatePresence mode="wait">
            <motion.div key={stage.id} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }} transition={{ duration: 0.22 }}>
              <h3>{stage.tagline}</h3>
              <ul className="items">
                {stage.items.map((it, i) => (
                  <li key={i}><span className={'org ' + it.org.toLowerCase()}>{it.org}</span><p>{it.text}{it.page && <> <ProjectLink id={it.page} className="more">Details →</ProjectLink></>}</p></li>
                ))}
              </ul>
              <div className="chips">{stage.tools.map((t) => <span key={t} className="chip">{t}</span>)}</div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
