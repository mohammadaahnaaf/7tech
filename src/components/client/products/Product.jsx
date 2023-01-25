import { ShoppingCartIcon } from '@heroicons/react/solid'
import Link from 'next/link';
// import { useRouter } from 'next/router';
import React from 'react'
import { useCart } from 'react-use-cart';
import axiosRoot from '../../utils/axios-root';

function Product({ setiCategory, product }) {

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
        <div key={product.id} className="group hover:scale-90 duration-300 bg-black relative hover:ring-white ring-red-600 ring-2">
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
                        className="h-full w-full z-20 object-cover object-center lg:h-full lg:w-full"
                    />
                </div>
            ))}
            <div className="flex w-full p-2 justify-between border-t-2 border-red-600 bg-red-600 bg-opacity-10">
                <div className='w-full'>
                    <h3 className="text-lg text-gray-200">
                        <Link href={`/product/${product?._id}`}>
                            <a>
                                <span aria-hidden="true" className="absolute inset-0" />
                                {product.name.substring(0, 23) + ' ...'}
                            </a>
                        </Link>
                    </h3>
                    <p className="mt-1 text-end text-md text-green-500">৳ {product.price}</p>
                </div>
            </div>
        </div>
    )
}

export default Product