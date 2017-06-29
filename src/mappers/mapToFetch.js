import { select } from 'redux-saga/effects'
import { getOptions, getURL } from '../selectors'
import { addPathParams, addQueryParams } from '../url-pattern'

export default action => function* (inputs = {}) {
  // action pattern is `<METHOD_NAME>_<RESOURCE_NAME>`
  const [methodName, name] = action.split(/_(.+)/)

  // create a fetch options object
  let options = yield select(getOptions(name)(methodName))

  // body
  // - body is an object : use JSON.stringify
  // - body is a string : let it that way
  const { body } = inputs
  if (typeof body === 'string') options = { ...options, body }
  else options = { ...options, body: JSON.stringify(body) }

  // create a fetch url
  let url = yield select(getURL(name)(methodName))
  url = addPathParams(url)(inputs.path)
  url = addQueryParams(url)(inputs.query)

  return [url, options]
}
