import React from 'react'
import { ShoppingCartIcon } from '@heroicons/react/outline'
import { useCart } from 'react-use-cart'
import { useRouter } from 'next/router'
import axiosRoot from '../utils/axios-root';

export function Shop({ items, title, term, filters }) {

  const searchTerm = term;
  const filterI = filters;

  // function handleAddCart(product) {
  //   () => addItem(product)
  //   console.log("items: " + totalUniqueItems)
  // }

  // function handleRemoveCart(id) {
  //   () => removeItem(id)
  //   // console.log(totalUniqueItems)
  // }

  return (
    <div className='bg-black px-3 py-3'>
      {items.map((i) => {
        return i.category === filterI ? (
          <div className='max-w-7xl mx-auto py-8 bg-gradient-to-r from-black to-red-600 ring-white ring-2'>
            <h2 className=" text-lg md:text-2xl font-medium tracking-tight px-5 text-white">{title}</h2>
          </div>
        ) : null
      })}
      <div className='max-w-7xl items-center justify-center justify-items-center mx-auto mt-3 gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5'>
        {items?.filter((item) => {
          if (searchTerm === "") {
            return item;
          } else if (item.name.toLowerCase().includes(typeof searchTerm === 'string' ? searchTerm.toLowerCase() : '')) {
            return item;
          } else if (item.price.toString().includes(typeof searchTerm === 'string' ? searchTerm.toLowerCase() : '')) {
            return item;
          } return ""
        }).map((product) => {
          return filterI === product.category ? (
            <ProductCard product={product} />
          ) : null
        })}
      </div>
    </div>
  )
}

export function ProductCard({ product }) {

  const [images, setImages] = React.useState([]);
  const { addItem } = useCart();
  const router = useRouter()

  // get product data 
  React.useEffect(() => {
    async function getImages() {
      const res = await axiosRoot.get(`/products/${product._id}`);
      setImages(res.data.images)
    }
    getImages()
  }, []);

  const cartProduct = {
    id: product._id,
    imageSrc: images.map((i) => i),
    name: product.name,
    price: product.price,
    category: product.category,
    quantity: 1
  }

  return (

    <div key={product?._id} className="w-full h-[45vh] relative max-w-xs bg-red-600 bg-opacity-10 shadow-md ring-2 ring-opacity-30 ring-red-600">
      <div className="absolute z-10 grid items-center justify-items-center top-0 right-0 h-10 w-10 text-white hover:bg-opacity-50 ring-2 ring-red-600 ring-opacity-30 bg-black bg-opacity-30">
        <button type='button' onClick={() => addItem(cartProduct)}>
          <ShoppingCartIcon className='h-7 w-7' />
        </button>
      </div>
      <div className='bg-white h-[32vh]'>
        {images.map((item, index) => (
          <button key={index} onClick={() => router.push(`/product/${product?._id}`)}>
            <img className="p-8 rounded-t-lg" src={`${item}` || product?.imageSrc} alt="product image" />
          </button>
        ))}
        {/* <img className="p-8 rounded-t-lg" src={product?.imageSrc} alt="product image" /> */}
      </div>
      <div className="p-3 border-t-2 z-20 border-red-600 border-opacity-30">
        <a href="#">
          <h5 className="text-sm font-medium tracking-tight text-gray-300">{product?.name}</h5>
        </a>
        {/* <div className="flex items-center mt-2.5 mb-5">
          <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
          <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Second star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
          <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Third star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
          <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fourth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
          <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
          <span className="bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-800 ml-3">5.0</span>
        </div> */}
        <div className="flex justify-between items-center mt-2">
          {product.stock === 0 && (
            <p className="text-sm text-red-600 px-2">Stock over</p>
          )}
          <p className="text-lg font-medium text-green-600">৳ {product?.price}</p>
          {/* <a href="#" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium text-sm px-5 py-2.5 text-center">Add to cart</a> */}
        </div>
      </div>
    </div>

  )
}

