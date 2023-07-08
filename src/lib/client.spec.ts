import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  concat,
} from '@apollo/client'
import { FETCH_SELLERS } from '~/services/sellers/query.gql'
import { query } from './client'

jest.mock('@apollo/client', () => ({
  ApolloClient: jest.fn().mockImplementation(() => {
    return {
      query: jest.fn().mockImplementation(() => {}),
    }
  }),
  ApolloLink: jest.fn().mockImplementation(() => {}),
  HttpLink: jest.fn().mockImplementation(() => {}),
  InMemoryCache: jest.fn().mockImplementation(() => {}),
  concat: jest.fn().mockImplementation(() => {}),
}))
describe(`client.ts`, () => {
  describe(`query()`, () => {
    it(`should calling the ApolloLink when function is called`, async () => {
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
  })
})
