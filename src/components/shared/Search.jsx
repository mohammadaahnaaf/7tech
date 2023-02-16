import React from 'react'
import { useRouter } from 'next/router'
import { SearchIcon } from '@heroicons/react/outline'

function Search({ setSearchTerm }) {

    const router = useRouter()

    const handleSubmit = (e) => {
        e.preventDefault()
        setSearchTerm('')
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
            <div>
                <div className="mx-2 flex items-baseline">
                    <label htmlFor="search" className="mb-2 text-sm font-medium sr-only">Search</label>
                    <div className="relative w-full">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <SearchIcon className='w-5 h-5 text-red-500 text-opacity-70' />
                        </div>
                        <input
                            type="search"
                            id="search"
                            name="search"
                            onChange={handleSearch}
                            className="block p-3 pl-10 w-full placeholder-red-500 placeholder-opacity-70 bg-transparent focus:ring-red-600 text-red-600 ring-red-600 border-red-600 focus:border-red-500 shadow-sm sm:text-sm"
                            placeholder="Search..."
                            required
                        />
                        <button type="submit" className="px-4 flex absolute inset-y-2 right-2 items-center font-medium rounded-full text-sm py-1 bg-red-600 hover:bg-black text-black hover:text-red-600 hover:ring-1 ring-red-600">
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