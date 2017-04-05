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

function* trace(raw, name, dataFallback) {
  const { status } = raw
  console.info(status)

  // We log an error into redux only if no fallback are found
  if (!dataFallback) yield put(apiEvent(name, 'ERROR', { code: raw.status, text: raw.statusText }))

  return dataFallback
}

/*
 name : use for identify saga event.
 callback: the function to trace.
 fallback: if callback fail, the fallback is use.
 */
export default (name, callback, fallback) => function* (args) {
  let json

  try {
    yield put(apiEvent(name, 'STARTED'))
    const raw = yield callback(args)
    json = raw.ok ? yield raw.json() : yield trace(raw, name, fallback)
  } catch (ex) {
    // We should not be here in any way
    // But we handle it just in case
    console.error(ex)
    yield put(apiEvent(name, 'ERROR', ex))
  }

  yield put(apiEvent(name, 'END'))
  return json
}
