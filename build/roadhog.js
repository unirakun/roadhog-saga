'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

// Add all params to path url.
var addPathParams = function addPathParams(url, pathParams) {
  return !isEmpty(pathParams) ? url + '/' + pathParams.join('/') : url;
};
// Add all params to the query on url.
var addQueryParams = function addQueryParams(url, queryParams) {
  if (!isEmpty(queryParams)) {
    var params = Object.keys(queryParams).map(function (k) {
      return k + '=' + queryParams[k];
    });
    return url + '?' + params.join('&');
  }
  return url;
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
    var pathParams, queryParams, url, options, _action$split, _action$split2, method, name, api, resource, mocks, mock, fallback, raw;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            pathParams = params && params.pathParams || [];
            queryParams = params && params.queryParams || {};
            url = void 0;
            options = void 0;

            // Check url redux

            if (!(typeof action === 'string')) {
              _context.next = 17;
              break;
            }

            if (!/.*_.*/.test(action)) {
              _context.next = 16;
              break;
            }

            // retrieve resource urls.
            _action$split = action.split(/_(.+)/), _action$split2 = _slicedToArray(_action$split, 2), method = _action$split2[0], name = _action$split2[1];
            _context.next = 9;
            return (0, _effects.select)(apiSelector);

          case 9:
            api = _context.sent;


            // find global options and extends with options of method.
            options = api[name][method].options || api.options;

            resource = api[name][method];

            if (typeof resource === 'string') url = resource;
            if ((typeof resource === 'undefined' ? 'undefined' : _typeof(resource)) === 'object') url = resource.url;
            _context.next = 17;
            break;

          case 16:
            throw new Error('Wrong format for action: \'' + action + '\'. should be \'METHOD_RESOURCES\' (ie: GET_USERS)');

          case 17:
            if (!((typeof action === 'undefined' ? 'undefined' : _typeof(action)) === 'object')) {
              _context.next = 23;
              break;
            }

            if (!action.url) {
              _context.next = 22;
              break;
            }

            url = action.url;
            _context.next = 23;
            break;

          case 22:
            throw new Error("The first argument of roadhog is an object, it should contain a non-empty 'url' property");

          case 23:

            // build url with path params.
            url = addPathParams(url, pathParams);
            // build url with query params.
            url = addQueryParams(url, queryParams);

            // Retrieve mock on redux
            _context.next = 27;
            return (0, _effects.select)(mocksSelector);

          case 27:
            mocks = _context.sent;

            // get fallback on redux mocks
            mock = (mocks || []).find(function (m) {
              return m.match.test(url);
            });
            fallback = mock && mock.fallback;

            // Call tracer : fetch resource and dispatch event error - if necessary -

            _context.next = 32;
            return (0, _tracer2.default)(action, function () {
              return fetch(url, options);
            }, !fallback)();

          case 32:
            raw = _context.sent;
            _context.next = 35;
            return raw.ok ? raw.json() : fallback;

          case 35:
            return _context.abrupt('return', _context.sent);

          case 36:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  });
};