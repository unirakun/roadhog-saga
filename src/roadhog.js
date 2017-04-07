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

const isEmpty = o => {
  return !o ||
    ((typeof o === 'object' && Object.keys(o).length === 0) ||
    (Array.isArray(o) && o.length === 0))
}

// Reducer config > api is mandatory.
const apiSelector = ({ config: { api } }) => api
// Reducer config > mocks
const mocksSelector = ({ config: { mocks } }) => mocks

// Add all params to path url.
const addPathParams = (url, pathParams) => !isEmpty(pathParams) ? `${url}/${pathParams.join('/')}` : url
// Add all params to the query on url.
const addQueryParams = (url, queryParams) => {
  if (!isEmpty(queryParams)) {
    const params = Object.keys(queryParams).map((k => `${k}=${queryParams[k]}`))
    return `${url}?${params.join('&')}`
  }
  return url
}

/**
 * Library that is connected to redux, use to fetch api, and to dispatch saga event
 * @param {string|object} action -
 *   the template of action is like this 'METHOD_RESOURCES' => GET_USERS
 * @param {object} params -
 *   object contains query and path params => {queryParams: {id: 1}, pathParams: [user, 132]}
 * @return {object} - api response or fallback define on redux.
 */
export default action => function*(params) {
  const pathParams = (params && params.pathParams) || []
  const queryParams = (params && params.queryParams) || {}

  let url

  // Check url redux
  if (typeof action === 'string') {
    if (/.*_.*/.test(action)) {
      // retrieve resource urls.
      const [method, name] = action.split(/_(.+)/)
      const api = yield select(apiSelector)

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
  console.log(url, mock)
  const fallback = mock && mock.fallback

  // Call tracer : fetch resource and dispatch event error - if necessary -
  const raw = yield tracer(action, () => fetch(url), !fallback)()

  return yield raw.ok ? raw.json() : fallback
}
