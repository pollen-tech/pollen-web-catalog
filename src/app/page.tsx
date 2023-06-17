'use client'
import { useUser } from '@auth0/nextjs-auth0/client'
import Link from 'next/link'
import React from 'react'

export default function Home() {
  const { user, error, isLoading } = useUser()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>
  if (!user)
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {/* <Link href="/demo">Go to demo</Link> */}
        <Link href="/api/auth/login">Go to Login</Link>
      </main>
    )
  return (
    <div>
      Hello {user.name}, <Link href="/api/auth/logout">Logout</Link>
    </div>
  )
}
