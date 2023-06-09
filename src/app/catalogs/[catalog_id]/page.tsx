import type { Batch } from '@pollen-tech/appsync-schema'

import { fetchCatalogDetail } from '~/services/catalogs/catalog'

import { CatalogInfo } from './components/catalog-info'
import { ProductList } from './components/product-list'
import { cookies } from 'next/headers'

type TCatalogPageProps = {
  params: { catalog_id: string }
}

export default async function CatalogPage({ params }: TCatalogPageProps) {
  const catalog = await fetchCatalogDetail(params.catalog_id, {
    cookies: cookies(),
  })

  return (
    <div className="catalog-page container mx-auto">
      <CatalogInfo
        catalogId={catalog.id}
        catalogName={catalog.name}
        companyName={catalog.seller?.companyName}
        companyLogo={catalog.seller?.logo}
        totalAskingPriceUsd={catalog.totalAskingPriceUsd}
        totalWeight={catalog.totalWeight}
        warehouseLocation={catalog.warehouseLocation ?? '-'}
        updatedAt={catalog.createdAt}
      />
      <ProductList products={(catalog.batches as Batch[]) || []} />
    </div>
  )
}
