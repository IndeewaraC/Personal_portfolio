import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Linkedin, GraduationCap, Menu, X } from 'lucide-react';

export default function MainLayout({ profile, URLS, children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("");
  const [activeSection, setActiveSection] = useState('about'); 

  useEffect(() => {
    setLastUpdated(new Date().toLocaleDateString('en-US', { 
      year: 'numeric', month: 'long', day: 'numeric' 
    }));
  }, []);

  useEffect(() => {
    if (!profile) return; 

    let observer;
    let sections;

    const timer = setTimeout(() => {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id);
            }
          });
        },
        { rootMargin: '-20% 0px -50% 0px' } 
      );

      sections = document.querySelectorAll('main section[id]');
      sections.forEach((section) => observer.observe(section));
    }, 100);

    return () => {
      clearTimeout(timer);
      if (observer && sections) {
        sections.forEach((section) => observer.unobserve(section));
      }
    };
  }, [profile]); 

  const handleNavClick = (e, id) => {
    e.preventDefault(); 
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
    setIsMenuOpen(false); 
  };

  if (!profile) return null;

  return (
    <div className="canvas">
      <header className="profile-header">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          className="profile-img-wrap"
        >
          <img 
            src="/media/profile.png" 
            alt={`${profile.firstName} ${profile.lastName}`} 
            className="profile-img" 
            fetchpriority="high" 
            loading="eager" 
            decoding="async"
          />
        </motion.div>

        <h1 className="name-hero">{`${profile.firstName} ${profile.lastName}`}</h1>
        <p className="title-tagline">{profile.title}</p>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginBottom: '24px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <MapPin size={16} color="var(--cognac)" /> {profile.country}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Mail size={16} color="var(--cognac)" /> {profile.email}
          </span>
        </div>

        <div className="social-links">
          <a href={`mailto:${profile.email}`} className="social-icon"><Mail size={24} /></a>
          
          {/* Using conditional rendering just in case the CMS is missing a URL */}
          {URLS?.linkedin && (
            <a href={URLS.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon"><Linkedin size={24} /></a>
          )}
          
          {URLS?.scholar && (
            <a href={URLS.scholar} target="_blank" rel="noopener noreferrer" className="social-icon"><GraduationCap size={26} /></a>
          )}
        </div>
      </header>

      <div className="sticky-nav-wrapper">
        <div className="mobile-menu-header">
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', letterSpacing: '1px' }}>NAVIGATION</span>
          <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <nav className={`nav-bar ${isMenuOpen ? 'nav-open' : ''}`}>
          {[
            { id: 'about', label: 'ABOUT' },
            { id: 'experience', label: 'EXPERIENCE' },
            { id: 'projects', label: 'PROJECTS' },
            { id: 'publications', label: 'RESEARCH' },
            { id: 'skills', label: 'SKILLS' },
            { id: 'education', label: 'EDUCATION' },
            { id: 'honors', label: 'HONORS' },
            { id: 'leadership', label: 'LEADERSHIP' },
            { id: 'certifications', label: 'CERTIFICATIONS' },
            { id: 'affiliations', label: 'AFFILIATIONS' },
            { id: 'hobbies', label: 'HOBBIES' }
          ].map((link) => (
            <a 
              key={link.id}
              href={`#${link.id}`} 
              onClick={(e) => handleNavClick(e, link.id)}
              className={activeSection === link.id ? 'active' : ''}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <main>
        {children}
      </main>

      <footer style={{ marginTop: '40px', padding: '30px 20px', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '0 0 8px 0' }}>
          © {new Date().getFullYear()} {profile.firstName} {profile.lastName} • {profile.title}
        </p>
        <p style={{ color: 'var(--cognac)', fontSize: '0.75rem', fontWeight: 800, margin: '0', letterSpacing: '1px' }}>
          Last Updated: {lastUpdated}
        </p>
      </footer>
    </div>
  );
}