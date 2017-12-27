/* eslint-env jest */
import tester from 'trampss-redux-saga-tester'
import mapToData from './mapToData'

describe('mapToData', () => {
  const fallback = { fallback: true }
  const error = 'PARSING ERROR'
  const onError = () => { throw new Error(error) }

  describe('with json content-type', () => {
    const jsonRaw = { headers: new Map([['content-type', 'application/json']]), json: () => ({ data: 'JSON' }), text: () => 'TEXT' }

    it('should return undefined -code 204 no content-', () => {
      const raw = { ...jsonRaw, ok: true, status: 204 }
      const test = tester(mapToData(fallback))(raw)(/* no mock */)
      expect(test).toMatchSnapshot()
    })

    it('should return result -ok-', () => {
      const raw = { ...jsonRaw, ok: true }
      const test = tester(mapToData(fallback))(raw)(/* no mock */)
      expect(test).toMatchSnapshot()
    })

    it('should return fallback -ko-', () => {
      const raw = { ...jsonRaw, ok: false }
      const test = tester(mapToData(fallback))(raw)(/* no mock */)
      expect(test).toMatchSnapshot()
    })

    it('should return result -ko-', () => {
      const raw = { ...jsonRaw, ok: false }
      const test = tester(mapToData(/* no fallback */))(raw)(/* no mock */)
      expect(test).toMatchSnapshot()
    })

    it('should return text with json parse on error', () => {
      const raw = { ...jsonRaw, ok: true, json: onError }
      const test = tester(mapToData(fallback))(raw)(/* no mock */)
      expect(test).toMatchSnapshot()
    })

    it('should throw error when json parse and text parse on error', () => {
      const raw = { ...jsonRaw, ok: true, json: onError, text: onError }
      const test = () => tester(mapToData(fallback))(raw)(/* no mock */)
      expect(test).toThrowErrorMatchingSnapshot()
    })
  })

  describe('with plain/text content-type', () => {
    const textRaw = { headers: new Map([['content-type', 'text/plain']]), json: onError, text: () => 'TEXT' }

    it('should return result -ok-', () => {
      const raw = { ...textRaw, ok: true }
      const test = tester(mapToData(fallback))(raw)(/* no mock */)
      expect(test).toMatchSnapshot()
    })

    it('should return fallback -ko-', () => {
      const raw = { ...textRaw, ok: false }
      const test = tester(mapToData(fallback))(raw)(/* no mock */)
      expect(test).toMatchSnapshot()
    })

    it('should return result -ko-', () => {
      const raw = { ...textRaw, ok: false }
      const test = tester(mapToData(/* no fallback */))(raw)(/* no mock */)
      expect(test).toMatchSnapshot()
    })

    it('should throw error when text parse on error', () => {
      const raw = { ...textRaw, ok: true, text: onError }
      const test = () => tester(mapToData(fallback))(raw)(/* no mock */)
      expect(test).toThrowErrorMatchingSnapshot()
    })
  })

  describe('with no content-type', () => {
    it('should return text when content-type is undefined', () => {
      const raw = { ok: true, headers: new Map(), text: () => 'TEXT' }
      const test = tester(mapToData(fallback))(raw)(/* no mock */)
      expect(test).toMatchSnapshot()
    })
  })
})
