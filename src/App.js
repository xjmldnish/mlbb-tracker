import { useState, useEffect } from 'react';
import LogSession from './components/LogSession';
import Stats from './components/Stats';
import SessionList from './components/SessionList';
import './App.css';

const TABS = ['Log Session', 'My Stats', 'History'];

function App() {
  const [sessions, setSessions] = useState(() => {
    const saved = localStorage.getItem('mlbb-sessions');
    return saved ? JSON.parse(saved) : [];
  });
  const [activeTab, setActiveTab] = useState('Log Session');

  useEffect(() => {
    localStorage.setItem('mlbb-sessions', JSON.stringify(sessions));
  }, [sessions]);

  const addSession = (session) => {
    setSessions(prev => [...prev, session]);
    setActiveTab('My Stats');
  };

  const deleteSession = (id) => {
    setSessions(prev => prev.filter(s => s.id !== id));
  };

  const wins = sessions.filter(s => s.result === 'WIN').length;
  const winRate = sessions.length > 0
    ? ((wins / sessions.length) * 100).toFixed(1) : '0.0';

  return (
    <div className="App">
      <header className="header">
        <div className="header-title">
          <span className="header-icon">🗡️</span>
          <div>
            <h1>MLBB Tracker</h1>
            <p className="header-sub">
              {sessions.length} games · {winRate}% win rate
            </p>
          </div>
        </div>
      </header>

      <nav className="tabs">
        {TABS.map(tab => (
          <button
            key={tab}
            className={`tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>

      <main className="main">
        {activeTab === 'Log Session' && <LogSession onAdd={addSession} />}
        {activeTab === 'My Stats' && <Stats sessions={sessions} />}
        {activeTab === 'History' && (
          <SessionList sessions={sessions} onDelete={deleteSession} />
        )}
      </main>
    </div>
  );
}

export default App;