import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

interface IAlert {
  message: string
  floating?: boolean
}

const FloatingAlert = ({ message }: IAlert) => (
  <div className="fixed bottom-0 left-0 right-0 mb-2 flex items-start justify-start">
    <div className="flex-shrink-0">
      <div className="flex items-start justify-start gap-2 rounded-md border border-red-200 bg-red-50 px-5 py-3">
        <div className="relative h-5 w-5">
          <ExclamationTriangleIcon className="stroke-red-900" />
        </div>
        <div className="flex flex-col items-start justify-start gap-2.5">
          <div className="flex items-start justify-start gap-2">
            <div className="flex flex-col items-start justify-start gap-2">
              <div className="text-sm font-medium leading-tight text-red-800">
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

const FixedAlert = ({ message }: IAlert) => (
  <div className="mb-2 inline-flex h-11 w-full items-start justify-start">
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

export default function Alert({ message, floating }: IAlert) {
  if (floating) {
    return <FloatingAlert message={message} />
  } else {
    return <FixedAlert message={message} />
  }
}
