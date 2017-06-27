/* eslint-env jest */
import { encodeParams, isEmpty } from './utils'

describe('utils', () => {
  describe('encodeParams', () => {
    it('should encode params (one param)', () => {
      expect(encodeParams('a param')).toMatchSnapshot()
    })

    it('should encode params (array params)', () => {
      expect(encodeParams(['a param', 'an other :)'])).toMatchSnapshot()
    })
  })

  describe('isEmpty', () => {
    it('should be empty when undefined', () => {
      expect(isEmpty(undefined)).toMatchSnapshot()
    })

    describe('object', () => {
      it('should be empty', () => {
        expect(isEmpty({})).toMatchSnapshot()
      })

      it('should not be empty', () => {
        expect(isEmpty({ some: 'field' })).toMatchSnapshot()
      })
    })

    describe('array', () => {
      it('should be empty', () => {
        expect(isEmpty([])).toMatchSnapshot()
      })

      it('should not be empty', () => {
        expect(isEmpty(['some'])).toMatchSnapshot()
      })
    })
  })
})
