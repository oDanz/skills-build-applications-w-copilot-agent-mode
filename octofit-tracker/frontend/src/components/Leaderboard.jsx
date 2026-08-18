import { useEffect, useState } from 'react'
import { fetchEndpoint } from '../api'
import ResourceState from './ResourceState'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const leaderboardApiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchEndpoint(leaderboardApiUrl)
      .then(setLeaderboard)
      .catch((requestError) => setError(requestError.message))
  }, [])

  return (
    <ResourceState title="Leaderboard" error={error}>
      <section className="view-header">
        <span className="eyebrow">Competition</span>
        <h1>Leaderboard</h1>
        <p>Ranked performance points across the active Octofit community.</p>
      </section>

      <div className="leaderboard-stack">
        {leaderboard.map((entry) => (
          <article className="rank-row" key={entry._id ?? entry.rank}>
            <span className="rank">#{entry.rank}</span>
            <div>
              <h2>{entry.user?.displayName ?? 'Unknown member'}</h2>
              <p>{entry.user?.email}</p>
            </div>
            <strong>{entry.points} pts</strong>
          </article>
        ))}
      </div>
    </ResourceState>
  )
}

export default Leaderboard