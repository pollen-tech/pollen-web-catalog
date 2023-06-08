'use client'

import { Card } from '~/components/common/card'

import Image from 'next/image'
import {
  ClockIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  ScaleIcon,
} from '@heroicons/react/24/solid'

import { format } from 'date-fns'
import accounting from 'accounting'

import type dummy_catalog from '../../dummy-catalog.json'
import { Button } from '~/components/common/button'

type TCatalogInfoProps = {
  catalogInfo: typeof dummy_catalog.catalog_info
}

export function CatalogInfo({ catalogInfo }: TCatalogInfoProps) {
  return (
    <Card className="my-8 text-gray-900">
      <div className="flex items-center">
        <div className="rounded-full p-4">
          <Image
            src={'/unilever-logo.png'}
            width={56}
            height={56}
            alt={catalogInfo.company}
            className="object-contain"
          />
        </div>

        <div className="grow-2 px-5">
          <h2 className="text-lg font-semibold">{catalogInfo.name}</h2>
          <p className="text-xs">{catalogInfo.company}</p>
        </div>

        <div className="grow border-r border-gray-300 px-5">
          <div className="mb-4 flex items-center gap-2">
            <MapPinIcon className="h-4 w-4 text-gray-500" />
            <span className="text-xs">Warehouse Location</span>
            <span className="text-sm font-semibold">
              {catalogInfo.warehouse_location}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CurrencyDollarIcon className="h-4 w-4 text-gray-500" />
            <span className="text-xs">Total Asking Price</span>
            <span className="text-sm font-semibold">
              {accounting.formatMoney(catalogInfo.total_asking_price_usd)}
            </span>
          </div>
        </div>

        <div className="grow border-r border-gray-300 px-5">
          <div className="mb-4 flex items-center gap-2">
            <ClockIcon className="h-4 w-4 text-gray-500" />
            <span className="text-xs">Last Updated</span>
            <span className="text-sm font-semibold">
              {format(new Date(catalogInfo.last_updated), 'dd MMMM yyyy')}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ScaleIcon className="h-4 w-4 text-gray-500" />
            <span className="text-xs">Total Weight (KG)</span>
            <span className="text-sm font-semibold">
              {accounting.formatNumber(catalogInfo.weight_kg)}
            </span>
          </div>
        </div>

        <div className="grow px-5">
          <Button
            className="mb-2 block w-full"
            onClick={() => console.log('hey')}
          >
            Make an Offer
          </Button>
          <Button variant="secondary" className="block w-full">
            Download Catalog
          </Button>
        </div>
      </div>
    </Card>
  )
}
