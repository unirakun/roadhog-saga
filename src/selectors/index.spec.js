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
})
