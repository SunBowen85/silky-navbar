import GlassNavbar from './GlassNavbar';
import './App.css';

const navItems = [
  { label: 'Home', href: '#top' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function App() {
  return (
    <>
      <GlassNavbar
        navItems={navItems}
        contactHref="mailto:hello@example.com"
        contactLabel="Contact"
      />
      <main>
        <section className="demo-hero" id="top">
          <p className="eyebrow">React component template</p>
          <h1>Glass Auto-Collapse Navbar</h1>
          <p>
            A frosted glass navigation bar that collapses into a floating orb on downward scroll
            and expands again on upward scroll.
          </p>
        </section>
        {['about', 'projects', 'skills', 'contact'].map((id) => (
          <section className="demo-section" id={id} key={id}>
            <p className="eyebrow">{id}</p>
            <h2>{id.charAt(0).toUpperCase() + id.slice(1)}</h2>
            <p>
              Scroll down to collapse the navbar. Scroll up or click the circular button to expand
              it. Replace this demo content with your own page sections.
            </p>
          </section>
        ))}
      </main>
    </>
  );
}
