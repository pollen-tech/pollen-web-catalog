import {
  ApolloClient,
  ApolloLink,
  concat,
  HttpLink,
  InMemoryCache,
  type OperationVariables,
  type QueryOptions,
} from '@apollo/client'
import { config } from '~/config'
import awaitToError from '~/utils/awaitToError'
import { redirect } from 'next/navigation'
import { getCookie } from 'cookies-next'
import { ID_TOKEN_COOKIE_KEY } from '../../pages/api/auth/constant'
import { type RequestContext } from '~/@types/request-context'
const getClient = (context?: RequestContext) => {
  const link = new HttpLink({
    uri: config.appsync.endpoint,
  })
  const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    const tokenCookie = context
      ? context.cookies.get(ID_TOKEN_COOKIE_KEY)?.value
      : getCookie(ID_TOKEN_COOKIE_KEY)?.toString()
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: tokenCookie ? tokenCookie : null,
      },
    }))
    return forward(operation)
  })
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: concat(authMiddleware, link),
  })
}
export const query = async <T>(
  q: QueryOptions<OperationVariables, T>,
  context?: RequestContext
) => {
  const client = getClient(context)
  const [err, result] = await awaitToError(client.query<T>(q))
  if (err) {
    if (err.message.includes('401')) {
      redirect('/api/auth/login')
    }
    throw err
  }
  return result
}
