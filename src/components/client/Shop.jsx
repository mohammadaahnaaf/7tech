import React, { useState } from 'react'
import { ShoppingCartIcon } from '@heroicons/react/outline'
import { useCart } from 'react-use-cart'
import axiosRoot from '../utils/axios-root';
import Product from './products/Product';
import Link from 'next/link';

export function Shop({ items, title, term, key }) {

  // const [iCategory, setiCategory] = useState('')
  const searchTerm = term;

  const slugs = ['name', 'category', 'tags', 'price', 'code', 'quantity']

  const search = (data) => {
    return data.filter((item) =>
      slugs.some((key) => (typeof item[key] === 'string' ? item[key].toLowerCase() : '').includes(searchTerm))
    )
  }

  return items.length >= 1 ? (

    <div key={key} className='bg-black px-3 py-3'>
      {/* Title  */}
      <div className='max-w-7xl hover:scale-95 hover:animate-pulse hover:cursor-pointer duration-300 mx-auto py-8 bg-gradient-to-r from-black to-red-600 ring-white ring-2'>
        <h2 className=" text-lg md:text-2xl font-medium tracking-tight px-5 text-white">{title}</h2>
      </div>


      <div>
        <div className="mx-auto mt-4 max-w-7xl">
          {/* <Products /> */}
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {search(items)?.map((product) => {
              return (
                <>
                  <Product product={product} />
                  {/* filterI === product.category ? */}
                  {/* <Product setiCategory={setiCategory} product={product} /> */}
                </>
              )
            })}
          </div>
        </div>
      </div>

    </div>
  ) : null
}

export function ProductCard({ setiCategory, product }) {

  const [images, setImages] = React.useState([]);
  const { addItem } = useCart();
  // const router = useRouter()

  // get product data 
  React.useEffect(() => {
    async function getImages() {
      const res = await axiosRoot.get(`/products/${product._id}`);
      setImages(res.data.images)
      setiCategory(product.category)
    }
    getImages()
  }, []);

  const cartProduct = {
    id: product._id,
    imageSrc: images[0],
    name: product.name,
    price: product.price,
    category: product.category,
    quantity: 1
  }

  return (
    <div key={product.id} className="group hover:scale-90 duration-300 relative hover:ring-white ring-red-600 ring-2">
      <div className="absolute z-10 grid items-center justify-items-center top-0 right-0 h-10 w-10 text-white hover:bg-opacity-50 ring-2 ring-red-600 ring-opacity-30 bg-black bg-opacity-30">
        <button type='button'
          onClick={() => addItem(cartProduct)}
        >
          <ShoppingCartIcon className='h-7 w-7' />
        </button>
      </div>
      {images.slice(0, 1).map((item, index) => (
        <div key={index} className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden group-hover:opacity-75 lg:aspect-none lg:h-80">
          <img
            src={`${item}` || product?.imageSrc}
            alt='product image'
            className="h-full w-full z-10 object-cover object-center lg:h-full lg:w-full"
          />
        </div>
      ))}
      <div className="flex w-full p-2 justify-between border-t-2 border-red-600 bg-red-600 bg-opacity-10">
        <div className='w-full'>
          <h3 className="text-lg text-gray-200">
            <Link href={`/product/${product?._id}`}>
              <a>
                <span aria-hidden="true" className="absolute inset-0" />
                {product.name.substring(0, 23)}
              </a>
            </Link>
          </h3>
          <p className="mt-1 text-end text-md text-green-500">৳ {product.price}</p>
        </div>
      </div>
    </div>
  )
}

