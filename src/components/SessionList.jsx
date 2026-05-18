function SessionList({ sessions, onDelete }) {
  if (sessions.length === 0) return null;

  return (
    <div className="card">
      <h2>📅 Session History</h2>
      <div className="session-list">
        {[...sessions].reverse().map(s => (
          <div key={s.id} className={`session-item ${s.result === 'WIN' ? 'win' : 'loss'}`}>
            <div className="session-left">
              <span className="session-result">
                {s.result === 'WIN' ? '✅' : '❌'}
              </span>
              <div>
                <div className="session-hero">{s.hero} <span className="session-role">({s.role})</span></div>
                <div className="session-meta">{s.date} · {s.duration} mins · {s.rank}</div>
                {s.notes && <div className="session-notes">💬 {s.notes}</div>}
              </div>
            </div>
            <div className="session-right">
              <span className="session-kda">{s.kills}/{s.deaths}/{s.assists}</span>
              <button className="delete-btn" onClick={() => onDelete(s.id)}>✕</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SessionList;