import * as Avatar from '@radix-ui/react-avatar'
import { Menu, Trigger, Content, Portal, Item } from '@radix-ui/react-menubar'

import {
  UserIcon,
  Cog8ToothIcon,
  CurrencyDollarIcon,
  TruckIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import PlainLink from '~/components/plain-link'

type TUserMenuProps = {
  id: string
  username: string
  company: string
  avatarUrl?: string
}

const USER_MENU_ITEMS = [
  {
    id: 'user-offer',
    label: 'Offer (Comming Soon)',
    icon: CurrencyDollarIcon,
    target: '/offers',
    component: Link,
  },
  {
    id: 'user-order',
    label: 'Order (Coming Soon)',
    icon: TruckIcon,
    target: '/orders',
    component: Link,
  },
  {
    id: 'user-settings',
    label: 'Settings (Comming Soon)',
    icon: Cog8ToothIcon,
    target: '/settings',
    component: Link,
  },
  {
    id: 'user-logout',
    label: 'Logout',
    icon: ArrowRightOnRectangleIcon,
    target: '/api/auth/logout',
    component: PlainLink,
  },
]

export function UserMenu({ username, avatarUrl, company }: TUserMenuProps) {
  return (
    <Menu>
      <Trigger
        aria-label="user menu"
        className=" text-gray-600 data-[state=open]:text-pollen-purple"
      >
        <UserIcon className="h-6 w-6" />
      </Trigger>
      <Portal>
        <Content
          className="w-[298px] bg-gray-50 drop-shadow"
          align="end"
          sideOffset={10}
          alignOffset={-10}
        >
          <div className="mb-2 flex items-center rounded-t-lg bg-white px-2 py-4">
            <Avatar.Root>
              <Avatar.Image
                className="mx-4 flex h-8 w-8 items-center justify-center rounded-full bg-purple-50 text-pollen-purple"
                src={avatarUrl}
                alt={username}
              />
              <Avatar.Fallback className="mx-4 flex h-8 w-8 items-center justify-center rounded-full bg-purple-50 text-pollen-purple">
                {username[0]}
              </Avatar.Fallback>
            </Avatar.Root>
            <div className="flex flex-col">
              <span className="text-sm text-gray-900">{username}</span>
              <span className="text-xs text-gray-700">{company}</span>
            </div>
          </div>
          <div className="rounded-b-lg bg-white p-2">
            {USER_MENU_ITEMS.map(
              ({ id, label, target, icon: Icon, component: LinkComponent }) => (
                <LinkComponent href={target} key={id}>
                  <Item className="flex cursor-pointer items-center px-4 py-2 text-sm text-gray-600 hover:border-none hover:bg-purple-50 hover:text-gray-900">
                    <Icon className="mr-4 h-4 w-4" /> {label}
                  </Item>
                </LinkComponent>
              )
            )}
          </div>
        </Content>
      </Portal>
    </Menu>
  )
}
