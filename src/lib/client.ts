import {
  ApolloClient,
  concat,
  HttpLink,
  InMemoryCache,
  type OperationVariables,
  type QueryOptions,
} from '@apollo/client'
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc'
import { config } from '~/config'
import { authMiddleware } from './auth-middleware'
import awaitToError from '~/utils/awaitToError'
import { redirect } from 'next/navigation'
const { getClient: getApolloClient } = registerApolloClient(() => {
  const link = new HttpLink({
    uri: config.appsync.endpoint,
  })
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: concat(authMiddleware, link),
  })
})

export const query = async <T>(q: QueryOptions<OperationVariables, T>) => {
  const client = getApolloClient()
  const [err, result] = await awaitToError(client.query<T>(q))
  if (err) {
    if (err.message.includes('401')) {
      redirect('/api/auth/login')
    }
    throw err
  }
  return result
}
