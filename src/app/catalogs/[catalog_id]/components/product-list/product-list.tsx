'use client'

import classNames from 'classnames'
import accounting from 'accounting'

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

import type { Batch } from '@pollen-tech/appsync-schema'

import { ProductNameCell } from './'

const columnHelper = createColumnHelper<Batch[][0]>()

const columns = [
  columnHelper.accessor('productName', {
    header: () => 'Name',
    cell: (props) => (
      <ProductNameCell
        thumbnail={props.row.original.image as string}
        name={props.getValue() as string}
        shelfLifeRemainingDay={
          props.row.original.shelfLifeRemainingDay as number
        }
      />
    ),
  }),
  columnHelper.accessor('barcode', {
    header: () => 'Barcode Number',
    cell: (props) => props.getValue() ?? '-',
  }),
  columnHelper.accessor('skuNumber', {
    header: () => 'SKU Number',
    cell: (props) => props.getValue() ?? '-',
  }),
  columnHelper.accessor('availableUnit', {
    header: () => 'Available Unit',
    cell: (props) => props.getValue() ?? '-',
  }),
  columnHelper.accessor('sellingUnit', {
    header: () => 'Selling Unit',
    cell: (props) => props.getValue() ?? '-',
  }),
  columnHelper.accessor('retailPrice', {
    header: () => 'Retail Price',
    cell: (props) =>
      accounting.formatMoney(props.getValue() as number, {
        symbol: 'USD ',
        precision: 0,
      }),
  }),
  columnHelper.accessor('askingPrice', {
    header: () => 'Asking Price',
    cell: (askingPriceUsd) =>
      accounting.formatMoney(askingPriceUsd.getValue() as number, {
        symbol: 'USD ',
        precision: 0,
      }),
  }),
]

type TProductListProps = {
  products: Batch[]
}

export function ProductList({ products }: TProductListProps) {
  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <>
      <table className="w-full table-auto border-collapse bg-white">
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
        <tbody>
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
