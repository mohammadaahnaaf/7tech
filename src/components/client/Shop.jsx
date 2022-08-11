import { ShoppingCartIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Layout from '../layout/Layout'
// import Search from '../shared/Search'

export function Shop({ items, title, term }) {
  console.log(term)
  const searchTerm = term;
  // const [searchTerm, setSearchTerm] = React.useState('')

  return (
    <div className="rounded-md max-w-7xl mx-auto pb-6 sm:px-6 lg:px-8">
      <div>
        {/* <div className='hidden'>
          <Search setSearchTerm={setSearchTerm} />
        </div> */}
        <div className="max-w-2xl mx-auto py-0 px-4 sm:py-0 sm:px-0 lg:max-w-7xl lg:px-0">
          <div className='py-8 bg-gradient-to-r from-black to-red-600 rounded-md'>
            <h2 className="text-2xl font-medium tracking-tight px-5 text-white">{title}</h2>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {items?.filter((item) => {
              if (searchTerm === "") {
                return item;
              } else if (item.color.toString().includes(typeof searchTerm === 'string' ? searchTerm.toLowerCase() : '')) {
                return item;
              } else if (item.name.toLowerCase().includes(typeof searchTerm === 'string' ? searchTerm.toLowerCase() : '')) {
                return item;
              } else if (item.price === (typeof searchTerm === 'string' ? searchTerm.toLowerCase() : '')) {
                return item;
              } return ""
            }).map((product) => (
              <div key={product.id} className="grid relative ring-2 rounded-md hover:zoom-10 ring-gray-300">
                <div className="absolute z-10 grid items-center justify-items-center top-0 right-0 h-10 w-10 text-white rounded-md bg-black bg-opacity-25 hover:bg-opacity-50">
                  <button
                    // onClick={}
                    type='button'
                  >
                    <ShoppingCartIcon className='h-8 w-8' />
                  </button>
                </div>
                <div className="bg-white aspect-w-1 aspect-h-1 rounded-t-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                  <a
                    href='/details'
                  // type='button' onClick={handleClick}
                  >
                    <Image
                      // layout='fill'
                      height={550}
                      width={500}
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      className="w-full h-full object-center rounded-t-lg object-cover"
                    />
                  </a>
                </div>
                <div className="mt-0 p-2 z-10 rounded-b-md bg-gradient-to-b from-red-200 to-red-50 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <Link href={product.href}>
                        <a>
                          <span aria-hidden="true" className="" />
                          {product.name}
                        </a>
                      </Link>

                      {/* <button>
                          <span aria-hidden="true" className="absolute inset-0" />
                          {product.name}
                        </button> */}

                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Shops() {
  return (
    <Layout>
      <Shop />
    </Layout>
  )
}