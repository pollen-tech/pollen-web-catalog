/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'

export default function InternalServerError() {
  return (
    <div className="container mx-auto -mt-24 flex h-screen flex-wrap py-24">
      <div className="relative flex h-full w-full flex-col justify-center lg:w-3/4">
        <h1 className="py-5 text-4xl font-bold text-purple-800 sm:text-6xl lg:text-8xl">
          Sorry it’s Me,
          <br />
          not You :(
        </h1>
        <p className="mt-5   text-gray-500 sm:text-lg">
          Something went wrong. Try to Refresh this page or feel free to Contact
          Us if the problem persists.
        </p>
        <div className="... mt-10 grid h-56   gap-3 sm:grid-cols-1 lg:grid-cols-4">
          <div>
            <button
              type="button"
              className="disabled ma-2 relative block w-11/12 rounded border border-slate-300 bg-white p-2 text-center hover:border-indigo-800"
            >
              Contact Us
            </button>
          </div>
          <div>
            <Link
              href="/"
              type="button"
              className="ma-2 relative block w-11/12 rounded border border-slate-300 bg-white p-2 text-center hover:border-indigo-800"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      <div className="relative hidden h-full w-1/4 lg:block">
        <img
          className=" left-1/6 absolute top-60 -translate-x-1/3 -translate-y-1/3 transform"
          src="/500.png"
          alt="500 - Internal Server Error "
        />
      </div>
    </div>
  )
}
