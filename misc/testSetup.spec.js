/* eslint-env jest */

describe('testSetup', () => {
  it('should throw an error when console prints error', () => {
    let error = false

    try {
      console.error('an error') // eslint-disable-line
    } catch (ex) {
      error = true
      expect(ex.message).toEqual('an error')
    }

    expect(error).toBe(true)
  })
})
