/* eslint-env jest */
import tester from 'trampss-redux-saga-tester'

jest.mock('./tracer')
jest.mock('./checkers', () => ({
  isAction: () => true,
}))
jest.mock('./mappers', () => ({
  mapToFetch: () => () => ['http://an-url', { some: 'options' }],
}))

const tracer = require('./tracer').default
const roadhog = require('./roadhog').default

describe('roadhog', () => {
  const test = tester(roadhog('GET_TODOS'))(/* no inputs */)

  it('should return API returns (ok case)', () => {
    tracer.mockImplementation(() => () => () => ({ ok: true, json: () => ({ some: 'value' }) }))

    expect(
      test({
        select: [() => 'fallback'],
      }),
    ).toMatchSnapshot()
  })

  it('should return fallback (ko case)', () => {
    tracer.mockImplementation(() => () => () => ({ ok: false }))

    expect(
      test({
        select: [() => 'fallback'],
      }),
    ).toMatchSnapshot()
  })
})
