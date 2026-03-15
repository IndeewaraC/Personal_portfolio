import { useEffect, useState } from 'react';
import { client,fetchOrderedData } from '../contentfulClient'; 
import { FileText, ExternalLink } from 'lucide-react';

export default function PublicationsSection() {
  const [publications, setPublications] = useState([]);
  const [conferences, setConferences] = useState([]);

  useEffect(() => {
    fetchOrderedData('publication', 'date')
      .then((response) => setPublications(response.items))
      .catch(console.error);

    fetchOrderedData('conferences', 'date')
      .then((response) => setConferences(response.items))
      .catch(console.error);

  }, []);

  const groupedConferences = conferences.reduce((acc, conf) => {
    const year = conf.fields.date ? conf.fields.date.toString().match(/\d{4}/)?.[0] || 'Recent' : 'Recent';
    if (!acc[year]) acc[year] = [];
    acc[year].push(conf);
    return acc;
  }, {});

  const sortedYears = Object.keys(groupedConferences).sort((a, b) => b - a);

  return (
   <section id="publications">
      <div className="section-label"><FileText size={16} /> RESEARCH & PUBLICATIONS</div>
      
    
      <h5 style={{ color: 'var(--text-muted)', marginBottom: '15px', fontSize: '0.9rem', letterSpacing: '1px' }}>JOURNAL PUBLICATIONS</h5>
      {publications.map((pub, i) => (
        <div key={i} className="content-card" style={{ borderLeft: '3px solid var(--cognac)' }}>
          <h4 style={{ fontSize: '1.05rem', marginBottom: '8px' }}>{pub.fields.title}</h4>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{pub.fields.journal} ({pub.fields.date})</p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '5px', marginBottom: '10px' }}>{pub.fields.authors}</p>
          <a href={pub.fields.url} target="_blank" rel="noopener noreferrer" className="view-paper-link"
             style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--cognac)', fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
            View Paper <ExternalLink size={10} strokeWidth={3} />
          </a>
        </div>
      ))}


      <h5 style={{ color: 'var(--text-muted)', margin: '40px 0 15px 0', fontSize: '0.9rem', letterSpacing: '1px' }}>PRESENTATIONS</h5>
      
      {sortedYears.map(year => (
        <div key={year} style={{ marginBottom: '30px' }}>
         
          <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-main)', margin: '20px 0', borderBottom: '1px solid var(--border)', paddingBottom: '5px' }}>
            {year}
          </h3>
          
          {groupedConferences[year].map((conf, i) => (
            <div key={i} className="content-card" style={{ marginBottom: '15px', borderLeft: '1px solid var(--border)' }}>
              <h4 style={{ fontSize: '1rem', marginBottom: '4px', lineHeight: '1.4' }}>{conf.fields.title}</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '10px' }}>{conf.fields.event}{conf.fields.date && ` (${conf.fields.date})`}</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '10px' }}>{conf.fields.contributors}</p>
              
              {conf.fields.slidesUrl && (
                <a href={conf.fields.slidesUrl} target="_blank" rel="noopener noreferrer"
                   style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--cognac)', fontSize: '0.65rem', fontWeight: '800', textTransform: 'uppercase', border: '1px solid var(--cognac)', padding: '2px 8px', borderRadius: '4px' }}>
                  Slides
                </a>
              )}
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}
