import { select, put } from 'redux-saga/effects'
import { isAction } from './checkers'
import { mapToFetch, mapToData } from './mappers'
import { getFallback } from './selectors'

const apiEvent = (name, suffix, payload) => ({ type: `API_${name}_${suffix}`, payload })

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
  yield put(apiEvent(action, 'STARTED'))
  const raw = yield fetch(url, options)

  // retrieve data (either from request, either from mock -fallback-)
  const data = yield mapToData(fallback)(raw)
  if (!raw.ok && !fallback) yield put(apiEvent(action, 'ERROR', { raw, data, status: raw.status, statusText: raw.statusText }))

  // return json response or fallback
  yield put(apiEvent(action, 'END', { raw, data }))
  return data
}
