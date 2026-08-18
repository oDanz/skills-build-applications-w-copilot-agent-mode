import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'
import ResourceState from './ResourceState'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('users')
      .then(setUsers)
      .catch((requestError) => setError(requestError.message))
  }, [])

  return (
    <ResourceState title="Users" error={error}>
      <section className="view-header">
        <span className="eyebrow">Profiles</span>
        <h1>Users</h1>
        <p>Authenticated Octofit members and their current team assignments.</p>
      </section>

      <div className="data-grid users-grid">
        {users.map((user) => (
          <article className="data-card" key={user._id ?? user.username}>
            <div>
              <h2>{user.displayName ?? user.username}</h2>
              <p>{user.email}</p>
            </div>
            <span className="tag">{user.team?.name ?? 'Unassigned'}</span>
          </article>
        ))}
      </div>
    </ResourceState>
  )
}

export default Users