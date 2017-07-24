(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('redux-saga/effects')) :
	typeof define === 'function' && define.amd ? define(['redux-saga/effects'], factory) :
	(global['roadhog-saga'] = factory(global.reduxSaga_effects));
}(this, (function (reduxSaga_effects) { 'use strict';

var isAction = (function (action) {
  if (!/.*_.*/.test(action)) {
    throw new Error("Wrong format for action: '" + action + "'. should be '<METHOD_NAME>_<RESOURCE_NAME>' (ie: GET_USERS)");
  }
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





















var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};





















var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();













var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var getConfig = function getConfig(_ref) {
  var config = _ref.config;
  return config;
};
var getAPI = function getAPI(state) {
  return getConfig(state).api;
};
var getMocks = function getMocks(state) {
  return getConfig(state).mocks;
};
var getResource = function getResource(name) {
  return function (state) {
    return getAPI(state)[name];
  };
};

var getMethod = function getMethod(name) {
  return function (methodName) {
    return function (state) {
      return getResource(name)(state)[methodName];
    };
  };
};

var getOptions = function getOptions(name) {
  return function (methodName) {
    return function (state) {
      // raw data
      var api = getAPI(state);
      var resource = getResource(name)(state);
      var method = getMethod(name)(methodName)(state);

      // order is general -> specific
      var options = { method: methodName };
      if (api.options) options = _extends({}, options, api.options);
      if (resource.options) options = _extends({}, options, resource.options);
      if (method && method.options) options = _extends({}, options, method.options);

      return options;
    };
  };
};

var getURL = function getURL(name) {
  return function (methodName) {
    return function (state) {
      // raw data
      var resource = getResource(name)(state);
      var method = getMethod(name)(methodName)(state);

      if (method === undefined) return resource; // example: { TODOS: '/api/todos' }
      if (typeof method === 'string') return method; // example : { TODOS: { GET: '/api/todos' } }
      return method.url; // example: { TODOS: { GET: { url: '/api/todos' } } }
    };
  };
};

var getFallback = function getFallback(url) {
  return function (methodName) {
    return function (state) {
      var mocks = getMocks(state);
      if (!mocks) return undefined;

      // mock by priority
      var orderedMocks = [].concat(toConsumableArray(mocks.filter(function (m) {
        return m.method === methodName;
      })), toConsumableArray(mocks.filter(function (m) {
        return m.method === undefined;
      })), toConsumableArray(mocks.filter(function (m) {
        return m.method !== methodName && m.method !== undefined;
      })));

      // looking for right mock
      var mock = orderedMocks.find(function (m) {
        return m.match.test(url);
      });

      // returns fallback
      return (mock || {}).fallback;
    };
  };
};

var encodeParams = function encodeParams(params) {
  if (!Array.isArray(params)) return encodeURIComponent(params);
  return params.map(function (param) {
    return encodeURIComponent(param);
  });
};

var isEmpty = function isEmpty(o) {
  return !o || (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === 'object' && Object.keys(o).length === 0 || Array.isArray(o) && o.length === 0;
};

var addPathParams = (function (url) {
  return function (pathParams) {
    if (isEmpty(pathParams)) return url;
    return '' + url + (url.endsWith('/') ? '' : '/') + encodeParams(pathParams).join('/');
  };
});

var addQueryParams = (function (url) {
  return function (queryParams) {
    if (isEmpty(queryParams)) return url;

    var params = Object.keys(queryParams).map(function (k) {
      return k + '=' + encodeParams(queryParams[k]);
    });

    var slash = url.endsWith('/') || url.endsWith('&') || url.endsWith('?') ? '' : '/';
    var questionMark = url.endsWith('&') || url.endsWith('?') ? '' : '?';

    return '' + url + slash + questionMark + params.join('&');
  };
});

// FIXME : this code could be replaced with this lib if the bundle is not too big:
// path : https://github.com/snd/url-pattern
// query : https://github.com/ljharb/qs

var mapToFetch = (function (action) {
  return regeneratorRuntime.mark(function _callee() {
    var inputs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _action$split, _action$split2, methodName, name, options, body, url;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // action pattern is `<METHOD_NAME>_<RESOURCE_NAME>`
            _action$split = action.split(/_(.+)/), _action$split2 = slicedToArray(_action$split, 2), methodName = _action$split2[0], name = _action$split2[1];

            // create a fetch options object

            _context.next = 3;
            return reduxSaga_effects.select(getOptions(name)(methodName));

          case 3:
            options = _context.sent;


            // body
            // - body is an object : use JSON.stringify
            // - body is a string : let it that way
            body = inputs.body;

            if (typeof body === 'string') options = _extends({}, options, { body: body });else options = _extends({}, options, { body: JSON.stringify(body) });

            // create a fetch url
            _context.next = 8;
            return reduxSaga_effects.select(getURL(name)(methodName));

          case 8:
            url = _context.sent;

            url = addPathParams(url)(inputs.path);
            url = addQueryParams(url)(inputs.query);

            return _context.abrupt('return', [url, options]);

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  });
});

var mapToData = (function (fallback) {
  return regeneratorRuntime.mark(function _callee(raw) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(!raw.ok && fallback)) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", fallback);

          case 2:
            if (!(raw.status !== 204)) {
              _context.next = 6;
              break;
            }

            _context.next = 5;
            return raw.json();

          case 5:
            return _context.abrupt("return", _context.sent);

          case 6:
            return _context.abrupt("return", undefined);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  });
});

var apiEvent = function apiEvent(name, suffix, payload) {
  return { type: 'API_' + name + '_' + suffix, payload: payload };
};

/**
 * Library that is connected to redux, use to fetch api, and to dispatch saga event
 * @param {string} action -
 *   the template of action is like this '<METHOD_NAME>_<RESOURCE_NAME>' => GET_USERS
 * @param {object} inputs -
 *   object contains body, query and path params => {body, query: {id: 1}, path: [user, 132]}
 * @return {object} - api response or fallback define on redux.
 */
var roadhog = (function (action) {
  return regeneratorRuntime.mark(function _callee(inputs) {
    var _ref, _ref2, url, options, fallback, raw, data;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // check action pattern and eventually throw errors
            isAction(action);

            // get fetch options to make a fetch callback
            _context.next = 3;
            return mapToFetch(action)(inputs);

          case 3:
            _ref = _context.sent;
            _ref2 = slicedToArray(_ref, 2);
            url = _ref2[0];
            options = _ref2[1];
            _context.next = 9;
            return reduxSaga_effects.select(getFallback(url)(options.method));

          case 9:
            fallback = _context.sent;
            _context.next = 12;
            return reduxSaga_effects.put(apiEvent(action, 'STARTED'));

          case 12:
            _context.next = 14;
            return fetch(url, options);

          case 14:
            raw = _context.sent;
            _context.next = 17;
            return mapToData(fallback)(raw);

          case 17:
            data = _context.sent;

            if (!(!raw.ok && !fallback)) {
              _context.next = 21;
              break;
            }

            _context.next = 21;
            return reduxSaga_effects.put(apiEvent(action, 'ERROR', { raw: raw, data: data, status: raw.status, statusText: raw.statusText }));

          case 21:
            _context.next = 23;
            return reduxSaga_effects.put(apiEvent(action, 'END', { raw: raw, data: data }));

          case 23:
            return _context.abrupt('return', data);

          case 24:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  });
});

return roadhog;

})));
//# sourceMappingURL=index.js.map
