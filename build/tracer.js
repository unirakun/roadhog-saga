'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _effects = require('redux-saga/effects');

// Event caught by saga with template starting with 'API_'
var apiEvent = function apiEvent(name, suffix, payload) {
  return { type: 'API_' + name + '_' + suffix, payload: payload };
};

/**
 * Tracer :
 * @param {string} name - use to identify the saga event.
 * @param {function} callback - the fetch to trace.
 * @return {object} response of callback.
 */
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

exports.default = function (name, callback, sendError) {
  return regeneratorRuntime.mark(function _callee(args) {
    var raw;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            raw = void 0;
            _context.prev = 1;
            _context.next = 4;
            return (0, _effects.put)(apiEvent(name, 'STARTED'));

          case 4:
            _context.next = 6;
            return callback(args);

          case 6:
            raw = _context.sent;

            if (!(!raw.ok && sendError)) {
              _context.next = 9;
              break;
            }

            throw new Error('the fetch response has an error : ' + raw.status + ' - ' + raw.statusText);

          case 9:
            _context.next = 15;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context['catch'](1);
            _context.next = 15;
            return (0, _effects.put)(apiEvent(name, 'ERROR', _context.t0));

          case 15:
            _context.next = 17;
            return (0, _effects.put)(apiEvent(name, 'END'));

          case 17:
            return _context.abrupt('return', raw);

          case 18:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[1, 11]]);
  });
};