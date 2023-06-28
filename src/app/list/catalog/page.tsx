import type { Batch } from '@pollen-tech/appsync-schema'
import { Button } from '~/components/common/button'

import { Card } from '~/components/common/card'
import { CatalogList } from './components/catalog-list/catalog-list'
import { SearchInfo } from './components/search/search-info'
export default function CatalogListPage() {
  // const catalog = await fetchCatalog(params.catalog_id)
  return (
    <div className="catalog-page container mx-auto">
      <SearchInfo />
      <Card className="mt-6">
        <div className="container mx-auto p-4">
          <CatalogList catalogs={[]} />
        </div>
      </Card>
    </div>
  )
}
