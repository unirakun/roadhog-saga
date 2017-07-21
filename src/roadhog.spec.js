/* eslint-env jest */
import tester from 'trampss-redux-saga-tester'

jest.mock('./checkers', () => ({
  isAction: () => true,
}))
jest.mock('./mappers', () => ({
  mapToFetch: () => () => ['http://an-url', { some: 'options' }],
  mapToData: fallback => raw => (raw.ok && raw.json()) || fallback,
}))

const roadhog = require('./roadhog').default

describe('roadhog', () => {
  const test = tester(roadhog('GET_TODOS'))(/* no inputs */)

  it('should return API returns (ok case)', () => {
    window.fetch = jest.fn(() => ({ ok: true, json: () => ({ some: 'value' }) }))

    expect(
      test({
        select: [() => 'fallback'],
      }),
    ).toMatchSnapshot()
  })

  it('should return fallback (ko case)', () => {
    window.fetch = jest.fn(() => ({ ok: false, json: () => ({ some: 'value' }) }))

    expect(
      test({
        select: [() => 'fallback'],
      }),
    ).toMatchSnapshot()
  })
})
