import React from 'react'
import { useRouter } from 'next/router'
import { SearchIcon } from '@heroicons/react/outline'

function Search({ setSearchTerm }) {

    const router = useRouter()

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget);
        const slug = {
            name: data.get('search')
          }
        router.push(`/category/${slug.name}`)
    }

    function handleSearch(e) {
        setSearchTerm(e.target.value)
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="md:w-[50vh]">
                <div className="md:ml-4 w-full px-3 md:px-0 flex items-baseline">
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
                    <div className="relative w-full">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <SearchIcon className='w-5 h-5 text-red-600 text-opacity-50' />
                        </div>
                        <input
                            type="search"
                            id="search"
                            name="search"
                            onChange={handleSearch}
                            className="block p-3 pl-10 w-full placeholder-red-600 placeholder-opacity-50 bg-red-600 bg-opacity-20 focus:ring-red-600 text-red-600 ring-red-600 border-red-600 border-opacity-25 ring-opacity-25 focus:border-red-600 shadow-sm sm:text-sm"
                            placeholder="Search..."
                            required
                        />
                        <button type="submit" className="text-red-600 flex absolute inset-y-2 right-2 items-center bg-black font-medium rounded-full text-sm px-3 py-1 hover:bg-red-600 hover:text-white ring-1 ring-opacity-20 ring-red-600">
                            {/* <SearchIcon className='w-5 h-5 text-red-600' />  */}
                            Search
                        </button>
                    </div>
                </div>

            </div>
        </form>
    )
}

export default Search;