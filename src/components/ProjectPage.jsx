import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { showcase, pages } from '../data.js'
import Explainer from './Explainer.jsx'
import { scenes } from './Scenes.jsx'
import ArchViewer from './ArchViewer.jsx'
import AdapterLab from './AdapterLab.jsx'
import { ShipIt, SatResults, AdapterDetails } from './Extras.jsx'
import ProjectLink from './ProjectLink.jsx'

export default function ProjectPage({ id }) {
  const item = showcase.find((s) => s.id === id)
  const page = pages[id]
  useEffect(() => {
    document.title = item ? `${item.title} — Ayush Patel` : 'Ayush Patel'
    window.scrollTo({ top: 0, behavior: 'instant' })
    return () => { document.title = 'Ayush Patel — ML Engineer' }
  }, [id, item])

  if (!item || !page) {
    return <div className="wrap ppage"><p>That project page does not exist. <a href="#/">Back to the portfolio</a></p></div>
  }
  const i = showcase.findIndex((s) => s.id === id)
  const prev = showcase[(i - 1 + showcase.length) % showcase.length]
  const next = showcase[(i + 1) % showcase.length]
  const ex = page.extras || []

  return (
    <div className="wrap ppage">
      <a className="back" href="#/">← All projects</a>
      <motion.header initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <p className="pkick">{page.kicker}</p>
        <h1>{item.title}</h1>
        <p className="psum">{page.summary}</p>
        <div className="chips">{item.stack.map((s) => <span className="chip" key={s}>{s}</span>)}</div>
      </motion.header>

      {page.results && (
        <ul className="presults">
          {page.results.map((r) => <li key={r.l}><strong>{r.v}</strong><span>{r.l}</span></li>)}
        </ul>
      )}

      <section className="psec">
        <h2>How it works</h2>
        <div className="pexpl"><Explainer steps={item.steps} Scene={scenes[item.scene]} label={item.title} /></div>
      </section>

      {id === 'litart' && <section className="psec"><AdapterLab /></section>}

      {page.sections.map((s) => (
        <section className="psec prose" key={s.h}>
          <h2>{s.h}</h2>
          {s.p && s.p.map((t) => <p key={t}>{t}</p>)}
          {s.list && <ul>{s.list.map((t) => <li key={t}>{t}</li>)}</ul>}
        </section>
      ))}

      {ex.includes('arch') && <section className="psec"><ArchViewer /></section>}
      {ex.includes('sat') && <SatResults />}
      {ex.includes('adapters') && <AdapterDetails />}
      {ex.includes('ship') && <ShipIt />}

      <section className="psec">
        <h2>AI skills used</h2>
        <div className="chips big">{page.skills.map((s) => <span className="chip" key={s}>{s}</span>)}</div>
        {page.links && <p className="plinks">{page.links.map((l) => <a key={l.href} className="btn small" href={l.href} target="_blank" rel="noreferrer">{l.label}</a>)}</p>}
        {!page.links && <p className="muted small">Employer work: described at architecture level. No code, data or screenshots are shown.</p>}
      </section>

      <nav className="pnav" aria-label="Other projects">
        <ProjectLink id={prev.id} className="pn prev"><small>← Previous</small><span>{prev.title}</span></ProjectLink>
        <ProjectLink id={next.id} className="pn next"><small>Next →</small><span>{next.title}</span></ProjectLink>
      </nav>
    </div>
  )
}
