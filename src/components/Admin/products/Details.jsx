import React from 'react'
import AdminLayout from '../../layout/AdminLayout'
import { v4 as uuidv4 } from 'uuid';
import { TrashIcon } from '@heroicons/react/solid';
import Router, { useRouter } from 'next/router';
import axiosRoot from '../../utils/axios-root';
// import { TagsInput } from 'react-tag-input-component';
import axiosAPI from '../../utils/axios-api';
import { TagsInput } from 'react-tag-input-component';

const Detail = () => {

  const router = useRouter()
  const itemId = router.query.id

  const [cats, setCats] = React.useState([]);
  const [tags, setTags] = React.useState([]);
  const [images, setImages] = React.useState([]);
  const [files, setFiles] = React.useState([]);
  const [loading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState('')
  const [success, setSuccess] = React.useState('')
  const [isFeatured, setIsFeatured] = React.useState(false)
  const [details, setDetails] = React.useState(
    {
      _id: '',
      name: '',
      category: '',
      specifications: '',
      code: '',
      quantity: '',
      price: "",

    }
  );
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
      _id: "",
      name: "",
      comment: ""
    }
  ]);

  // get category options
  React.useEffect(() => {
    async function getCategory() {
      const res = await axiosRoot.get('/categories');
      setCats(res.data)
    }
    getCategory()
  }, []);

  // get data 
  React.useEffect(() => {

    async function getProduct() {
      const res = await axiosAPI.get(`/products/${itemId}`);
      setDetails(res.data)
      setTags(res.data.tags)
      setReviews(res.data.reviews)
      setIsFeatured(res.data.isFeatured)
      setFormValues(res.data.details)
      setMoreInfo(res.data.information)
      setImages(res.data.images)
    }

    getProduct()
  }, [router, itemId, loading, success]);

  // submit edit 
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
      data.set('isFeatured', isFeatured)

      // data.set('details', JSON.stringify(formValues.map(value => (
      //   { title: value.title }
      // ))))
      // data.set('information', JSON.stringify(moreInfos.map(info => (
      //   {
      //     title: info.title,
      //     description: info.description
      //   }
      // ))))

      Array.from(files).forEach(file => {
        data.append('images', file)
      })
      setIsLoading(true)
      await axiosAPI.put(`/products/${itemId}`, data);
      setSuccess('Category Edited.')
      setTimeout(() => {
        setSuccess('')
      }, 2000)
      setIsLoading(false)
    } catch (error) {

      setIsLoading(false);
      console.log(error)
      setError(error.response?.data?.message)
    }
  }

  // upload images 
  const handleSelectImage = (e) => {
    let file = e.target.files;

    for (let i = 0; i < file.length; i++) {
      const fileType = file[i]['type'];
      const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
      if (validImageTypes.includes(fileType)) {
        setFiles([...files, file[i]]);
        setImages([])
      } else {
        setError("only images accepted");
      }
    }
  };

  // remove image 
  const removeImage = (i) => {
    setFiles(files.filter(x => x.name !== i));
  }

  // handle edit product 
  const handleAllChange = (event) => {
    const { name, value } = event.target;
    setDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
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

  const [newDetails, setNewDetails] = React.useState({
    _id: '',
    title: ''
  })

  // Add new details 
  async function addFormFields() {
    const reqDetailsData = {
      title: newDetails.title
    }
    await axiosAPI.post(`/products/${itemId}/details`, reqDetailsData);

    // setFormValues([...formValues,
    // {
    //   id: uuidv4(),
    //   detail: ''
    // }])
  };
  // delete details 
  function removeFormFields(id) {
    axiosAPI.delete(`/products/${itemId}/details/${id}`);

    const values = [...formValues];
    values.splice(values.findIndex((value) => value._id === id), 1);
    setFormValues(values);

    setSuccess('Product details vanished.')
    setTimeout(() => { setSuccess('') }, 2000)
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

  function removeReview(id) {
    axiosAPI.delete(`/products/${itemId}/review/${id}`);

    const values = [...reviews];
    values.splice(values.findIndex(value => value._id === id), 1);
    setReviews(values);

    setSuccess('Product review vanished.')
    setTimeout(() => { setSuccess('') }, 2000)
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
  
  const [newMoreinfo, setNewMoreinfo] = React.useState({
    _id: '',
    title: '',
    description: ''
  })

  const handleNewMoreinfo = (event) => {
    const { name, value } = event.target;
    setNewMoreinfo((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  async function addMoreinfo() {
    const reqInfoData = {
      title: newMoreinfo.title,
      description: newMoreinfo.description
    }
    await axiosAPI.post(`/products/${itemId}/information`, reqInfoData);
    setSuccess('Product information added.')
    setTimeout(() => { setSuccess('') }, 2000)

    // setMoreInfo([...moreInfos,
    // {
    //   _id: uuidv4(),
    //   info: ''
    // }])
  };

  function removeMoreinfo(id) {
    axiosAPI.delete(`/products/${itemId}/information/${id}`);

    const values = [...moreInfos];
    values.splice(values.findIndex(value => value._id === id), 1);
    setMoreInfo(values);
    setSuccess('Product information vanished.')
    setTimeout(() => { setSuccess('') }, 2000)
  }

  return (
    <div className='grid p-5 bg-white rounded-lg grid-cols-1 gap-3 justify-around mx-3 my-3'>
      <h1 className='text-center py-3 mb-5 rounded-lg bg-gray-200 text-2xl'>Product Details</h1>
      {success && (
        <div class="p-3 my-2 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
          <span class="font-medium">Success</span> {success}
        </div>
      )}
      {error && (
        <div class="p-3 my-2 text-sm text-red-700 bg-yellow-100 rounded-lg" role="alert">
          <span class="font-medium">Warning!</span> {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 mb-6 md:grid-cols-2">

          {/* Product Informations  */}
          <div>
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Product name</label>
              <input type="text" onChange={(event) => handleAllChange(event)} value={details.name || ""} id="name" name='name' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5" placeholder="" required />
            </div>

            <div>
              <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">Category</label>
              <select id="category" name='category'
                onChange={(event) => handleAllChange(event)} value={details.category || ""}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5" placeholder="" required>
                {cats.map((cat) =>
                  <option>{cat.name}</option>
                )}
              </select>
            </div>
            {/* <div>
              <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">Category</label>
              <input type="text" onChange={(event) => handleAllChange(event)} value={details.category || ""} name="category" id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5" placeholder="" required />
            </div> */}
            <div>
              <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-900 ">Product code</label>
              <input type="text" onChange={(event) => handleAllChange(event)} value={details.code || ""} name="code" id="code" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5" placeholder="" />
            </div>
            <div>
              <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900">Quantity</label>
              <input type="number" onChange={(event) => handleAllChange(event)} value={details.quantity || ""} name="quantity" id="quantity" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5" placeholder="" />
            </div>
            <div>
              <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">Price</label>
              <input type="number" onChange={(event) => handleAllChange(event)} value={details.price || null} name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5" placeholder="" required />
            </div>
            <div>
              <label htmlFor="specifications" className="block mb-2 text-sm font-medium text-gray-900">Product specifications</label>
              <textarea type="text" rows={3} onChange={(event) => handleAllChange(event)} value={details.specifications || ""} id="specifications" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5" placeholder="enter specifications" />
            </div>

            <div>
              <TagsInput
                value={tags}
                onChange={setTags}
                // name="tags"
                // id="tags"
                placeHolder="enter tags"
              />
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
                    <input id="file-upload" name="file-upload"
                      onChange={handleSelectImage}
                      type="file"
                      className="sr-only"
                      multiple
                    />
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
                      onClick={() => { removeImage(item.name) }}
                    >
                      <TrashIcon className='text-red-600 h-6 w-6' />
                    </button>
                  </div>
                  <img alt='product image' src={`${item}`} className='h-36 mx-auto' />
                </div>

              ))}
              {files.map((item, index) => (

                <div key={index} className='h-36 rounded-lg ring-1 ring-gray-300 hover:opacity-70 cursor-pointer relative'>
                  <div className="absolute m-1 z-10 grid items-center justify-items-center top-0 right-0 h-8 w-8 text-white rounded-lg bg-red-600 bg-opacity-25 hover:bg-opacity-50">
                    <button type='button'
                      onClick={() => { removeImage(item.name) }}
                    >
                      <TrashIcon className='text-red-600 h-6 w-6' />
                    </button>
                  </div>
                  <img alt='product image' src={URL.createObjectURL(item)} className='h-36 mx-auto' />
                </div>

              ))}

            </div>
          </div>

        </div>

        {/* Dynamic Input  */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start gap-2'>

          {/* Details  */}
          {formValues && (
            <div className='grid items-end gap-2'>
              <h1>Product Details</h1>
              {formValues?.map((element, index) => (

                <div key={index} className='grid grid-cols-10 items-end'>
                  <div className='col-span-9'>
                    <label htmlFor="title" className="block mb-2 text-xs font-medium text-gray-900">Details</label>
                    <input type="text" name="title" id="title" value={element.title || ""} onChange={(e) => handleChange(element.id, e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5" placeholder="Enter details" required />
                  </div>
                  <div>
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
              <div className='grid grid-cols-10 items-end'>
                <div className='col-span-9'>
                  <label htmlFor="title" className="block mb-2 text-xs font-medium text-gray-900">New Details</label>
                  <input type="text" name="title" id="title"
                    value={newDetails.title || ""}
                    onChange={(e) => setNewDetails({ title: e.target.value })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5" placeholder="Enter details" required />
                </div>
              </div>
              <div>
                <button className="w-auto text-white bg-black hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-lg text-xs sm:w-auto px-4 py-2 text-center" type="button" onClick={addFormFields}>Add</button>
              </div>
            </div>
          )}

          {/* More Information  */}
          {moreInfos && (
            <div className='grid items-end gap-2'>
              <h1>More Information</h1>
              {moreInfos?.map((element, index) => (
                <div className="flex gap-2 items-center" key={index}>
                  <div className='flex gap-2'>
                    <div>
                      <label htmlFor="title" className="block mb-2 text-xs font-medium text-gray-900">Title</label>
                      <input type="text" name="title" id="title" value={element.title || ""} onChange={(e) => handleMoreinfo(element._id, e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5" placeholder="Enter details" required />
                    </div>
                    <div>
                      <label htmlFor="description" className="block mb-2 text-xs font-medium text-gray-900">Description</label>
                      <input type="text" name="description" id="description" value={element.description || ""} onChange={(e) => handleMoreinfo(element._id, e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5" placeholder="Enter details" required />
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

              <div className="flex gap-2 items-center">
                <div className='flex gap-2'>
                  <div>
                    <label htmlFor="title" className="block mb-2 text-xs font-medium text-gray-900">New Title</label>
                    <input type="text" name="title" id="title"
                      value={newMoreinfo.title || ""}
                      onChange={(e) => handleNewMoreinfo(e)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5" placeholder="Enter details" required />
                  </div>
                  <div>
                    <label htmlFor="description" className="block mb-2 text-xs font-medium text-gray-900">New Description</label>
                    <input type="text" name="description" id="description"
                      value={newMoreinfo.description || ""}
                      onChange={(e) => handleNewMoreinfo(e)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5" placeholder="Enter details" required />
                  </div>

                  <div className="items-end flex">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2 mb-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </div>

                </div>
              </div>
              <div>
                <button className="w-auto text-white bg-black hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-lg text-xs sm:w-auto px-4 py-2 text-center" type="button" onClick={addMoreinfo}>Add</button>
              </div>
            </div>
          )}

          {/* Reviews  */}
          {reviews && (
            <div className='grid items-end gap-2'>
              <h1>Reviews</h1>
              {reviews?.map((element, index) => (
                <div className="flex gap-2 items-center" key={index}>
                  <div>
                    <label htmlFor="name" className="block mb-2 text-xs font-medium text-gray-900">Reviewed by</label>
                    <input type="text" name="name" id="name" value={element.name || ""} onChange={(e) => handleReview(element._id, e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5" placeholder="Enter details" required />
                  </div>
                  <div className='flex'>
                    <div>
                      <label htmlFor="comment" className="block mb-2 text-xs font-medium text-gray-900">Comment</label>
                      <input type="text" name="comment" id="comment" value={element.comment || ""} onChange={(e) => handleReview(element._id, e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5" placeholder="Enter details" required />
                    </div>
                    {reviews.length > 0 && (
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
          )}

        </div>
        <div className='flex items-end justify-end gap-2 p-2 mt-2 bg-gray-200 rounded-lg'>
          <button className="w-auto px-4 py-2 text-xs text-center text-white bg-red-600 rounded-lg hover:bg-black focus:ring-4 focus:outline-none focus:ring-gray-300 sm:w-auto" type='button'>Cancel</button>
          <button className="w-auto px-4 py-2 text-xs text-center text-white bg-black rounded-lg hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-gray-300 sm:w-auto" type='submit'>Submit</button>
        </div>
      </form>
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