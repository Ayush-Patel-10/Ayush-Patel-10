import { motion } from 'framer-motion'

const RESUME = `${import.meta.env.BASE_URL}Ayush_Patel_Resume.pdf`

const facts = [
  { k: 'Now', v: 'Machine Learning Engineer, United Wholesale Mortgage' },
  { k: 'Before', v: 'Data Scientist at DNV; ML research at Northeastern' },
  { k: 'Education', v: 'MS in Data Science, Northeastern University' },
]

export default function About() {
  return (
    <section id="about" className="section alt">
      <div className="wrap about">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.55 }}>
          <h2>About</h2>
          <p className="bio">
            My path runs from research to production: RAG and text-to-image research at Northeastern, where I earned my MS in
            Data Science, then multi-agent assistants, retrieval and computer vision at DNV, and now production ML at United Wholesale Mortgage.
          </p>
          <p className="bio">
            I care most about the half of ML that decides whether a model keeps working: evaluation, monitoring and guardrails.
            A model should still be right six months after it ships.
          </p>
          <div className="cta">
            <a className="btn primary" href={RESUME} target="_blank" rel="noreferrer">View resume (PDF)</a>
            <a className="btn" href={RESUME} download="Ayush_Patel_Resume.pdf">Download</a>
          </div>
        </motion.div>
        <motion.dl className="facts" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.55, delay: 0.1 }}>
          {facts.map((f) => (
            <div key={f.k}><dt>{f.k}</dt><dd>{f.v}</dd></div>
          ))}
        </motion.dl>
      </div>
    </section>
  )
}
