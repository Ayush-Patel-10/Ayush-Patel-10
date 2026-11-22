import { useEffect, useLayoutEffect, useState } from 'react'
import { motion, useScroll } from 'framer-motion'
import Hero from './components/Hero.jsx'
import Impact from './components/Impact.jsx'
import Showcase from './components/Showcase.jsx'
import Pipeline from './components/Pipeline.jsx'
import About from './components/About.jsx'
import Footer from './components/Footer.jsx'
import ProjectPage from './components/ProjectPage.jsx'

// Hash routing, so it works on GitHub Pages with no server rules:
//   #/project/<id>  -> project page      anything else  -> home (#projects, #about ... are in-page anchors)
const parse = (hash) => {
  const m = hash.match(/^#\/project\/([\w-]+)/)
  return m ? { name: 'project', id: m[1] } : { name: 'home' }
}

function useRoute() {
  const [hash, setHash] = useState(() => window.location.hash)
  useEffect(() => {
    const f = () => setHash(window.location.hash)
    window.addEventListener('hashchange', f)
    return () => window.removeEventListener('hashchange', f)
  }, [])
  return parse(hash)
}

export default function App() {
  const route = useRoute()
  const { scrollYProgress } = useScroll()

  // We restore scroll ourselves: back to the same spot on the home page after visiting a project.
  useEffect(() => { try { window.history.scrollRestoration = 'manual' } catch { /* ignore */ } }, [])
  useLayoutEffect(() => {
    if (route.name !== 'home') return
    const anchor = window.location.hash.slice(1)
    if (anchor && !anchor.startsWith('/')) {
      document.getElementById(anchor)?.scrollIntoView()
      return
    }
    let y = 0
    try { y = Number(sessionStorage.getItem('homeY')) || 0 } catch { /* ignore */ }
    window.scrollTo({ top: y, behavior: 'instant' })
  }, [route.name])

  return (
    <>
      <a className="skip" href="#main-content" onClick={(e) => { e.preventDefault(); document.getElementById("main-content")?.focus(); document.getElementById("main-content")?.scrollIntoView() }}>Skip to content</a>
      <motion.div className="progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />
      <nav className="nav" aria-label="Sections">
        <a href="#/" className="nav-brand">AP</a>
        <div>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#work">Process</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>
      {route.name === 'project' ? (
        <main id="main-content" tabIndex={-1}><ProjectPage id={route.id} /></main>
      ) : (
        <main id="main-content" tabIndex={-1}>
          <Hero />
          <Impact />
          <About />
          <Showcase />
          <Pipeline />
        </main>
      )}
      <Footer />
    </>
  )
}
