# roadhog-saga
Easy API fetching with configuration stored into Redux.

> Fetch your API easily with Redux and `redux-saga` !

[![CircleCI](https://circleci.com/gh/Trampss/roadhog-saga.svg?&style=shield&circle-token=)](https://circleci.com/gh/Trampss/roadhog-saga/tree/master) [![NPM Version](https://badge.fury.io/js/roadhog-saga.svg)](https://www.npmjs.com/package/roadhog-saga) [![Coverage Status](https://coveralls.io/repos/github/Trampss/roadhog-saga/badge.svg?branch=master)](https://coveralls.io/github/Trampss/roadhog-saga?branch=master) [![Size](http://img.badgesize.io/Trampss/roadhog-saga/master/index.js.svg)]()


## Installation
```
npm install --save roadhog-saga
```
or
```
yarn add roadhog-saga
```

## Usage
In one of your saga, you want to retrieve all `POSTS` from your API.

You should :
 1. Configure your redux to set the route
 2. Write your saga

### 1 - Redux configuration
Add a new reducer with a default state to `state.config` :

**config.js**
```es6
export default () => ({
  api: {
    POSTS: {
      GET: '/api/posts',
    },
  },
})
/* eslint-enable global-require */
```

**store.js**
```es6
import config from './config'

const store = createStore(
  combineReducers({
    config,
    // your others reducers
  }),
  compose(
    applyMiddleware(sagaMiddleware, middleware),
  ),
)
```

### 2 - Saga
In this example, we retrieve posts when an action `ACTION` is catched, and then we print these posts.
```es6
import { call } from 'redux-saga/effects'
import roadhog from 'roadhog-saga'

export default function* () {
  yield takeLatest('ACTION', function* () {
    const posts = yield call(roadhog('GET_POSTS'))
    console.log(posts)
  }
}
```

### 3 - Error handling
`roadhog-saga` triggers some redux actions to help you handle API calls :
 - a `START` action : before a fetch is triggered
 - an `ERROR` action : when the fetch is on error
 - an `END` action : when the fetch is finished (on error or not)

The name of the action is generated from your resources.
Based on the previous example these actions are :
 - `API_GET_POSTS_START`
 - `API_GET_POSTS_ERROR`
 - `API_GET_POSTS_END`

You can then catch these actions in one of your saga :
```es6
yield takeEvery(action => /API_.*?_STARTED/.test(action.type), /* start a loading indicator */)

yield takeEvery(
  [
    action => /API_.*?_END/.test(action.type),
    action => /API_.*?_ERROR/.test(action.type),
  ],
  /* stop a loading indicator */
)

yield takeEvery(action => /API_.*?_ERROR/, /* log an error */)
```
