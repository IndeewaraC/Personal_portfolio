import { useEffect, useState } from 'react';
import { client } from '../contentfulClient'; 
import { Verified } from 'lucide-react';

export default function CertificationsSection() { 
  const [certificationsList, setCertificationsList] = useState([]);

  useEffect(() => {
    client.getEntries({ content_type: 'certifications' })
      .then((response) => setCertificationsList(response.items))
      .catch(console.error);
  }, []);

  return (
    <section id="certifications">
      <div className="section-label">
        <Verified size={16} /> CERTIFICATIONS & TRAINING
      </div>
      {certificationsList.map((cert, i) => (
        <div key={i} className="content-card">
          <div className="card-header">
            <h4 style={{ margin: 0, fontSize: '1.05rem' }}>{cert.fields.title}</h4>
            <span style={{ color: 'var(--cognac)', fontWeight: 700, fontSize: '0.85rem' }}>
              {cert.fields.date}
            </span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '5px' }}>
            {cert.fields.issuer}
          </p>
        </div>
      ))}
    </section>
  );
}