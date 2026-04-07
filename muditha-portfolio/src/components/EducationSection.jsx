import { useEffect, useState } from 'react';
import { staticData } from './staticData';
import { GraduationCap } from 'lucide-react'; 

export default function EducationSection() {
  const [educationlist, seteducationlist] = useState([]);

  useEffect(() => {
    seteducationlist(staticData.education.items || []);
  }, []);

  return (
    <section id="education">
      <div className="section-label">
        <GraduationCap size={16} /> ACADEMIC BACKGROUND
      </div>
      
      {educationlist.map((edu, i) => (
        <div key={i} className="content-card">
          <div className="card-header">

            <h4 style={{ margin: 0 }}>{edu.fields.degree}</h4>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              {edu.fields.date}
            </span>
          </div>
          
          <p style={{ color: 'var(--cognac)', fontWeight: 600, marginBottom: '8px' }}>
            {edu.fields.school}
          </p>
          
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            {edu.fields.gpa}
          </p>
          
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            {edu.fields.thesis}
          </p>
        </div>
      ))}
    </section>
  );
}