/* eslint-env jest */
import tester from 'trampss-redux-saga-tester'
import mapToData from './mapToData'

describe('mapToData', () => {
  const fallback = { fallback: true }

  it('should return result -ok-', () => {
    const raw = { ok: true, json: () => ({ data: true }) }
    const test = tester(mapToData(fallback))(raw)(/* no mock */)
    expect(test).toMatchSnapshot()
  })

  it('should return undefined -code 204 no content-', () => {
    const raw = { ok: true, status: 204, json: () => ({ data: true }) }
    const test = tester(mapToData(fallback))(raw)(/* no mock */)
    expect(test).toMatchSnapshot()
  })

  it('should return fallback -ko-', () => {
    const raw = { ok: false, json: () => ({ data: true }) }
    const test = tester(mapToData(fallback))(raw)(/* no mock */)
    expect(test).toMatchSnapshot()
  })

  it('should return result -ko-', () => {
    const raw = { ok: false, json: () => ({ data: true }) }
    const test = tester(mapToData(/* no fallback */))(raw)(/* no mock */)
    expect(test).toMatchSnapshot()
  })
})
