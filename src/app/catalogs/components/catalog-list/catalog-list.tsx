'use client'

import classNames from 'classnames'
import accounting from 'accounting'

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

import type { Catalog } from '@pollen-tech/appsync-schema'
import Link from 'next/link'
import { useEffect } from 'react'
import { useLoadingStore } from '~/hooks/states/loading'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const columnHelper = createColumnHelper<Catalog[][0]>()

const columns = [
  columnHelper.accessor('name', {
    header: () => 'Catalog Name',
    cell: (props) => props.getValue() ?? '-',
  }),
  columnHelper.accessor('seller', {
    header: () => 'Seller Name',
    cell: (props) => props.getValue()?.companyName ?? '-',
  }),
  columnHelper.accessor('warehouseLocation', {
    header: () => 'Warehouse Location',
    cell: (props) => props.getValue() ?? '-',
  }),
  columnHelper.accessor('updatedAt', {
    header: () => 'Last Update',
    cell: (props) => props.getValue() ?? '-',
  }),
  columnHelper.accessor('totalAskingPrice', {
    header: () => 'Total Asking Price',
    cell: (props) =>
      accounting.formatMoney(props.getValue() as number, {
        symbol: 'USD ',
        precision: 0,
      }),
  }),
  columnHelper.accessor('totalWeight', {
    header: () => 'Total Weight',
    cell: (props) => props.getValue() ?? '-',
  }),
  columnHelper.accessor('id', {
    header: () => 'Action',
    cell: (props) => (
      <Link
        data-testid="detail-button"
        className="text-pollen-purple"
        href={`/catalogs/${props.getValue()}`}
      >
        View Detail
      </Link>
    ),
  }),
]

type TCatalogListProps = {
  catalogs: Catalog[]
}

const LoadingTable = () => {
  const tableHeads = [
    { id: 1, header: 'CATALOG NAME' },
    { id: 2, header: 'SELLER NAME' },
    { id: 3, header: 'WAREHOUSE LOCATION' },
    { id: 4, header: 'LAST UPDATE' },
    { id: 5, header: 'TOTAL ASKING PRICE' },
    { id: 6, header: 'TOTAL WEIGHT' },
    { id: 7, header: 'ACTION' },
  ]
  return (
    <>
      <table
        data-testid="product-list-table-loading"
        className="w-full table-auto "
      >
        <thead>
          <tr className="border-b border-solid border-gray-300">
            {tableHeads.map((header) => (
              <th
                className={classNames(
                  'border-b border-slate-300 px-5 pb-4 text-sm font-semibold uppercase text-gray-700'
                )}
                key={header.id}
              >
                {header.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody data-testid="product-list-table-body">
          {Array.from(Array(5).keys()).map((row) => (
            <tr
              key={row}
              className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
            >
              {tableHeads.map((header, idx) => (
                <td
                  className={classNames(
                    'border-b border-slate-200 p-6 text-sm font-normal text-gray-700',
                    { 'text-center': idx > 0 }
                  )}
                  key={header.id}
                >
                  <Skeleton width={100} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export function CatalogList({ catalogs }: TCatalogListProps) {
  const { setLoading, loading } = useLoadingStore((state) => state)
  useEffect(() => {
    setLoading(false)
  }, [catalogs])

  const table = useReactTable({
    data: catalogs,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <>
      {loading ? (
        <LoadingTable />
      ) : (
        <table data-testid="product-list-table" className="w-full table-auto ">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                className="border-b border-solid border-gray-300"
                key={headerGroup.id}
              >
                {headerGroup.headers.map((header, idx) => (
                  <th
                    className={classNames(
                      'border-b border-slate-300 px-5 pb-4 text-sm font-semibold uppercase text-gray-700',
                      { 'text-left': idx === 0 }
                    )}
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody data-testid="product-list-table-body">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
              >
                {row.getVisibleCells().map((cell, idx) => (
                  <td
                    className={classNames(
                      'border-b border-slate-200 p-6 text-sm font-normal text-gray-700',
                      { 'text-center': idx > 0 }
                    )}
                    key={cell.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}
