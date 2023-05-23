'use client'

import * as Menubar from '@radix-ui/react-menubar'

import { BellIcon, UserIcon } from '@heroicons/react/24/outline'

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
            className="rounded bg-white p-4 drop-shadow"
            align="end"
            sideOffset={10}
            alignOffset={-10}
          >
            <Menubar.Item className="cursor-pointer p-2 text-gray-600 hover:bg-gray-50">
              Profile
            </Menubar.Item>
            <Menubar.Item className="cursor-pointer p-2 text-gray-600 hover:bg-gray-50">
              Settings
            </Menubar.Item>
            <Menubar.Item className="cursor-pointer p-2 text-gray-600 hover:bg-gray-50">
              Logout
            </Menubar.Item>
          </Menubar.Content>
        </Menubar.Portal>
      </Menubar.Menu>
    </Menubar.Root>
  )
}
