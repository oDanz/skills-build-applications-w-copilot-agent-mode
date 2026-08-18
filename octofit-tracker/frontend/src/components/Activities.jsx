import { useEffect, useState } from 'react'
import { fetchEndpoint } from '../api'
import ResourceState from './ResourceState'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const activitiesApiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchEndpoint(activitiesApiUrl)
      .then(setActivities)
      .catch((requestError) => setError(requestError.message))
  }, [])

  return (
    <ResourceState title="Activities" error={error}>
      <section className="view-header">
        <span className="eyebrow">Training log</span>
        <h1>Activities</h1>
        <p>Recent movement sessions flowing in from the Octofit activity API.</p>
      </section>

      <div className="table-responsive surface-table">
        <table className="table align-middle mb-0">
          <thead>
            <tr>
              <th>Member</th>
              <th>Activity</th>
              <th>Duration</th>
              <th>Calories</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity._id}>
                <td>{activity.user?.displayName ?? 'Unknown member'}</td>
                <td>{activity.activityType}</td>
                <td>{activity.durationMinutes} min</td>
                <td>{activity.caloriesBurned}</td>
                <td>{new Date(activity.activityDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ResourceState>
  )
}

export default Activities