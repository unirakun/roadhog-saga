/* eslint-env jest */
import {
  getConfig,
  getAPI,
  getMocks,
  getResource,
  getMethod,
  getOptions,
  getURL,
  getFallback,
} from './index'


describe('selectors', () => {
  describe('getConfig', () => {
    it('should get config', () => {
      const state = {
        config: {
          some: 'config',
        },
      }

      expect(getConfig(state)).toMatchSnapshot()
    })
  })

  describe('getAPI', () => {
    it('should get api config', () => {
      const state = {
        config: {
          api: {
            some: 'api config',
          },
        },
      }

      expect(getAPI(state)).toMatchSnapshot()
    })
  })

  describe('getMocks', () => {
    it('should get mocks', () => {
      const state = {
        config: {
          mocks: {
            some: 'mock config',
          },
        },
      }

      expect(getMocks(state)).toMatchSnapshot()
    })
  })

  describe('getResource', () => {
    it('should get resource', () => {
      const state = {
        config: {
          api: {
            name1: {
              some: 'resource info',
            },
          },
        },
      }

      expect(getResource('name1')(state)).toMatchSnapshot()
    })
  })

  describe('getMethod', () => {
    it('should get method', () => {
      const state = {
        config: {
          api: {
            name1: {
              GET: {
                some: 'method info',
              },
            },
          },
        },
      }

      expect(getMethod('name1')('GET')(state)).toMatchSnapshot()
    })
  })

  describe('getOptions', () => {
    it('should get options -mini-', () => {
      const state = {
        config: {
          api: {
            name1: {
              GET: {
                some: 'method info',
              },
            },
          },
        },
      }

      expect(getOptions('name1')('GET')(state)).toMatchSnapshot()
    })

    it('should get options -maxi-', () => {
      const state = {
        config: {
          api: {
            options: { apiKey: 'api options' },
            name1: {
              options: { resourceKey: 'resources options' },
              GET: {
                options: { methodKey: 'method options' },
                some: 'method info',
              },
            },
          },
        },
      }

      expect(getOptions('name1')('GET')(state)).toMatchSnapshot()
    })
  })

  describe('getURL', () => {
    it('should get URL from resource', () => {
      const state = {
        config: {
          api: {
            name1: 'http://an-url.com',
          },
        },
      }

      expect(getURL('name1')('GET')(state)).toMatchSnapshot()
    })

    it('should get URL from method -string-', () => {
      const state = {
        config: {
          api: {
            name1: {
              GET: 'http://an-url.com',
            },
          },
        },
      }

      expect(getURL('name1')('GET')(state)).toMatchSnapshot()
    })

    it('should get URL from method -object-', () => {
      const state = {
        config: {
          api: {
            name1: {
              GET: {
                url: 'http://an-url.com',
              },
            },
          },
        },
      }

      expect(getURL('name1')('GET')(state)).toMatchSnapshot()
    })
  })

  describe('getFallback', () => {
    it('should return undefined when no mock', () => {
      const state = {
        config: {},
      }

      expect(getFallback('http://an-url/2')('GET')(state)).toMatchSnapshot()
    })

    const mocks = [
      { match: /.*an-url\/3/, fallback: 'fallback 1' },
      { match: /.*an-url\/4/, method: 'POST', fallback: 'fallback 2' },
      { match: /.*an-url\/3/, fallback: 'fallback 3' },
      { match: /.*an-url\/3/, method: 'POST', fallback: 'fallback 4' },
    ]
    const state = {
      config: {
        mocks,
      },
    }

    it('should return undefined when no mock found', () => {
      expect(getFallback('http://an-url/2')('GET')(state)).toMatchSnapshot()
    })

    it('should get mock based on URL only --fallback1--', () => {
      // this test is about order too, first found is the one returned
      expect(getFallback('http://an-url/3')('GET')(state)).toMatchSnapshot()
    })

    it('should get mock based on method --fallback4--', () => {
      expect(getFallback('http://an-url/3')('POST')(state)).toMatchSnapshot()
    })
  })
})
