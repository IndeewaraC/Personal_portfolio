import { useEffect, useState } from 'react';
import { staticData } from './staticData';
import { Users } from 'lucide-react';

export default function LeadershipSection() {
  const [leadership, setLeadership] = useState([]);

useEffect(() => {
    setLeadership(staticData.leadership.items || []);
  }, []);

return(

 <section id="leadership">
  <div className="section-label"><Users size={16} /> VOLUNTEER & LEADERSHIP</div>
  {leadership.map((item, i) => (
    <div key={i} className="content-card">
      <div className="card-header">
        <strong style={{ color: 'var(--text-main)', fontSize: '1.05rem', fontWeight: 800 }}>
          {item.fields.role}
        </strong>
        <span style={{ color: 'var(--cognac)', fontSize: '0.85rem', fontWeight: 800, whiteSpace: 'nowrap' }}>
          {item.fields.period}
        </span>
      </div>
      <div style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '16px', fontWeight: 500 }}>
        {item.fields.organization}
      </div>
      {item.fields.desc && (
        <ul style={{ 
          margin: 0, 
          paddingLeft: '20px', 
          color: 'var(--text-muted)', 
          fontSize: '0.95rem', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '10px' 
        }}>
          {item.fields.desc
            .split('\n') 
            .filter(line => line.trim() !== '')
            .map((line, idx) => (
              <li key={idx} style={{ lineHeight: '1.6' }}>
                {line.replace(/^-\s*/, '')}
              </li>
            ))}
        </ul>
      )}
      
    </div>
  ))}
</section>

);

}
