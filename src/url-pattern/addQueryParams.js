import { encodeParams, isEmpty } from './utils'

export default url => (queryParams) => {
  if (isEmpty(queryParams)) return url

  const params = Object.keys(queryParams)
    .map((k => `${k}=${encodeParams(queryParams[k])}`))

  const slash = (params.length > 0 || url.endsWith('/') || url.endsWith('&') || url.endsWith('?')) ? '' : '/'
  const questionMark = (url.endsWith('&') || url.endsWith('?')) ? '' : '?'

  return `${url}${slash}${questionMark}${params.join('&')}`
}
