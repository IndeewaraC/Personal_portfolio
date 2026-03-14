import { useEffect, useState } from 'react';
import { client } from '../contentfulClient'; 
import { Users } from 'lucide-react';

export default function LeadershipSection() {
  const [leadership, setLeadership] = useState([]);

useEffect(() => {
    client.getEntries({ content_type: 'leadership' })
      .then((response) => setLeadership(response.items))
      .catch(console.error);
  }, []);
return(

  <section id="leadership">
          <div className="section-label"><Users size={16} /> VOLUNTEER & LEADERSHIP</div>
          <div className="content-card">
            <ul style={{ color: 'var(--text-muted)', margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {leadership.map((item, i) => (
                <li key={i} style={{ lineHeight: '1.6', fontSize: '0.95rem' }}>
                  <strong style={{ color: 'var(--text-main)' }}>{item.fields.role}</strong>
                  <p>{item.fields.organization}</p>
                  <p style={{ color: 'var(--cognac)', fontSize: '0.85rem', fontWeight: 600 }}>({item.fields.period})</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

);

}
