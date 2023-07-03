/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'

export default function ForbiddenError() {
  return (
    <div className="container mx-auto -mt-24 flex h-screen flex-wrap py-24">
      <div className="relative flex h-full w-full flex-col justify-center lg:w-3/4">
        <h1 className="py-5 text-4xl font-bold text-purple-800 sm:text-6xl lg:text-7xl">
          Sorry, Exclusive Access Required
        </h1>
        <p className="mt-5   text-gray-500 sm:text-lg">
          Unfortunately, you don’t have the permissions required to access this
          page.
        </p>
        <div className="... mt-10 grid h-56   gap-3 sm:grid-cols-1 lg:grid-cols-4">
          <div>
            {' '}
            <Link
              href="/"
              type="button"
              className="ma-2 relative block w-11/12 rounded border border-slate-300 bg-white p-2 text-center hover:border-indigo-800"
            >
              Back to Home
            </Link>
          </div>
          <div>
            <button
              type="button"
              className="disabled ma-2 relative block w-11/12 rounded border border-slate-300 bg-white p-2 text-center hover:border-indigo-800"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>

      <div className="relative hidden h-full w-1/4 lg:block">
        <img
          className=" left-1/6 absolute top-60 -translate-x-1/3 -translate-y-1/3 transform"
          src="/403.png"
          alt="403 - Forbidden Error "
        />
      </div>
    </div>
  )
}
