import React, { useEffect } from 'react'
import AdminLayout from '../../layout/AdminLayout'
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';
import axiosAPI from '../../utils/axios-api';
import axiosRoot from '../../utils/axios-root';

const Detail = () => {
    const router = useRouter()
    const itemId = router.query.id

    const [formValues, setFormValues] = React.useState([{ id: uuidv4(), detail: "" }])
    const [status, setStatus] = React.useState('')
    const [products, setProducts] = React.useState([
        {
            _id: '',
            name: '',
            price: '',
            productId: '',
            quantity: ''
        }
    ])
    const [orderedProduct, setOrderedProduct] = React.useState([
        {
            _id: '',
            productId: '',
            quantity: ''
        }
    ])

    const [order, setOrder] = React.useState({
        customer_name: '',
        customer_phone: '',
        city: '',
        zone: '',
        address: '',
        status: '',
        payment_method: '',
        total: ''
    })

    // get order data
    useEffect(() => {
        async function getOrder() {
            const res = await axiosAPI.get(`/orders/${itemId}`);
            setOrder(res.data)
            setOrderedProduct(res.data.products)
            setStatus(res.data.status)
        }
        getOrder()

    }, [router]);

    // get all products data
    useEffect(() => {
        async function getProduct() {
            const res = await axiosRoot.get('/products');
            res.data.map((product) => {
                return orderedProduct.find((element) => {
                    return element.productId === product._id &&
                        setProducts(result => [...result, {
                            name: product.name,
                            price: product.price,
                            productId: element.productId,
                            _id: element._id,
                            quantity: +element.quantity
                        }])
                })
            })
        }
        getProduct()

    }, [router]);

    // Details 
    const handleChange = (id, event) => {
        const newInputFields = formValues.map(i => {
            if (id === i.id) {
                i[event.target.name] = event.target.value
            }
            return i;
        })
        setFormValues(newInputFields);
    };

    const addFormFields = () => {
        setFormValues([...formValues,
        {
            id: uuidv4(),
            detail: ''
        }])
    };

    const removeFormFields = id => {
        const values = [...formValues];
        values.splice(values.findIndex(value => value.id === id), 1);
        setFormValues(values);
    }

    return (

        <div className='grid p-5 bg-white rounded-lg grid-cols-1 gap-3 justify-around mx-3 my-3'>
            <h1 className='text-center py-3 mb-5 rounded-lg bg-gray-200 text-2xl'>Edit Order</h1>
            <div className="grid gap-6 mb-6 md:grid-cols-2">

                {/* Details  */}
                <div>
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Customer name</label>
                        <input value={order.customer_name || ''} type="text" id="name" name='name' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5" placeholder="" required />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 ">Phone</label>
                        <input value={order.customer_number || ''} type="tel" id="phone" name='phone' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5" placeholder="" required />
                    </div>
                    <div>
                        <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900">City</label>
                        <input value={order.city || ''} type="text" id="city" name='city' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5" placeholder="" required />
                    </div>
                    <div>
                        <label htmlFor="zone" className="block mb-2 text-sm font-medium text-gray-900 ">Zone</label>
                        <input value={order.zone || ''} type="text" id="zone" name='zone' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5" placeholder="" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />
                    </div>
                    {/* <div>
                        <label htmlFor="area" className="block mb-2 text-sm font-medium text-gray-900">Area</label>
                        <input type="text" id="area" name='area' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5" placeholder="" required />
                    </div> */}
                    <div>
                        <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900">Address</label>
                        <input value={order.address || ''} type="text" id="address" name='address' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5" placeholder="" required />
                    </div>
                </div>

                {/* Payment  */}
                <div>
                    <div>
                        <label htmlFor="qty" className="block mb-2 text-sm font-medium text-gray-900">Quantity</label>
                        <input value={products.length || ''} type="number" name="qty" id="qty" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5" placeholder="" required />
                    </div>
                    <div>
                        <label htmlFor="total" className="block mb-2 text-sm font-medium text-gray-900">Total</label>
                        <input value={order.total || ''} type="number" name="total" id="total" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5" placeholder="" required />
                    </div>

                    <div>
                        <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900">Status</label>
                        <select id="status" name='status' value={order.status || status} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 ">
                            <option value='paid'>Paid</option>
                            <option value="pending">Pending</option>
                            <option value="shipped">Shipped</option>
                            <option value="deleverd">Deleverd</option>
                            <option value="cancel">Cancel</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="payment" className="block mb-2 text-sm font-medium text-gray-900">Payment</label>
                        <select value={order.payment_method || ''} id="payment" name='payment' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5">
                            <option value='bkash'>BKash</option>
                            <option value="cash-on-delivery">Cash on delevary</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Dynamic Input  */}
            <div className='grid grid-cols-1 items-start gap-2'>
                {/* Products  */}
                <div className='grid items-end gap-2'>

                    {products?.map((element, index) => (
                        <div className="flex gap-2 items-center" key={index}>
                            <div>
                                <label htmlFor="detail" className="block mb-2 text-xs font-medium text-gray-900">Product Name</label>
                                <input type="text" name="detail" id="detail" value={element.name || ""} onChange={(e) => handleChange(element._id, e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5" placeholder="Enter details" required />
                            </div>
                            <div>
                                <label htmlFor="detail" className="block mb-2 text-xs font-medium text-gray-900">Qty</label>
                                <input type="text" name="detail" id="detail" value={element.quantity || ""} onChange={(e) => handleChange(element._id, e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5" placeholder="Enter details" required />
                            </div>
                            <div className='flex'>
                                <div>
                                    <label htmlFor="detail" className="block mb-2 text-xs font-medium text-gray-900">Price</label>
                                    <input type="text" name="detail" id="detail" value={element.price || ""} onChange={(e) => handleChange(element._id, e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5" placeholder="Enter details" required />
                                </div>
                                {formValues.length != 1 && (
                                    <button type="button" className="items-end flex" onClick={() => removeFormFields(element._id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2 mb-2 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                    <div>
                        <button className="w-auto text-white bg-black hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-lg text-xs sm:w-auto px-4 py-2 text-center" type="button" onClick={addFormFields}>Add</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function Details() {
    return (
        <AdminLayout>
            <Detail />
        </AdminLayout>
    )
}