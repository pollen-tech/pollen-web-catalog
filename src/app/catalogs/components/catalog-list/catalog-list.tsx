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

export function CatalogList({ catalogs }: TCatalogListProps) {
  const table = useReactTable({
    data: catalogs,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <>
      <table
        data-testid="product-list-table"
        className="w-full table-auto border-collapse bg-white"
      >
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              className="border-b border-solid border-gray-300"
              key={headerGroup.id}
            >
              {headerGroup.headers.map((header, idx) => (
                <th
                  className={classNames(
                    'px-8 py-3 text-sm uppercase text-gray-700',
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
            <tr key={row.id}>
              {row.getVisibleCells().map((cell, idx) => (
                <td
                  className={classNames(
                    'px-8 py-3 text-sm font-normal text-gray-700',
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
    </>
  )
}
