export default fallback => function* (raw) {
  if (!raw.ok && fallback) return fallback
  return yield raw.json()
}
