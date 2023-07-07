'use client'
import * as Dialog from '@radix-ui/react-dialog'
import * as Separator from '@radix-ui/react-separator'

import { XMarkIcon } from '@heroicons/react/24/outline'

import { Button } from '~/components/common/button'
import { useContactSales } from '~/hooks/contact-sales'
export interface ContactSalesModalProps {
  catalogId: string
}

export default function ContactSalesModal({
  catalogId,
}: ContactSalesModalProps) {
  const { loading, sendContactSales } = useContactSales()
  return (
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
              onClick={() => sendContactSales(catalogId)}
            >
              {loading && (
                <>
                  <svg
                    className="... mr-3 h-5 w-5 animate-spin"
                    viewBox="0 0 24 24"
                  ></svg>
                  Processing...
                </>
              )}
              {!loading && 'Yes, Contact Sales'}
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
  )
}
