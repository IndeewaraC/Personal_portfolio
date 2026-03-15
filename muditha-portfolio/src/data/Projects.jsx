import { useEffect, useState } from 'react';
import { client } from '../contentfulClient'; 
import { FolderCode, ExternalLink } from 'lucide-react';

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    client.getEntries({ 
      content_type: 'projects', 
      order: '-sys.createdAt'
    })
      .then((response) => {
        if (response.items.length > 0) {
          console.log("Loading Projects...", response.items[0].fields);
        } else {
          console.log("⚠️ No projects found! Check your Content Type ID or Publish status.");
        }
        
        setProjects(response.items);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <section id="projects">
      <div className="section-label">
        <FolderCode size={16} /> PROJECTS
      </div>
      
      {projects.map((pro, i) => (
        <div key={i} className="content-card">
          <div className="card-header">
            <h4 style={{ margin: 0 }}>{pro.fields.degree}</h4>
            <span style={{ color: 'var(--text-main)', fontSize: '0.95rem' , fontWeight: 800}}>
              {pro.fields.title}
            </span>
          </div>
          
          <p style={{ color: 'var(--cognac)', fontWeight: 600, marginBottom: '8px' }}>
            {pro.fields.date}
          </p>
          
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            {pro.fields.organization}
          </p>
          
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            {pro.fields.skills}
          </p>

          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            {pro.fields.description}
          </p>
          
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            {pro.fields.contributors}
          </p>
          
          {(pro.fields.url || pro.fields.files) && (
            <div style={{ display: 'flex', gap: '15px', marginTop: '15px' }}>
              

              {pro.fields.url && (
                <a href={pro.fields.url} target="_blank" rel="noopener noreferrer" className="view-paper-link"
                   style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--cognac)', fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
                  Access <ExternalLink size={10} strokeWidth={3} />
                </a>
              )}


              {pro.fields.files && (
                <a href={pro.fields.files} target="_blank" rel="noopener noreferrer" className="view-paper-link"
                   style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--cognac)', fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
                  View Documents <ExternalLink size={10} strokeWidth={3} />
                </a>
              )}
              
            </div>
          )}
        </div>
      ))}
    </section>
  );
}