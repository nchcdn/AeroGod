import { useEffect, useState } from 'react';
import type { HealthResponse } from '@my-game/shared';

function App() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/v1/health')
      .then((r) => r.json())
      .then(setHealth)
      .catch((e) => setError(String(e)));
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
      <h1>My Game 🎮</h1>
      <p>Backend status:</p>
      {error && <pre style={{ color: 'red' }}>{error}</pre>}
      {health && <pre>{JSON.stringify(health, null, 2)}</pre>}
      {!health && !error && <p>Loading…</p>}
    </div>
  );
}

export default App;