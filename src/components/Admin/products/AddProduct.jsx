import { TrashIcon } from '@heroicons/react/solid';
import Router from 'next/router';
import React, { useState } from 'react';
import { TagsInput } from "react-tag-input-component";
import { v4 as uuidv4 } from 'uuid';
import AdminLayout from '../../layout/AdminLayout';
import axiosAPI from '../../utils/axios-api';
import axiosRoot from '../../utils/axios-root';
// import style from './styles'

const Detail = () => {

    const [formValues, setFormValues] = React.useState([{ id: uuidv4(), title: "" }])
    // const [details, setDetails] = React.useState([{ title: "" }])
    const [moreInfos, setMoreInfo] = React.useState([{ id: uuidv4(), title: '', description: "" }])
    const [featured, setFeatured] = React.useState(false)
    const [error, setError] = React.useState('')
    const [loading, setIsLoading] = React.useState(false)
    const [tags, setTags] = useState(["Tech"]);
    const [selectedFiles, setSelectedFiles] = useState('');

    const [userInfo, setuserInfo] = useState({
        file: [],
        filepreview: null,
    });

    const handleSelectImage = async (e) => {

        setSelectedFiles(e.target.files);
        setuserInfo({
            ...userInfo,
            file: e.target.files,
            filepreview: URL.createObjectURL(e.target.files[0]),
            // filepreview2: URL.createObjectURL(e.target.files[1]),
        })
    }

    // submit form data
    const handleSubmit = async (event) => {

        try {
            event.preventDefault()
            const data = new FormData(event.currentTarget);

            data.delete('bordered-checkbox')
            data.delete('file-upload')
            data.delete('detail')
            data.delete('title')
            data.delete('description')
            data.set('tags', JSON.stringify(tags))
            data.set('isFeatured', featured)
            data.set('details', JSON.stringify(formValues.map(value => (
                { title: value.title }
            ))))
            data.set('information', JSON.stringify(moreInfos.map(info => (
                {
                    title: info.title,
                    description: info.description
                }
            ))))

            Array.from(selectedFiles).forEach(file => {
                data.append('images', file)
            })

            await axiosAPI.post('/products', data);
            Router.push('/admin/products')
        } catch (error) {

            setIsLoading(false);
            console.log(error)
            setError(error.response?.data?.message)
        }
    }

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

    const removeFormFields = (id, index) => {
        const values = [...formValues];
        values.splice(values.findIndex(value => value.id === id), 1);
        setFormValues(values);
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

    // Featured? 
    const handleFeature = () => {
        if (featured === false) {
            setFeatured(true)
        } else {
            setFeatured(false)
        }
    }

    const [cats, setCats] = React.useState([]);

    React.useEffect(() => {
        async function getCategory() {
            const res = await axiosRoot.get('/categories');
            setCats(res.data)
        }
        getCategory()
    }, []);
    console.log(cats.map((i)=> i.name))
    return (

        <div className='grid justify-around grid-cols-1 gap-3 p-5 m-3 bg-white rounded-lg'>
            {error && (
                <div class="p-3 my-2 text-sm text-red-700 bg-yellow-100 rounded-lg" role="alert">
                    <span class="font-medium">Warning!</span> {error}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <h1 className='py-3 mb-5 text-2xl text-center bg-gray-200 rounded-lg'>Add Product</h1>
                <div className="grid gap-6 mb-6 md:grid-cols-2">

                    {/* Product Details  */}
                    <div>
                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Product name</label>
                            <input type="text" name='name' id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5" placeholder="" required />
                        </div>
                        {/* <div>
                            <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 ">Brand</label>
                            <input type="text" id="brand" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5" placeholder="" required />
                        </div> */}
                        <div>
                            {/* <input type="text" name='category' id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5" placeholder="" required /> */}
                            {/* <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Select an option</label> */}
                            
                            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">Category</label>
                            <select id="category" name='category' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5" placeholder="" required>
                                {cats.map((cat) => 
                                    <option>{cat.name}</option>
                                )}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-900 ">Product code</label>
                            <input type="text" name='code' id="code" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5" placeholder="enter code" required />
                        </div>
                        <div>
                            <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900">Quantity</label>
                            <input type="number" name='quantity' id="quantity" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5" placeholder="" required />
                        </div>
                        <div>
                            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">Price</label>
                            <input type="number" name='price' id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5" placeholder="" required />
                        </div>

                        <div>
                            <TagsInput
                                // style={styles}
                                // className="bg-gray-50 text-clip border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5"
                                value={tags}
                                onChange={setTags}
                                name="tags"
                                placeHolder="enter tags"
                            />

                        </div>
                        <div class="flex items-center pl-2.5 mt-2 rounded-lg border border-gray-300">
                            <input id="bordered-checkbox-1" type="checkbox" onClick={handleFeature} checked={featured} name="bordered-checkbox" className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-600" />
                            <label htmlFor="bordered-checkbox-1" className="py-2.5 ml-2 w-full text-sm font-medium text-gray-900">Featured on home</label>
                        </div>
                    </div>

                    <div>

                        {/* Upload Product images  */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Upload Photos</label>
                            <div className="flex justify-center px-6 pt-5 pb-6 mt-1 border-2 border-gray-300 border-dashed rounded-md">
                                <div className="space-y-1 text-center">
                                    <svg
                                        className="w-12 h-12 mx-auto text-gray-400"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 48 48"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <label
                                            htmlFor="file-upload"
                                            className="relative p-1 font-medium text-red-600 rounded-md cursor-pointer hover:text--500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-gray-300"
                                        >
                                            <span>Upload product images</span>
                                            <input multiple id="file-upload" name="file-upload"
                                                type="file"
                                                className="sr-only"
                                                onChange={handleSelectImage}
                                            />
                                        </label>
                                        {/* <p className="pl-1">or drag and drop</p> */}
                                    </div>
                                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            </div>
                        </div>

                        {/* Images  */}
                        <div className='grid grid-cols-2 gap-2 mt-5'>
                            <div className='relative rounded-lg cursor-pointer h-36 ring-1 ring-gray-300 hover:opacity-70'>
                                <div className="absolute top-0 right-0 z-10 grid items-center w-8 h-8 m-1 text-white bg-red-600 bg-opacity-25 rounded-lg justify-items-center hover:bg-opacity-50">
                                    <button type='button'
                                    // onClick={}
                                    >
                                        <TrashIcon className='w-6 h-6 text-red-600' />
                                    </button>
                                </div>
                                {userInfo.filepreview && (
                                    <img alt='product image' src={userInfo.filepreview} className='mx-auto h-36' />
                                )}
                            </div>
                            <div className='relative rounded-lg cursor-pointer h-36 ring-1 ring-gray-300 hover:opacity-70'>
                                <div className="absolute top-0 right-0 z-10 grid items-center w-8 h-8 m-1 text-white bg-red-600 bg-opacity-25 rounded-lg justify-items-center hover:bg-opacity-50">
                                    <button type='button'
                                    // onClick={}
                                    >
                                        <TrashIcon className='w-6 h-6 text-red-600' />
                                    </button>
                                </div>
                                <img alt='product image' src={userInfo?.filepreview} className='mx-auto h-36 ' />
                            </div>
                            <div className='relative rounded-lg cursor-pointer h-36 ring-1 ring-gray-300 hover:opacity-70'>
                                <div className="absolute top-0 right-0 z-10 grid items-center w-8 h-8 m-1 text-white bg-red-600 bg-opacity-25 rounded-lg justify-items-center hover:bg-opacity-50">
                                    <button type='button'
                                    // onClick={}
                                    >
                                        <TrashIcon className='w-6 h-6 text-red-600' />
                                    </button>
                                </div>
                                {/* <img alt='product image' src={details.imageSrc} className='mx-auto h-36' /> */}
                            </div>
                            <div className='relative rounded-lg cursor-pointer h-36 ring-1 ring-gray-300 hover:opacity-70'>
                                <div className="absolute top-0 right-0 z-10 grid items-center w-8 h-8 m-1 text-white bg-red-600 bg-opacity-25 rounded-lg justify-items-center hover:bg-opacity-50">
                                    <button type='button'
                                    // onClick={handleDeletePhoto}
                                    >
                                        <TrashIcon className='w-6 h-6 text-red-600' />
                                    </button>
                                </div>
                                {/* <img alt='product image' src={details.imageSrc} className='mx-auto h-36' /> */}
                            </div>

                        </div>
                    </div>

                </div>


                {/* Dynamic Input  */}
                <div className='grid items-start grid-cols-1 gap-2 md:grid-cols-2'>

                    {/* Details  */}
                    <div className='grid items-end gap-2'>
                        <h1>Product Details</h1>
                        {formValues.map((element, index) => (

                            <div key={index} className='grid items-end grid-cols-10'>
                                <div className='col-span-9'>
                                    <label htmlFor="title" className="block mb-2 text-xs font-medium text-gray-900">Details</label>
                                    <input type="text" name="title" id="title" placeholder="Enter detail" required
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        onChange={(e) => handleChange(element.id, e)}
                                        value={element.title || ""}

                                    />
                                </div>
                                <div>
                                    {formValues.length != 1 && (
                                        <button type="button" className="flex items-end" onClick={() => removeFormFields(element.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mb-2 ml-2 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            </div>

                        ))}
                        <div>
                            <button className="w-auto px-4 py-2 text-xs text-center text-white bg-black rounded-lg hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-gray-300 sm:w-auto" type="button" onClick={addFormFields}>Add</button>
                        </div>
                    </div>
                    {/* <div className='grid items-end gap-2'>

                        {formValues.map((element, index) => (
                            <div className="flex items-center gap-2" key={index}>
                                <div className='flex w-full'>
                                    <div>
                                        <label htmlFor="detail" className="block mb-2 text-xs text-gray-900">Details</label>
                                        <input
                                            type="text" name="detail" id="detail" value={element.detail || ""}
                                            onChange={(e) => handleChange(element.id, e)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-red-600 focus:border-red-600 block p-2.5" placeholder="Enter a detail" required />
                                    </div>
                                    {formValues.length != 1 && (
                                        <button type="button" className="flex items-end" onClick={() => removeFormFields(element.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mb-2 ml-2 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                        <div>
                            <button className="w-auto px-4 py-2 text-xs text-center text-white bg-black rounded-lg hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-gray-300 sm:w-auto" type="button" onClick={addFormFields}>Add</button>
                        </div>
                    </div> */}

                    {/* More Information  */}
                    <div className='grid items-end gap-2'>
                        <h1>More Information</h1>
                        {moreInfos.map((element, index) => (
                            <div className='grid items-end grid-cols-10' key={index}>
                                <div className='grid grid-cols-2 col-span-9 gap-2'>
                                    <div>
                                        <label htmlFor="title" className="block mb-2 text-xs font-medium text-gray-900">Title</label>
                                        <input type="text" name="title" id="title" placeholder="Enter title" required
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            value={element.title || ""}
                                            onChange={(e) => handleMoreinfo(element.id, e)}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="description" className="block mb-2 text-xs font-medium text-gray-900">Description</label>
                                        <input type="text" name="description" id="description" placeholder="Enter description" required
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            value={element.description || ""}
                                            onChange={(e) => handleMoreinfo(element.id, e)}
                                        />
                                    </div>
                                </div>
                                <div className='col-span-1'>
                                    {moreInfos.length != 1 && (
                                        <button type="button" className="flex items-end" onClick={() => removeMoreinfo(element.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mb-2 ml-2 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                        <div>
                            <button className="w-auto px-4 py-2 text-xs text-center text-white bg-black rounded-lg hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-gray-300 sm:w-auto" type="button" onClick={addMoreinfo}>Add</button>
                        </div>
                    </div>

                </div>
                <div className='flex items-end justify-end gap-2 p-2 mt-2 bg-gray-200 rounded-lg'>
                    <button className="w-auto px-4 py-2 text-xs text-center text-white bg-red-600 rounded-lg hover:bg-black focus:ring-4 focus:outline-none focus:ring-gray-300 sm:w-auto" type='button'>Cancel</button>
                    <button className="w-auto px-4 py-2 text-xs text-center text-white bg-black rounded-lg hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-gray-300 sm:w-auto" type='submit'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export function AddProduct() {
    return (
        <AdminLayout>
            <Detail />
        </AdminLayout>
    )
}