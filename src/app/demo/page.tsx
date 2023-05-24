/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

// 'use client'

// export const dynamic = 'force-dynamic'

// import { gql } from '@apollo/client'
// import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'

// const query = gql`
//   query {
//     getCatalog {
//       id
//       name
//       price
//     }
//   }
// `

// export default function DemoClient() {
//   const { data } = useSuspenseQuery(query)

//   return <div>{JSON.stringify(data)}</div>
// }

// demo/page.tsx server component
import { getClient } from '~/lib/client'

import { gql } from '@apollo/client'
import ClientComponent from './client-component'

const query = gql`
  query Catalog {
    getCatalog {
      id
      name
    }
  }
`

export default async function DemoServer() {
  const { data } = await getClient().query({
    query,
    context: {
      fetchOptions: {
        next: { revalidate: 5 },
      },
    },
  })

  return (
    <main>
      <ClientComponent />
      <ul>
        {data.getCatalog.map((item: any) => (
          <li key={item.id}>
            {item.id} - {item.name}
          </li>
        ))}
      </ul>
    </main>
  )
}
