import { useEffect, useState } from 'react';
import { client } from '../contentfulClient'; 
import { ShieldCheck } from 'lucide-react';

export default function AffiliationSection() {
  const [affiliationsList, setAffiliationsList] = useState([]);

  useEffect(() => {
    client.getEntries({ content_type: 'affiliation' })
      .then((response) => setAffiliationsList(response.items))
      .catch(console.error);
  }, []);

  return (
    <section id="affiliations">
      <div className="section-label">
        <ShieldCheck size={16} /> PROFESSIONAL AFFILIATIONS
      </div>
      <div className="content-card">
        <ul style={{ 
          color: 'var(--text-muted)', 
          margin: 0, 
          paddingLeft: '20px', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '12px' 
        }}>
          {affiliationsList.map((item, i) => (
            <li key={i} style={{ lineHeight: '1.6', fontSize: '0.95rem' }}>
              <strong style={{ color: 'var(--text-main)' }}>{item.fields.name}</strong>
              {item.fields.link && (
                <a 
                  href={item.fields.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ 
                    display: 'block', 
                    color: 'var(--cognac)', 
                    fontSize: '0.85rem', 
                    fontWeight: 600, 
                    textDecoration: 'none',
                    marginTop: '4px'
                  }}
                >
                  {item.fields.link}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}