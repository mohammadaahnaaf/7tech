import { ShoppingCartIcon } from '@heroicons/react/outline'
import Image from 'next/image'
// import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Layout from './layout/Layout'
import { products } from '../data/ProductsData'

export function Shop({ handleClick }) {
  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-0 px-4 sm:py-0 sm:px-0 lg:max-w-7xl lg:px-0">
          <div className='py-10 bg-pink-200 rounded-md'>
            <h2 className="text-2xl font-medium tracking-tight px-5 text-white">Offers Going On</h2>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div key={product.id} className="grid relative">
                <div className="absolute z-10 grid items-center justify-items-center top-0 right-0 h-10 w-10 text-white rounded-md bg-black bg-opacity-25 hover:bg-opacity-50">
                  <button
                    // onClick={}
                    type='button'
                  >
                    <ShoppingCartIcon className='h-8 w-8' />
                  </button>
                </div>
                <div className="w-full min-h-80 bg-white aspect-w-1 aspect-h-1 rounded-t-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                  <button type='button' onClick={handleClick}>
                    <Image
                      layout='fill'
                      src={product.imageSrc}
                      // src='/products/phone-6.jpg'
                      alt={product.imageAlt}
                      className="w-full h-full object-center rounded-lg object-cover lg:w-full lg:h-full"
                    />
                  </button>
                </div>
                <div className="mt-0 p-2 z-10 rounded-b-md bg-pink-100 flex justify-between">
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