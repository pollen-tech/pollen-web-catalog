import * as Dialog from '@radix-ui/react-dialog'
import * as Separator from '@radix-ui/react-separator'

import { DocumentIcon, XMarkIcon } from '@heroicons/react/24/outline'

import { Button } from '~/components/common/button'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { readFromFile } from '~/lib/excel'
import { useInternalRequest } from '~/hooks/request'
import awaitToError from '~/utils/awaitToError'
import Alert from '~/components/alert/alert'

export interface MakeOfferModalProps {
  catalogId: string
}

export function MakeOfferModal({ catalogId }: MakeOfferModalProps) {
  const [dragging, setDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [errors, setErrors] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { req } = useInternalRequest()

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragging(false)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragging(false)

    const files = e.dataTransfer.files ?? [null]
    // Process the uploaded files here
    setFile(files[0])
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ?? [null]
    // Process the uploaded files here
    setFile(files[0])
  }

  const handleContinue = async () => {
    const jsonData = await readFromFile(file as Blob)
    const [err, request] = await awaitToError(
      req.post(`/api/catalogs/${catalogId}/parse-excel`, { data: jsonData })
    )
  }

  const checkFile = () => {
    return !(file?.name.endsWith('.xlsx') || file?.name.endsWith('.xls'))
  }

  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button
            data-testid="trigger-dialog-button"
            className="mb-2 block w-full"
          >
            Make an Offer
          </Button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/40" />
          <Dialog.Content className="fixed left-1/2 top-1/2 max-w-[522px] -translate-x-1/2 -translate-y-1/2 rounded bg-white p-6 sm:left-1/2 sm:w-[522px]">
            <Dialog.Title className="mb-4 text-xl font-bold">
              Make Offer by Excel File
            </Dialog.Title>
            <Separator.Root className="my-4 h-[1px] w-full bg-gray-100" />
            <div className="step-1">
              <h3 className="mb-2 text-sm font-semibold text-gray-900">
                Step 1
              </h3>
              <p className="mb-2 text-xs">
                Download Catalog as Excel, then fill in the required Offered
                Unit and Offered Price
              </p>
              <Link
                href={`/api/catalogs/${catalogId}/excel-file`}
                target="_blank"
              >
                <Button variant="secondary" className="block">
                  Download Catalog
                </Button>
              </Link>
            </div>
            <Separator.Root className="my-4 h-[1px] w-full bg-gray-100" />
            <h3 className="mb-2 text-sm font-semibold text-gray-900">Step 2</h3>
            <p className="mb-2 text-xs">Upload the completed XLS below</p>
            {checkFile() && <Alert message="File type must be .xls or .xlsx" />}
            {!file ? (
              <div
                className={`mb-4 flex cursor-pointer flex-col items-center justify-center rounded border border-solid border-gray-200 px-4 py-8 shadow-sm ${
                  dragging ? 'bg-slate-100' : ''
                }`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={handleClick}
              >
                <input
                  type="file"
                  className="hidden"
                  accept=".xls, .xlsx"
                  data-testid="file-input"
                  ref={fileInputRef}
                  onChange={handleChange}
                />
                <DocumentIcon className="mb-4 h-8 w-8 text-pollen-purple" />
                <p className="mb-1 block">
                  <span className="text-pollen-purple">Upload a file</span> or
                  drag and drop
                </p>
                <p className="text-sm text-gray-500">XLS up to 5MB</p>
              </div>
            ) : (
              <div>
                <p className="mb-2 text-xs">Added File:</p>
                <div className="mb-4 flex items-center justify-between py-2">
                  <p className="text-xs">{file.name}</p>
                  <button
                    type="button"
                    className="text-sm text-pollen-purple"
                    onClick={() => {
                      setFile(null)
                    }}
                  >
                    Replace File
                  </button>
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <Dialog.Close asChild>
                <Button variant="secondary" className="mr-2">
                  Cancel
                </Button>
              </Dialog.Close>
              <Button
                disabled={checkFile()}
                variant="primary"
                className="disabled:cursor-not-allowed"
                onClick={() => handleContinue()}
              >
                Upload and Continue
              </Button>
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
      {errors.map((error) => (
        <Alert
          key={`${error.split(' ').join('-')}`}
          message={error}
          floating={true}
        />
      ))}
    </>
  )
}
