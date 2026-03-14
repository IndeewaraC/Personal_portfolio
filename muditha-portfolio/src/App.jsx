import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Linkedin, GraduationCap, Menu, X } from 'lucide-react';
import { client } from './contentfulClient';
import { socialLinks } from './data/socials';

// Import all modular sections
import ExperienceSection from './data/ExperienceSection'; 
import AffiliationSection from './data/AffiliationSection';
import AwardsSection from './data/AwardsSection'; 
import CertificationsSection from './data/certificationsSection';
import EducationSection from './data/EducationSection';
import HobbySection from './data/HobbySection';
import LeadershipSection from './data/LeadershipSection';
import PublicationsSection from './data/PublicationsSection';
import SkillsSection from './data/SkillsSection';
import AboutSection from './data/AboutSection';

import './index.css';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("");
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    setLastUpdated(new Date().toLocaleDateString('en-US', { 
      year: 'numeric', month: 'long', day: 'numeric' 
    }));
    

    client.getEntries({ content_type: 'profile' })
      .then((response) => {
        if (response.items.length > 0) {
          setProfile(response.items[0].fields);
        }
      })
      .catch(console.error);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);


  if (!profile) return null; 

  return (
    <div className="canvas">
      <header className="profile-header">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          className="profile-img-wrap"
        >
    
          <img src="/media/profile.png" alt={`${profile.firstName} ${profile.lastName}`} className="profile-img" />
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
          <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon"><Linkedin size={24} /></a>
          <a href={socialLinks.scholar} target="_blank" rel="noopener noreferrer" className="social-icon"><GraduationCap size={26} /></a>
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
          <a href="#about" onClick={closeMenu}>ABOUT</a>
          <a href="#experience" onClick={closeMenu}>EXPERIENCE</a>
          <a href="#publications" onClick={closeMenu}>RESEARCH</a>
          <a href="#skills" onClick={closeMenu}>SKILLS</a>
          <a href="#education" onClick={closeMenu}>EDUCATION</a>
          <a href="#honors" onClick={closeMenu}>HONORS</a>
          <a href="#leadership" onClick={closeMenu}>LEADERSHIP</a>
          <a href="#certifications" onClick={closeMenu}>CERTIFICATIONS</a>
          <a href="#affiliations" onClick={closeMenu}>AFFILIATIONS</a>
          <a href="#hobbies" onClick={closeMenu}>HOBBIES</a>
        </nav>
      </div>

      <main>
        {/* Pass profile down to AboutSection as a prop */}
        <AboutSection profile={profile} />

        <ExperienceSection />
        <PublicationsSection />
        <SkillsSection />
        <EducationSection />
        <AwardsSection />
        <LeadershipSection />
        <CertificationsSection />
        <AffiliationSection />
        <HobbySection />
      </main>

      <footer style={{ marginTop: '100px', padding: '60px 0', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          © {new Date().getFullYear()} {profile.firstName} {profile.lastName} • {profile.title}
        </p>
        <p style={{ color: 'var(--cognac)', fontSize: '0.75rem', fontWeight: 800, marginTop: '10px', letterSpacing: '1px' }}>
          Last Updated: {lastUpdated}
        </p>
      </footer>
    </div>
  );
}