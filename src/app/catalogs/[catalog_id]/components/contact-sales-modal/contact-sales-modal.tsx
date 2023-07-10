'use client'
import * as Dialog from '@radix-ui/react-dialog'
import * as Separator from '@radix-ui/react-separator'

import { XMarkIcon } from '@heroicons/react/24/outline'

import { Button } from '~/components/common/button'
import { useContactSales } from '~/hooks/contact-sales'
import ContactSalesSuccessDialog from './contact-sales-success-dialog'
import { useRef, useState } from 'react'
export interface ContactSalesModalProps {
  catalogId: string
}

export default function ContactSalesModal({
  catalogId,
}: ContactSalesModalProps) {
  const { loading, sendContactSales } = useContactSales()
  const [successOpen, setSuccessOpen] = useState(false)
  const buttonCloseRef = useRef<HTMLButtonElement>(null)
  const onSuccessModalClose = () => {
    setSuccessOpen(false)
    buttonCloseRef && buttonCloseRef.current && buttonCloseRef.current.click()
  }
  return (
    <>
      <ContactSalesSuccessDialog
        open={successOpen}
        onClose={onSuccessModalClose}
      />
      <Dialog.Root data-testid="dialog-root">
        <Dialog.Trigger asChild>
          <Button
            data-testid="trigger-dialog-button"
            className="mb-2 block w-full"
          >
            Contact Sales
          </Button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/40" />
          <Dialog.Content className="fixed left-1/2 top-1/2 max-w-[522px] -translate-x-1/2 -translate-y-1/2 rounded bg-white p-6 sm:left-1/2 sm:w-[522px]">
            <Dialog.Title className="mb-4 text-xl font-bold"></Dialog.Title>
            <article className="prose" data-testid="caption">
              <h3>Are you sure want to contact our sales team?</h3>
              <p>
                To make an offer to this catalog, you will be connected with one
                of our sales team representative via email to assist you.
              </p>
            </article>
            <Separator.Root className="my-4 h-[1px] w-full bg-gray-100" />
            <div className="flex justify-end">
              <Dialog.Close asChild>
                <Button variant="secondary" className="mr-2">
                  Cancel
                </Button>
              </Dialog.Close>
              <Button
                variant="primary"
                onClick={() =>
                  sendContactSales(catalogId).then(() => setSuccessOpen(true))
                }
              >
                {loading && (
                  <div className="color-white flex">
                    <svg
                      className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </div>
                )}
                {!loading && 'Yes, Contact Sales'}
              </Button>
            </div>
            <Dialog.Close asChild>
              <button
                ref={buttonCloseRef}
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
    </>
  )
}
