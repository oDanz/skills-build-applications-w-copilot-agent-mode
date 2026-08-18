import { useEffect, useState } from 'react'
import { fetchEndpoint } from '../api'
import ResourceState from './ResourceState'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const teamsApiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchEndpoint(teamsApiUrl)
      .then(setTeams)
      .catch((requestError) => setError(requestError.message))
  }, [])

  return (
    <ResourceState title="Teams" error={error}>
      <section className="view-header">
        <span className="eyebrow">Groups</span>
        <h1>Teams</h1>
        <p>Training squads organized around shared goals and weekly accountability.</p>
      </section>

      <div className="data-grid teams-grid">
        {teams.map((team) => (
          <article className="data-card" key={team._id ?? team.name}>
            <div>
              <h2>{team.name}</h2>
              <p>{team.description}</p>
            </div>
            <span className="metric">{team.members?.length ?? 0} members</span>
          </article>
        ))}
      </div>
    </ResourceState>
  )
}

export default Teams