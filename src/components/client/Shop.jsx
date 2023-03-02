import React from 'react'
import { ShoppingCartIcon } from '@heroicons/react/outline'
import { useCart } from 'react-use-cart'
import Link from 'next/link';
import { ProductCards } from './products/ProductCard';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function Shop({ items, title, term, qey }) {

  let searchTerm = term;

  // Search filter 
  // const slugs = ['name', 'category', 'subCategory', 'tags', 'imageAlt', 'code']
  // const search = (data) => {
  //   return data.filter((item) =>
  //     slugs.some((key) => (typeof item[key] === 'string' ? item[key].toLowerCase() : '').includes(searchTerm))
  //   )
  // }
  let slug = items[0]
  return items.length >= 1 ? (

    <div key={qey} className='bg-black grid gap-4 px-2 pt-4'>
      {/* Title  */}
      <div className='max-w-7xl w-full hover:scale-95 hover:animate-pulse hover:cursor-pointer duration-300 mx-auto py-4 md:py-8 bg-gradient-to-r from-black to-red-600 ring-white ring-2'>
        <h2 className="text-sm sm:text-md md:text-2xl font-medium tracking-tight px-5 text-white">{title}</h2>
      </div>

      <div>
        <div className="mx-auto max-w-7xl">
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
      <div className='max-w-7xl bg-gradient-to-r to-black from-red-600 mx-auto text-right text-white hover:text-red-600 text-sm w-full ring-white ring-2 p-2'>
        <Link href={`/category/${slug.category}`}>
          <a>Explore more...</a>
        </Link>
      </div>

    </div>
  ) : null
}

export function ProductCard({ product }) {

  const { addItem } = useCart();
  // const [images, setImages] = React.useState([]);
  // const router = useRouter()

  // // get product data 
  // React.useEffect(() => {
  //   async function getImages() {
  //     const res = await axiosRoot.get(`/products/${product._id}`);
  //     setImages(res.data.images)
  //     // setiCategory(product.category)
  //   }
  //   getImages()
  // }, []);

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
        <div className='w-full'>
          <h3 className="text-lg text-gray-200">
            <Link href={`/product/${product?._id}`}>
              <a>
                <span aria-hidden="true" className="absolute inset-0" />
                {product.name.substring(0, 23)}
              </a>
            </Link>
          </h3>
          <p className="mt-1 text-end text-md text-green-500">৳ {product.onlinePrice}</p>
        </div>
      </div>
    </div>
  )
}

