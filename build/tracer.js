'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _effects = require('redux-saga/effects');

var _marked = [trace].map(regeneratorRuntime.mark); /*
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


// Event catch by saga with template start by 'API_'
var apiEvent = function apiEvent(name, suffix, payload) {
  return { type: 'API_' + name + '_' + suffix, payload: payload };
};

function trace(raw, name, dataFallback) {
  var status;
  return regeneratorRuntime.wrap(function trace$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          status = raw.status;

          console.info(status);

          // We log an error into redux only if no fallback are found

          if (dataFallback) {
            _context.next = 5;
            break;
          }

          _context.next = 5;
          return (0, _effects.put)(apiEvent(name, 'ERROR', { code: raw.status, text: raw.statusText }));

        case 5:
          return _context.abrupt('return', dataFallback);

        case 6:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

/*
 name : use for identify saga event.
 callback: the function to trace.
 fallback: if callback fail, the fallback is use.
 */

exports.default = function (name, callback, fallback) {
  return regeneratorRuntime.mark(function _callee(args) {
    var json, raw;
    return regeneratorRuntime.wrap(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            json = void 0;
            _context2.prev = 1;
            _context2.next = 4;
            return (0, _effects.put)(apiEvent(name, 'STARTED'));

          case 4:
            _context2.next = 6;
            return callback(args);

          case 6:
            raw = _context2.sent;

            if (!raw.ok) {
              _context2.next = 13;
              break;
            }

            _context2.next = 10;
            return raw.json();

          case 10:
            _context2.t0 = _context2.sent;
            _context2.next = 16;
            break;

          case 13:
            _context2.next = 15;
            return trace(raw, name, fallback);

          case 15:
            _context2.t0 = _context2.sent;

          case 16:
            json = _context2.t0;
            _context2.next = 24;
            break;

          case 19:
            _context2.prev = 19;
            _context2.t1 = _context2['catch'](1);

            // We should not be here in any way
            // But we handle it just in case
            console.error(_context2.t1);
            _context2.next = 24;
            return (0, _effects.put)(apiEvent(name, 'ERROR', _context2.t1));

          case 24:
            _context2.next = 26;
            return (0, _effects.put)(apiEvent(name, 'END'));

          case 26:
            return _context2.abrupt('return', json);

          case 27:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee, this, [[1, 19]]);
  });
};