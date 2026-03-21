import { useEffect, useState } from 'react';
import { staticData } from './staticData';
import { Cpu } from 'lucide-react';

export default function SkillsSection() {

const [skills, setSkills] = useState([]);

  useEffect(() => {
    setSkills(staticData.skills.items || []);
  }, []);

  return(

    <section id="skills">
              <div className="section-label"><Cpu size={16} /> TECHNICAL STACK & EXPERTISE</div>
              <div className="content-card">
                <ul style={{ color: 'var(--text-muted)', fontSize: '0.95rem', paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {skills.map((group, i) => (
                    <li key={i} style={{ lineHeight: '1.6' }}>
                      <strong style={{ color: 'var(--text-main)', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.5px' }}>{group.fields.category}: </strong> 
                      {group.fields.description ? group.fields.description : group.fields.items?.join('; ')}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
  );


}