import { useState } from 'react'
import { motion } from 'framer-motion'

// One attention matrix of Llama-2 7B is 4096 x 4096. LoRA replaces its update with B (4096 x r) times A (r x 4096).
const D = 4096
const fmt = (n) => n.toLocaleString('en-US')

export default function AdapterLab() {
  const [r, setR] = useState(16)
  const full = D * D
  const lora = 2 * D * r
  const pct = (lora / full) * 100
  const thick = 6 + (r / 64) * 34 // exaggerated so it is visible; labelled "not to scale"

  return (
    <div className="lab">
      <h3>Adapter lab</h3>
      <p className="muted">Drag the rank. The grey square is one frozen attention matrix in Llama-2 7B. The purple strips are the LoRA adapter that trains beside it.</p>

      <svg viewBox="0 0 520 230" className="lab-svg" role="img" aria-label={`A frozen 4096 by 4096 matrix next to a rank ${r} adapter made of two thin matrices`}>
        <g>
          <rect x="20" y="30" width="170" height="170" rx="10" fill="#1b2a3d" stroke="#31577f" strokeWidth="2" />
          <text x="105" y="112" textAnchor="middle" fill="#8fb4e0" fontSize="15" fontWeight="700">W</text>
          <text x="105" y="132" textAnchor="middle" fill="#6f93bd" fontSize="11">frozen · 4096 × 4096</text>
        </g>
        <text x="215" y="120" textAnchor="middle" fill="#8b98a8" fontSize="26">+</text>
        <g>
          <motion.rect x="240" y="30" rx="5" fill="#d2a8ff" fillOpacity="0.85" stroke="#d2a8ff" initial={false} animate={{ width: thick }} height="170" transition={{ type: 'spring', stiffness: 160, damping: 20 }} />
          <text x={240 + thick / 2} y="218" textAnchor="middle" fill="#d2a8ff" fontSize="11">B</text>
        </g>
        <text x={240 + thick + 18} y="120" textAnchor="middle" fill="#8b98a8" fontSize="20">×</text>
        <g>
          <motion.rect x={240 + thick + 34} y="30" width="170" rx="5" fill="#d2a8ff" fillOpacity="0.85" stroke="#d2a8ff" initial={false} animate={{ height: thick }} transition={{ type: 'spring', stiffness: 160, damping: 20 }} />
          <text x={240 + thick + 34 + 85} y={30 + thick + 16} textAnchor="middle" fill="#d2a8ff" fontSize="11">A</text>
        </g>
        <text x="500" y="226" textAnchor="end" fill="#6b7686" fontSize="10">not to scale</text>
      </svg>

      <label className="lab-slider">
        <span>Rank (r): <b>{r}</b></span>
        <input type="range" min="1" max="64" value={r} onChange={(e) => setR(Number(e.target.value))} aria-label="LoRA rank" />
      </label>

      <dl className="lab-stats">
        <div><dt>Frozen values in W</dt><dd>{fmt(full)}</dd></div>
        <div><dt>Trainable values in the adapter</dt><dd className="hi">{fmt(lora)}</dd></div>
        <div><dt>Share that actually trains</dt><dd className="hi">{pct.toFixed(2)}%</dd></div>
      </dl>
      <p className="muted small">The summariser used r = 16 on Llama-2 7B. Counts are for a single 4096 × 4096 matrix; the adapter is attached to the attention projections across every layer, and the base model is also held in 4-bit.</p>
    </div>
  )
}
