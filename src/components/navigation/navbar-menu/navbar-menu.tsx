'use client'

import { Root as MenuRoot } from '@radix-ui/react-menubar'

import { UserMenu } from './user-menu'
import { Notifications } from './notifications'
import { useUser } from '~/hooks/user'
import { useEffect, useState } from 'react'
import type { User } from '~/@types/user'

const dummyNotifs = [
  {
    id: 'notif-1',
    title: 'Your offer has been sent to seller',
    content:
      'Your offer to catalog “P1 Near Expiry Food Products” has been sent.',
    date: '2021-08-01T00:00:00.000Z',
    read: false,
    category: 'notif-offer',
  },
  {
    id: 'notif-2',
    title: 'Your order has been processed',
    content:
      'Your offer to catalog “P1 Near Expiry Food Products” has been processed.',
    date: '2021-08-01T00:00:00.000Z',
    read: false,
    category: 'notif-order',
  },
  {
    id: 'notif-3',
    title: 'Your offer has been sent to seller',
    content:
      'Your offer to catalog “P2 Near Expiry Food Products” has been sent.',
    date: '2021-08-01T00:00:00.000Z',
    read: false,
    category: 'notif-offer',
  },
]

export function NavbarMenu() {
  const { getMe } = useUser()
  const [buyer, setBuyer] = useState<User & { name: string }>()
  useEffect(() => {
    getMe()
      .then((res) => {
        setBuyer(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  return (
    <MenuRoot className="flex items-center gap-x-8">
      <Notifications items={dummyNotifs} />
      <UserMenu
        id="buyer-id"
        username={`${buyer?.firstname || ''} ${buyer?.lastname || ''}`}
        company={buyer?.buyer.name || ''}
      />
    </MenuRoot>
  )
}
