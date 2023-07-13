import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline'

interface IAlert {
  message: string
  title?: string
  floating?: boolean
  onClose?: () => void
}

const FloatingAlert = ({ message, title, onClose }: IAlert) => (
  <div
    className="mb-4 inline-flex min-h-fit w-96 items-start justify-start gap-2 rounded-md border border-red-200 bg-red-50 px-5 py-3"
    data-testid="floating-alert-wrapper"
  >
    <div className="relative h-5 w-5">
      <ExclamationTriangleIcon className="stroke-red-900" />
    </div>
    <div className="inline-flex shrink grow basis-0 flex-col items-start justify-start gap-2.5">
      <div className="inline-flex items-start justify-start gap-2 self-stretch">
        <div className="inline-flex shrink grow basis-0 flex-col items-start justify-start gap-2">
          <div className="self-stretch text-sm font-medium leading-tight text-red-800">
            {title}
          </div>
          <div className="self-stretch text-sm font-normal leading-tight text-red-700">
            {message}
          </div>
        </div>
        <div className="relative h-5 w-5" onClick={() => onClose && onClose()}>
          <XMarkIcon className="stroke-red-900 hover:cursor-pointer" />
        </div>
      </div>
    </div>
  </div>
)

const FixedAlert = ({ message }: IAlert) => (
  <div
    className="mb-2 inline-flex h-11 w-full items-start justify-start"
    data-testid="fixed-alert-wrapper"
  >
    <div className="flex h-11 shrink grow basis-0 items-start justify-start">
      <div className="flex h-11 shrink grow basis-0 items-start justify-start gap-2 rounded-md border border-red-200 bg-red-50 px-5 py-3">
        <div className="relative h-5 w-5">
          <ExclamationTriangleIcon className="stroke-red-900" />
        </div>
        <div className="inline-flex shrink grow basis-0 flex-col items-start justify-start gap-2.5">
          <div className="inline-flex items-start justify-start gap-2 self-stretch">
            <div className="inline-flex shrink grow basis-0 flex-col items-start justify-start gap-2">
              <div className="self-stretch text-sm font-medium leading-tight text-red-800">
                {message}
              </div>
            </div>
            <div className="relative h-5 w-5" />
          </div>
        </div>
      </div>
    </div>
  </div>
)

export const Alert = ({ message, title, floating, onClose }: IAlert) => {
  return (
    <>
      {floating ? (
        <FloatingAlert message={message} title={title} onClose={onClose} />
      ) : (
        <FixedAlert message={message} />
      )}
    </>
  )
}
