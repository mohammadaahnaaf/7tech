import { Dialog, Switch, Transition } from '@headlessui/react';
import { TrashIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import React, { Fragment, useState } from 'react';
// import { Editor } from 'react-draft-wysiwyg';
import { TagsInput } from "react-tag-input-component";
import { v4 as uuidv4 } from 'uuid';
import AdminLayout from '../../layout/AdminLayout';
import Search from '../../shared/Search';
import axiosAPI from '../../utils/axios-api';
import axiosRoot from '../../utils/axios-root';
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Detail = () => {

    const router = useRouter()

    const [formValues, setFormValues] = React.useState([{ id: uuidv4(), title: "", specification: "" }])
    const [moreInfos, setMoreInfo] = React.useState([{ id: uuidv4(), title: '', description: "" }])
    const [featured, setFeatured] = React.useState(false)
    const [active, setActive] = React.useState(false)
    const [error, setError] = React.useState('')
    const [loading, setIsLoading] = React.useState(false)
    const [tags, setTags] = useState([]);
    const [cats, setCats] = React.useState([]);
    const [files, setFiles] = useState([]);
    // const [imgSrc, setImgSrc] = useState([]);
    const [products, setProducts] = useState([])
    const [enabled, setEnabled] = useState(false)
    const [relatedProducts, setRelatedProducts] = useState([])

    // select images 
    const handleSelectImage = (e) => {

        let file = e.target.files;
        const selectedFilesArray = Array.from(file);

        const imagesArray = selectedFilesArray.map((file) => {
            return file;
        });

        setFiles((previousImages) => previousImages.concat(imagesArray));

        // for (let i = 0; i < file.length; i++) {
        //     let fileType = file[i]['type'];
        //     const validImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/jpg'];
        //     if (validImageTypes.includes(fileType)) {
        //         setFiles([...files, file[i]]);
        //     } else {
        //         setError("only images accepted");
        //     }
        // }

        // console.log(file)
        // console.log(files)
    };

    // remove selected images 
    const removeImage = (i) => {
        setFiles(files.filter(x => x.name !== i));
    }

    // const [userInfo, setuserInfo] = useState({
    //     file: [],
    //     filepreview: null,
    // });

    // const handleSelectImage = async (e) => {

    //     setSelectedFiles(e.target.files);
    //     setuserInfo({
    //         ...userInfo,
    //         file: e.target.files,
    //         filepreview: URL.createObjectURL(e.target.files[0]),
    //         // filepreview2: URL.createObjectURL(e.target.files[1]),
    //     })
    // }

    // submit form data


    const handleSubmit = async (event) => {

        try {
            event.preventDefault()
            const data = new FormData(event.currentTarget);

            data.delete('bordered-checkbox')
            data.delete('file-upload')
            data.delete('specification')
            data.delete('detail')
            data.delete('title')
            data.delete('description')
            data.set('tags', JSON.stringify(tags))
            data.set('relatedProducts', JSON.stringify(relatedProducts))
            data.set('isFeatured', featured)
            data.set('isActive', active)
            data.set('details', JSON.stringify(formValues.map(value => (
                {
                    title: value.title,
                    description: value.specification
                }
            ))))
            data.set('information', JSON.stringify(moreInfos.map(info => (
                {
                    title: info.title,
                    description: info.description
                }
            ))))

            Array.from(files).forEach(file => {
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

    // get category
    React.useEffect(() => {
        async function getCategory() {
            const res = await axiosRoot.get('/categories');
            setCats(res.data)
        }
        getCategory()
    }, []);
    // console.log(cats.map((i) => i.name))

    // preview images 
    // const onChanges = (e) => {

    //     for (const file of e.target.files) {
    //         const save = new FileReader();
    //         save.readAsDataURL(file);
    //         save.onload = () => {
    //             setImgSrc((files) => [...files, save.result]);
    //         };
    //         save.onerror = () => {
    //             console.log(save.error);
    //         };
    //     }
    // };

    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
        setEnabled(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    // get product data 
    React.useEffect(() => {
        async function getProducts() {
            const res = await axiosRoot.get('/products');
            setProducts(res.data)
        }
        getProducts()
    }, [router]);

    function handleAdd(product) {
        const selectedIndex = relatedProducts.indexOf(product._id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(relatedProducts, product._id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(relatedProducts.slice(1));
        } else if (selectedIndex === relatedProducts.length - 1) {
            newSelected = newSelected.concat(relatedProducts.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                relatedProducts.slice(0, selectedIndex),
                relatedProducts.slice(selectedIndex + 1),
            );
        }

        setRelatedProducts(newSelected);
        console.log(relatedProducts)
    }
    const isSelected = (name) => relatedProducts.indexOf(name) !== -1

    const [searchTerm, setSearchTerm] = useState()
    const slugs = ['code', 'name', 'category']
    const search = (data) => {
        return data.filter((item) =>
            slugs.some((key) => (typeof item[key] === 'string' ? item[key].toLowerCase() : '').includes(searchTerm))
        )
    }
    const related = (
        <>
            <Transition appear show={enabled} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full ml-[25vh] max-w-5xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg text-center font-medium leading-6 text-gray-900"
                                    >
                                        Related Products
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <div className='my-2'>
                                            <Search setSearchTerm={setSearchTerm} />
                                        </div>
                                        {/* <div className="w-full gap-2 mx-auto grid grid-cols-5">
                                            {relatedProducts?.map((product, index) => (
                                                <ProductCard key={index} product={product} add={() => handleAdd(product._id)} />
                                            ))}
                                        </div> */}
                                        <div className="w-full gap-2 mx-auto grid grid-cols-5">
                                            {search(products).slice(0, 5).map((product, index) => (
                                                <ProductCard isItemSelected={isSelected(product._id)} key={index} product={product} add={() => handleAdd(product)} />
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mt-4 flex justify-end">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                                            onClick={closeModal}
                                        >
                                            Done
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );

    return (

        <div className='grid justify-around grid-cols-1 gap-3 p-5 m-3 bg-white rounded-lg'>
            {error && (
                <div className="p-3 my-2 text-sm text-red-700 bg-yellow-100 rounded-lg" role="alert">
                    <span className="font-medium">Warning!</span> {error}
                </div>
            )}
            {related}
            <div className='relative py-3 flex items-center justify-center mb-5 text-center bg-gray-200 rounded-lg'>

                <Switch
                    checked={enabled}
                    onChange={setEnabled}
                    className={`${enabled ? 'bg-teal-300' : 'bg-red-600'}
                     absolute right-2 inline-flex h-[28px] w-[64px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                >
                    <span className="sr-only">Use setting</span>
                    <span
                        aria-hidden="true"
                        className={`${enabled ? 'translate-x-7' : 'translate-x-0'}
                        pointer-events-none z-10 inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                    />
                </Switch>
                <h1 className='text-2xl text-center bg-gray-200'>Add Product</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="grid gap-3 mb-6 md:grid-cols-2">

                    {/* Product Details  */}
                    <div>
                        <div>
                            <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-900">Product name</label>
                            <input type="text" name='name' id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full" placeholder="Name" required />
                        </div>
                        {/* <div>
                            <label htmlFor="brand" className="block mt-2 mb-1 text-sm font-medium text-gray-900 ">Brand</label>
                            <input type="text" id="brand" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full  " placeholder="" required />
                        </div> */}
                        <div>
                            <label htmlFor="category" className="block mb-1 text-sm font-medium text-gray-900">Category</label>
                            <select id="category" name='category' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full" placeholder="Category" required>
                                {cats.map((cat) =>
                                    <option>{cat.name}</option>
                                )}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="code" className="block mb-1 text-sm font-medium text-gray-900 ">Product code</label>
                            <input type="text" name='code' id="code" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full" placeholder="Code" required />
                        </div>
                        <div>
                            <label htmlFor="quantity" className="block mb-1 text-sm font-medium text-gray-900">Quantity</label>
                            <input type="number" name='quantity' id="quantity" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full" placeholder="Stock" required />
                        </div>
                        <div>
                            <label htmlFor="shortDescription" className="block mb-1 text-sm font-medium text-gray-900">Short description</label>
                            <textarea type="text" rows={3} name='shortDescription' id="shortDescription" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full px-2.5" placeholder="Write a short desciption" />
                        </div>
                        <div>
                            <label htmlFor='tags' className="w-full text-sm font-medium text-gray-900">Tags</label>

                            <TagsInput
                                value={tags}
                                onChange={setTags}
                                name="tags"
                                placeHolder="Enter tags"
                            />

                        </div>
                        <p className='text-sm mt-1'>Featured</p>
                        <div className="flex mb-1 items-center pl-2.5 rounded-lg border border-gray-300">
                            <input id="bordered-checkbox-1" type="checkbox" onClick={handleFeature} checked={featured} name="bordered-checkbox" className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-600" />
                            <label htmlFor="bordered-checkbox-1" className="py-2.5 ml-2 w-full text-sm font-medium text-gray-900">Featured on home</label>
                        </div>

                        <div className='grid grid-cols-2 gap-3'>
                            <div>
                                <label htmlFor="regularPrice" className="block mb-1 text-sm font-medium text-gray-900">Regular Price</label>
                                <input type="number" name='regularPrice' placeholder='Regular price' id="regularPrice" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full" />
                            </div>
                            <div>
                                <label htmlFor="onlinePrice" className="block mb-1 text-sm font-medium text-gray-900">Online Price</label>
                                <input type="number" name='onlinePrice' id="onlinePrice" placeholder='Online Price' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full" required />
                            </div>
                        </div>
                        <div className='grid grid-cols-2 gap-2 bg-teal-100 rounded-md px-2 mt-3 py-2'>
                            <div>
                                <label htmlFor="offerPrice" className="mb-1 text-sm font-medium text-gray-900">Special Price/ Offer</label>
                                <input type="number" name='offerPrice' id="offerPrice" placeholder='Special price' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full" />
                            </div>

                            <div>
                                <label htmlFor="offerEndDate" className="mb-1 text-sm font-medium text-gray-900">Offer Ends</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
                                    </div>

                                    <input datepicker="true" id='offerEndDate' name='offerEndDate' type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-500 block w-full pl-10" placeholder="Select date" />
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Upload Product images  */}
                    <div>
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
                                                onChange={(e) => handleSelectImage(e)}
                                            />
                                        </label>
                                    </div>
                                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            </div>
                        </div>

                        {/* <div>
                            <input onChange={onChanges} type="file" className='hidden' name="file" multiple />
                            {imgSrc.map((link) => (
                                <img src={link} />
                            ))}
                        </div> */}

                        {/* Preview Images  */}
                        <div className='grid grid-cols-2 gap-2 mt-5'>
                            {files.map((file, index) =>
                                <div key={index} className='relative rounded-lg cursor-pointer h-36 ring-1 ring-gray-300 hover:opacity-70'>
                                    <div className="absolute top-0 right-0 z-10 grid items-center w-8 h-8 m-1 text-white bg-red-600 bg-opacity-25 rounded-lg justify-items-center hover:bg-opacity-50">
                                        <button type='button'
                                            onClick={() => { removeImage(file.name) }}
                                        >
                                            <TrashIcon className='w-6 h-6 text-red-600' />
                                        </button>
                                    </div>
                                    <img alt='product image' src={URL.createObjectURL(file)} className='mx-auto h-36' />
                                </div>
                            )}

                        </div>

                        {files.length === 0 && (
                            <div className='grid grid-cols-2 gap-2'>
                                {[0, 1, 2, 3, 4, 5].map(x => (

                                    <div key={x} className='relative flex items-center rounded-lg cursor-not-allowed h-36 border-dashed border-2 border-gray-300 hover:opacity-70'>
                                        <div className="absolute hidden top-0 right-0 z-10 items-center w-8 h-8 m-1 text-white bg-red-600 bg-opacity-25 rounded-lg justify-items-center hover:bg-opacity-50">

                                        </div>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-20 h-20 mx-auto text-gray-200">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                        </svg>

                                        {/* <img alt='product image' src={URL.createObjectURL(file)} className='mx-auto h-36' /> */}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>


                {/* Dynamic Input  */}
                <div className='grid items-start grid-cols-1 gap-3 md:grid-cols-2'>

                    {/* Details  */}
                    <div className='grid items-end gap-2'>
                        <h1 className='p-2 text-center bg-slate-200 rounded-lg'>Product Specifications</h1>
                        {formValues.map((element, index) => (

                            <div key={index} className='grid items-end gap-2 grid-cols-9'>
                                {/* <div className='col-span-10'>
                                    <label htmlFor="title" className="block mb-2 text-xs font-medium text-gray-900">Details</label>

                                    <Editor
                                        type="text" name="title" id="title"
                                        // editorState={element.title || ''}
                                        // value={element.title || ''}
                                        toolbarClassName="toolbarClassName"
                                        wrapperClassName="wrapperClassName"
                                        editorClassName="editorClassName"
                                        // onEditorStateChange={(e) => handleChange(element.id, e)}
                                        // onChange={(e) => handleChange(element.id, e)}
                                    />
                                </div> */}
                                <div className='col-span-4'>
                                    <label htmlFor="title" className="block mb-2 text-xs font-medium text-gray-900">Title</label>
                                    <input
                                        type="text" name="title" id="title"
                                        placeholder="Enter detail"
                                        required
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-red-600 focus:border-red-600 block w-full  "
                                        onChange={(e) => handleChange(element.id, e)}
                                        value={element.title || ""}
                                    />
                                </div>
                                <div className='col-span-4'>
                                    <label htmlFor="specification" className="block mb-2 text-xs font-medium text-gray-900">Specification</label>
                                    <input
                                        type="text" name="specification" id="specification"
                                        placeholder="Enter specification"
                                        required
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-red-600 focus:border-red-600 block w-full  "
                                        onChange={(e) => handleChange(element.id, e)}
                                        value={element.specification || ""}
                                    />
                                </div>

                                <div className='col-span-1'>
                                    {formValues.length != 1 && (
                                        <button type="button" className="flex items-end" onClick={() => removeFormFields(element.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mb-2 ml-2 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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

                    {/* More Information  */}
                    <div className='grid items-end gap-2'>
                        <h1 className='p-2 text-center bg-slate-200 rounded-lg'>More Information</h1>
                        {moreInfos.map((element, index) => (
                            <div className='grid items-end grid-cols-10' key={index}>
                                <div className='grid grid-cols-2 col-span-9 gap-2'>
                                    <div>
                                        <label htmlFor="title" className="block mb-2 text-xs font-medium text-gray-900">Title</label>
                                        <input type="text" name="title" id="title" placeholder="Enter title" required
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-red-600 focus:border-red-600 block w-full  "
                                            value={element.title || ""}
                                            onChange={(e) => handleMoreinfo(element.id, e)}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="description" className="block mb-2 text-xs font-medium text-gray-900">Description</label>
                                        <input type="text" name="description" id="description" placeholder="Enter description" required
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-red-600 focus:border-red-600 block w-full  "
                                            value={element.description || ""}
                                            onChange={(e) => handleMoreinfo(element.id, e)}
                                        />
                                    </div>
                                </div>
                                <div className='col-span-1'>
                                    {moreInfos.length != 1 && (
                                        <button type="button" className="flex items-end" onClick={() => removeMoreinfo(element.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mb-2 ml-2 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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

function ProductCard({ product, add, key, isItemSelected }) {

    return (
        <div key={key} className="bg-white shadow-md border border-gray-200 rounded-lg">
            <Link href={`/product/${product._id}`}>
                <a>
                    <img className="rounded-t-lg h-40 w-full"
                        src={product.images[0]}
                        // src="https://flowbite.com/docs/images/blog/image-1.jpg"
                        alt="image of product"
                    />
                </a>
            </Link>
            <div className="p-2 h-28 grid gap-2 items-center content-between">
                <Link href={`/product/${product._id}`}>
                    <a className="text-gray-900 font-bold text-md tracking-tight">{product.name}</a>
                </Link>
                <div>
                    <input onChange={add} checked={isItemSelected} id="checkbox" type="checkbox" className="cursor-pointer w-4 h-4 text-red-600 bg-gray-100 rounded border-gray-300 focus:ring-red-500 focus:ring-2" />
                    <label htmlFor="checkbox" className="sr-only">checkbox</label>
                </div>
                {/* <button onClick={() => add(product)} type='button' className="w-full items-center text-sm !text-center text-red-600 hover:text-white bg-white hover:bg-red-600 ring-2 ring-red-600 focus:ring-red-300 font-medium rounded-md px-3 py-2">
                    Add
                </button> */}
            </div>
        </div>
    )
}
