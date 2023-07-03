export interface PaginationParam {
  page: number
  size: number
}

export interface Paginated<T> extends PaginationParam {
  totalPages: number
  totalSize: number
  data: T[]
}
