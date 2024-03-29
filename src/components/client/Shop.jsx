import React from 'react'
import { ShoppingCartIcon } from '@heroicons/react/outline'
import { useCart } from 'react-use-cart'
import Link from 'next/link';
import { ProductCards } from './products/ProductCard';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function Shop({ items, title }) {

  let slug = items[0]

  return items.length >= 1 ? (

    <div className='bg-white grid gap-4 px-2 pt-4'>
      {/* Title  */}
      <div className='max-w-7xl w-full mx-auto flex items-center px-5 justify-between hover:cursor-pointer duration-300 py-4 md:py-8 hover:bg-opacity-90 bg-black'>
        <h2 className="text-sm sm:text-md md:text-xl font-medium tracking-tight text-white">{title}</h2>
        <Link href={`/category/${slug.category}`}>
          <a className='hover:ring-0 hover:text-black ring-white bg-black text-white ring-2 px-4 py-0.5 md:py-1 text-xs sm:text-sm md:text-md font-medium hover:bg-white'>Explore more</a>
        </Link>
      </div>

      <div>
        <div className="mx-auto max-w-7xl w-full">
          {/* <Products /> */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {items?.map((product, index) => {
              return (
                <ProductCards key={index} product={product} />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  ) : null
}

export function ProductCard({ product }) {

  const { addItem } = useCart();

  const cartProduct = {
    id: product._id,
    imageSrc: product.images[0],
    name: product.name,
    price: product.onlinePrice,
    category: product.category,
    quantity: 1
  }

  return (
    <div key={product.id} className="group hover:scale-90 duration-300 relative hover:ring-white ring-red-600 ring-2">
      <div className="absolute z-10 grid items-center justify-items-center top-0 right-0 h-10 w-10 text-white hover:bg-opacity-50 ring-2 ring-red-600 ring-opacity-30 bg-black bg-opacity-30">
        <button type='button'
          disabled={!product.inStock}
          onClick={() => addItem(cartProduct)}
          className={classNames(
            !product.inStock ? "cursor-not-allowed" : ""
          )}
        >
          <ShoppingCartIcon className='h-7 w-7' />
        </button>
      </div>
      {product?.images?.slice(0, 1).map((item, index) => (
        <div key={index} className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden group-hover:opacity-75 lg:aspect-none lg:h-80">
          <img
            src={item}
            alt='product image'
            className="h-full w-full z-10 object-cover object-center lg:h-full lg:w-full"
          />
        </div>
      ))}
      <div className="flex w-full p-2 justify-between border-t-2 border-red-600 bg-red-600 bg-opacity-10">
        <div className='w-full grid justify-between items-center min-h-44'>
          <h3 className="text-sm text-gray-200">
            <Link href={`/product/${product?._id}`}>
              <a>
                <span aria-hidden="true" className="absolute inset-0" />
                {product.name.substring(0, 53)}
              </a>
            </Link>
          </h3>
          <div className='flex gap-2 justify-end'>
            <p className="mt-1 text-end line-through text-sm text-red-500">৳ {product.regularPrice}</p>
            <p className="mt-1 text-end text-sm text-green-500">৳ {product.onlinePrice}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// This App is made by Ahnaf and Tanvir.