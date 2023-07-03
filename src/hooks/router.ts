import {
  useRouter as nextUseRouter,
  usePathname,
  useSearchParams,
} from 'next/navigation'

export const useRouter = () => {
  const router = nextUseRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname() || ''
  return {
    pushQuery: (query: Record<string, string>) => {
      const params = searchParams?.entries() || {}
      const urlParams = new URLSearchParams(params)
      for (const p in query) {
        urlParams.set(p, query[p])
      }
      router.push(`${pathname}?${urlParams.toString()}`)
    },
    router,
    searchParams,
    pathname,
  }
}
