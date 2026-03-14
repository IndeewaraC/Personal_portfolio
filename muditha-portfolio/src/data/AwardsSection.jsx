import { useEffect, useState } from 'react';
import { client } from '../contentfulClient'; 
import { Award } from 'lucide-react';

export default function Awards() {
  const [awardsList, setAwardsList] = useState([]);

  useEffect(() => {
    client.getEntries({ content_type: 'awards' })
      .then((response) => setAwardsList(response.items))
      .catch(console.error);
  }, []);

  return (
    <section id="honors">
      
      <div className="section-label"><Award size={16} /> AWARDS & HONORS</div>
      <div className="content-card">
        <ul style={{ padding: 0, listStyle: 'none', color: 'var(--text-muted)', margin: 0 }}>
{awardsList.map((award) => (
  <li key={award.sys.id} style={{ marginBottom: '24px', listStyleType: 'none' }}>
  
    <div style={{ color: 'var(--text-main)', fontWeight: 700, fontSize: '1.05rem', marginBottom: '2px' }}>
      {award.fields.title}
    </div>
    

    <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.4' }}>
      {award.fields.provider} ({award.fields.year})
    </div>
    
   
    <div style={{ color: 'var(--cognac)', fontWeight: 600, fontSize: '0.9rem', marginTop: '4px' }}>
      {award.fields.amount}
    </div>
  </li>
))}
</ul>
      </div>
    </section>
  );
}