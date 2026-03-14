import { useEffect, useState } from 'react';
import { client } from '../contentfulClient'; 
import { Heart } from 'lucide-react';

export default function HobbySection() {

  const [hobbies, setHobbies] = useState([]); 

  useEffect(() => {
    client.getEntries({ content_type: 'hobbies' })
      .then((response) => setHobbies(response.items))
      .catch(console.error);
  }, []);

  return (
    <section id="hobbies">
      <div className="section-label">
        <Heart size={16} /> BEYOND THE DATA
      </div>
      <div className="content-card">
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {hobbies.map((hobby, i) => (
            <li key={i} style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem', display: 'flex', alignItems: 'flex-start' }}>
              <div>{hobby.fields.description}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}