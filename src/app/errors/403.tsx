/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'

export default function ForbiddenError() {
  return (
    <div className="container mx-auto -mt-24 flex h-screen flex-wrap py-24">
      <div className="relative flex h-full w-full flex-col justify-center lg:w-2/4">
        <h1 className="py-5 text-base/loose font-bold text-purple-800 sm:text-6xl lg:text-8xl">
          Sorry, Exclusive
          <br />
          Access Required
        </h1>
        <p className="mt-5   text-gray-500 sm:text-lg">
          Unfortunately, you don’t have the permissions required to access this
          page.
        </p>

        <div className="mt-1 grid grid-cols-1  grid-cols-6">
          <div>
            {' '}
            <Link
              href="/"
              type="button"
              className="absolute bottom-0 rounded border border-slate-300 bg-white p-2 text-center hover:border-indigo-800"
            >
              Back to Home
            </Link>
          </div>
          <div>
            <button
              type="button"
              className="disabled absolute bottom-0 rounded border border-slate-300 bg-white p-2 text-center hover:border-indigo-800"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
      <div className=" flex h-screen w-2/4 w-full items-center  justify-center">
        <img src="/403.png" alt="403 - Forbidden " />
      </div>
    </div>
  )
}
