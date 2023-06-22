import './globals.css'

import Link from 'next/link'
import { Inter } from 'next/font/google'

import classNames from 'classnames'

import { UserProvider } from '@auth0/nextjs-auth0/client'
import React from 'react'
import { Navbar } from '~/components/navigation/navbar'
import { ApolloWrapper } from '~/lib/apollo-wrapper'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={classNames(inter.className, 'bg-gray-50')}>
        {/* navbar */}
        <Navbar />
        <div>
          {' '}
          <UserProvider>
            <ApolloWrapper>{children}</ApolloWrapper>
          </UserProvider>
          {/* <Link href="/" className="text-pollen-purple">
            Back
          </Link> */}
        </div>
      </body>
    </html>
  )
}
