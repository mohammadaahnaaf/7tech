import { SearchIcon } from '@heroicons/react/outline'
// import { Router } from 'next/router'
import React from 'react'

function Search({ setSearchTerm }) {

    // const handleSubmit = (e) => {
    //     const data = (e.target.value)
    //     if (data.toLoweCase().include(categories.map(i => i.name))) {
    //         Router.push(`/categories/${catName}`)
    //     }
    // }

    function handleSearch(e) {
        setSearchTerm(e.target.value)
    }

    return (
        <form
            // onSubmit={handleSubmit}
        >
            <div className="md:w-[50vh]">
                <div className="md:ml-4 w-full px-3 md:px-0 flex items-baseline">
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
                    <div className="relative w-full">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <SearchIcon className='w-5 h-5 text-red-600 text-opacity-50' />
                            {/* <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg> */}
                        </div>
                        <input
                            type="search"
                            id="default-search"
                            onChange={handleSearch}
                            className="block p-3 pl-10 w-full placeholder-red-600 placeholder-opacity-50 bg-red-600 bg-opacity-20 focus:ring-red-600 text-red-600 ring-red-600 border-red-600 border-opacity-25 ring-opacity-25 focus:border-red-600 shadow-sm sm:text-sm"
                            placeholder="Search..."
                            required
                        />
                        <button type="submit" className="text-red-600 flex absolute inset-y-2 right-2 items-center bg-black font-medium rounded-full text-sm px-3 py-1 hover:bg-red-600 ring-1 ring-opacity-20 ring-red-600">
                            {/* <SearchIcon className='w-5 h-5 text-red-600' />  */}
                            Search
                        </button>
                    </div>
                </div>

            </div>
        </form>
    )
}

export default Search