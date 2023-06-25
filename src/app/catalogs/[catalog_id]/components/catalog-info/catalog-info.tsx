'use client'
import type { Catalog, Seller } from '@pollen-tech/appsync-schema'

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

import { Button } from '~/components/common/button'
import { MakeOfferModal } from '~/app/catalogs/[catalog_id]/components/make-offer-modal'

type TCatalogInfoProps = {
  catalogId: Catalog['id']
  catalogName?: Catalog['name']
  companyName?: Seller['companyName']
  companyLogo?: Seller['logo']
  totalAskingPriceUsd?: Catalog['totalAskingPriceUsd']
  totalWeight?: Catalog['totalWeight']
  warehouseLocation?: Catalog['warehouseLocation']
  updatedAt?: Catalog['createdAt']
}

export function CatalogInfo({
  catalogId,
  catalogName,
  companyName,
  companyLogo,
  totalAskingPriceUsd,
  updatedAt,
  totalWeight,
  warehouseLocation,
}: TCatalogInfoProps) {
  return (
    <>
      <Card className="my-8 text-gray-900">
        <div className="flex items-center">
          <div className="rounded-full p-4">
            <Image
              src={
                companyLogo ?? 'https://placehold.co/48@2x.jpg?text=No+Image'
              }
              width={56}
              height={56}
              alt={companyName || 'Company Logo'}
              className="object-contain"
            />
          </div>

          <div className="grow-2 px-5">
            <h2 className="text-lg font-semibold">{catalogName}</h2>
            <p className="text-xs">{companyName || '-'}</p>
          </div>

          <div className="grow border-r border-gray-300 px-5">
            <div className="mb-4 flex items-center gap-2">
              <MapPinIcon className="h-4 w-4 text-gray-500" />
              <span className="text-xs">Warehouse Location</span>
              <span className="text-sm font-semibold">
                {warehouseLocation || '-'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CurrencyDollarIcon className="h-4 w-4 text-gray-500" />
              <span className="text-xs">Total Asking Price</span>
              <span className="text-sm font-semibold">
                {totalAskingPriceUsd
                  ? accounting.formatMoney(totalAskingPriceUsd)
                  : '-'}
              </span>
            </div>
          </div>

          <div className="grow border-r border-gray-300 px-5">
            <div className="mb-4 flex items-center gap-2">
              <ClockIcon className="h-4 w-4 text-gray-500" />
              <span className="text-xs">Last Updated</span>
              <span className="text-sm font-semibold">
                {updatedAt ? format(new Date(updatedAt), 'dd MMMM yyyy') : '-'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <ScaleIcon className="h-4 w-4 text-gray-500" />
              <span className="text-xs">Total Weight (KG)</span>
              <span className="text-sm font-semibold">
                {totalWeight ? accounting.formatNumber(totalWeight) : '-'}
              </span>
            </div>
          </div>

          <div className="grow px-5">
            <MakeOfferModal catalogId={catalogId} />
            <Button variant="secondary" className="block w-full">
              Download Catalog
            </Button>
          </div>
        </div>
      </Card>
    </>
  )
}
