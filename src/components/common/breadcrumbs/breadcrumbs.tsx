import Link from 'next/link'
// defining the Props
type CrumbItem = {
  label: string
  path: string
}
export function Breadcrumbs({ items }: { items: CrumbItem[] }) {
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
          return crumb.label
        }
      })}
    </div>
  )
}
