import type { Batch, Catalog } from '@pollen-tech/appsync-schema'

import { CatalogInfo } from './components/catalog-info'
import { ProductList } from './components/product-list'

import { query } from '~/lib/client'

import { GET_CATALOG_QUERY } from './query.gql'

type TQueryResponse = {
  catalog: Catalog
}

export default async function CatalogPage({
  params,
}: {
  params: { catalog_id: string }
}) {
  const { data } = await query<TQueryResponse>({
    query: GET_CATALOG_QUERY,
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
        companyLogo={data.catalog.seller?.logo}
        totalAskingPriceUsd={data.catalog.totalAskingPriceUsd}
        totalWeight={data.catalog.totalWeight}
        warehouseLocation={data.catalog.warehouseLocation ?? '-'}
        updatedAt={data.catalog.createdAt}
      />
      <ProductList products={(data.catalog.batches as Batch[]) || []} />
    </div>
  )
}
