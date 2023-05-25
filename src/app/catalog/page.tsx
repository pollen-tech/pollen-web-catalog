import dummy_catalog from './dummy-catalog.json'

import { CatalogInfo } from './components/catalog-info'
import { ProductList } from './components/product-list'

export default function CatalogPage() {
  const { info: catalogInfo, products } = dummy_catalog
  return (
    <div className="catalog-page container mx-auto">
      <CatalogInfo catalogInfo={catalogInfo} />
      <ProductList products={products} />
    </div>
  )
}
