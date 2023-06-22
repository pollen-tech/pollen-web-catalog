/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container mx-auto -mt-24 flex h-screen flex-wrap py-24">
      <div className="relative flex h-full w-full flex-col justify-center lg:w-2/4">
        <h1 className="py-5 text-base/loose font-bold text-purple-800 sm:text-6xl lg:text-8xl">
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
          className="absolute bottom-0 rounded border border-slate-300 bg-white p-2 text-center hover:border-indigo-800"
        >
          Back to Home
        </Link>
      </div>
      <div className=" flex h-screen w-2/4 w-full items-center  justify-center">
        <img src="/400.png" alt="400 Bad Request" />
      </div>
    </div>
  )
}
