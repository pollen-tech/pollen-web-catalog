import type { Catalog } from '@pollen-tech/appsync-schema'

import { CatalogInfo } from './components/catalog-info'
import { ProductList } from './components/product-list'

import { getClient } from '~/lib/client'

import { gql } from '@apollo/client'

const CATALOG_DETAIL_QUERY = gql`
  query Catalog($catalogId: ID!) {
    catalog(catalogId: $catalogId) {
      id
      name
      totalAskingPriceUsd
      warehouseLocation
      createdAt
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
        sellingUnit
        askingPrice
      }
    }
  }
`

export default async function CatalogPage({
  params,
}: {
  params: { catalog_id: string }
}) {
  const { data }: { data: { catalog: Catalog } } = await getClient().query({
    query: CATALOG_DETAIL_QUERY,
    variables: {
      catalogId: params.catalog_id,
    },
  })

  return (
    <div className="catalog-page container mx-auto">
      {JSON.stringify(data)}
      <CatalogInfo
        catalogId={data.catalog.id}
        catalogName={data.catalog.name}
        companyName={data.catalog.seller?.companyName}
        totalAskingPriceUsd={data.catalog.totalAskingPriceUsd}
        totalWeightsKg={1000}
        warehouseLocation="Jakarta, Indonesia"
        updatedAt={data.catalog.createdAt}
      />
      {/* <ProductList products={products} /> */}
    </div>
  )
}
