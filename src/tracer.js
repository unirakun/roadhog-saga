/*
           ``
            ```
              `-`
               `/+.
                 .so.
                  `yds:`
                   .mNmds:.
                    yNNNNmdho:.
                    +NNNNNNNNmdho:.`
                    :mNNNNNNNNNNNNmhs/-`
`.                   +mNNNNNNNNNNNNNNNmhs:`
 `:.                 `+dNNNNNNNNNNNNNNNNNNds:.
   -+:.               ./sdmNNNNNNNNNNNNNNNNNmds/.
    `ohy+.`            `/yyhmmNNNNNNNNNNNNNNNNNNds-`
      -hmmhso+/..`       -hddddmNNNNNNNNNNNNNNNNNNmy:`
       `+mNNNNNNmdys+:..```/hmNNNNNNNNNNNNNNNNNNNNNNNh+. -`
         -hmNNNNNNNNNNNmdhso/sdNNNNNNNNNNNNNNNNNNNNNNNNms+y`
          `+mNNNNNNNNNNNNNNNNNmmNNNNNNNNNNNNNNNNNNNNNNNNNmmy`
            .smNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNo
              :hmNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNm:
 ..`            /hmmNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNd`
  -odhys+:-`      `/oydmNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNs
    `+mNNNNNNmdhhhdmNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNm`
      .yNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNs.
        .odNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNh
           .+hmmmNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNm-
             `:oydmNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNm/
                 ``:+sdNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNs
                      `+NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNmmhsNNNd`
                        dNNNNNNNNNNNNNNNNNNNNNNNNmdyo/-.`:NNm:
                      .smNNNNNNNNNNNNNmmddhyyyo+/.``    `+NNh
                    `+dNNNNNNNmddy+:-...````        `..` +Nm:
                   .ymNNNNNmhoo++/:. `            .://// omh
                  -hNNNmddNd.`+/////:.`  ````  `./////// smo
                 :ddhs/-./do` /////////:-....-:////////: hs:
                `/-.`    .o ` -+////////+/////////////+. d-`
                         ``   `/////////-.``.-///////+: `d
                               `:///:-.        .-:///-` `+
                                  ``              ``
*/
import { put } from 'redux-saga/effects'

// Event catch by saga with template start by 'API_'
const apiEvent = (name, suffix, payload) => ({ type: `API_${name}_${suffix}`, payload })

/*
 Tracer :
 @param {string} name - use for identify saga event.
 @param {function} callback - the fetch to trace.
 */
export default (name, callback, sendError) => function* (args) {
  let raw
  try {
    // Start Event
    yield put(apiEvent(name, 'STARTED'))
    raw = yield callback(args)
    // Push saga event.
    if (!raw.ok && sendError) {
      throw new Error(`the fetch response is on error : ${raw.status} - ${raw.statusText}`)
    }
  } catch (ex) {
    // We should not be here in any way
    // But we handle it just in case
    yield put(apiEvent(name, 'ERROR', ex))
  }
  // Finish Event
  yield put(apiEvent(name, 'END'))
  return raw
}
