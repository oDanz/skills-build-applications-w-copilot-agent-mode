const codespaceName = import.meta.env.VITE_CODESPACE_NAME

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export function normalizeCollection(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  const collection = payload?.results ?? payload?.items ?? payload?.data ?? payload?.docs
  return Array.isArray(collection) ? collection : []
}

export async function fetchEndpoint(endpoint) {
  const response = await fetch(endpoint)

  if (!response.ok) {
    throw new Error(`Request failed with ${response.status}`)
  }

  return normalizeCollection(await response.json())
}

export async function fetchCollection(collectionName) {
  return fetchEndpoint(`${apiBaseUrl}/${collectionName}/`)
}