/*
                          .
                          ..   `.
                         `..  ...
                         ... ...`
                        .........
                       ..........
                      ............
                     .............
                     ...............
                    `..............
                    ..............`
                    `.............
                 ................
                  ...............
                  .............`
                   .....;;;;;;
                       :;;;;;;
                       :,,,,:;`
                   `............
                  ................
                ...................
               ........:::::,.......`
              .....,;;;;;;;;;;;;.....`
             ....:;;;;;;;;;;;;;;;;....
             ...;;;;;;;;;;;;;;;;;;;;...
            ..,;;;;;;;;;;;;;;;;;;;;;;...
           `..;;;;;;;;;;;;;;;;;;;;;;;;..
           ..;;;;;;;;;;;;;;;;;;;;;;;;;;..
           .;;;;;;;;;;;;;;;;;;;;;;;;;;;,.
          `.;;   .;;;;;;;;;;;;;;;;   .;;.
          .:; ..  ;;;;;;   .;;;;;`  .` ;.`
          .;`...` :;;;, .;;  ;;;;  .... ;`
          . ..... :;;``;;;;;; :;;  .....:`
          :...... :;.:;;;;;;;;`;;` .....``
          `..... `;,;;;;;;;;;;;; ;  .....,
         ,`....` ; ;;;;;;;;;;;;;;,: .....`
         ;`.... :,;;;;;;;;;;;;;;;:;` ....`.
         ;``.  :;:;;;;;;;;;;;;;;;;`;` `.`::
         ;;   ;;.;;;;;;;;;;;;;;;;;;;;,  `;;
        ,;;;;;;;;;;;;,:;;;;;;.;;;;;;;;;;;;;
        ;;;;;;;;;;;;`  ;;;;;`  ;;;;;;;;;;;;,
        ;;;;;;;;;;;; ;;:;;;;`;; ;;;;;;;;;;;;
       `;;;;;;;;;;;,;;;;;;;;;;;:;;;;;;;;;;;;
       `;;;;;;;;;;;:;;;;;;;;;;;;;;;;;;;;;;;;
       :;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;,
    ,;;;;;:;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
 `:;;;;;;;;.;;;;;;;;;;;;;;;;;;;;;;;;;;;;:;;;;;;;:,
.::::;;;;;;; ;;;;;;;;;;;;;;;;;;;;;;;;;;.;;;;;;;::::
,::::;;;;;;;;:;;;;;;;;;;;;;;;;;;;;;;;; ;;;;;;;:::::
.:::::;;;;;;; ;;;;;;;;;;;;;;;;;;;;;;;::;;;;;;::::;:
`:;::::;;;;;;;`;;;;;;;;;;;;;;;;;;;;;; ;;;;;;;::::::
 ::;;:::;;;;;;; ;;;;;;;;;;;;;;;;;;;; ;;;;;;;:::;;:,
 ,::;::::;;;;;; ;;;;;;;;;;;;;;;;;;;::;;;;;;::::;::
  ::;;:::;;;;;;,;;;;;;;;;;;;;;;;;;;`;;;;;;::::;;:,
  `::;::::;;;;;;:;;;;;;;;;;;;;;;;;; ;;;;;;:::;;::
   ,:;;:::;;;;;; ;;;;;;;;;;;;;;;;;; ;;;;;;:::;::
    ::::::;;;;.   .;;;;;;;;;;;;;;    :;;;::::::,
     :::::;;`        ,;;;;;;;;.        ,;:::::`
      .::,                               .:::
*/
import { select } from 'redux-saga/effects'
import tracer from './tracer'

const isEmpty = (o) => {
  return !o ||
    ((typeof o === 'object' && Object.keys(o).length === 0) ||
    (Array.isArray(o) && o.length === 0))
}

// Reducer config > api is mandatory.
const apiSelector = ({ config: { api } }) => api
// Reducer config > mocks
const mocksSelector = ({ config: { mocks } }) => mocks

// Encode params
const encodeParam = param => encodeURIComponent(param)
const encodeParams = params => params.map(encodeParam)

// Add all params to path url.
const addPathParams = (url, pathParams) => {
  if (isEmpty(pathParams)) return url
  return `${url}/${encodeParams(pathParams).join('/')}`
}

// Add all params to the query on url.
const addQueryParams = (url, queryParams) => {
  if (isEmpty(queryParams)) return url

  const params = Object.keys(queryParams)
    .map((k => `${k}=${encodeParam(queryParams[k])}`))

  const slash = (url.endsWith('/') || url.endsWith('&') || url.endsWith('?')) ? '' : '/'
  const questionMark = (url.endsWith('&') || url.endsWith('?')) ? '' : '?'

  return `${url}${slash}${questionMark}${params.join('&')}`
}

/**
 * Library that is connected to redux, use to fetch api, and to dispatch saga event
 * @param {string|object} action -
 *   the template of action is like this 'METHOD_RESOURCES' => GET_USERS
 * @param {object} params -
 *   object contains query and path params => {queryParams: {id: 1}, pathParams: [user, 132]}
 * @return {object} - api response or fallback define on redux.
 */
export default action => function* (params) {
  const pathParams = (params && params.pathParams) || []
  const queryParams = (params && params.queryParams) || {}

  let url
  let options
  let trace = true

  // Check url redux
  if (typeof action === 'string') {
    if (/.*_.*/.test(action)) {
      // retrieve resource urls.
      const [method, name] = action.split(/_(.+)/)
      const api = yield select(apiSelector)

      // find global options and extends with options of method.
      options = api[name][method].options || {}
      if (api.options) options = { ...options, ...api.options }

      const resource = api[name][method]
      if (typeof resource === 'string') url = resource
      if (typeof resource === 'object') url = resource.url
    } else {
      // throw Exception if action key is malformed.
      throw new Error(`Wrong format for action: '${action}'. should be 'METHOD_RESOURCES' (ie: GET_USERS)`)
    }
  }

  // action is an object
  if (typeof action === 'object') {
    // there is no tracing event when action is an object
    trace = false

    // the property url is mandatory
    if (action.url) {
      url = action.url
    } else {
      throw new Error("The first argument of roadhog is an object, it should contain a non-empty 'url' property")
    }
  }

  // build url with path params.
  url = addPathParams(url, pathParams)
  // build url with query params.
  url = addQueryParams(url, queryParams)

  // Retrieve mock on redux
  const mocks = yield select(mocksSelector)
  // get fallback on redux mocks
  const mock = (mocks || []).find(m => m.match.test(url))
  const fallback = mock && mock.fallback

  // fetch cb
  const f = () => fetch(url, options)

  // get the raw response, from tracer or from fetch
  let raw
  if (trace) raw = yield tracer(action, f, !fallback)()
  else raw = yield f()

  return yield raw.ok ? raw.json() : fallback
}
