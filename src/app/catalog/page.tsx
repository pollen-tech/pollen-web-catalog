import dummy_catalog from './dummy-catalog.json'

import { CatalogInfo } from './components/catalog-info'

export default function CatalogPage() {
  const { catalog_info: catalogInfo } = dummy_catalog
  return (
    <div className="catalog-page container mx-auto">
      <CatalogInfo catalogInfo={catalogInfo} />
    </div>
  )
}
