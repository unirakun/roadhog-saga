import { select } from 'redux-saga/effects'
import tracer from './tracer'
import { isAction } from './checkers'
import { mapToFetch } from './mappers'
import { getFallback } from './selectors'

/**
 * Library that is connected to redux, use to fetch api, and to dispatch saga event
 * @param {string} action -
 *   the template of action is like this '<METHOD_NAME>_<RESOURCE_NAME>' => GET_USERS
 * @param {object} inputs -
 *   object contains body, query and path params => {body, query: {id: 1}, path: [user, 132]}
 * @return {object} - api response or fallback define on redux.
 */
export default action => function* (inputs) {
  // check action pattern and eventually throw errors
  isAction(action)

  // get fetch options to make a fetch callback
  const [url, options] = yield mapToFetch(action)(inputs)

  // get the fallback (5XX errors)
  const fallback = yield select(getFallback(url)(options.method))

  // get the raw response, from tracer or from fetch
  const raw = yield tracer(action, () => fetch(url, options), !fallback)()

  // return json response or fallback
  if (raw.ok) return yield raw.json()
  return fallback
}
