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

type TUserMenuProps = {
  id: string
  username: string
  company: string
  avatarUrl?: string
}

const USER_MENU_ITEMS = [
  {
    id: 'user-offer',
    label: 'Offer',
    icon: CurrencyDollarIcon,
    target: '/offers',
  },
  {
    id: 'user-order',
    label: 'Order (Coming Soon)',
    icon: TruckIcon,
    target: '/orders',
  },
  {
    id: 'user-settings',
    label: 'Settings',
    icon: Cog8ToothIcon,
    target: '/settings',
  },
  {
    id: 'user-logout',
    label: 'Logout',
    icon: ArrowRightOnRectangleIcon,
    target: '/logout',
  },
]

export function UserMenu({ id, username, avatarUrl, company }: TUserMenuProps) {
  return (
    <Menu>
      <Trigger aria-label="user menu">
        <UserIcon className="h-6 w-6 text-gray-600" />
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
            {USER_MENU_ITEMS.map(({ id, label, target, icon: Icon }) => (
              <Link href={target} key={id}>
                <Item className="flex cursor-pointer items-center px-4 py-2 text-sm text-gray-600 hover:border-none hover:bg-purple-50 hover:text-gray-900">
                  <Icon className="mr-4 h-4 w-4" /> {label}
                </Item>
              </Link>
            ))}
          </div>
        </Content>
      </Portal>
    </Menu>
  )
}
