//TEMPORARY FILE, ONLY FOR DEVELOPMENT PURPOSE
import { NextResponse } from 'next/server'

const GQL_ENDPOINT = process.env.APP_SYNC_ENDPOINT as string
// const GQL_API_KEY = process.env.APP_SYNC_API_KEY as string
const GQL_AUTH_TOKEN = process.env.AUTH_TOKEN as string

interface GraphQLRequest {
  query: string
  mutation?: string
  variables?: Record<string, unknown>
}

export async function POST(request: Request) {
  const reqBody: GraphQLRequest = (await request.json()) as GraphQLRequest

  const reqOptions = {
    method: 'POST',
    headers: {
      Authorization: GQL_AUTH_TOKEN,
    },
    body: JSON.stringify(reqBody),
  }

  const gqlResp = await fetch(GQL_ENDPOINT, reqOptions)
  const gqlRespBody: unknown = await gqlResp.json()

  return NextResponse.json(gqlRespBody)
}
