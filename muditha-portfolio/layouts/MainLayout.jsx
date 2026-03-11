import { Outlet, Link } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333' }}>
      <header style={{ padding: '1rem 2rem', borderBottom: '1px solid #eee' }}>
        <nav>
          <Link to="/" style={{ textDecoration: 'none', color: '#3b82f6', fontWeight: 'bold' }}>
            Muditha Lakmali Portfolio
          </Link>
        </nav>
      </header>
      <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <Outlet /> 
      </main>
    </div>
  );
};

export default MainLayout;