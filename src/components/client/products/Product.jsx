import { ShoppingCartIcon } from '@heroicons/react/solid'
import Link from 'next/link';
import React from 'react'
import { useCart } from 'react-use-cart';
import axiosRoot from '../../utils/axios-root';

function Product({ item, productId, key }) {

    const { addItem } = useCart();

    // const [images, setImages] = React.useState([]);
    // const [product, setProduct] = React.useState({});
    // const router = useRouter()

    // get product data 
    // React.useEffect(() => {

    //     async function getProduct() {
    //         try {
    //             const res = await axiosRoot.get(`/products/${productId}`);
    //             setImages(res.data.images)
    //             productId && setProduct(res.data)
    //         } catch (error) {
    //             console.log("Error: " + error.response?.data?.message)
    //         }
    //     }
    //     productId && getProduct()
    // }, [productId]);

    let cartProduct = {
        id: item?._id,
        imageSrc: item.images.slice(0, 1).map(x => x),
        name: item.name,
        price: item.onlinePrice,
        category: item.category,
        stock: item.quantity,
        quantity: 1
    }

    return (
        <div key={key} className="group hover:scale-90 duration-300 bg-black relative hover:ring-white ring-red-600 ring-2">
            <div className="absolute z-10 grid items-center justify-items-center top-0 right-0 h-10 w-10 text-white hover:bg-opacity-50 ring-2 ring-red-600 ring-opacity-30 bg-black bg-opacity-30">
                <button
                    type='button'
                    disabled={item.stock === 0}
                    onClick={() => addItem(cartProduct)}
                >
                    <ShoppingCartIcon className='h-7 w-7' />
                </button>
            </div>
            {item?.images?.slice(0, 1).map((image, index) => (
                <div key={index} className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden group-hover:opacity-75 lg:aspect-none lg:h-80">
                    <img
                        src={image}
                        alt='product image'
                        className="h-full w-full z-20 object-cover object-center lg:h-full lg:w-full"
                    />
                </div>
            ))}
            <div className="flex w-full p-2 justify-between border-t-2 border-red-600 bg-red-600 bg-opacity-10">
                <div className='w-full'>
                    <Link href={`/product/${item?._id}`}>
                        <a className="text-gray-200 text-sm ">
                            <span aria-hidden="true" className="absolute inset-0" />
                            {item?.name?.substring(0, 45) + ' ...'}
                        </a>
                    </Link>
                    <div className='flex gap-2 justify-end items-center'>
                        <p className="mt-1 text-end text-sm line-through text-red-500">৳ {item.regularPrice}</p>
                        <p className="mt-1 text-end text-sm text-green-500">৳ {item.onlinePrice}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product