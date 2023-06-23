/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container mx-auto -mt-24 flex h-screen flex-wrap py-24">
      <div className="relative flex h-full w-full flex-col justify-center lg:w-2/4">
        <h1 className="py-5 text-4xl font-bold text-purple-800 sm:text-6xl lg:text-7xl">
          Oops :(
          <br />
          Page Not Found
        </h1>
        <p className="mt-5   text-gray-500 sm:text-lg">
          Maybe this page used to exist or something/the link spelled wrong.
          Chances that maybe something spelled wrong, so{' '}
          <span className="text-black-100 font-bold sm:text-lg ">
            can you please double check the URL?
          </span>
        </p>

        <Link
          href="/"
          type="button"
          className="relative mt-5 w-48 rounded border border-slate-300 bg-white p-2 text-center hover:border-indigo-800"
        >
          Back to Home
        </Link>
      </div>

      <div className="relative hidden h-full w-1/3 lg:block">
        <img
          className="absolute left-2/4 top-80 -translate-x-1/3 -translate-y-1/3 transform"
          src="/400.png"
          alt="400 Bad Request"
        />
      </div>
    </div>
  )
}
