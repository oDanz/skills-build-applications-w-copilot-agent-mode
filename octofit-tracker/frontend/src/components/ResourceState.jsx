function ResourceState({ title, error, children }) {
  if (error) {
    return (
      <section className="resource-state alert alert-warning" role="alert">
        <h1>{title}</h1>
        <p>{error}</p>
      </section>
    )
  }

  return children
}

export default ResourceState