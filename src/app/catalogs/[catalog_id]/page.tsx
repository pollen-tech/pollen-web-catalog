import type { Batch, Catalog } from '@pollen-tech/appsync-schema'

import { CatalogInfo } from './components/catalog-info'
import { ProductList } from './components/product-list'

import { getClient, query } from '~/lib/client'

import { gql } from '@apollo/client'
import { redirect } from 'next/navigation'

const CATALOG_DETAIL_QUERY = gql`
  query Catalog($catalogId: ID!) {
    catalog(catalogId: $catalogId) {
      id
      name
      totalAskingPriceUsd
      warehouseLocation
      createdAt
      totalWeight
      seller {
        companyName
      }
      batches {
        id
        productName
        image
        brand
        shelfLifeRemainingDay
        barcode
        skuNumber
        availableUnit
        sellingUnit
        askingPrice
        retailPrice
      }
    }
  }
`
export default async function CatalogPage({
  params,
}: {
  params: { catalog_id: string }
}) {
  const { data }: { data: { catalog: Catalog } } = await query({
    query: CATALOG_DETAIL_QUERY,
    variables: {
      catalogId: params.catalog_id,
    },
  })
  return (
    <div className="catalog-page container mx-auto">
      <CatalogInfo
        catalogId={data.catalog.id}
        catalogName={data.catalog.name}
        companyName={data.catalog.seller?.companyName}
        totalAskingPriceUsd={data.catalog.totalAskingPriceUsd}
        totalWeight={data.catalog.totalWeight}
        warehouseLocation={data.catalog.warehouseLocation ?? '-'}
        updatedAt={data.catalog.createdAt}
      />
      <ProductList products={(data.catalog.batches as Batch[]) || []} />
    </div>
  )
}
