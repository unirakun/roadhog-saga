export default fallback => function* (raw) {
  if (!raw.ok && fallback) return fallback
  if (raw.status !== 204) return yield raw.json()
  return undefined
}
