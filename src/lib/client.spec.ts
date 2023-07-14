import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  concat,
} from '@apollo/client'
import { FETCH_SELLERS } from '~/services/sellers/query.gql'
import { query, setIdToken } from './client'
import { setCookie } from 'cookies-next'
import { ID_TOKEN_COOKIE_KEY } from '../../pages/api/auth/constant'

const mockQuery = jest.fn()
jest.mock('@apollo/client', () => ({
  ApolloClient: jest.fn().mockImplementation(() => {
    return {
      query: mockQuery,
    }
  }),
  ApolloLink: jest.fn().mockImplementation(() => {}),
  HttpLink: jest.fn().mockImplementation(() => {}),
  InMemoryCache: jest.fn().mockImplementation(() => {}),
  concat: jest.fn().mockImplementation(() => {}),
}))

const mockJwt =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2ODkyOTg2NTMsImV4cCI6MTcyMDgzNDY1MywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImJ1eWVyUHJvZmlsZSI6InsgXCJlbWFpbFwiOiBcImVjaGFvZW9lbkBnbWFpbC5jb21cIiB9In0.OcnLtCXauGQ7ZRbmAW9CTjKT8_N8w_9G66HcdoAKLqo'

describe(`client.ts`, () => {
  describe(`query()`, () => {
    it(`should calling the ApolloLink when function is called`, async () => {
      mockQuery.mockImplementation(() => {})
      await query({
        query: FETCH_SELLERS,
        variables: {},
      })
      expect(ApolloClient).toBeCalled()
      expect(ApolloLink).toBeCalled()
      expect(HttpLink).toBeCalled()
      expect(InMemoryCache).toBeCalled()
      expect(concat).toBeCalled()
    })
    it(`should throw error when query fails to authenticate`, async () => {
      mockQuery.mockRejectedValueOnce(new Error('401'))
      try {
        await query({
          query: FETCH_SELLERS,
          variables: {},
        })
      } catch (error) {
        expect(error).toBeDefined()
      }
    })
    it(`should use backend idToken when idToken context is present`, async () => {
      mockQuery.mockImplementation(() => {})
      const token = setIdToken({
        idToken: mockJwt,
      })
      expect(token).toBe(mockJwt)
    })
    it(`should use cookie when id token is not present`, async () => {
      mockQuery.mockImplementation(() => {})
      setCookie(ID_TOKEN_COOKIE_KEY, mockJwt)
      const token = setIdToken({})
      expect(token).toBe(mockJwt)
    })
  })
})
