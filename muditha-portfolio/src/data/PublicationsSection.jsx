import { useEffect, useState } from 'react';
import { client } from '../contentfulClient'; 
import { FileText } from 'lucide-react';

export default function PublicationsSection() {
  const [publications, setPublications] = useState([]);
  const [conferences, setConferences] = useState([]);

  useEffect(() => {
    client.getEntries({ content_type: 'publication' })
      .then((response) => setPublications(response.items))
      .catch(console.error);

    client.getEntries({ content_type: 'conferences' })
      .then((response) => setConferences(response.items))
      .catch(console.error);

  }, []);

  return (
    <section id="publications">
              <div className="section-label"><FileText size={16} /> RESEARCH & PUBLICATIONS</div>
              <h5 style={{ color: 'var(--text-muted)', marginBottom: '15px', fontSize: '0.9rem', letterSpacing: '1px' }}>JOURNAL PUBLICATIONS</h5>
              {publications.map((pub, i) => (
                <div key={i} className="content-card" style={{ borderLeft: '3px solid var(--cognac)' }}>
                  <h4 style={{ fontSize: '1.05rem', marginBottom: '8px' }}>{pub.fields.title}</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{pub.fields.journal} ({pub.fields.date})</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '5px' }}>{pub.fields.authors}</p>
                </div>
              ))}
              <h5 style={{ color: 'var(--text-muted)', margin: '40px 0 15px 0', fontSize: '0.9rem', letterSpacing: '1px' }}>CONFERENCE PRESENTATIONS</h5>
              {conferences.map((conf, i) => (
                <div key={i} className="content-card">
                  <h4 style={{ fontSize: '1rem', marginBottom: '8px' }}>{conf.fields.title}</h4>
                  <p style={{ color: 'var(--cognac)', fontSize: '0.85rem', fontWeight: 600 }}>{conf.fields.event} — {conf.fields.date}</p>
                </div>
              ))}
            </section>
  );
}
