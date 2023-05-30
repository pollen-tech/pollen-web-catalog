'use client'

import * as Menubar from '@radix-ui/react-menubar'
import * as Avatar from '@radix-ui/react-avatar'

import {
  BellIcon,
  Cog8ToothIcon,
  CurrencyDollarIcon,
  TruckIcon,
  UserIcon,
} from '@heroicons/react/24/outline'
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid'

const USER_MENU_ITEMS = [
  {
    id: 'offer',
    label: 'Offer',
    icon: CurrencyDollarIcon,
  },
  {
    id: 'order',
    label: 'Order (Coming Soon)',
    icon: TruckIcon,
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Cog8ToothIcon,
  },
  {
    id: 'logout',
    label: 'Logout',
    icon: ArrowRightOnRectangleIcon,
  },
]

export function NavbarMenu() {
  return (
    <Menubar.Root className="flex items-center gap-x-8">
      <Menubar.Menu>
        <Menubar.Trigger aria-label="notifications">
          <BellIcon className="h-6 w-6 text-gray-600" />
        </Menubar.Trigger>
        <Menubar.Portal>
          <Menubar.Content align="end">
            <Menubar.Content
              className="rounded bg-white p-4 drop-shadow"
              align="end"
              sideOffset={10}
              alignOffset={-10}
            >
              <p>Placeholder content for notifications</p>
            </Menubar.Content>
          </Menubar.Content>
        </Menubar.Portal>
      </Menubar.Menu>
      <Menubar.Menu>
        <Menubar.Trigger aria-label="user menu">
          <UserIcon className="h-6 w-6 text-gray-600" />
        </Menubar.Trigger>
        <Menubar.Portal>
          <Menubar.Content
            className="w-[298px] bg-gray-50 drop-shadow"
            align="end"
            sideOffset={10}
            alignOffset={-10}
          >
            <div className="mb-2 flex items-center rounded-t-lg bg-white px-2 py-4">
              <Avatar.Root>
                <Avatar.Fallback className="mx-4 flex h-8 w-8 items-center justify-center rounded-full bg-purple-50 text-pollen-purple">
                  B
                </Avatar.Fallback>
              </Avatar.Root>
              <div className="flex flex-col">
                <span className="text-sm text-gray-900">Buyer User</span>
                <span className="text-xs text-gray-700">Buyer Company</span>
              </div>
            </div>
            <div className="rounded-b-lg bg-white p-2">
              {USER_MENU_ITEMS.map(({ id, label, icon: Icon }) => (
                <Menubar.Item
                  className="flex cursor-pointer items-center px-4 py-2 text-sm text-gray-600 hover:border-none hover:bg-purple-50 hover:text-gray-900"
                  key={id}
                >
                  <Icon className="mr-4 h-4 w-4" /> {label}
                </Menubar.Item>
              ))}
            </div>
          </Menubar.Content>
        </Menubar.Portal>
      </Menubar.Menu>
    </Menubar.Root>
  )
}
