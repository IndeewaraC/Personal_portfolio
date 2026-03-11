import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  MapPin, 
  Download, 
  Linkedin, 
  GraduationCap, 
  Briefcase, 
  BookOpen, 
  Cpu, 
  FileText, 
  Award, 
  Heart, 
  Plane, 
  Palette, 
  Users,
  ShieldCheck,
  Verified,
  Menu,
  X
} from 'lucide-react';
import { profileData } from './data/profile';
import { educationData } from './data/education';
import { skillsData } from './data/skills';
import { experienceData } from './data/experience';
import { publicationsData, conferenceData } from './data/publications';
import { awardsData } from './data/awards';
import { leadershipData } from './data/leadership';
import { certificationsData } from './data/certifications';
import { affiliationsData } from './data/affiliations';
import { hobbiesData } from './data/hobbies';
import { socialLinks } from './data/socials';
import './index.css';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    setLastUpdated(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="canvas">
      <header className="profile-header">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="profile-img-wrap"
        >
          <img src="/media/profile.jpg" alt={profileData.name} className="profile-img" />
        </motion.div>
        
        <h1 className="name-hero">{profileData.name}</h1>
        <p className="title-tagline">{profileData.title}</p>
        
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          gap: '8px', 
          marginBottom: '24px',
          color: 'var(--text-muted)',
          fontSize: '0.9rem'
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <MapPin size={16} color="var(--cognac)" /> {profileData.location}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Mail size={16} color="var(--cognac)" /> {profileData.email}
          </span>
        </div>

        <div className="social-links">
          <a href={`mailto:${profileData.email}`} className="social-icon"><Mail size={24} /></a>
          <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon"><Linkedin size={24} /></a>
          <a href={socialLinks.scholar} target="_blank" rel="noopener noreferrer" className="social-icon"><GraduationCap size={26} /></a>
        </div>
      </header>

      <div className="sticky-nav-wrapper">
        <div className="mobile-menu-header">
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', letterSpacing: '1px' }}>
            NAVIGATION
          </span>
          <button 
            className="mobile-menu-btn" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Navigation"
          >
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
        <section id="about">
          <div className="section-label"><BookOpen size={16} /> 01. SUMMARY</div>
          <p style={{ fontSize: 'clamp(1.1rem, 3vw, 1.35rem)', fontWeight: 600, color: 'var(--text-main)', lineHeight: 1.4, marginBottom: '20px' }}>
            {profileData.bio.split('.')[0]}.
          </p>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            {profileData.bio.split('.').slice(1).join('.')}.
          </p>
          <div style={{ marginTop: '35px' }}>
            <a href={profileData.cvPath} download className="cv-button">
              <Download size={18} /> DOWNLOAD DOSSIER
            </a>
          </div>
        </section>

        <section id="experience">
          <div className="section-label"><Briefcase size={16} /> 02. PROFESSIONAL EXPERIENCE</div>
          {experienceData.map((job, i) => (
            <div key={i} className="content-card">
              <div className="card-header">
                <h4 style={{ margin: 0 }}>{job.role}</h4>
                <span style={{ color: 'var(--cognac)', fontWeight: 700, fontSize: '0.85rem' }}>{job.period}</span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontWeight: 600, marginBottom: '10px' }}>{job.company}</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{job.desc}</p>
            </div>
          ))}
        </section>

        <section id="publications">
          <div className="section-label"><FileText size={16} /> 03. RESEARCH & PUBLICATIONS</div>
          <h5 style={{ color: 'var(--text-muted)', marginBottom: '15px', fontSize: '0.9rem', letterSpacing: '1px' }}>JOURNAL PUBLICATIONS</h5>
          {publicationsData.map((pub, i) => (
            <div key={i} className="content-card" style={{ borderLeft: '3px solid var(--cognac)' }}>
              <h4 style={{ fontSize: '1.05rem', marginBottom: '8px' }}>{pub.title}</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{pub.journal} ({pub.year})</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '5px' }}>{pub.authors}</p>
            </div>
          ))}
          
          <h5 style={{ color: 'var(--text-muted)', margin: '40px 0 15px 0', fontSize: '0.9rem', letterSpacing: '1px' }}>CONFERENCE PRESENTATIONS</h5>
          {conferenceData.map((conf, i) => (
            <div key={i} className="content-card">
              <h4 style={{ fontSize: '1rem', marginBottom: '8px' }}>{conf.title}</h4>
              <p style={{ color: 'var(--cognac)', fontSize: '0.85rem', fontWeight: 600 }}>{conf.event} — {conf.date}</p>
            </div>
          ))}
        </section>

        <section id="skills">
          <div className="section-label"><Cpu size={16} /> 04. TECHNICAL STACK & EXPERTISE</div>
          <div className="skills-grid">
            {skillsData.map((group, i) => (
              <div key={i} className="content-card" style={{ marginBottom: 0 }}>
                <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '15px', letterSpacing: '1.5px' }}>{group.category.toUpperCase()}</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {group.items.map((skill, j) => (
                    <span key={j} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="education">
          <div className="section-label"><GraduationCap size={16} /> 05. ACADEMIC BACKGROUND</div>
          {educationData.map((edu, i) => (
            <div key={i} className="content-card">
              <div className="card-header">
                <h4 style={{ margin: 0 }}>{edu.degree}</h4>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{edu.date}</span>
              </div>
              <p style={{ color: 'var(--cognac)', fontWeight: 600, marginBottom: '8px' }}>{edu.school}</p>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{edu.details}</p>
            </div>
          ))}
        </section>

        <section id="honors">
          <div className="section-label"><Award size={16} /> 06. AWARDS & HONORS</div>
          <div className="content-card">
            <ul style={{ paddingLeft: '20px', color: 'var(--text-muted)', margin: 0 }}>
              {awardsData.map((award, i) => (
                <li key={i} style={{ marginBottom: '10px' }}>
                  <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{award.title}</span>, {award.provider} ({award.year}) — {award.amount}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="leadership">
          <div className="section-label"><Users size={16} /> 07. VOLUNTEER & LEADERSHIP</div>
          <div className="skills-grid">
            {leadershipData.map((item, i) => (
              <div key={i} className="content-card" style={{ marginBottom: 0 }}>
                <h4 style={{ fontSize: '1rem', marginBottom: '5px' }}>{item.role}</h4>
                <p style={{ color: 'var(--cognac)', fontSize: '0.85rem', fontWeight: 600 }}>{item.organization}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '5px' }}>{item.period}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="certifications">
          <div className="section-label"><Verified size={16} /> 08. CERTIFICATIONS & TRAINING</div>
          {certificationsData.map((cert, i) => (
            <div key={i} className="content-card">
              <div className="card-header">
                <h4 style={{ margin: 0, fontSize: '1.05rem' }}>{cert.title}</h4>
                <span style={{ color: 'var(--cognac)', fontWeight: 700, fontSize: '0.85rem' }}>{cert.date}</span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '5px' }}>{cert.issuer}</p>
            </div>
          ))}
        </section>

        <section id="affiliations">
          <div className="section-label"><ShieldCheck size={16} /> 09. PROFESSIONAL AFFILIATIONS</div>
          <div className="content-card">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '15px' }}>
              {affiliationsData.map((org, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ width: '6px', height: '6px', background: 'var(--cognac)', borderRadius: '50%' }}></span>
                  <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-main)' }}>{org.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="hobbies">
          <div className="section-label"><Heart size={16} /> 10. BEYOND THE DATA</div>
          <div className="skills-grid">
            {hobbiesData.map((hobby, i) => (
              <div key={i} className="content-card" style={{ marginBottom: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <span style={{ color: 'var(--cognac)' }}>
                    {hobby.icon === "Plane" && <Plane size={20} />}
                    {hobby.icon === "Palette" && <Palette size={20} />}
                    {hobby.icon === "Heart" && <Heart size={20} />}
                  </span>
                  <h4 style={{ fontSize: '0.9rem', margin: 0 }}>{hobby.category}</h4>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>{hobby.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer style={{ marginTop: '100px', padding: '60px 0', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>© {new Date().getFullYear()} {profileData.name} • {profileData.title}</p>
        <p style={{ color: 'var(--cognac)', fontSize: '0.75rem', fontWeight: 800, marginTop: '10px', letterSpacing: '1px' }}>REVISION: {lastUpdated}</p>
      </footer>
    </div>
  );
}