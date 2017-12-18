export default fallback => function* (raw) {
  /* -ko- => fallback */
  if (!raw.ok && fallback) return fallback
  /* -no content- => undefined */
  if (+(raw.status) === 204) return undefined

  const contentType = raw.headers && raw.headers.get('Content-Type')
  if (contentType && contentType.includes('json')) {
    try {
      /* json */
      return yield raw.json()
    } catch (e) {
      /* json with parsing error => text */
      return yield raw.text()
    }
  }

  return yield raw.text()
}
