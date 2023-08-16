import { TrashIcon } from '@heroicons/react/solid'
import React from 'react'
import { useCart } from 'react-use-cart'
import { cities } from '../../data/placeNames'
import Router, { useRouter } from 'next/router'
import { Layout } from '@seventech/layout'
import { ErrorText } from '@seventech/shared'
import { Success } from './Success'
import axiosRoot from '@seventech/utils/axios-root'
import axiosAPI from '@seventech/utils/axios-api'

function Checkouts({ setSuccess, setOrder }) {

    const router = useRouter()

    const [me, setMe] = React.useState({})
    const [city, setCity] = React.useState('Dhaka')
    const [zone, setZone] = React.useState('')
    const [zones, setZones] = React.useState([])
    const [error, setError] = React.useState('')
    const [shipment, setShipment] = React.useState(0)

    let { items, cartTotal, removeItem, totalUniqueItems } = useCart()

    let total = (+ shipment + cartTotal)

    React.useEffect(() => {
        if (totalUniqueItems === 0) {
            Router.push('/cart')
        }

        cities.map((x) => {
            if (x.name === city) {
                setZones(x.zone)
            }
        });

        if (city === 'Dhaka') {
            setShipment(60)
        } else {
            setShipment(120)
        }
    }, [city, total])


    // get me
    React.useEffect(() => {
        async function getProfile() {
            try {
                const res = await axiosAPI.get('/auth/get-me');
                setMe(res.data);
            } catch (error) {
                console.log(error)
            }
        }
        getProfile()
    }, []);

    // post data 
    const handleSubmit = async (event) => {

        try {
            event.preventDefault()

            const data = new FormData(event.currentTarget);
            const reqData = {
                customer_name: data.get('name'),
                customer_number: data.get('phone'),
                city: data.get('city'),
                zone: data.get('zone'),
                address: data.get('address'),
                payment_method: data.get('payment'),

                products: items.map(value => (
                    {
                        productId: value.id,
                        quantity: value.quantity
                    }
                ))
            }
            const order = await axiosRoot.post('/orders', reqData);
            setSuccess(true)
            setOrder(order.data)

        } catch (error) {
            console.log(error)
            setError(error.response?.data?.message)
        }
    }

    function handleCity(e) {
        setCity(e.target.value)
    }
    function handleRemove(id) {
        removeItem(id)

        if (totalUniqueItems === 0) {
            Router.push('/cart')
        }
    }
    // const countSubtotal = (items) => items.reduce((acc, curr) => acc + curr.quantity * curr.price, 0);
    // const subtotal = countSubtotal(items)
    // const cartTotal = countSubtotal(products)

    return (
        <>
            <ErrorText error={error} />

            <div className='max-w-7xl min-h-[78vh] mx-auto py-4 grid grid-cols-3 justify-center gap-5'>

                <div className="shadow col-span-3 lg:col-span-2 h-full w-full ring-0 lg:ring-2 ring-gray-300">
                    <form onSubmit={handleSubmit}>
                        {/* Account and delevary details */}
                        <div className="lg:p-4">
                            <div className="grid grid-cols-6 gap-2 lg:gap-6">
                                <h2 className='text-center col-span-6 text-black font-medium text-2xl'>Checkout</h2>
                                <div className="col-span-6">
                                    <label htmlFor="name" className="block text-sm font-medium text-black">
                                        Your name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder='Name'
                                        id="name"
                                        defaultValue={me.fullName || ''}
                                        autoComplete="given-name"
                                        className="mt-1 bg-black bg-opacity-20 focus:ring-black text-black ring-white border-white focus:border-black block w-full shadow-sm sm:text-sm"
                                    />
                                </div>

                                {/* <div className="col-span-6 sm:col-span-3 hidden">
                                        <label htmlFor="email" className="block text-sm font-medium text-black">
                                            Email address
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            disabled
                                            autoComplete="email"
                                            className="mt-1 bg-black bg-opacity-20 focus:ring-black text-black ring-white border-white focus:border-black block w-full shadow-sm sm:text-sm"
                                        />
                                    </div> */}
                                <div className="col-span-6 sm:col-span-6">
                                    <label htmlFor="phone" className="block text-sm font-medium text-black">
                                        Phone number
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder='Phone Number'
                                        id="phone"
                                        required
                                        defaultValue={me.phoneNumber || ''}
                                        autoComplete="phone"
                                        className="mt-1 bg-black bg-opacity-20 focus:ring-black text-black ring-white border-white focus:border-black block w-full shadow-sm sm:text-sm"
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="city" className="block text-sm font-medium text-black">
                                        City
                                    </label>
                                    <select
                                        id="city"
                                        name="city"
                                        // value={city || ''}
                                        defaultValue={me.city}
                                        onChange={(e) => handleCity(e)}
                                        className="mt-1 bg-black bg-opacity-20 focus:ring-black text-black ring-white border-white focus:border-black block w-full shadow-sm sm:text-sm"
                                    >
                                        {cities.map((city, index) => (
                                            <option key={index} value={city.name}>{city.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="city" className="block text-sm font-medium text-black">
                                        Zone
                                    </label>
                                    <select
                                        id="zone"
                                        name="zone"
                                        defaultValue={me.zone || ''}
                                        value={zone || ''}
                                        onChange={(e) => setZone(e.target.value)}
                                        className="mt-1 bg-black bg-opacity-20 focus:ring-black text-black ring-white border-white focus:border-black block w-full shadow-sm sm:text-sm"
                                    >
                                        {zones.map((item, index) => (
                                            <option key={index} value={item}>{item}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* <div className="col-span-6 sm:col-span-3 lg:col-span-2 hidden">
                                        <label htmlFor="area" className="block text-sm font-medium text-black">
                                            Area
                                        </label>
                                        <input
                                            type="text"
                                            name="area"
                                            id="area"
                                            disabled
                                            autoComplete="postal-code"
                                            className="mt-1 bg-black bg-opacity-20 focus:ring-black text-black ring-white border-white focus:border-black block w-full shadow-sm sm:text-sm"
                                        />
                                    </div> */}
                                <div className="col-span-6">
                                    <label htmlFor="payment" className="block text-sm font-medium text-black">
                                        Payment Method
                                    </label>
                                    <select
                                        id="payment"
                                        name="payment"
                                        className="mt-1 bg-black bg-opacity-20 focus:ring-black text-black ring-white border-white focus:border-black block w-full shadow-sm sm:text-sm"
                                    >
                                        <option value='cash-on-delivery'>Cash on Delivery</option>
                                        <option value='online'>BKash</option>
                                    </select>
                                </div>

                                <div className="col-span-6">
                                    <label htmlFor="address" className="block text-sm font-medium text-black">
                                        Street address
                                    </label>
                                    <textarea
                                        id="address"
                                        name="address"
                                        defaultValue={me.address || ''}
                                        rows={3}
                                        className="bg-black bg-opacity-20 focus:ring-black text-black ring-white border-white focus:border-black block w-full shadow-sm sm:text-sm"
                                        placeholder="Address"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="px-4 mt-4 lg:mt-0 py-4 md:rounded-b-lg bg-black bg-opacity-10 text-right sm:px-6">
                            <button
                                type="submit"
                                className="inline-flex justify-center py-1 hover:text-white px-4 border border-transparent shadow-sm text-sm font-medium text-black hover:bg-black focus:outline-none ring-2 hover:ring-white ring-black"
                            >
                                Confirm Order
                            </button>
                        </div>
                    </form>
                </div>

                {/* Cart Products details */}
                <div className='w-full shadow ring-gray-300 ring-2 overflow-y-auto'>
                    <div className="h-auto py-3 px-2">
                        <div className="mt-8">
                            <div className="flow-root">
                                <ul role="list" className="-my-6 divide-y divide-gray-200">
                                    {items.map((product) => (
                                        <li key={product.id} className="flex py-6">
                                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                <img
                                                    src={product.imageSrc}
                                                    // alt={product.imageAlt}
                                                    className="h-full w-full object-cover object-center"
                                                />
                                            </div>

                                            <div className="ml-4 flex flex-1 flex-col">
                                                <div>
                                                    <div className="flex justify-between text-base font-medium hover:text-white text-black">
                                                        <button type='button' onClick={() => router.push(`/product/${product.id}`)}>
                                                            <h3 className='text-left'> {product.name.substring(0, 35)} </h3>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="font-medium h-10 bg-opacity-10 w-8 m-1 bg-black p-1"
                                                            onClick={() => handleRemove(product.id)}
                                                        >
                                                            <TrashIcon className="h-6 w-6 text-black hover:text-black" aria-hidden="true" />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="flex items-end flex-1 justify-between">
                                                    <p className="text-black text-sm">Qty {product.quantity}</p>
                                                    <p className="mx-2 text-md text-green-700">৳{product.price}</p>

                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="border-t py-1 border-black p-4">
                        <div className="flex py-1 justify-between text-base font-medium text-black">
                            <p>Subtotal :</p>
                            <p className='text-green-500'>৳ {cartTotal}</p>
                        </div>
                        <div className="flex py-1 justify-between text-base font-medium text-black">
                            <p>Shipping :</p>
                            <p className='text-green-500'>৳ {shipment}</p>
                        </div>

                        <div className="flex mt-2 border-black border-t py-1 justify-between text-base font-medium text-black">
                            <p>Total :</p>
                            <p className='text-green-500'>৳ {total}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export function Checkout() {

    const [success, setSuccess] = React.useState(false)
    const [order, setOrder] = React.useState({})

    return (
        <>
            {success ?
                <Layout>
                    <Checkouts setOrder={setOrder} setSuccess={setSuccess} />
                </Layout>
                :
                <Layout>
                    <Success order={order} />
                </Layout>
            }
        </>
    )
}

// This App is made by Ahnaf and Tanvir 