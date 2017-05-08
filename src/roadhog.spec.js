/* eslint-disable import/no-extraneous-dependencies, react/jsx-filename-extension */
/* eslint-env jest */

import roadhog from './roadhog'

jest.mock('./tracer', () => (action, cb) => params => ({ action, cb: cb(), params }))

describe('roadhog', () => {
  const oldFetch = global.fetch

  let fetch
  beforeAll(() => {
    fetch = jest.fn(() => ({}))
    global.fetch = fetch
  })

  beforeEach(() => {
    fetch.mockClear()
    fetch.mockReset()
  })

  afterAll(() => {
    global.fetch = oldFetch
  })

  describe('string action [GET_RESOURCE]', () => {
    it('should throw error when string is without _', () => {
      const gen = roadhog('GETRESOURCE')()

      let exception = false
      try {
        gen.next() // Find API option into redux
      } catch (ex) {
        exception = true

        expect(ex.message).toEqual('Wrong format for action: \'GETRESOURCE\'. should be \'METHOD_RESOURCES\' (ie: GET_USERS)')
      } finally {
        expect(exception).toBe(true)
      }
    })

    it('should get URL from _string_ resource and fetch', () => {
      const gen = roadhog('GET_RESOURCE')()
      gen.next() // find API option into redux
      gen.next({ // mocks - with resource as a string
        RESOURCE: {
          GET: 'http://an-url.com',
        },
      })
      gen.next(undefined) // tracer - with undefined mock
      gen.next({}) // result
      expect(fetch.mock.calls[0]).toEqual(['http://an-url.com', {}])
    })

    it('should get URL from _object_ resource and fetch', () => {
      const gen = roadhog('GET_RESOURCE')()
      gen.next() // find API option into redux
      gen.next({ // mocks - with resource as a string
        options: { other: 'options' },
        RESOURCE: {
          GET: {
            url: 'http://an-url.com',
            options: { some: 'options' },
          },
        },
      })
      gen.next(undefined) // tracer - with undefined mock
      gen.next({}) // result
      expect(fetch.mock.calls[0]).toEqual(['http://an-url.com', { other: 'options', some: 'options' }])
    })
  })

  describe('object action', () => {
    it('should call fetch with an object action', () => {
      const res = { a: 'json' }

      const gen = roadhog({ url: 'http://an-url.com' })()
      gen.next() // mocks
      gen.next(undefined) // fetch - with undefined mock
      const next = gen.next({ ok: true, json: () => res }) // to json

      expect(next.value).toBe(res)
      expect(fetch.mock.calls[0]).toEqual(['http://an-url.com', undefined])
    })
  })

  describe('common', () => {
    it('should add pathParams', () => {
      const gen = roadhog({ url: 'http://an-url.com' })({
        pathParams: ['a path param', '1821', 19],
      })
      gen.next() // mocks
      gen.next(undefined) // fetch - without mocks
      gen.next({ ok: true, json: () => 'ok' }) // return - fetch ok

      expect(fetch.mock.calls[0]).toEqual(['http://an-url.com/a%20path%20param/1821/19', undefined])
    })

    it('should add queryParams', () => {
      const gen = roadhog({ url: 'http://an-url.com' })({
        queryParams: { a: 'query param', an: 128, next: '1281' },
      })
      gen.next() // mocks
      gen.next(undefined) // fetch - without mocks
      gen.next({ ok: true, json: () => 'ok' }) // return - fetch ok

      expect(fetch.mock.calls[0]).toEqual(['http://an-url.com/?a=query%20param&an=128&next=1281', undefined])
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
})

/* eslint-enable import/no-extraneous-dependencies, react/jsx-filename-extension */
