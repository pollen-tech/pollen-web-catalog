import { ApolloLink, concat } from '@apollo/client'
import { cookies } from 'next/headers'
import { ID_TOKEN_COOKIE_KEY } from '../../pages/api/auth/[...auth0]'
import { redirect } from 'next/navigation'
import { onError } from '@apollo/client/link/error'
import { NextResponse } from 'next/server'
export const authMiddleware = 
  new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    const tokenCookie = cookies().get(ID_TOKEN_COOKIE_KEY)
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: tokenCookie ? tokenCookie.value : null,
      },
    }))
    return forward(operation)
  })
