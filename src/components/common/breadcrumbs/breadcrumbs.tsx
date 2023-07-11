import Link from 'next/link'
// defining the Props
type CrumbItem = {
  label: string
  path: string
}
type BreadcrumbsProps = {
  items: CrumbItem[]
}
// components/breadcrumbs/Breadcrumbs.ts

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <div className="flex items-start gap-2 text-xs">
      {items.map((crumb, i) => {
        const isLastItem = i === items.length - 1
        if (!isLastItem) {
          return (
            <>
              <Link href={crumb.path} key={i} className="text-pollen-purple">
                {crumb.label}
              </Link>
              {/* separator */}
              <span> / </span>
            </>
          )
        } else {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return crumb.label
        }
      })}
    </div>
  )
}
