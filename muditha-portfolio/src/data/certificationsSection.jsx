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
        <div key={i} className="content-card certification-card">
    <div className="cert-header">
      <div className="cert-info">
        <h4 className="cert-title">{cert.fields.title}</h4>
        <p className="cert-issuer">{cert.fields.issuer}</p>
      </div>
      <span className="cert-date" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--cognac)', fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1.5px' }}>{cert.fields.date}</span>
    </div>
  </div>
      ))}
    </section>
  );
}