'use client'

import * as Menubar from '@radix-ui/react-menubar'
import * as Avatar from '@radix-ui/react-avatar'
import * as Tabs from '@radix-ui/react-tabs'

import { BellIcon } from '@heroicons/react/24/outline'

import {
  CurrencyDollarIcon as DollarSolidIcon,
  ArchiveBoxIcon,
  TruckIcon as TruckSolidIcon,
  MapPinIcon,
} from '@heroicons/react/24/solid'
import { UserMenu } from './user-menu'

const NOTIFICATION_TABS = [
  {
    id: 'notif-offer',
    label: 'Offer',
    icon: DollarSolidIcon,
  },
  {
    id: 'notif-order',
    label: 'Order (Coming Soon)',
    icon: ArchiveBoxIcon,
  },
  {
    id: 'notif-shipping',
    label: 'Shipping',
    icon: TruckSolidIcon,
  },
  {
    id: 'notif-completed',
    label: 'Completed',
    icon: MapPinIcon,
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
              className="w-[400px] rounded-lg bg-gray-50 drop-shadow"
              align="end"
              sideOffset={10}
              alignOffset={-10}
            >
              <div className="rounded-t-lg bg-white px-6 py-4 font-semibold text-pollen-purple">
                Notifications
              </div>
              <Tabs.Root
                className="bg-white px-6 py-4"
                defaultValue="notif-offer"
              >
                <Tabs.List
                  className="mb-2 flex items-center justify-between"
                  aria-label="Notifications"
                >
                  {NOTIFICATION_TABS.map(({ id, label, icon: Icon }) => (
                    <Tabs.Trigger
                      className="flex shrink-0 grow flex-col items-center gap-4 text-gray-400 hover:text-pollen-purple"
                      value={id}
                      key={id}
                    >
                      <Icon className="h-6 w-6" />
                      <span className="text-xs"> {label}</span>
                    </Tabs.Trigger>
                  ))}
                </Tabs.List>
                <div className="rounded-b-lg pt-4">
                  {NOTIFICATION_TABS.map(({ id }) => (
                    <Tabs.Content value={id} key={`content-${id}`}>
                      {/* empty nofitications */}
                      <div className="w-full rounded-b-lg py-10 text-center text-xs">
                        No notifications yet
                      </div>
                    </Tabs.Content>
                  ))}
                </div>
              </Tabs.Root>
            </Menubar.Content>
          </Menubar.Content>
        </Menubar.Portal>
      </Menubar.Menu>
      <UserMenu id="buyer-id" username="Buyer Name" company="Buyer company" />
    </Menubar.Root>
  )
}
