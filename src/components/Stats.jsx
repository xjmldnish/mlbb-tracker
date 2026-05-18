import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid
} from 'recharts';

function Stats({ sessions }) {
  if (sessions.length === 0) return (
    <div className="card">
      <h2>📊 Your Stats</h2>
      <p className="empty">No sessions yet. Log your first game!</p>
    </div>
  );

  const wins = sessions.filter(s => s.result === 'WIN').length;
  const losses = sessions.filter(s => s.result === 'LOSS').length;
  const winRate = ((wins / sessions.length) * 100).toFixed(1);

  const avgKills = (sessions.reduce((s, x) => s + x.kills, 0) / sessions.length).toFixed(1);
  const avgDeaths = (sessions.reduce((s, x) => s + x.deaths, 0) / sessions.length).toFixed(1);
  const avgAssists = (sessions.reduce((s, x) => s + x.assists, 0) / sessions.length).toFixed(1);
  const totalMins = sessions.reduce((s, x) => s + x.duration, 0);

  const heroCount = {};
  sessions.forEach(s => {
    heroCount[s.hero] = (heroCount[s.hero] || 0) + 1;
  });
  const favHero = Object.entries(heroCount).sort((a, b) => b[1] - a[1])[0][0];

  const chartData = sessions.slice(-10).map((s, i) => ({
    game: `G${i + 1}`,
    KDA: s.deaths === 0 ? s.kills + s.assists :
      ((s.kills + s.assists) / s.deaths).toFixed(2),
  }));

  return (
    <div className="card">
      <h2>📊 Your Stats</h2>

      <div className="stats-grid">
        <div className="stat-box">
          <span className="stat-num">{winRate}%</span>
          <span className="stat-label">Win Rate</span>
        </div>
        <div className="stat-box">
          <span className="stat-num">{sessions.length}</span>
          <span className="stat-label">Total Games</span>
        </div>
        <div className="stat-box">
          <span className="stat-num">{wins}W / {losses}L</span>
          <span className="stat-label">Record</span>
        </div>
        <div className="stat-box">
          <span className="stat-num">{avgKills}/{avgDeaths}/{avgAssists}</span>
          <span className="stat-label">Avg KDA</span>
        </div>
        <div className="stat-box">
          <span className="stat-num">{Math.floor(totalMins / 60)}h {totalMins % 60}m</span>
          <span className="stat-label">Total Playtime</span>
        </div>
        <div className="stat-box">
          <span className="stat-num">{favHero}</span>
          <span className="stat-label">Fav Hero</span>
        </div>
      </div>

      <h3 style={{marginTop: '24px', marginBottom: '12px'}}>
        📈 KDA Trend (Last 10 Games)
      </h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="game" stroke="#aaa" />
          <YAxis stroke="#aaa" />
          <Tooltip
            contentStyle={{ background: '#1a1a2e', border: '1px solid #gold' }}
          />
          <Line type="monotone" dataKey="KDA"
            stroke="#f4c430" strokeWidth={2} dot={{ fill: '#f4c430' }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Stats;