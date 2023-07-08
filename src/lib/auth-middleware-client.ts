import { ApolloLink } from '@apollo/client'
import { getCookie } from 'cookies-next'
import { ID_TOKEN_COOKIE_KEY } from '../../pages/api/auth/constant'
export const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const tokenCookie = getCookie(ID_TOKEN_COOKIE_KEY)?.toString() as string
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: tokenCookie ? tokenCookie : null,
    },
  }))
  return forward(operation)
})
