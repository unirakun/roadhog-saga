/* eslint-env jest */
import tester from 'trampss-redux-saga-tester'
import mapToFetch from './mapToFetch'

jest.mock('../url-pattern', () => ({
  addPathParams: url => pathParams => `url:${url}//pathPrams:${JSON.stringify(pathParams)}`,
  addQueryParams: url => queryParams => `url:${url}//queryParams:${JSON.stringify(queryParams)}`,
}))

describe('mapToFetch', () => {
  const test = tester(mapToFetch('an_action'))
  const mocks = {
    select: [
      () => ({ some: 'options' }),
      () => 'http://an-url',
    ],
  }

  it('should set all params', () => {
    expect(
      test({
        body: { a: 'body', to: 'send' },
        path: ['an', 'great', 'array'],
        query: { an: 'object', that: 'rocks' },
      })(mocks),
    ).toMatchSnapshot()
  })

  it('should set minimum params', () => {
    expect(
      test()(mocks),
    ).toMatchSnapshot()
  })
})
