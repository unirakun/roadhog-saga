/* eslint-disable import/no-extraneous-dependencies, react/jsx-filename-extension */
/* eslint-env jest */

import tracer from './tracer'

const cbOK = () => ({ ok: true })
const cbKO = () => ({ ok: false, status: '400', statusText: 'an error' })

describe('tracer', () => {
  it('should put a started event', () => {
    const gen = tracer('a name')()
    const next = gen.next()

    expect(next.value.PUT.action).toEqual({ type: 'API_a name_STARTED' })
  })

  it('should put a ended event when OK', () => {
    const gen = tracer('a name', cbOK)()
    gen.next() // started
    const next = gen.next(gen.next().value /* cb */)

    expect(next.value.PUT.action).toEqual({ type: 'API_a name_END' })
  })

  it('should not put an error event when sendError is false', () => {
    const gen = tracer('a name', cbKO, false)()
    gen.next() // started
    const next = gen.next(gen.next().value /* cb */)

    expect(next.value.PUT.action).toEqual({ type: 'API_a name_END' })
  })

  it('should put an ended event when KO', () => {
    const gen = tracer('a name', cbKO, true)()
    gen.next() // started
    gen.next(gen.next().value /* cb */) // error
    const next = gen.next() // end

    expect(next.value.PUT.action).toEqual({ type: 'API_a name_END' })
  })

  it('should put an error event', () => {
    const gen = tracer('a name', cbKO, true)()
    gen.next() // started
    const next = gen.next(gen.next().value /* cb */)

    expect(next.value.PUT.action).toEqual({ type: 'API_a name_ERROR', payload: new Error('the fetch response has an error : 400 - an error') })
  })

  it('should pass args to callback', () => {
    const args = { arg1: 'arg 1', arg2: 'arg 2' }
    const cb = jest.fn()
    const gen = tracer('a name', cb)(args)
    gen.next() // started
    gen.next() // cb

    expect(cb.mock.calls.length).toBe(1)
    expect(cb.mock.calls[0]).toEqual([args])
  })

  it('should return raw callback return', () => {
    const gen = tracer('a name', cbOK)()
    gen.next() // started
    gen.next(gen.next().value /* cb */) // ended
    const next = gen.next() // return

    expect(next.value).toEqual({ ok: true })
  })
})

/* eslint-enable import/no-extraneous-dependencies, react/jsx-filename-extension */
