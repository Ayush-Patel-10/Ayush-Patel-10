import { useEffect, useRef, useState } from 'react'

const SRC = `${import.meta.env.BASE_URL}img/databricks-architecture.png`
const W = 3215, H = 4977

// Regions of the diagram, in original pixel coordinates.
const regions = [
  { id: 'dev', label: 'Development', y: 0, h: 1500, color: '#d2a8ff',
    points: ['Ingest PDFs and text, chunk them, and embed the chunks into a vector search index', 'A question classifier screens each question; the LangChain QnA framework retrieves context and builds the prompt', 'A foundation-model endpoint writes the answer', 'Offline evaluation with an MLflow LLM-as-a-judge, plus online monitoring dashboards'] },
  { id: 'stage', label: 'Staging', y: 1530, h: 1800, color: '#58a6ff',
    points: ['Integration tests exercise the whole RAG flow: ingestion, the LangChain framework, offline evaluation, endpoint creation, and inference with monitoring', 'The chain is logged and registered in MLflow, then loaded behind a serving endpoint and tested'] },
  { id: 'prod', label: 'Production', y: 3350, h: 1627, color: '#56d364',
    points: ['The same flow runs against production data with a Delta-table vector index', 'A model serving endpoint exposes it as a REST API', 'Online evaluation keeps tracking answer quality over time'] },
]

function Crop({ r }) {
  return (
    <div className="crop" role="img" aria-label={`${r.label} section of the architecture diagram`}
      style={{ aspectRatio: `${W} / ${r.h}`, backgroundImage: `url(${SRC})`, backgroundSize: `100% ${(H / r.h) * 100}%`, backgroundPosition: `0 ${(r.y / (H - r.h)) * 100}%` }} />
  )
}

function Lightbox({ onClose }) {
  const btn = useRef(null)
  useEffect(() => {
    btn.current?.focus()
    const k = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', k)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', k); document.body.style.overflow = prev }
  }, [onClose])
  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label="Full architecture diagram" onClick={onClose}>
      <button ref={btn} className="btn small lb-close" onClick={onClose}>Close (Esc)</button>
      <div className="lb-scroll" onClick={(e) => e.stopPropagation()}>
        <img src={SRC} alt="Full architecture: development, staging and production workspaces on Azure Databricks with Unity Catalog, MLflow and GitHub workflows" />
      </div>
    </div>
  )
}

export default function ArchViewer() {
  const [i, setI] = useState(0)
  const [open, setOpen] = useState(false)
  const r = regions[i]
  return (
    <div className="arch">
      <h2>The real architecture</h2>
      <div className="arch-bar">
        <div className="tabs" role="tablist" aria-label="Environments">
          {regions.map((x, n) => (
            <button key={x.id} role="tab" aria-selected={i === n} className={i === n ? 'on' : ''} onClick={() => setI(n)}>{x.label}</button>
          ))}
        </div>
        <button className="btn small" onClick={() => setOpen(true)}>View full diagram</button>
      </div>
      <div className="arch-frame" style={{ '--c': r.color }}>
        <Crop r={r} />
      </div>
      <ul className="arch-points">{r.points.map((p) => <li key={p}>{p}</li>)}</ul>
      {open && <Lightbox onClose={() => setOpen(false)} />}
    </div>
  )
}
