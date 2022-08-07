import { SearchIcon } from '@heroicons/react/outline'
import React from 'react'

function Search() {
  return (
    <div className="md:w-96">
    <div className="md:ml-3 w-full px-3 md:px-0 flex items-baseline">
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
        <div className="relative w-full">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <SearchIcon className='w-5 h-5 text-gray-500 dark:text-gray-400' />
                {/* <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg> */}
            </div>
            <input
                type="search"
                id="default-search"
                className="block p-3 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-full border border-gray-300 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                placeholder="Search..."
                required
            />
            <button type="button" className="text-white absolute inset-y-2 right-2 items-center  bg-black bg-opacity-20 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-full text-sm px-3 py-1 dark:bg-blur-sm dark:bg-black dark:hover:bg-red-600 dark:focus:ring-red-500">Search</button>
        </div>
    </div>

</div>
  )
}

export default Search