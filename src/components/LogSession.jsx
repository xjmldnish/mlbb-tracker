import { useState } from 'react';
import heroes from '../data/heroes';

const RANKS = [
  'Warrior', 'Elite', 'Master', 'Grandmaster',
  'Epic', 'Legend', 'Mythic', 'Mythical Glory'
];

function LogSession({ onAdd }) {
  const [role, setRole] = useState('Marksman');
  const [hero, setHero] = useState(heroes['Marksman'][0]);
  const [kills, setKills] = useState('');
  const [deaths, setDeaths] = useState('');
  const [assists, setAssists] = useState('');
  const [result, setResult] = useState('WIN');
  const [duration, setDuration] = useState('');
  const [rank, setRank] = useState('Epic');
  const [notes, setNotes] = useState('');

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setHero(heroes[e.target.value][0]);
  };

  const handleSubmit = () => {
    if (!kills || !deaths || !assists || !duration) return;

    const session = {
      id: Date.now(),
      date: new Date().toLocaleDateString('en-MY'),
      role,
      hero,
      kills: parseInt(kills),
      deaths: parseInt(deaths),
      assists: parseInt(assists),
      result,
      duration: parseInt(duration),
      rank,
      notes,
    };

    onAdd(session);
    setKills(''); setDeaths(''); setAssists('');
    setDuration(''); setNotes('');
  };

  return (
    <div className="card">
      <h2>⚔️ Log Session</h2>
      <div className="form-grid">
        <div className="form-group">
          <label>Role</label>
          <select value={role} onChange={handleRoleChange}>
            {Object.keys(heroes).map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Hero</label>
          <select value={hero} onChange={e => setHero(e.target.value)}>
            {heroes[role].map(h => (
              <option key={h} value={h}>{h}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Kills</label>
          <input type="number" min="0" placeholder="0"
            value={kills} onChange={e => setKills(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Deaths</label>
          <input type="number" min="0" placeholder="0"
            value={deaths} onChange={e => setDeaths(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Assists</label>
          <input type="number" min="0" placeholder="0"
            value={assists} onChange={e => setAssists(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Duration (mins)</label>
          <input type="number" min="1" placeholder="20"
            value={duration} onChange={e => setDuration(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Current Rank</label>
          <select value={rank} onChange={e => setRank(e.target.value)}>
            {RANKS.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Result</label>
          <select value={result} onChange={e => setResult(e.target.value)}>
            <option value="WIN">✅ WIN</option>
            <option value="LOSS">❌ LOSS</option>
          </select>
        </div>
      </div>

      <div className="form-group full-width">
        <label>Notes (optional)</label>
        <input type="text" placeholder="e.g. Great teamwork, carried late game"
          value={notes} onChange={e => setNotes(e.target.value)} />
      </div>

      <button className="btn-primary" onClick={handleSubmit}>
        + Log This Session
      </button>
    </div>
  );
}

export default LogSession;