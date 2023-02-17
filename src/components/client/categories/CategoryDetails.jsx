import { Category } from './Category'
import React from 'react'
import { Layout } from '@seventech/layout'


export function CategoryDetails() {

    const [searchTerm, setSearchTerm] = React.useState('')

    return (
        <Layout setSearchTerm={setSearchTerm}>
            <div className='bg-black'>
                <Category term={searchTerm} />
            </div>
        </Layout>
    )
}