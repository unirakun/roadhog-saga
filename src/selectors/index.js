export const getConfig = ({ config }) => config
export const getAPI = state => getConfig(state).api
export const getMocks = state => getConfig(state).mocks
export const getResource = name => state => getAPI(state)[name]

export const getMethod = name => methodName => (state) => {
  const resource = getResource(name)(state)
  if (!resource) return {}
  return resource[methodName]
}

export const getOptions = name => methodName => (state) => {
  // raw data
  const api = getAPI(state)
  const resource = getResource(name)(state)
  const method = getMethod(name)(methodName)(state)

  // order is general -> specific
  let options = { method: methodName }
  if (api.options) options = { ...options, ...api.options }
  if (resource.options) options = { ...options, ...resource.options }
  if (method.options) options = { ...options, ...method.options }

  return options
}

export const getURL = name => methodName => (state) => {
  // raw data
  const resource = getResource(name)(state)
  const method = getMethod(name)(methodName)(state)

  if (method === undefined) return resource // example: { TODOS: '/api/todos' }
  if (typeof method === 'string') return method // example : { TODOS: { GET: '/api/todos' } }
  return method.url // example: { TODOS: { GET: { url: '/api/todos' } } }
}

export const getFallback = url => methodName => (state) => {
  const mocks = getMocks(state)
  if (!mocks) return undefined

  // mock by priority
  const orderedMocks = [
    // same method first
    ...mocks.filter(m => m.method === methodName),
    // no method then
    ...mocks.filter(m => m.method === undefined),
    // other method last
    ...mocks.filter(m => m.method !== methodName && m.method !== undefined),
  ]

  // looking for right mock
  const mock = orderedMocks.find(m => m.match.test(url))

  // returns fallback
  return (mock || {}).fallback
}
