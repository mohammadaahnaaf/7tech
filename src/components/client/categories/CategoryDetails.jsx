import { Category } from './Category'
import React from 'react'
import { Footers, Navbar } from '@seventech/shared'


export function CategoryDetails() {

    const [searchTerm, setSearchTerm] = React.useState('')
    const [open, setOpen] = React.useState(false)

    return (
        <>
            <Navbar setOpen={setOpen} setSearchTerm={setSearchTerm} />
            <div className='bg-black border-t-2 border-red-600'>
                <Category term={searchTerm} />
            </div>
            <Footers />
        </>
    )
}