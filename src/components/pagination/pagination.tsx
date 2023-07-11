'use client'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from '~/hooks/router'
import classNames from 'classnames'
import { useLoadingStore } from '~/hooks/states/loading'

export interface PaginationProps {
  page: number
  totalPages: number
}

export default function Pagination({ page = 1, totalPages }: PaginationProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { setLoading } = useLoadingStore()
  const [pages, setPages] = useState<number[]>([])
  const { pushQuery } = useRouter()
  const [showCount, setShowCount] = useState(0)
  const nextPage = () => {
    if (page < totalPages)
      pushQuery({
        page: (page + 1).toString(),
      })
    setLoading(true)
  }

  const prevPage = () => {
    if (page > 1)
      pushQuery({
        page: (page - 1).toString(),
      })
    setLoading(true)
  }
  const init = () => {
    if (containerRef.current) {
      const container = containerRef.current
      const showCount = Math.min(
        Math.floor(container.clientWidth || 500 / 100),
        totalPages
      )
      setShowCount(showCount)
      const pages = []
      for (let i = 0; i < showCount; i++) {
        pages.push(i + 1)
      }
      setPages(pages)
    }
  }
  useEffect(() => {
    init()
  }, [])
  const isActiveClass = (_page: number) => {
    if (_page === page) return `bg-polleb-purple-bg text-pollen-purple`
    return ''
  }
  const renderPaginationNumbers = () => {
    return (
      <>
        <a
          data-testid="prev-button"
          onClick={prevPage}
          className="relative ml-2 mr-2 inline-flex cursor-pointer items-center"
        >
          <svg
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
              clipRule="evenodd"
            />
          </svg>
          <span>Previous</span>
        </a>
        {pages.map((_page, index) => (
          <a
            data-testid="page-links"
            onClick={() => pushQuery({ page: _page.toString() })}
            key={`link-page-${index}`}
            className={classNames(
              isActiveClass(_page),
              `relative ml-2 mr-2 inline-flex cursor-pointer items-center rounded-lg bg-white px-4 py-2 text-sm`
            )}
          >
            {index + 1}
          </a>
        ))}
        {showCount < totalPages && (
          <>
            <span className="relative  ml-2 mr-2 inline-flex cursor-pointer items-center px-4 py-2 text-sm font-semibold">
              ...
            </span>
            <a
              data-testid="page-links"
              onClick={() => pushQuery({ page: totalPages.toString() })}
              className={classNames(
                isActiveClass(totalPages),
                `relative ml-2 mr-2 inline-flex cursor-pointer items-center rounded-lg bg-white px-4 py-2 text-sm`
              )}
            >
              {totalPages}
            </a>
          </>
        )}

        <a
          data-testid="next-button"
          onClick={nextPage}
          className="relative  ml-2 mr-2 inline-flex  cursor-pointer items-center px-2 py-2 "
        >
          <span>Next</span>
          <svg
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </>
    )
  }
  return (
    <div
      ref={containerRef}
      data-testid="container"
      className="mb-3 mt-3 flex content-center items-center"
    >
      {pages.length > 0 && (
        <>
          <div data-testid="pagination-container" className="flex-1"></div>
          <nav
            className="isolate inline-flex space-x-4 self-center"
            aria-label="Pagination"
          >
            {renderPaginationNumbers()}
          </nav>
          <div className="flex-1"></div>
        </>
      )}
    </div>
  )
}
