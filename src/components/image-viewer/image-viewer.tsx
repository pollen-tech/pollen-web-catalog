import { XMarkIcon } from '@heroicons/react/24/solid'
import * as Dialog from '@radix-ui/react-dialog'
import { useState, type ReactNode } from 'react'
import Image from 'next/image'
import style from './image-viewer.module.css'
import classNames from 'classnames'

export interface ImageViewerProps {
  images: string[]
  title?: string
  subTitle?: string
  trigger: ReactNode
}

export default function ImageViewer({
  images,
  trigger,
  title,
  subTitle,
}: ImageViewerProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)
  const currentImage = images[currentImageIndex]
  const nextImage = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1)
    } else setCurrentImageIndex(0)
  }
  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1)
    } else setCurrentImageIndex(images.length - 1)
  }
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-[100%] max-w-[756px] -translate-x-1/2 -translate-y-1/2 rounded bg-white p-6 md:w-[756px] lg:w-[756px]">
          <Dialog.Title className="mb-4 text-xl font-bold">
            {title || 'Image viewer'}
          </Dialog.Title>
          <div className="grid grid-cols-3">
            <div className="col-span-3 md:col-span-2">
              <div className="flex">
                <div className="flex w-10 flex-none align-middle">
                  <div className="flex flex-col">
                    <div className="flex flex-1"></div>
                    <div className="flex">
                      <button
                        data-testid="prev-image-button"
                        className={classNames(style.actionButton)}
                        onClick={prevImage}
                      >{`<`}</button>
                    </div>
                    <div className="flex flex-1"></div>
                  </div>
                </div>
                <Image
                  data-testid="current-image"
                  width={332}
                  height={332}
                  className="w-150 md:max-w-[332px]"
                  src={currentImage}
                  alt={currentImage}
                  style={{ objectFit: 'cover' }}
                />
                <div className="flex w-10 flex-none">
                  <div className="flex flex-col">
                    <div className="flex flex-1"></div>
                    <div className="flex">
                      <button
                        data-testid="next-image-button"
                        className={classNames(style.actionButton)}
                        onClick={nextImage}
                      >{`>`}</button>
                    </div>
                    <div className="flex flex-1"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-3 md:col-span-1">
              {subTitle}
              <div>
                {images.map((image, index) => (
                  <Image
                    className="pointer float-left p-1"
                    onClick={() => setCurrentImageIndex(index)}
                    width={64}
                    height={64}
                    src={image}
                    alt={image}
                    key={`product-image-${index}`}
                  />
                ))}
              </div>
            </div>
          </div>
          <Dialog.Close asChild>
            <button
              data-testid="close-dialog-button"
              className="absolute right-6 top-6 h-4 w-4 text-gray-900"
              aria-label="Close"
            >
              <XMarkIcon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
