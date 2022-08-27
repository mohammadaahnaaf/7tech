import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCartIcon } from '@heroicons/react/outline'
// import { MinusIcon, PlusIcon } from '@heroicons/react/solid'
// import Layout from '../layout/Layout'
import { useCart } from 'react-use-cart'

export function Shop({ items, title, term }) {

  const searchTerm = term;
  const {
    addItem,
    isEmpty,
    updateItemQuantity,
  } = useCart();

  // function handleAddCart(product) {
  //   () => addItem(product)
  //   console.log("items: " + totalUniqueItems)
  // }

  // function handleRemoveCart(id) {
  //   () => removeItem(id)
  //   // console.log(totalUniqueItems)
  // }

  return (
    <>
      <div className="max-w-7xl mx-auto pb-6 sm:px-6 lg:px-8">
        <div>
          <div className="max-w-2xl mx-auto px-2 lg:max-w-7xl lg:px-0">
            <div className='py-8 bg-gradient-to-r from-black to-red-600 rounded-lg'>
              <h2 className=" text-lg md:text-2xl font-medium tracking-tight px-5 text-white">{title}</h2>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {items?.filter((item) => {
                if (searchTerm === "") {
                  return item;
                } else if (item.color.toLowerCase().includes(typeof searchTerm === 'string' ? searchTerm.toLowerCase() : '')) {
                  return item;
                } else if (item.name.toLowerCase().includes(typeof searchTerm === 'string' ? searchTerm.toLowerCase() : '')) {
                  return item;
                } else if (item.price.toString().includes(typeof searchTerm === 'string' ? searchTerm.toLowerCase() : '')) {
                  return item;
                } return ""
              }).map((product) => (
                <div key={product.id} className="grid relative ring-2 rounded-md hover:zoom-10 ring-gray-300">
                  <div className="absolute z-10 grid items-center justify-items-center top-0 right-0 h-10 w-10 text-white rounded-md bg-black bg-opacity-25 hover:bg-opacity-50">

                    {/* <button type='button' onClick={() => handleRemoveCart(product.id)} className='relative'>
                      <ShoppingCartIcon className='h-8 w-8 text-red-600' />
                      <MinusCircleIcon className="absolute h-5 w-5 -right-1 -top-1 text-red-600 bg-white rounded-full" />
                    </button> */}

                    <button type='button' onClick={() => addItem(product)}>
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
                  <div className="p-2 z-10 h-[12vh] rounded-b-md bg-gradient-to-b from-red-200 to-red-50 flex justify-between">
                    <div className='grid justify-between'>
                      <div>
                        <Link href={product.href}>
                          <a className="text-sm text-gray-700">
                            {product.name}
                          </a>
                        </Link>
                      </div>
                      <div className='flex items-end justify-between gap-2'>
                        <p className="text-sm text-gray-500">{product.color}</p>
                        <p className="text-sm flex font-medium text-gray-900">৳ {product.price}</p>
                        {/* {!isEmpty && (
                        <div className='flex ring-black ring-1'>
                          <button type='button' onClick={() => updateItemQuantity(product.id, product.quantity + 1)} className='px-3 bg-black hover:bg-opacity-10 bg-opacity-20'><PlusIcon className='h-3 w-3' /></button>
                          <button type='button' onClick={() => updateItemQuantity(product.id, product.quantity - 1)} className='px-3 bg-black hover:bg-opacity-10 bg-opacity-20 border-black border-l'><MinusIcon className='h-3 w-3' /></button>
                        </div>
                      )} */}
                      </div>
                    </div>
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