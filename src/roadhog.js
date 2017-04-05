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
import { join } from 'lodash'
import tracer from './tracer'

// Reducer config > api is mandatory.
export const apiSelector = ({ config: { api }}) => api

// Add all params to path url.
const addPathParams = (url, pathParams) => `${url}/${join(pathParams, '/')}`
// Add all params to the query on url.
const addQueryParams = (url, queryParams) => {
  const params = Object.keys(queryParams).map((k => `${k}=${queryParams[k]}`))
  return `${url}?${join(params, '&')}`
}

export default action => function* (params) {
  const pathParams = (params && params.pathParams) || []
  const queryParams = (params && params.queryParams) || {}

  let url = null
  let fallback = undefined

  // Check url redux
  if (typeof action === 'string') {
    if (/.*_.*/.test(action)) {
      // retrieve resource urls.
      const splitAction = action.split(/_(.+)/)
      const api = yield select(apiSelector)

      url = api[splitAction[1]][splitAction[0]]
      fallback = api[splitAction[1]].fallback
    } else {
      // throw Exception if action key is malformed.
      throw new Error(`The action '${action}' is malformed, the template of action is like this 'METHOD_RESOURCES' (ie: GET_USERS)`)
    }
  }

  // if action is an object
  if (typeof action === 'object') {
    // the property url is mandatory
    if (action.url) {
      url = action.url
    } else {
      throw new Error("The first argument of roadhog is an object, it should contain a non-empty 'url' property")
    }
  }

  // build url with path params.
  if (Array.isArray(pathParams)) url = addPathParams(url, pathParams)
  // build url with query params.
  if (typeof queryParams === 'object') url = addQueryParams(url, queryParams)

  return yield tracer(action, () => fetch(url), fallback)()
}
