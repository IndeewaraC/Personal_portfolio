import { useEffect, useState } from 'react';
import { staticData } from './staticData';
import { Briefcase } from 'lucide-react';

export default function ExperienceSection() {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    setExperiences(staticData.experience.items || []);
  }, []);

  return (
    <section id="experience">
      <div className="section-label">
        <Briefcase size={16} /> PROFESSIONAL EXPERIENCE
      </div>
      
      {experiences.map((job) => (
        <div key={job.sys.id} className="content-card">
          <div className="card-header">
            <h4 style={{ margin: 0 }}>{job.fields.role}</h4>
            <span style={{ color: 'var(--cognac)', fontWeight: 700, fontSize: '0.85rem' }}>
              {job.fields.period}
            </span>
          </div>
          
          <p style={{ color: 'var(--text-muted)', fontWeight: 600, marginBottom: '12px' }}>
            {job.fields.company}
          </p>
          
          <ul style={{ 
            color: 'var(--text-muted)', 
            fontSize: '0.95rem', 
            paddingLeft: '20px', 
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '8px' 
          }}>
            {job.fields.desc && (Array.isArray(job.fields.desc) ? job.fields.desc : [job.fields.desc]).map((bullet, index) => (
              <li key={index}>{bullet}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}