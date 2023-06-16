'use client'

import classNames from 'classnames'
import accounting from 'accounting'

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

import Image from 'next/image'

import type { Batches } from '@pollen-tech/appsync-schema'

type TProductNameCellProps = {
  name: string
  thumbnail?: string
  shelfLifeRemainingDay: number
}

function ProductNameCell({
  name,
  thumbnail,
  shelfLifeRemainingDay,
}: TProductNameCellProps) {
  return (
    <div className="flex">
      {thumbnail && (
        <div className="mr-3 h-12 w-12 shrink-0 items-center object-contain">
          <Image src={thumbnail} alt={name} width={48} height={48} />
        </div>
      )}
      <div>
        <h3 className="text-sm font-semibold text-gray-900">{name}</h3>
        <p className="text-sm text-red-500">
          Expiring in {shelfLifeRemainingDay} days
        </p>
      </div>
    </div>
  )
}

const columnHelper = createColumnHelper<Batches[][0]>()

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
    cell: (props) => props.getValue(),
  }),
  columnHelper.accessor('skuNumber', {
    header: () => 'SKU Number',
    cell: (props) => props.getValue(),
  }),
  columnHelper.accessor('availableUnit', {
    header: () => 'Available Unit',
    cell: (props) => props.getValue(),
  }),
  columnHelper.accessor('sellingUnit', {
    header: () => 'Selling Unit',
    cell: (props) => props.getValue(),
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
  products: Batches[]
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
