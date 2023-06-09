import { Card } from '~/components/common/card'
import { CatalogList } from './components/catalog-list/catalog-list'
import { SearchInfo } from './components/search/search-info'
import { fetchCatalogs } from '~/services/catalogs/catalog'
import Pagination from '~/components/pagination/pagination'
import { cookies } from 'next/headers'
export interface CatalogListPageProps {
  searchParams: {
    search?: string
    page?: number
    size?: number
    sort?: string
    sortDirection?: string
    sellerId?: string
  }
}
export default async function CatalogListPage({
  searchParams,
}: CatalogListPageProps) {
  const { search, page, size, sort, sortDirection, sellerId } = searchParams
  const catalogs = await fetchCatalogs(
    search,
    page,
    size,
    sort,
    sortDirection,
    sellerId,
    {
      cookies: cookies(),
    }
  )
  return (
    <div className="catalog-page container mx-auto">
      <SearchInfo />
      <Card className="mt-6 border-collapse border-collapse border  border-slate-300 bg-white">
        <div className="container mx-auto p-2">
          <CatalogList catalogs={catalogs.data} />
        </div>
      </Card>
      <Pagination
        page={catalogs.page}
        totalPages={catalogs.totalPages}
      ></Pagination>
    </div>
  )
}
