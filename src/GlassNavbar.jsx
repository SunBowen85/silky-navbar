import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Home, Menu } from 'lucide-react';
import './GlassNavbar.css';

const defaultNavItems = [
  { label: 'Home', href: '#top' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function GlassNavbar({
  navItems = defaultNavItems,
  contactHref = 'mailto:hello@example.com',
  contactLabel = 'Contact',
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isExpandedByClick, setIsExpandedByClick] = useState(false);
  const lastScrollY = useRef(0);
  const isCompact = isCollapsed && !isExpandedByClick;

  useEffect(() => {
    const updateNavState = () => {
      const currentScrollY = Math.max(window.scrollY, 0);
      const scrollDelta = currentScrollY - lastScrollY.current;

      if (currentScrollY === 0) {
        setIsCollapsed(false);
        setIsExpandedByClick(false);
      } else if (scrollDelta > 2) {
        setIsCollapsed(true);
        setIsExpandedByClick(false);
      } else if (scrollDelta < -2) {
        setIsCollapsed(false);
        setIsExpandedByClick(false);
      }

      lastScrollY.current = currentScrollY;
    };

    lastScrollY.current = Math.max(window.scrollY, 0);
    updateNavState();
    window.addEventListener('scroll', updateNavState, { passive: true });

    return () => window.removeEventListener('scroll', updateNavState);
  }, []);

  const className = `glass-navbar glass-navbar-fixed ${
    isCompact ? 'glass-navbar-compact' : 'glass-navbar-expanded'
  }`;

  return (
    <nav className={className} aria-label="Main navigation">
      {isCompact ? (
        <button
          className="glass-nav-orb"
          type="button"
          aria-label="Expand navigation"
          onClick={() => setIsExpandedByClick(true)}
        >
          <Menu size={21} aria-hidden="true" />
        </button>
      ) : (
        <a className="glass-brand" href="#top" aria-label="Back to top">
          <Home size={18} aria-hidden="true" />
          <span>{navItems[0]?.label ?? 'Home'}</span>
        </a>
      )}

      <div className="glass-nav-links">
        {navItems.slice(1).map((item) => (
          <a href={item.href} key={item.href}>
            {item.label}
          </a>
        ))}
      </div>

      <a className="glass-contact-button" href={contactHref}>
        {contactLabel}
        <ArrowUpRight size={18} aria-hidden="true" />
      </a>
    </nav>
  );
}
