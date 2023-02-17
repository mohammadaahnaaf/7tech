import React, { useState } from 'react'
import { TrashIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import axiosAPI from '../utils/axios-api';
import axiosRoot from '../utils/axios-root';
import { ErrorText } from '@seventech/shared';
import { AdminLayout } from '@seventech/layout';


function Others() {

  const router = useRouter()
  const [files, setFile] = useState([]);
  const [error, setError] = useState('')
  const [banners, setBanners] = useState([])

  // get images data 
  React.useEffect(() => {
    async function getBanners() {
      const res = await axiosRoot.get('/banner');
      setBanners(res.data)
      console.log(res.data)
    }
    getBanners()
  }, []);

  // Delete Banner
  async function handleDelete(id) {
    await axiosAPI.delete(`/banner/${id}`);
    router.reload()
  }

  // submit form data
  const handleSubmit = async (event) => {

    try {
      event.preventDefault()
      const data = new FormData(event.currentTarget);
      data.delete('file-upload')

      Array.from(files).forEach(file => {
        data.append('images', file)
      })

      await axiosAPI.post('/banner', data);
      router.reload()
    } catch (error) {

      console.log(error)
      setError(error.response?.data?.message)
    }
  }

  // handle image upload 
  const handleSelectImage = (e) => {
    let file = e.target.files;

    for (let i = 0; i < file.length; i++) {
      const fileType = file[i]['type'];
      const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
      if (validImageTypes.includes(fileType)) {
        setFile([...files, file[i]]);
      } else {
        setError("only images accepted");
      }
    }
  };
  const removeImage = (i) => {
    setFile(files.filter(x => x.name !== i));
  }


  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="md:grid md:grid-cols-1 md:gap-6">

        <div className="md:col-span-2">
          {/* <SuccessText success={success} /> */}
          <ErrorText error={error} />

          <form onSubmit={handleSubmit}>
            {/* Upload banners  */}
            <div className="shadow overflow-hidden sm:rounded-md">
              <h1 className='py-4 bg-white text-center text-xl'>Banners</h1>

              <div className="px-4 py-5 bg-red-50 sm:p-6">

                {/* Banners Upload  */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Upload Photos</label>
                  <div className="flex justify-center px-6 pt-5 pb-6 mt-1 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">

                      <div className="flex items-center text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative p-1 font-medium text-red-600 mx-auto cursor-pointer hover:text--500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-gray-300"
                        >
                          <svg
                            className="w-12 h-12 mx-auto text-gray-400 hover:text-red-600"
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
                          <span>Upload New Banners</span>
                          <input multiple id="file-upload" name="file-upload"
                            type="file"
                            className="sr-only"
                            onChange={handleSelectImage}
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Banners Images */}
              <div className='grid p-4 bg-white'>
                <div className='grid grid-cols-2 w-full gap-2'>
                  {files?.map((file, index) =>
                    <div key={index} className='h-36 rounded-lg ring-1 ring-gray-300 hover:opacity-70 cursor-pointer relative'>
                      <div className="absolute m-1 z-10 grid items-center justify-items-center top-0 right-0 h-8 w-8 text-white rounded-lg bg-red-600 bg-opacity-25 hover:bg-opacity-50">
                        <button type='button'
                          onClick={() => { removeImage(file.name) }}
                        >
                          <TrashIcon className='text-red-600 h-6 w-6' />
                        </button>
                      </div>
                      <img alt='product image' src={URL.createObjectURL(file)} className='h-36 mx-auto' />
                    </div>
                  )}
                </div>
                {files.length === 0 && (
                  <div className='grid grid-cols-2 w-full gap-2'>
                    {banners?.map((item, index) =>
                      <>
                        {item.images.map((image) =>
                          <div key={index} className='h-36 rounded-lg ring-1 ring-gray-300 hover:opacity-70 cursor-pointer relative'>
                            <div className="absolute m-1 z-10 grid items-center justify-items-center top-0 right-0 h-8 w-8 text-white rounded-lg bg-red-600 bg-opacity-25 hover:bg-opacity-50">
                              <button type='button'
                                onClick={() => handleDelete(item._id)}
                              >
                                <TrashIcon className='text-red-600 h-6 w-6' />
                              </button>
                            </div>
                            <img alt='product image' src={image} className='h-36 mx-auto' />
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>

              <div className="px-4 py-3 bg-red-200 text-right sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export function Settings() {

  return (
    <AdminLayout>
      <Others />
    </AdminLayout>
  )
}