import { Footers, Navbar } from '@seventech/shared'
import axiosRoot from '@seventech/utils/axios-root';
import Head from 'next/head'
import React from 'react'
// import { terms } from 'src/data'

function TermsPage() {

    const [terms, setTerms] = React.useState([])

    //Get Data
    React.useEffect(() => {
        async function getContent() {
            const res = await axiosRoot.get('/content/terms');
            setTerms(res.data)
        }
        getContent()
    }, []);

    return (
        <>
            <Head>
                <title>SevenTech | Terms & Conditions</title>
                <meta name="seventech" content="About Us page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />
            <div className='min-h-screen bg-red-700 text-white border-t-0 border-red-600'>
                <div className='max-w-7xl mx-auto grid'>
                    <h2 className='text-xl md:text-2xl font-semibold text-center py-4'>
                        Terms And Conditions
                    </h2>
                    <div className='grid items-start justify-start gap-5 md:gap-10 px-8 py-5'>
                        {terms.map((item, index) => (
                            <div key={index} className='grid gap-1'>
                                <h3 className='text-sm font-medium md:text-2xl'>{index + 1}. {item.title}</h3>
                                <p className='text-xs font-normal pl-3 md:pl-5 md:text-lg'>{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footers />
        </>
    )
}

export default TermsPage