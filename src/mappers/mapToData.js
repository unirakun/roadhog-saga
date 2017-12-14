export default fallback => function* (raw) {
  if (!raw.ok && fallback) return fallback
  if (raw.status !== 204) {
    try {
      return yield raw.json()
    } catch (e) {
      return undefined
    }
  }
  return undefined
}
