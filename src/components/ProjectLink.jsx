// A link to a project page. Remembers where you were on the home page so Back returns you there.
export const saveHome = () => {
  try { if (!location.hash.startsWith('#/project/')) sessionStorage.setItem('homeY', String(window.scrollY)) } catch { /* ignore */ }
}
export default function ProjectLink({ id, className, children }) {
  return <a href={`#/project/${id}`} className={className} onClick={saveHome}>{children}</a>
}
