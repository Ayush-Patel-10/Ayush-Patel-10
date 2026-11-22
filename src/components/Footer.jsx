import { useState } from 'react'
import { profile } from '../data.js'

const RESUME = `${import.meta.env.BASE_URL}Ayush_Patel_Resume.pdf`
// The address is assembled at click time so it is not sitting in the page source as plain text.
const mail = ['patel.ayushj', 'northeastern.edu']

export default function Footer() {
  const [shown, setShown] = useState(false)
  const addr = `${mail[0]}@${mail[1]}`
  return (
    <footer id="contact" className="footer">
      <div className="wrap">
        <h2>Let's talk</h2>
        <p className="section-lede">Open to new roles and conversations across industries. The quickest way to reach me is email.</p>
        <div className="cta">
          <a className="btn primary" href={shown ? `mailto:${addr}` : '#contact'} onClick={(e) => { if (!shown) { e.preventDefault(); setShown(true) } }}>
            {shown ? addr : 'Show my email'}
          </a>
          <a className="btn" href={RESUME} target="_blank" rel="noreferrer">Resume</a>
          <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="btn" href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
          <a className="btn" href={profile.kaggle} target="_blank" rel="noreferrer">Kaggle</a>
        </div>
        <p className="muted small">Employer projects are described at architecture level. No code, data or screenshots from them appear here.</p>
      </div>
    </footer>
  )
}
