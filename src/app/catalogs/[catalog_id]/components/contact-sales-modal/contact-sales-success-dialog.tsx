import { XMarkIcon } from '@heroicons/react/24/outline'
import * as Dialog from '@radix-ui/react-dialog'

export interface ContactSalesSuccessDialogProps {
  open?: boolean
  onClose?: () => void
}
export default function ContactSalesSuccessDialog({
  open,
  onClose,
}: ContactSalesSuccessDialogProps) {
  return (
    <Dialog.Root open={open} modal={true}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 max-w-[522px] -translate-x-1/2 -translate-y-1/2 rounded bg-white sm:left-1/2 sm:w-[522px]">
          <Dialog.Title className="mb-4 p-6 text-center text-xl font-bold">
            Your Request has been sent!
            <div className=" text-center text-[14px] font-normal leading-tight text-gray-900">
              Our team has received your submission
            </div>
          </Dialog.Title>
          <div
            data-testid="dialog-container"
            className="inline-flex items-start justify-start rounded-lg bg-white p-6"
          >
            <div className="inline-flex flex-col justify-center gap-6">
              <div className="text-[16px] font-semibold leading-normal text-gray-900">
                Here is what to expect next:
              </div>
              <div className="inline-flex items-center justify-start gap-5 self-stretch">
                <div className="flex items-start justify-start gap-2.5 rounded-lg bg-purple-50 p-[17px]">
                  <div className="relative h-8 w-8">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="Media / Icon">
                        <path
                          id="Icon"
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12.75 6.25C9.16015 6.25 6.25 9.16015 6.25 12.75C6.25 16.3399 9.16015 19.25 12.75 19.25C16.3399 19.25 19.25 16.3399 19.25 12.75C19.25 9.16015 16.3399 6.25 12.75 6.25ZM3 12.75C3 7.36522 7.36522 3 12.75 3C18.1348 3 22.5 7.36522 22.5 12.75C22.5 14.8557 21.8325 16.8055 20.6975 18.3994L28.524 26.226C29.1587 26.8606 29.1587 27.8894 28.524 28.524C27.8894 29.1587 26.8606 29.1587 26.226 28.524L18.3994 20.6975C16.8055 21.8325 14.8557 22.5 12.75 22.5C7.36522 22.5 3 18.1348 3 12.75Z"
                          fill="#8431E7"
                        />
                      </g>
                    </svg>
                  </div>
                </div>
                <div className="inline-flex shrink grow basis-0 flex-col items-start justify-start gap-1">
                  <div className="self-stretch text-[16px] font-semibold leading-normal text-gray-900">
                    Review
                  </div>
                  <div className="self-stretch text-[14px] font-normal leading-tight text-gray-500">
                    Our team will send you email notifications regarding the
                    catalog shortly.
                  </div>
                </div>
              </div>
              <div className="inline-flex items-center justify-start gap-5 self-stretch">
                <div className="flex items-start justify-start gap-2.5 rounded-lg bg-purple-50 p-[17px]">
                  <div className="relative h-8 w-8">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="Media / Icon">
                        <g id="Icon">
                          <path
                            d="M12.75 24.9375C12.75 26.2837 11.6587 27.375 10.3125 27.375C8.96631 27.375 7.875 26.2837 7.875 24.9375C7.875 23.5913 8.96631 22.5 10.3125 22.5C11.6587 22.5 12.75 23.5913 12.75 24.9375Z"
                            fill="#8431E7"
                          />
                          <path
                            d="M24.125 24.9375C24.125 26.2837 23.0337 27.375 21.6875 27.375C20.3413 27.375 19.25 26.2837 19.25 24.9375C19.25 23.5913 20.3413 22.5 21.6875 22.5C23.0337 22.5 24.125 23.5913 24.125 24.9375Z"
                            fill="#8431E7"
                          />
                          <path
                            d="M4.625 4.625C3.72754 4.625 3 5.35254 3 6.25V22.5C3 23.3975 3.72754 24.125 4.625 24.125H6.33126C6.70767 22.2707 8.3471 20.875 10.3125 20.875C12.2779 20.875 13.9173 22.2707 14.2937 24.125H16C16.8975 24.125 17.625 23.3975 17.625 22.5V6.25C17.625 5.35254 16.8975 4.625 16 4.625H4.625Z"
                            fill="#8431E7"
                          />
                          <path
                            d="M22.5 9.5C21.6025 9.5 20.875 10.2275 20.875 11.125V20.9563C21.1375 20.903 21.4092 20.875 21.6875 20.875C23.6529 20.875 25.2923 22.2707 25.6687 24.125H27.375C28.2725 24.125 29 23.3975 29 22.5V14.375C29 13.944 28.8288 13.5307 28.524 13.226L25.274 9.97595C24.9693 9.6712 24.556 9.5 24.125 9.5H22.5Z"
                            fill="#8431E7"
                          />
                        </g>
                      </g>
                    </svg>
                  </div>
                </div>
                <div className="inline-flex shrink grow basis-0 flex-col items-start justify-start gap-1">
                  <div className="self-stretch text-[16px] font-semibold leading-normal text-gray-900">
                    Proceed to Order!
                  </div>
                  <div className="self-stretch text-[14px] font-normal leading-tight text-gray-500">
                    Once your offer is approved, our Pollen team will get in
                    touch with you to share order process.
                  </div>
                </div>
              </div>
              <div className="flex h-10 flex-col items-start justify-start self-stretch">
                <button
                  onClick={onClose}
                  className="flex h-10 flex-col items-start justify-start self-stretch"
                >
                  <div className="flex h-10 flex-col items-center justify-center gap-2.5 self-stretch rounded-md border border border border border-gray-300 bg-white px-5 py-2 shadow">
                    <div className="inline-flex items-center justify-center gap-1.5">
                      <div className="text-center text-[16px] font-medium leading-normal text-gray-700">
                        Close
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
          <Dialog.Close asChild>
            <button
              onClick={onClose}
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
