import React, { useState } from 'react'
import { TrashIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import axiosAPI from '../../utils/axios-api';
import axiosRoot from '../../utils/axios-root';
import { ErrorText } from '@seventech/shared';
import { AdminLayout } from '@seventech/layout';
import { Tab } from '@headlessui/react'
import Privacy from './Privacy';
import Terms from './Terms';
import About from './About';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


function Setting() {

  const router = useRouter();
  const [tab, setTab] = useState('about')
  const [files, setFile] = useState([]);
  const [error, setError] = useState('')
  const [banners, setBanners] = useState([])
  const [success, setSuccess] = useState('')

  // get images data 
  React.useEffect(() => {
    async function getBanners() {
      const res = await axiosRoot.get('/banner');
      setBanners(res.data)
    }
    getBanners()
  }, [success]);

  // Delete Banner
  async function handleDelete(id) {
    await axiosAPI.delete(`/banner/${id}`);
    setSuccess('Banner Vanished')
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
    <div className='pt-6'>
      <ErrorText error={error} />
      <form onSubmit={handleSubmit}>
        {/* Upload banners  */}
        <div className="shadow overflow-hidden">

          <div className="px-4 py-5 bg-red-600 sm:p-6">

            {/* Banners Upload  */}
            <div>
              <label className="block text-sm font-medium text-gray-100">Upload Photos</label>
              <div className="flex justify-center px-6 pt-5 pb-6 mt-1 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">

                  <div className="flex items-center text-sm text-gray-100">
                    <label
                      htmlFor="file-upload"
                      className="relative p-1 font-medium text-gray-200 mx-auto cursor-pointer hover:text--500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-gray-300"
                    >
                      <svg
                        className="w-12 h-12 mx-auto text-gray-100 hover:text-white"
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
                      <span>Upload A New Banner</span>
                      <input multiple id="file-upload" name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={handleSelectImage}
                      />
                    </label>
                  </div>
                  {/* <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p> */}
                </div>
              </div>
            </div>
          </div>

          {/* Banners Images */}
          <div className='grid p-4 bg-black'>
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
  )
}

export function Settings() {

  return (
    <AdminLayout>
      {/* <Setting /> */}
      <Tabs />
    </AdminLayout>
  )
}


export function Tabs({ children }) {
  const [tab, setTab] = useState('banner')
  const tabs = [
    {
      value: 'banner',
      name: 'Banner',
    },
    {
      value: 'about',
      name: 'About Us',
    },
    {
      value: 'terms',
      name: 'Terms And Conditions',
    },
    {
      value: 'privacy',
      name: 'Privacy Policy',
    },
  ]

  return (
    <div className="max-w-6xl rounded-t-md my-6 bg-white w-full mx-auto pt-6">
      <Tab.Group>
        <Tab.List className="grid lg:flex border-y-2 border-y-red-600">

          {tabs.map((item, index) => (
            <Tab
              key={item.value}

              className={({ selected }) =>
                classNames(
                  index === 3 ? "" : "border-r-2",
                  'w-full py-2.5 text-sm font-medium leading-5 text-red-600 border-red-600 hover:border-white',
                  'focus:outline-none focus:ring-0',
                  selected
                    ? 'bg-red-600 shadow text-white border-white'
                    : 'hover:bg-red-600 border-red-600 hover:text-white'
                )
              }
            >
              <button type='button' onClick={() => setTab(item.value)}>
                {item.name}
              </button>
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="">

          <Tab.Panel>
            <Setting />
          </Tab.Panel>

          <Tab.Panel>
            <About />
          </Tab.Panel>

          <Tab.Panel>
            <Terms />
          </Tab.Panel>

          <Tab.Panel>
            <Privacy />
          </Tab.Panel>

        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
