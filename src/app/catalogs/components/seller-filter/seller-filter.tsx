'use client'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import {
  type FormEventHandler,
  useState,
  type MouseEventHandler,
  useEffect,
} from 'react'
import { useRouter as useNextRouter } from '~/hooks/router'
import style from './seller-filter.module.css'
import { fetchSellers } from '~/services/sellers'

const SellerSearch = ({}) => {
  return (
    <div className="relative mb-3 w-full">
      <input
        data-testid="search-field"
        type="text"
        className="block w-full rounded-lg border border-gray-300 p-2.5 pr-10 text-sm text-gray-900 focus:border-purple-600 focus:ring-purple-500"
        placeholder="Find a Seller"
        required
        onChange={({ target: { value } }) => value}
      />
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        <svg
          aria-hidden="true"
          className="h-5 w-5 text-gray-500 dark:text-gray-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>
    </div>
  )
}

const SellerList = ({}) => {
  const data = Array.from({ length: 50 }).map((_, i, a) => ({
    id: i + 1,
    label: `Seller - ${a.length - i}`,
    checked: false,
  }))
  const [sellers, setSellers] = useState(data)

  const handleCheckboxChange = (checkboxId: number | string) => {
    setSellers((prevCheckboxes) =>
      prevCheckboxes.map((checkbox) =>
        checkbox.id === checkboxId
          ? { ...checkbox, checked: !checkbox.checked }
          : checkbox
      )
    )
  }

  return (
    <>
      {sellers.map((seller, i) => (
        <div key={seller.id}>
          <div className="my-2 flex items-center">
            <input
              type="checkbox"
              className="h-5 w-5 rounded border-gray-300 text-purple-600 accent-purple-600 focus:ring-purple-500 dark:border-gray-600 dark:text-white dark:focus:border-purple-500"
              onChange={() => handleCheckboxChange(seller.id)}
            />
            <label className="ml-4 text-gray-700 dark:text-gray-300">
              {seller.label}
            </label>
          </div>
          {i !== data.length - 1 && (
            <hr className="h-px border-0 bg-gray-200 dark:bg-gray-700"></hr>
          )}
        </div>
      ))}
    </>
  )
}

export function SellerFilter() {
  const { pushQuery } = useNextRouter()
  useEffect(() => {
    fetchSellers()
      .then((d) => {
        console.log(d)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  return (
    <ScrollArea.Root className={`${style['ScrollAreaRoot']}`}>
      <div style={{ padding: '15px 20px 0px 15px' }}>
        <SellerSearch />
      </div>
      <ScrollArea.Viewport className={`${style['ScrollAreaViewport']}`}>
        <div style={{ padding: '0px 20px 15px 20px' }}>
          <SellerList />
        </div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        className="ScrollAreaScrollbar"
        orientation="vertical"
      >
        <ScrollArea.Thumb className="ScrollAreaThumb" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Scrollbar
        className="ScrollAreaScrollbar"
        orientation="horizontal"
      >
        <ScrollArea.Thumb className="ScrollAreaThumb" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner className="ScrollAreaCorner" />
    </ScrollArea.Root>
  )
}
