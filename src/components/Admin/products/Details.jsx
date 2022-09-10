import React from 'react'
import AdminLayout from '../../layout/AdminLayout'
import { v4 as uuidv4 } from 'uuid';
import { TrashIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import axiosRoot from '../../utils/axios-root';
// import { TagsInput } from 'react-tag-input-component';

const Detail = () => {

  const router = useRouter()
  const itemId = router.query.id

  const [images, setImages] = React.useState([]);
  const [tags, setTags] = React.useState([]);
  const [isFeatured, setIsFeatured] = React.useState(false)
  const [details, setDetails] = React.useState({
    _id: '',
    name: ''
  });
  const [formValues, setFormValues] = React.useState([
    {
      _id: '',
      title: ""
    }
  ])
  const [moreInfos, setMoreInfo] = React.useState([
    {
      _id: '',
      title: "",
      description: ''
    }
  ])
  const [reviews, setReviews] = React.useState([
    {
      id: uuidv4(),
      review: ""
    }
  ]);

  // get data 
  React.useEffect(() => {

    async function getProduct() {
      const res = await axiosRoot.get('/products/' + itemId);
      setDetails(res.data)
      setTags(res.data.tags)
      setIsFeatured(res.data.isFeatured)
      setFormValues(res.data.details)
      setMoreInfo(res.data.information)
      setImages(res.data.images)
    }

    getProduct()
  }, []);

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
    values.splice(values.findIndex(value => value._id === id), 1);
    setFormValues(values);
  }

  // Reviews 
  const handleReview = (id, event) => {
    const newInputFields = reviews.map(i => {
      if (id === i._id) {
        i[event.target.name] = event.target.value
      }
      return i;
    })

    setReviews(newInputFields);
  };

  // const addReview = () => {
  //   setReviews([...reviews,
  //   {
  //     id: uuidv4(),
  //     review: ''
  //   }])
  // };

  const removeReview = id => {
    const values = [...reviews];
    values.splice(values.findIndex(value => value._id === id), 1);
    setReviews(values);
  }

  // More Information 
  const handleMoreinfo = (id, event) => {
    const newInputFields = moreInfos.map(i => {
      if (id === i._id) {
        i[event.target.name] = event.target.value
      }
      return i;
    })

    setMoreInfo(newInputFields);
  };

  const addMoreinfo = () => {
    setMoreInfo([...moreInfos,
    {
      _id: uuidv4(),
      info: ''
    }])
  };

  const removeMoreinfo = id => {
    const values = [...moreInfos];
    values.splice(values.findIndex(value => value._id === id), 1);
    setMoreInfo(values);
  }

  return (

    <div className='grid p-5 bg-white rounded-lg grid-cols-1 gap-3 justify-around mx-3 my-3'>
      <h1 className='text-center py-3 mb-5 rounded-lg bg-gray-200 text-2xl'>Product Details</h1>

      <div className="grid gap-6 mb-6 md:grid-cols-2">

        {/* Details  */}
        <div>
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Product name</label>
            <input type="text" value={details.name || ""} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" required />
          </div>
          {/* <div>
            <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 ">Brand</label>
            <input type="text" value={details.brand || ""} id="brand" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" required />
          </div> */}
          <div>
            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">Category</label>
            <input type="text" value={details.category || ""} id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" required />
          </div>
          <div>
            <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-900 ">Product code</label>
            <input type="text" value={details.code || ""} id="code" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />
          </div>
          <div>
            <label htmlFor="qty" className="block mb-2 text-sm font-medium text-gray-900">Quantity</label>
            <input type="number" value={details.quantity || ""} id="qty" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" required />
          </div>
          <div>
            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">Price</label>
            <input type="number" value={details.price || null} id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" required />
          </div>
          <div>
            {/* <TagsInput
              // style={styles}
              // className="bg-gray-50 text-clip border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5"
              value={tags}
              // onChange={setTags}
              name="tags"
              placeHolder="enter tags"
            /> */}

            <label htmlFor="tag" className="block mb-2 text-sm font-medium text-gray-900">Tag</label>
            <input type="text" value={tags.join(', ') || null} id="tag" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" required />

          </div>
          <div className="flex items-center pl-2.5 mt-2 rounded-lg border border-gray-300">
            <input id="bordered-checkbox-1" type="checkbox" onClick={() => isFeatured ? setIsFeatured(false) : setIsFeatured(true)} checked={isFeatured} name="bordered-checkbox" className="w-4 h-4 text-red-600 bg-gray-100 rounded border-gray-300 focus:ring-red-600" />
            <label htmlFor="bordered-checkbox-1" className="py-2.5 ml-2 w-full text-sm font-medium text-gray-900">Featured on home</label>
          </div>
        </div>

        {/* Upload product images  */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Upload Photos</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
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
                  className="relative cursor-pointer font-medium p-1 rounded-md text-red-600 hover:text--500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-gray-300"
                >
                  <span>Upload a file</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>

          {/* Product images  */}
          <div className='grid mt-5 gap-2 grid-cols-2'>
            {images.map((item, index) => (

              <div key={index} className='h-36 rounded-lg ring-1 ring-gray-300 hover:opacity-70 cursor-pointer relative'>
                <div className="absolute m-1 z-10 grid items-center justify-items-center top-0 right-0 h-8 w-8 text-white rounded-lg bg-red-600 bg-opacity-25 hover:bg-opacity-50">
                  <button type='button'
                  // onClick={}
                  >
                    <TrashIcon className='text-red-600 h-6 w-6' />
                  </button>
                </div>
                <img alt='product image' src={`${item}`} className='h-36 mx-auto' />
              </div>

            ))}

            {/* <div className='h-36 ring-1 ring-gray-300 rounded-lg hover:opacity-70 cursor-pointer relative'>
              <div className="absolute m-1 z-10 grid items-center justify-items-center top-0 right-0 h-8 w-8 text-white rounded-lg bg-red-600 bg-opacity-25 hover:bg-opacity-50">
                <button type='button'
                // onClick={}
                >
                  <TrashIcon className='text-red-600 h-6 w-6' />
                </button>
              </div>
              <img alt='product image' src={details.imageSrc} className='h-36 mx-auto ' />
            </div> */}
            {/* <div className='h-36 ring-1 ring-gray-300 rounded-lg hover:opacity-70 cursor-pointer relative'>
              <div className="absolute m-1 z-10 grid items-center justify-items-center top-0 right-0 h-8 w-8 text-white rounded-lg bg-red-600 bg-opacity-25 hover:bg-opacity-50">
                <button type='button'
                // onClick={}
                >
                  <TrashIcon className='text-red-600 h-6 w-6' />
                </button>
              </div>
              <img alt='product image' src={details.imageSrc} className='h-36 mx-auto' />
            </div> */}
            {/* <div className='h-36 ring-1 ring-gray-300 rounded-lg hover:opacity-70 cursor-pointer relative'>
              <div className="absolute m-1 z-10 grid items-center justify-items-center top-0 right-0 h-8 w-8 text-white rounded-lg bg-red-600 bg-opacity-25 hover:bg-opacity-50">
                <button type='button'
                // onClick={handleDeletePhoto}
                >
                  <TrashIcon className='text-red-600 h-6 w-6' />
                </button>
              </div>
              <img alt='product image' src={details.imageSrc} className='h-36 mx-auto' />
            </div> */}

          </div>
        </div>


      </div>

      {/* Dynamic Input  */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start gap-2'>

        {/* Details  */}
        <div className='grid items-end gap-2'>
          <h1>Product Details</h1>
          {formValues.map((element, index) => (

            <div key={index} className='grid grid-cols-10 items-end'>
              <div className='col-span-9'>
                <label htmlFor="detail" className="block mb-2 text-xs font-medium text-gray-900">Details</label>
                <input type="text" name="detail" id="detail" value={element.title || ""} onChange={(e) => handleChange(element.id, e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter details" required />
              </div>
              <div>
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

        {/* More Information  */}
        <div className='grid items-end gap-2'>
          <h1>More Information</h1>
          {moreInfos.map((element, index) => (
            <div className="flex gap-2 items-center" key={index}>
              <div className='flex gap-2'>
                <div>
                  <label htmlFor="info" className="block mb-2 text-xs font-medium text-gray-900">Title</label>
                  <input type="text" name="info" id="info" value={element.title || ""} onChange={(e) => handleMoreinfo(element._id, e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter details" required />
                </div>
                <div>
                  <label htmlFor="description" className="block mb-2 text-xs font-medium text-gray-900">Description</label>
                  <input type="text" name="description" id="description" value={element.description || ""} onChange={(e) => handleMoreinfo(element._id, e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter details" required />
                </div>
                {moreInfos.length != 1 && (
                  <button type="button" className="items-end flex" onClick={() => removeMoreinfo(element._id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2 mb-2 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ))}
          <div>
            <button className="w-auto text-white bg-black hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-lg text-xs sm:w-auto px-4 py-2 text-center" type="button" onClick={addMoreinfo}>Add</button>
          </div>
        </div>

        {/* Reviews  */}
        <div className='grid items-end gap-2'>
          <h1>Reviews</h1>
          {details.reviews?.map((element, index) => (
            <div className="flex gap-2 items-center" key={index}>
              <div>
                <label htmlFor="review" className="block mb-2 text-xs font-medium text-gray-900">Reviewed by</label>
                <input type="text" name="review" id="review" value={element.name || ""} onChange={(e) => handleReview(element._id, e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter details" required />
              </div>
              <div className='flex'>
                <div>
                  <label htmlFor="review" className="block mb-2 text-xs font-medium text-gray-900">Comment</label>
                  <input type="text" name="review" id="review" value={element.comment || ""} onChange={(e) => handleReview(element._id, e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter details" required />
                </div>
                {details.reviews.length != 1 && (
                  <button type="button" className="items-end flex" onClick={() => removeReview(element._id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2 mb-2 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ))}
          {/* <div>
            <button className="w-auto text-white bg-black hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-lg text-xs sm:w-auto px-4 py-2 text-center" type="button" onClick={addReview}>Add</button>
          </div> */}
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