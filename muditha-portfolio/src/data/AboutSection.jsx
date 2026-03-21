import { useEffect, useState } from 'react';
import { staticData } from './staticData';

export default function AboutSection() {

  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    setAboutData(staticData.profile.items[0] || null);
  }, []);


  if (!aboutData || !aboutData.fields) {
    return <section id="about"><p>Loading profile...</p></section>;
  }


  const { tagline, bio } = aboutData.fields;

  return (
    <section id="about">
  
      <p style={{ fontSize: '1.18rem', color: 'var(--text-main)', lineHeight: 1.4, marginBottom: '20px' }}>
        {tagline ? tagline.split('.')[0] : ''}
      </p>
      
      <p style={{ fontSize: '1.05rem', color: 'var(--text-main)', lineHeight: 1.4, marginBottom: '20px' }}>
        {bio ? bio.split('.')[0] : ''}.
      </p>
      
      <p style={{ fontSize: '1.05rem', color: 'var(--text-main)', lineHeight: 1.7 }}>
        {bio ? bio.split('.').slice(1).join('.') : ''}
      </p>
    </section>
  );
}