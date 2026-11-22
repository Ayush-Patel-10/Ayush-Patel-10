import { motion } from 'framer-motion'
import { extras } from '../data.js'
import Explainer from './Explainer.jsx'
import { scenes } from './Scenes.jsx'

export function ShipIt() {
  const d = extras.cicd
  const max = Math.max(...d.costs.map((c) => c.value))
  const total = d.costs.reduce((a, c) => a + c.value, 0)
  return (
    <section className="psec">
      <h2>Shipping it</h2>
      <p className="muted">The pipeline around the model: code moves from dev to staging to production through GitHub Actions, with tests gating each step.</p>
      <div className="pexpl"><Explainer steps={d.steps} Scene={scenes.cicd} label="CI/CD pipeline" /></div>
      <h3 className="sub">The workflows</h3>
      <ol className="flow">
        {d.flow.map((f) => <li key={f.step}><b>{f.step}</b><span>{f.note}</span></li>)}
      </ol>
      <h3 className="sub">What it cost to build (${total.toFixed(2)} total)</h3>
      <ul className="bars">
        {d.costs.map((c) => (
          <li key={c.label}>
            <span className="bl">{c.label}</span>
            <span className="bt"><motion.i initial={{ width: 0 }} whileInView={{ width: `${(c.value / max) * 100}%` }} viewport={{ once: true }} transition={{ duration: 0.8 }} /></span>
            <span className="bv">${c.value.toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <p className="muted small">{d.costNote}</p>
    </section>
  )
}

export function SatResults() {
  const d = extras.sat
  const metrics = [['bleu1', 'BLEU-1'], ['bleu4', 'BLEU-4'], ['meteor', 'METEOR'], ['rouge', 'ROUGE-L'], ['spice', 'SPICE']]
  const top = { bleu1: 30, bleu4: 5, meteor: 15, rouge: 30, spice: 20 }
  return (
    <section className="psec">
      <h2>Results: VGG19 vs InceptionV3</h2>
      <div className="cmp">
        {metrics.map(([k, label]) => (
          <div className="cmp-row" key={k}>
            <span className="cl">{label}</span>
            <div className="cbars">
              {d.models.map((m, i) => (
                <div className="cbar" key={m.name}>
                  <span className="ct"><motion.i className={i ? 'b' : 'a'} initial={{ width: 0 }} whileInView={{ width: `${(m[k] / top[k]) * 100}%` }} viewport={{ once: true }} transition={{ duration: 0.8 }} /></span>
                  <span className="cv">{m[k].toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="key"><span><i className="a" /> {d.models[0].name}</span><span><i className="b" /> {d.models[1].name}</span></div>
      </div>
      <table className="tbl">
        <thead><tr><th>Encoder</th><th>Train captions</th><th>Validation</th><th>Final loss</th></tr></thead>
        <tbody>{d.models.map((m) => <tr key={m.name}><td>{m.name}</td><td>{m.train}</td><td>{m.val}</td><td>{m.loss.toFixed(2)}</td></tr>)}</tbody>
      </table>
      <p className="muted small">{d.note}</p>
    </section>
  )
}

export function AdapterDetails() {
  const d = extras.adapters
  return (
    <section className="psec">
      <h2>The adapters in this project</h2>
      <div className="tablewrap">
        <table className="tbl">
          <thead><tr><th>Base model</th><th>Job</th><th>Adapter setup</th></tr></thead>
          <tbody>{d.rows.map((r) => <tr key={r.model}><td><b>{r.model}</b></td><td>{r.job}</td><td>{r.cfg}</td></tr>)}</tbody>
        </table>
      </div>
      <p>{d.training}</p>
    </section>
  )
}
