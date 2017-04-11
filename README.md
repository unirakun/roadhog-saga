# roadhog

## Description
Library that is connected to redux, use to fetch api, and to dispatch saga event

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
In this exemple, we retrieve posts when an action `ACTION` is catched, and then we print these posts.
```es6
import { call } from 'redux-saga/effects'
import roadhog from 'roadhog-saga'

export default function* () {
  yield takeLatest('ACTION', function* () {
    const posts = call(roadhog('GET_POSTS'))
    console.log(posts)
  }
}
```

### 3 - Error handling
`roadhog-saga` triggers some redux actions to help you handle API calls :
 - a `START` action : before a fetch is triggered
 - an `ERROR` action : when the fetch is on error
 - a `END` action : when the fetch is done (on error or not)

This actions are named after your resources, with the previous example these actions are :
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
