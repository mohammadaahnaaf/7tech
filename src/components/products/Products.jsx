import { ShoppingCartIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { products } from '../../data/ProductsData'
import Layout from '../layout/Layout'
import Modal from './Details'

export function Product() {

  return (

    <>
      <div className="max-w-full mx-auto">
        <div className="relative bg-white overflow-hidden">
          <div className="max-w-2xl lg:max-w-7xl mx-auto ">
            {/* <h2 className="text-2xl font-extrabold tracking-tight text-gray-900"></h2> */}

            <div className="mt-6 grid grid-cols-1 gap-y-4 gap-x-2 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-4">
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
                    <a href='/details'
                    // type='button'
                    // onClick={handleClick}
                    >
                      <Image
                        layout='fill'
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        className="w-full h-full object-center rounded-lg object-cover lg:w-full lg:h-full"
                      />
                    </a>
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
    </>
  )
}

export default function Products() {
  return (
    <Layout>
      <Product />
      <Modal />
    </Layout>
  )
}