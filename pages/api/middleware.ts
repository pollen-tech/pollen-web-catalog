// middleware.ts
import { type NextApiRequest, type NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import type ApiError from '~/utils/error'

export async function middleware(_req: NextApiRequest, res: NextApiResponse) {
  const next = NextResponse.next()
  try {
    const result = await Promise.resolve(next)
    return result
  } catch (err) {
    const { message, statusCode = 500 } = err as ApiError
    res.status(statusCode).json({ message })
  }
}

// Supports both a single string value or an array of matchers
export const config = {}
