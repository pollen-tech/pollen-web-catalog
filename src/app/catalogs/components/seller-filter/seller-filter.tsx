'use client'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { useState, useEffect, useRef } from 'react'
import { useRouter as useNextRouter } from '~/hooks/router'
import style from './seller-filter.module.css'
import { fetchSellers } from '~/services/sellers'
import type { Seller } from '@pollen-tech/appsync-schema'

const SellerSearch = ({ onClick }: { onClick: (value: any) => void }) => {
  return (
    <div className="relative mb-3 w-full">
      <input
        data-testid="search-field"
        type="text"
        className="block w-full rounded-lg border border-gray-300 p-2.5 pr-10 text-sm text-gray-900 focus:border-purple-600 focus:ring-purple-500"
        placeholder="Find a Seller"
        required
        onChange={({ target: { value } }) => onClick(value)}
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

const SellerList = ({
  sellers: s,
  onSelect,
}: {
  sellers: Seller[]
  onSelect: (list: string[]) => void
}) => {
  const { pushQuery, searchParams } = useNextRouter()
  const [sellers, setSellers] = useState<(Seller & { selected: boolean })[]>([])

  useEffect(() => {
    const existingSellerId = searchParams?.get('sellerId')
    pushQuery({
      sellerId: existingSellerId ? existingSellerId : '',
    })
  }, [])

  const handleCheckboxChange = (id: string) => {
    const _s = [...sellers]
    const sIdx = _s.findIndex((d) => d.id == id)
    if (sIdx > -1) {
      _s[sIdx].selected = !_s[sIdx].selected
    }
    setSellers(_s)
  }

  useEffect(() => {
    const selected = sellers.filter((d) => d.selected).map((d) => d.id)
    onSelect(selected)
  }, [sellers])

  useEffect(() => {
    const existingSellerId = searchParams?.get('sellerId')?.split(',')
    setSellers(
      s.map((d) => ({
        ...d,
        selected: existingSellerId?.includes(d.id) ?? false,
      }))
    )
  }, [s])

  const checked = (id: string) => {
    const ss = sellers.find((d) => d.id == id)
    return ss?.selected ? ss.selected : false
  }

  return (
    <div>
      {sellers.map((seller, i) => (
        <div key={`${seller.id + String(i)}`}>
          <div className="my-2 flex items-center">
            <input
              type="checkbox"
              className="h-5 w-5 rounded border-gray-300 text-purple-600 accent-purple-600 focus:ring-purple-500 dark:border-gray-600 dark:text-white dark:focus:border-purple-500"
              checked={checked(seller.id)}
              onChange={() => handleCheckboxChange(seller.id)}
            />
            <label className="ml-4 text-gray-700 dark:text-gray-300">
              {seller.companyName}
            </label>
          </div>
          {i !== sellers.length - 1 && (
            <hr className="h-px border-0 bg-gray-200 dark:bg-gray-700"></hr>
          )}
        </div>
      ))}
    </div>
  )
}

export function SellerFilter() {
  const { pushQuery, searchParams } = useNextRouter()
  const [sellers, setSellers] = useState<Seller[]>([])
  const [sellerSize, setSellerSize] = useState<number>(20)
  const [search, setSearch] = useState<string>('')
  const [isBottom, setIsBottom] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = ref.current!
    setIsBottom(scrollTop + clientHeight >= scrollHeight - 10)
  }

  useEffect(() => {
    ref.current?.addEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const existingSellerId = searchParams?.get('sellerId')
    pushQuery({
      sellerId: existingSellerId ? existingSellerId : '',
    })
  }, [])

  useEffect(() => {
    setSellerSize(sellerSize + 10)
  }, [isBottom])

  useEffect(() => {
    fetchSellers(search, undefined, sellerSize)
      .then((d) => {
        setSellers(d.data)
      })
      .catch(() => {
        setSellers([])
      })
  }, [search, sellerSize])

  const onSelectHandler = (filter: string[]) => {
    if (!filter.length) {
      return
    }
    pushQuery({
      sellerId: filter.join(','),
    })
  }

  return (
    <ScrollArea.Root className={`${style['ScrollAreaRoot']}`}>
      <div style={{ padding: '15px 20px 0px 15px' }}>
        <SellerSearch
          onClick={(val: string) => {
            setSearch(val)
          }}
        />
      </div>
      <ScrollArea.Viewport
        className={`${style['ScrollAreaViewport']}`}
        ref={ref}
      >
        <div style={{ padding: '0px 20px 15px 20px' }}>
          <SellerList sellers={sellers} onSelect={onSelectHandler} />
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
