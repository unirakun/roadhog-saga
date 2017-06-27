/* eslint-env jest */
import addQueryParams from './addQueryParams'

describe('addQueryParams', () => {
  it('should return url without modification', () => {
    expect(addQueryParams('http://an-url')()).toMatchSnapshot()
  })

  it('should return url with params (trailing /)', () => {
    expect(addQueryParams('http://an-url/')({ some: 'queries', to: 'add' })).toMatchSnapshot()
  })

  it('should return url with params (trailing &)', () => {
    expect(addQueryParams('http://an-url/?bla=yo&')({ some: 'queries', to: 'add' })).toMatchSnapshot()
  })

  it('should return url with params (trailing ?)', () => {
    expect(addQueryParams('http://an-url/?')({ some: 'queries', to: 'add' })).toMatchSnapshot()
  })

  it('should return url with params (no trailing)', () => {
    expect(addQueryParams('http://an-url')({ some: 'queries', to: 'add' })).toMatchSnapshot()
  })
})
