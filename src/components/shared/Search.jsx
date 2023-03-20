import React from 'react'
import { useRouter } from 'next/router'
import { SearchIcon } from '@heroicons/react/outline'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export function Search({ setSearchTerm, searchButton }) {

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
                            <SearchIcon className='w-5 h-5 text-gray-200 text-opacity-70' />
                        </div>
                        <input
                            type="search"
                            id="search"
                            name="search"
                            onChange={handleSearch}
                            className="block p-3 pl-10 w-full placeholder-gray-200 placeholder-opacity-70 bg-transparent focus:ring-red-600 text-red-600 ring-gray-200 border-gray-200 focus:border-red-600 shadow-sm sm:text-sm"
                            placeholder="Search here..."
                            required
                        />
                        <button disabled={searchButton || false} type="submit" className={classNames(searchButton ? "cursor-not-allowed" : "",
                            "px-4 flex absolute inset-y-2 right-2 items-center font-medium rounded-full text-sm hover:bg-red-600 bg-black text-white hover:ring-red-600 ring-1 ring-gray-200")}
                        >Search
                        </button>
                    </div>
                </div>

            </div>
        </form>
    )
}