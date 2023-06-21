/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'

export function ComingSoon() {
  return (
    <div className="container mx-auto -mt-24 flex h-screen flex-wrap py-24">
      <div className="relative flex h-full w-2/4 flex-col justify-center">
        <h1 className="py-5 text-8xl font-bold text-purple-800">
          Coming Soon Pollen Market
        </h1>
        <p className="my-5 text-lg">
          A whole brand new B2B Liquidation Marketplace experience is coming
          your way this June 2023. Together let’s work toward a zero-waste
          world.
        </p>
        <p className="my-5 text-lg">
          Existing Pollen Pass Member?{' '}
          <Link className="text-pollen-purple underline" href="/api/auth/login">
            Go to Sign In Page
          </Link>{' '}
        </p>
        <span className="absolute bottom-0 text-sm text-gray-500">
          © Copyrights Pollen Tech
        </span>
      </div>
      <div className="h-full w-2/4">
        <img
          className="absolute right-0 top-48 max-h-[75%] max-w-full object-contain"
          src="/coming-soon.png"
          alt="Coming Soon"
        />
      </div>
    </div>
  )
}
