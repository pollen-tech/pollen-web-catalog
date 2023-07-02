'use client'
import { type FormEventHandler, useState } from 'react'
import { Card } from '~/components/common/card'
import { useRouter } from '~/hooks/router'

export function SearchInfo() {
  const [search, setSearch] = useState('')
  const { pushQuery } = useRouter()
  const submit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    pushQuery({
      search,
    })
  }
  return (
    <>
      <div className="my-4 bg-transparent text-gray-900	">
        <div className="flex items-center py-2">
          <p className="text-sm font-bold">Welcome to Pollen! 🎉</p>
        </div>
        <div className="flex items-center">
          <p className="text-sm">
            Feel free to explore our various catalog curated only for you!
          </p>
        </div>
      </div>

      <Card className="container mx-auto py-0 text-gray-900">
        <div className="grid grid-cols-1 gap-6 py-8 md:grid-cols-2 lg:grid-cols-2">
          <div className="content-start justify-center rounded-xl text-6xl ">
            <form
              onSubmit={submit}
              data-testid="form"
              className="flex items-center"
            >
              <div className="relative sm:w-full md:w-9/12">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  data-testid="search-field"
                  type="text"
                  className="block w-full rounded-lg border border-gray-300  bg-gray-100 p-2.5 pl-10 text-sm text-gray-900 focus:border-purple-600 focus:ring-purple-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-500 dark:focus:ring-purple-500"
                  placeholder="Search "
                  required
                  onChange={({ target: { value } }) => setSearch(value)}
                />
              </div>
            </form>
          </div>
          <div className="flex justify-end sm:w-full md:w-full  ">
            <button className="focus:shadow-outline mx-1 inline-flex  h-10 items-center rounded-lg border border-slate-300 px-5 transition-colors duration-150  hover:border-slate-100 hover:bg-purple-100 sm:w-full md:w-28">
              <span>Sort</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
                strokeWidth="1.5"
                stroke="currentColor"
                className="ml-3 h-4 w-4 fill-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12"
                />
              </svg>
            </button>

            <button className="focus:shadow-outline mx-1 inline-flex  h-10 items-center rounded-lg border border-slate-300 px-5 transition-colors duration-150  hover:border-slate-100 hover:bg-purple-100 sm:w-full md:w-28">
              <span>Filter</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
                strokeWidth="1.5"
                stroke="currentColor"
                className="ml-3 h-4 w-4 fill-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
                />
              </svg>
            </button>
          </div>
        </div>
      </Card>
    </>
  )
}
