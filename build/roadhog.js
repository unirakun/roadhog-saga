'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _tracer = require('./tracer');

var _tracer2 = _interopRequireDefault(_tracer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Reducer config > api is mandatory.
var apiSelector = function apiSelector(_ref) {
  var api = _ref.config.api;
  return api;
};

// Add all params to path url.
var addPathParams = function addPathParams(url, pathParams) {
  if (Array.isArray(pathParams) && pathParams.length > 0) return url + '/' + pathParams.join('/');
  return url;
};
// Add all params to the query on url.
var addQueryParams = function addQueryParams(url, queryParams) {
  if ((typeof queryParams === 'undefined' ? 'undefined' : _typeof(queryParams)) === 'object' && Object.keys(queryParams).length > 0) {
    var params = Object.keys(queryParams).map(function (k) {
      return k + '=' + queryParams[k];
    });
    return url + '?' + params.join('&');
  }
  return url;
};

exports.default = function (action) {
  return regeneratorRuntime.mark(function _callee(params) {
    var pathParams, queryParams, url, fallback, splitAction, api, resource, raw;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            pathParams = params && params.pathParams || [];
            queryParams = params && params.queryParams || {};
            url = void 0;
            fallback = void 0;

            // Check url redux

            if (!(typeof action === 'string')) {
              _context.next = 16;
              break;
            }

            if (!/.*_.*/.test(action)) {
              _context.next = 15;
              break;
            }

            // retrieve resource urls.
            splitAction = action.split(/_(.+)/);
            _context.next = 9;
            return (0, _effects.select)(apiSelector);

          case 9:
            api = _context.sent;
            resource = api[splitAction[1]][splitAction[0]];

            if (typeof resource === 'string') url = resource;
            if ((typeof resource === 'undefined' ? 'undefined' : _typeof(resource)) === 'object') {
              url = resource.url;
              fallback = resource.fallback;
            }
            _context.next = 16;
            break;

          case 15:
            throw new Error('The action \'' + action + '\' is malformed, the template of action is like this \'METHOD_RESOURCES\' (ie: GET_USERS)');

          case 16:
            if (!((typeof action === 'undefined' ? 'undefined' : _typeof(action)) === 'object')) {
              _context.next = 22;
              break;
            }

            if (!action.url) {
              _context.next = 21;
              break;
            }

            url = action.url;
            _context.next = 22;
            break;

          case 21:
            throw new Error("The first argument of roadhog is an object, it should contain a non-empty 'url' property");

          case 22:

            // build url with path params.
            url = addPathParams(url, pathParams);
            // build url with query params.
            url = addQueryParams(url, queryParams);

            // Call tracer : fetch resource and dispatch event error - if necessary -
            _context.next = 26;
            return (0, _tracer2.default)(action, function () {
              return fetch(url);
            }, !fallback)();

          case 26:
            raw = _context.sent;
            _context.next = 29;
            return raw.ok ? raw.json() : fallback;

          case 29:
            return _context.abrupt('return', _context.sent);

          case 30:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  });
};