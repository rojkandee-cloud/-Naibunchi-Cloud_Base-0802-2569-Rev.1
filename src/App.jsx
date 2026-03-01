import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import './styles/App.css';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_SUPABASE_ANON_KEY
);

export default function App() {
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const { data, error: err } = await supabase
          .from('information_schema.tables')
          .select('table_name')
          .limit(1);

        if (err) throw err;
        setConnected(true);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    checkConnection();
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h1>Welcome to Your WebApp</h1>

        <div className="status">
          {loading ? (
            <p className="loading">Checking Supabase connection...</p>
          ) : connected ? (
            <p className="success">✓ Supabase connected successfully</p>
          ) : (
            <p className="error">✗ Connection error: {error}</p>
          )}
        </div>

        <p className="description">
          Your React + Supabase web application is ready to go. Start building your next great project!
        </p>

        <div className="links">
          <a href="https://react.dev" target="_blank" rel="noopener noreferrer">React Docs</a>
          <a href="https://supabase.com/docs" target="_blank" rel="noopener noreferrer">Supabase Docs</a>
          <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">Vite Docs</a>
        </div>
      </div>
    </div>
  );
}
