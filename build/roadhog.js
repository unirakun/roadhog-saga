'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apiSelector = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /*
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


var _effects = require('redux-saga/effects');

var _lodash = require('lodash');

var _tracer = require('./tracer');

var _tracer2 = _interopRequireDefault(_tracer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Reducer config > api is mandatory.
var apiSelector = exports.apiSelector = function apiSelector(_ref) {
  var api = _ref.config.api;
  return api;
};

// Add all params to path url.
var addPathParams = function addPathParams(url, pathParams) {
  return url + '/' + (0, _lodash.join)(pathParams, '/');
};
// Add all params to the query on url.
var addQueryParams = function addQueryParams(url, queryParams) {
  var params = Object.keys(queryParams).map(function (k) {
    return k + '=' + queryParams[k];
  });
  return url + '?' + (0, _lodash.join)(params, '&');
};

exports.default = function (action) {
  return regeneratorRuntime.mark(function _callee(params) {
    var pathParams, queryParams, url, fallback, splitAction, api;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            pathParams = params && params.pathParams || [];
            queryParams = params && params.queryParams || {};
            url = null;
            fallback = undefined;

            // Check url redux

            if (!(typeof action === 'string')) {
              _context.next = 15;
              break;
            }

            if (!/.*_.*/.test(action)) {
              _context.next = 14;
              break;
            }

            // retrieve resource urls.
            splitAction = action.split(/_(.+)/);
            _context.next = 9;
            return (0, _effects.select)(apiSelector);

          case 9:
            api = _context.sent;


            url = api[splitAction[1]][splitAction[0]];
            fallback = api[splitAction[1]].fallback;
            _context.next = 15;
            break;

          case 14:
            throw new Error('The action \'' + action + '\' is malformed, the template of action is like this \'METHOD_RESOURCES\' (ie: GET_USERS)');

          case 15:
            if (!((typeof action === 'undefined' ? 'undefined' : _typeof(action)) === 'object')) {
              _context.next = 21;
              break;
            }

            if (!action.url) {
              _context.next = 20;
              break;
            }

            url = action.url;
            _context.next = 21;
            break;

          case 20:
            throw new Error("The first argument of roadhog is an object, it should contain a non-empty 'url' property");

          case 21:

            // build url with path params.
            if (Array.isArray(pathParams)) url = addPathParams(url, pathParams);
            // build url with query params.
            if ((typeof queryParams === 'undefined' ? 'undefined' : _typeof(queryParams)) === 'object') url = addQueryParams(url, queryParams);

            _context.next = 25;
            return (0, _tracer2.default)(action, function () {
              return fetch(url);
            }, fallback)();

          case 25:
            return _context.abrupt('return', _context.sent);

          case 26:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  });
};