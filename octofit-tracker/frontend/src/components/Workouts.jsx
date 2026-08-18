import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'
import ResourceState from './ResourceState'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('workouts')
      .then(setWorkouts)
      .catch((requestError) => setError(requestError.message))
  }, [])

  return (
    <ResourceState title="Workouts" error={error}>
      <section className="view-header">
        <span className="eyebrow">Suggestions</span>
        <h1>Workouts</h1>
        <p>Personalized plans for strength, conditioning, endurance, and recovery.</p>
      </section>

      <div className="data-grid workouts-grid">
        {workouts.map((workout) => (
          <article className="data-card workout-card" key={workout._id ?? workout.title}>
            <div>
              <span className="tag">{workout.difficulty}</span>
              <h2>{workout.title}</h2>
              <p>{workout.description}</p>
            </div>
            <div className="exercise-list">
              {(workout.exercises ?? []).map((exercise) => (
                <span key={exercise}>{exercise}</span>
              ))}
            </div>
            <strong>{workout.durationMinutes} min</strong>
          </article>
        ))}
      </div>
    </ResourceState>
  )
}

export default Workouts