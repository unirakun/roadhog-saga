import { encodeParams, isEmpty } from './utils'

export default url => (pathParams) => {
  if (isEmpty(pathParams)) return url
  return `${url}/${encodeParams(pathParams).join('/')}`
}
