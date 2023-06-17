import { ApolloClient, concat, HttpLink, InMemoryCache } from '@apollo/client'
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc'
import { config } from '~/config'
import { authMiddleware } from './auth-middleware'
import { Query } from '@pollen-tech/appsync-schema'
import awaitToError from '~/utils/awaitToError'
import { redirect } from 'next/navigation'
const { getClient: getApolloClient } = registerApolloClient(() => {
  const link = new HttpLink({
    uri: config.appsync.endpoint,
  })
  return new ApolloClient<Query>({
    cache: new InMemoryCache(),
    link: concat(authMiddleware, link),
  })
})

export const query = async <R>(q: Query) => {
  const client = getApolloClient()
  const [err, result] = await awaitToError({ p: client.query<R>(q) })
  if (err) {
    if (err.message.includes('401')) {
      redirect('/api/auth/login')
    }
    throw err
  }
  return result
}
