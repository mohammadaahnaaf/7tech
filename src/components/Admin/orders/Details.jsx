import React from 'react'
import AdminLayout from '../../layout/AdminLayout'
import { v4 as uuidv4 } from 'uuid';

const Detail = () => {

    const [formValues, setFormValues] = React.useState([{ id: uuidv4(), detail: "" }])
    const [moreInfos, setMoreInfo] = React.useState([{ id: uuidv4(), info: "" }])
    const [reviews, setReviews] = React.useState([{ id: uuidv4(), review: "" }])

    // function handleChange(i, e) {
    //   let newFormValues = [...formValues];
    //   newFormValues[i][e.target.name] = e.target.value;
    //   setFormValues(newFormValues);
    // }

    // function addFormFields() {
    //   setFormValues([...formValues, { name: "", email: "" }])
    // }

    // function removeFormFields(i) {
    //   let newFormValues = [...formValues];
    //   newFormValues.splice(i, 1);
    //   setFormValues(newFormValues)
    // }

    // function handleSubmit(event) {
    //   event.preventDefault();
    //   // alert(JSON.stringify(formValues));
    // }

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

    // Reviews 
    const handleReview = (id, event) => {
        const newInputFields = reviews.map(i => {
            if (id === i.id) {
                i[event.target.name] = event.target.value
            }
            return i;
        })

        setReviews(newInputFields);
    };

    const addReview = () => {
        setReviews([...reviews,
        {
            id: uuidv4(),
            review: ''
        }])
    };

    const removeReview = id => {
        const values = [...reviews];
        values.splice(values.findIndex(value => value.id === id), 1);
        setReviews(values);
    }

    // More Information 
    const handleMoreinfo = (id, event) => {
        const newInputFields = moreInfos.map(i => {
            if (id === i.id) {
                i[event.target.name] = event.target.value
            }
            return i;
        })

        setMoreInfo(newInputFields);
    };

    const addMoreinfo = () => {
        setMoreInfo([...moreInfos,
        {
            id: uuidv4(),
            info: ''
        }])
    };

    const removeMoreinfo = id => {
        const values = [...moreInfos];
        values.splice(values.findIndex(value => value.id === id), 1);
        setMoreInfo(values);
    }

    return (

        <div className='grid p-5 bg-white rounded-lg grid-cols-1 gap-3 justify-around mx-3 my-3'>
            <h1 className='text-center py-3 mb-5 rounded-lg bg-gray-200 text-2xl'>Edit Order</h1>
            <div className="grid gap-6 mb-6 md:grid-cols-2">

                {/* Details  */}
                <div>
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Customer name</label>
                        <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5" placeholder="" required />
                    </div>
                    <div>
                        <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 ">Phone</label>
                        <input type="tel" id="brand" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5" placeholder="" required />
                    </div>
                    <div>
                        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">City</label>
                        <input type="text" id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5" placeholder="" required />
                    </div>
                    <div>
                        <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-900 ">Zone</label>
                        <input type="text" id="code" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5" placeholder="" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />
                    </div>
                    <div>
                        <label htmlFor="qty" className="block mb-2 text-sm font-medium text-gray-900">Area</label>
                        <input type="text" id="qty" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5" placeholder="" required />
                    </div>
                    <div>
                        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">Address</label>
                        <input type="text" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5" placeholder="" required />
                    </div>
                </div>

                {/* Payment  */}
                <div>
                    <div>
                        <label htmlFor="qty" className="block mb-2 text-sm font-medium text-gray-900">Quantity</label>
                        <input type="number" id="qty" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5" placeholder="" required />
                    </div>
                    <div>
                        <label htmlFor="total" className="block mb-2 text-sm font-medium text-gray-900">Price</label>
                        <input type="number" id="total" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5" placeholder="" required />
                    </div>

                    <div>
                        <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900">Status</label>
                        <select id="status" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 ">
                            <option selected>Paid</option>
                            <option value="US">Shipped</option>
                            <option value="US">Deleverd</option>
                            <option value="US">Cancel</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="default" className="block mb-2 text-sm font-medium text-gray-900">Payment</label>
                        <select id="default" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5">
                            <option selected>pay with VISA</option>
                            <option value="US">Cash on delevary</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Dynamic Input  */}
            <div className='grid grid-cols-1 items-start gap-2'>
                {/* Products  */}
                <div className='grid items-end gap-2'>

                    {formValues.map((element, index) => (
                        <div className="flex gap-2 items-center" key={index}>
                            <div>
                                <label htmlFor="detail" className="block mb-2 text-xs font-medium text-gray-900">Product Name</label>
                                <input type="text" name="detail" id="detail" value={element.detail || ""} onChange={(e) => handleChange(element.id, e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5" placeholder="Enter details" required />
                            </div>
                            <div>
                                <label htmlFor="detail" className="block mb-2 text-xs font-medium text-gray-900">Qty</label>
                                <input type="text" name="detail" id="detail" value={element.detail || ""} onChange={(e) => handleChange(element.id, e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5" placeholder="Enter details" required />
                            </div>
                            <div className='flex'>
                                <div>
                                    <label htmlFor="detail" className="block mb-2 text-xs font-medium text-gray-900">Price</label>
                                    <input type="text" name="detail" id="detail" value={element.detail || ""} onChange={(e) => handleChange(element.id, e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5" placeholder="Enter details" required />
                                </div>
                                {formValues.length != 1 && (
                                    <button type="button" className="items-end flex" onClick={() => removeFormFields(element.id)}>
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