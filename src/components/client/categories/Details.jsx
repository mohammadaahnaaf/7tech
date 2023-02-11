import Layout from '../../layout/Layout'
import { Category } from './Category'
import React from 'react'


export function Details() {

    const [searchTerm, setSearchTerm] = React.useState('')

    return (
        <Layout setSearchTerm={setSearchTerm}>
            <div className='bg-black'>
                <Category term={searchTerm} />
            </div>
        </Layout>
    )
}