'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

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

var isEmpty = function isEmpty(o) {
  return !o || (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === 'object' && Object.keys(o).length === 0 || Array.isArray(o) && o.length === 0;
};

// Reducer config > api is mandatory.
var apiSelector = function apiSelector(_ref) {
  var api = _ref.config.api;
  return api;
};
// Reducer config > mocks
var mocksSelector = function mocksSelector(_ref2) {
  var mocks = _ref2.config.mocks;
  return mocks;
};

// Encode params
var encodeParam = function encodeParam(param) {
  return encodeURIComponent(param);
};
var encodeParams = function encodeParams(params) {
  return params.map(encodeParam);
};

// Add all params to path url.
var addPathParams = function addPathParams(url, pathParams) {
  if (isEmpty(pathParams)) return url;
  return url + '/' + encodeParams(pathParams).join('/');
};

// Add all params to the query on url.
var addQueryParams = function addQueryParams(url, queryParams) {
  if (isEmpty(queryParams)) return url;

  var params = Object.keys(queryParams).map(function (k) {
    return k + '=' + encodeParam(queryParams[k]);
  });

  var slash = url.endsWith('/') || url.endsWith('&') || url.endsWith('?') ? '' : '/';
  var questionMark = url.endsWith('&') || url.endsWith('?') ? '' : '?';

  return '' + url + slash + questionMark + params.join('&');
};

/**
 * Library that is connected to redux, use to fetch api, and to dispatch saga event
 * @param {string|object} action -
 *   the template of action is like this 'METHOD_RESOURCES' => GET_USERS
 * @param {object} params -
 *   object contains query and path params => {queryParams: {id: 1}, pathParams: [user, 132]}
 * @return {object} - api response or fallback define on redux.
 */

exports.default = function (action) {
  return regeneratorRuntime.mark(function _callee(params) {
    var pathParams, queryParams, url, options, trace, _action$split, _action$split2, method, name, api, resource, mocks, mock, fallback, f, raw;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            pathParams = params && params.pathParams || [];
            queryParams = params && params.queryParams || {};
            url = void 0;
            options = void 0;
            trace = true;

            // Check url redux

            if (!(typeof action === 'string')) {
              _context.next = 18;
              break;
            }

            if (!/.*_.*/.test(action)) {
              _context.next = 17;
              break;
            }

            // retrieve resource urls.
            _action$split = action.split(/_(.+)/), _action$split2 = _slicedToArray(_action$split, 2), method = _action$split2[0], name = _action$split2[1];
            _context.next = 10;
            return (0, _effects.select)(apiSelector);

          case 10:
            api = _context.sent;


            // options
            options = _extends({
              method: method
            }, api[name][method] && api[name][method].options || {}, api.options || {});

            resource = api[name][method];

            if (resource === undefined) url = api[name];
            if (typeof resource === 'string') url = resource;else if ((typeof resource === 'undefined' ? 'undefined' : _typeof(resource)) === 'object') url = resource.url;
            _context.next = 18;
            break;

          case 17:
            throw new Error('Wrong format for action: \'' + action + '\'. should be \'METHOD_RESOURCES\' (ie: GET_USERS)');

          case 18:
            if (!((typeof action === 'undefined' ? 'undefined' : _typeof(action)) === 'object')) {
              _context.next = 25;
              break;
            }

            // there is no tracing event when action is an object
            trace = false;

            // the property url is mandatory

            if (!action.url) {
              _context.next = 24;
              break;
            }

            url = action.url;
            _context.next = 25;
            break;

          case 24:
            throw new Error("The first argument of roadhog is an object, it should contain a non-empty 'url' property");

          case 25:

            // build url with path params.
            url = addPathParams(url, pathParams);
            // build url with query params.
            url = addQueryParams(url, queryParams);

            // Retrieve mock on redux
            _context.next = 29;
            return (0, _effects.select)(mocksSelector);

          case 29:
            mocks = _context.sent;

            // get fallback on redux mocks
            mock = (mocks || []).find(function (m) {
              return m.match.test(url);
            });
            fallback = mock && mock.fallback;

            // fetch cb

            f = function f() {
              return fetch(url, options);
            };

            // get the raw response, from tracer or from fetch


            raw = void 0;

            if (!trace) {
              _context.next = 40;
              break;
            }

            _context.next = 37;
            return (0, _tracer2.default)(action, f, !fallback)();

          case 37:
            raw = _context.sent;
            _context.next = 43;
            break;

          case 40:
            _context.next = 42;
            return f();

          case 42:
            raw = _context.sent;

          case 43:
            _context.next = 45;
            return raw.ok ? raw.json() : fallback;

          case 45:
            return _context.abrupt('return', _context.sent);

          case 46:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  });
};