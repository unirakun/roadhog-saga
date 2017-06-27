/* eslint-env jest */
import isAction from './isAction'

describe('isAction', () => {
  it('should throw an error', () => {
    const test = (action) => {
      let error = false
      try {
        isAction(action)
      } catch (ex) {
        error = true
        expect(ex).toMatchSnapshot()
      }
      expect(error).toBe(true)
    }

    test('simple-string')
    test()
    test(null)
  })

  it('should not throw an error', () => {
    isAction('NICE_ACTION')
  })
})
