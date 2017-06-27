/* eslint-env jest */
import addPathParams from './addPathParams'

describe('addPathParams', () => {
  it('should return url without modification', () => {
    expect(addPathParams('http://an-url')()).toMatchSnapshot()
  })

  it('should return url with path params (no trailing /)', () => {
    expect(addPathParams('http://an-url')(['some', 'param'])).toMatchSnapshot()
  })

  it('should return url with path params (trailing /)', () => {
    expect(addPathParams('http://an-url/')(['some', 'param'])).toMatchSnapshot()
  })
})
