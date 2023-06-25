'use client'
import Image from 'next/image'
import ImageViewer from '~/components/image-viewer/image-viewer'

type TProductNameCellProps = {
  name: string
  thumbnails: string[]
  shelfLifeRemainingDay: number
}

export function ProductNameCell({
  name,
  thumbnails,
  shelfLifeRemainingDay,
}: TProductNameCellProps) {
  return (
    <div data-testid="product-cell-name" className="flex">
      <div className="mr-3 h-12 w-12 shrink-0 items-center object-contain">
        <ImageViewer
          trigger={
            <Image
              data-testid="product-thumbnail"
              src={
                thumbnails.length > 0
                  ? thumbnails[0]
                  : 'https://placehold.co/48@2x.jpg?text=No+Image'
              }
              alt={name}
              width={48}
              height={48}
            />
          }
          images={thumbnails}
          title={name}
          subTitle="Product Images"
        />
      </div>
      <div className="flex flex-col justify-center">
        <h3
          data-testid="product-name"
          className="text-sm font-semibold text-gray-900"
        >
          {name}
        </h3>
        <p
          className="text-sm text-red-500"
          data-testid="product-shelfLifeRemainingDay"
        >
          Expiring in {shelfLifeRemainingDay} days
        </p>
      </div>
    </div>
  )
}
