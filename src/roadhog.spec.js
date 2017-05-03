/* eslint-disable import/no-extraneous-dependencies, react/jsx-filename-extension */
/* eslint-env jest */

import roadhog from './roadhog'

jest.mock('./tracer', () => (action, cb) => params => ({ action, cb, params }))

describe('roadhog', () => {
  const oldFetch = global.fetch

  let fetch
  beforeEach(() => {
    fetch = jest.fn(() => ({}))
    global.fetch = fetch
  })

  afterEach(() => {
    global.fetch = oldFetch
  })

  describe('common (with or without params)', () => {
    it('should call fetch with an object action', () => {
      const res = { a: 'json' }

      const gen = roadhog({ url: 'http://an-url.com' })()
      gen.next() // mocks
      gen.next(undefined) // fetch - with undefined mock
      const next = gen.next({ ok: true, json: () => res }) // to json

      expect(next.value).toBe(res)
      expect(fetch.mock.calls[0]).toEqual(['http://an-url.com', undefined])
    })

    it('should fallback to mock', () => {
      const fallback = { a: 'json (mocked)' }

      const gen = roadhog({ url: 'http://an-url.com' })()
      gen.next() // mocks
      gen.next([{ match: /.*/, fallback }]) // fetch - with mocks

      const next = gen.next({ ok: false }) // to json
      expect(next.value).toBe(fallback)
      expect(fetch.mock.calls[0]).toEqual(['http://an-url.com', undefined])
    })
  })

  xdescribe('with pathParams')
  xdescribe('with queryParams')

  describe('errors', () => {
    it('should handle fetch error', () => {
      const gen = roadhog({ url: 'http://an-url.com' })()
      gen.next() // mocks
      gen.next(undefined) // fetch - with undefined mock
      const next = gen.next({ ok: false }) // to json

      expect(next.value).toBe(undefined) // no fallback
    })

    it('should throw error when action is an object without url', () => {
      const gen = roadhog({ an: 'object' })()

      let exception = false
      try {
        gen.next() // throw
      } catch (ex) {
        exception = true

        expect(ex.message).toEqual('The first argument of roadhog is an object, it should contain a non-empty \'url\' property')
      } finally {
        expect(exception).toBe(true)
      }
    })
  })
})

/* eslint-enable import/no-extraneous-dependencies, react/jsx-filename-extension */
