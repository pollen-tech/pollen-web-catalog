import { Menu, Trigger, Content, Portal, Item } from '@radix-ui/react-menubar'

import * as Tabs from '@radix-ui/react-tabs'

import { BellIcon } from '@heroicons/react/24/outline'
import {
  CurrencyDollarIcon as DollarSolidIcon,
  ArchiveBoxIcon,
  TruckIcon as TruckSolidIcon,
  MapPinIcon,
} from '@heroicons/react/24/solid'

import { format } from 'date-fns'

type TNotificationItem = {
  id: string
  title: string
  content: string
  date: string
  read: boolean
  category: string
}

type TNotificationsProps = {
  items?: TNotificationItem[]
}

const NOTIFICATION_TABS = [
  {
    category: 'notif-offer',
    label: 'Offer',
    icon: DollarSolidIcon,
  },
  {
    category: 'notif-order',
    label: 'Order',
    icon: ArchiveBoxIcon,
  },
  {
    category: 'notif-shipping',
    label: 'Shipping',
    icon: TruckSolidIcon,
  },
  {
    category: 'notif-completed',
    label: 'Completed',
    icon: MapPinIcon,
  },
]

export function NotificationsTabContent({
  category,
  items,
}: {
  category: string
  items: TNotificationItem[]
}) {
  return (
    <Tabs.Content value={category} key={`content-${category}`}>
      <div className="divide-y divide-gray-200">
        {false ? (
          items.map((item) => (
            // TODO: update to use Link from next/link, on add event handler, depends on the design
            <Item
              className="cursor-pointer px-6 py-5 hover:bg-purple-50"
              key={item.id}
              onSelect={() => console.log('selected', item.id)}
            >
              <div className="mb-2 flex justify-between text-xs">
                <span className="font-semibold text-gray-900">
                  {item.title}
                </span>{' '}
                <span className="text-gray-500">
                  {/* TODO: update to relative format */}
                  {format(new Date(item.date), 'MMM dd')}
                </span>
              </div>
              <div className="text-xs text-gray-700">
                {item.content} Click to see details.
              </div>
            </Item>
          ))
        ) : (
          <div className="w-full rounded-b-lg py-10 text-center text-xs">
            Coming Soon
          </div>
        )}
      </div>
    </Tabs.Content>
  )
}

export function Notifications({ items = [] }: TNotificationsProps) {
  return (
    <Menu>
      <Trigger
        aria-label="notifications"
        className=" text-gray-600 data-[state=open]:text-pollen-purple"
      >
        <BellIcon className="h-6 w-6" />
      </Trigger>
      <Portal>
        <Content align="end">
          <Content
            className="w-[400px] rounded-lg bg-gray-50 drop-shadow"
            align="end"
            sideOffset={10}
            alignOffset={-10}
          >
            <div className="rounded-t-lg bg-white px-6 py-4 font-semibold text-pollen-purple">
              Notifications
            </div>
            <Tabs.Root defaultValue="notif-offer">
              <Tabs.List
                className="mb-2 flex items-center justify-between bg-white px-6 py-4"
                aria-label="Notifications"
              >
                {NOTIFICATION_TABS.map(({ category, label, icon: Icon }) => (
                  <Tabs.Trigger
                    className="flex shrink-0 grow flex-col items-center gap-4 text-gray-400 hover:text-pollen-purple data-[state=active]:text-pollen-purple"
                    value={category}
                    key={category}
                  >
                    <Icon className="h-6 w-6" />
                    <span className="text-xs"> {label}</span>
                  </Tabs.Trigger>
                ))}
              </Tabs.List>
              <div className="mt-1 rounded-b-lg bg-white pt-4">
                {NOTIFICATION_TABS.map(({ category }) => (
                  <NotificationsTabContent
                    category={category}
                    items={items.filter((item) => item.category === category)}
                    key={`tab-${category}`}
                  />
                ))}
              </div>
            </Tabs.Root>
          </Content>
        </Content>
      </Portal>
    </Menu>
  )
}
