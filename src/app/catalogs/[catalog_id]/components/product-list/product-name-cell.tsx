import Image from 'next/image'

type TProductNameCellProps = {
  name: string
  thumbnail?: string
  shelfLifeRemainingDay: number
}

export function ProductNameCell({
  name,
  thumbnail,
  shelfLifeRemainingDay,
}: TProductNameCellProps) {
  return (
    <div className="flex">
      <div className="mr-3 h-12 w-12 shrink-0 items-center object-contain">
        <Image
          src={thumbnail || 'https://placehold.co/48@2x.jpg?text=No+Image'}
          alt={name}
          width={48}
          height={48}
        />
      </div>
      <div className="flex flex-col justify-center">
        <h3 className="text-sm font-semibold text-gray-900">{name}</h3>
        <p className="text-sm text-red-500">
          Expiring in {shelfLifeRemainingDay} days
        </p>
      </div>
    </div>
  )
}
