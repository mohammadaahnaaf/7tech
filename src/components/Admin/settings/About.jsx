import { Dialog, Transition } from '@headlessui/react';
import axiosAPI from '@seventech/utils/axios-api';
import React, { Fragment } from 'react'
import { TrashIcon } from '@heroicons/react/solid';
import axiosRoot from '@seventech/utils/axios-root';
import { ErrorText, SuccessText } from '@seventech/shared';
// import { about } from 'src/data'


function About() {

  const [enabled, setEnabled] = React.useState(false)
  const [success, setSuccess] = React.useState('')
  const [error, setError] = React.useState('')
  const [newtitle, setNewtitle] = React.useState('')
  const [newdescription, setNewdescription] = React.useState('')
  const [about, setAbout] = React.useState([])

  //Get Data
  React.useEffect(() => {
    async function getContent() {
      const res = await axiosRoot.get('/content/about');
      setAbout(res.data)
    }
    getContent()
  }, [success]);

  function closeModal() {
    setEnabled(false)
  }

  async function handleDelete(id) {
    try {
      await axiosAPI.delete(`/content/about/${id}`);
      setSuccess('About Vanished')
      setTimeout(() => { setSuccess('') }, 2000)
    } catch (error) {
      console.log(error)
      setError(error.response?.data?.message)
    }
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault()

      const reqData = {
        title: newtitle,
        description: newdescription
      }

      await axiosAPI.post('/content/about', reqData);
      setSuccess('Status Edited')
      setTimeout(() => {
        setSuccess('')
      }, 2000)

    } catch (error) {
      console.log(error)
      setError(error.response?.data?.message)
      setTimeout(() => { setError('') }, 6000)
    }
    setEnabled(false)
  }


  const modal = (
    <Transition appear show={enabled} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-40" />
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
                  className="text-lg font-semibold text-center pb-3 leading-6 text-red-900"
                >
                  Write About @SevenTech
                </Dialog.Title>

                <div className='grid gap-2 px-3 w-full'>
                  <div className='w-full'>
                    <div className='w-full'>
                      <label htmlFor="newtitle" className="block mb-1 text-sm font-medium text-gray-900">New Title</label>
                      <input type="text" name='newtitle' value={newtitle || ''} onChange={(e) => setNewtitle(e.target.value)} id="newtitle" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5" placeholder="Title" required />
                    </div>

                    <div className='w-full'>
                      <label htmlFor="newdescription" className="block mb-1 text-sm font-medium text-gray-900">New Description</label>
                      <textarea type="text" rows={3} value={newdescription || ''} onChange={(e) => setNewdescription(e.target.value)} name='newdescription' id="newdescription" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full px-2.5" placeholder="Desciption" required />
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex gap-2 justify-end">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-black hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                    onClick={handleSubmit}
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
  )

  return (
    <div className='w-full grid gap-2 p-6 rounded-b-md bg-white'>
      <div className='grid gap-2 w-full'>
        <h1 className='text-center text-2xl text-red-600'>About Us</h1>
        <SuccessText success={success} />
        <ErrorText error={error} />
        {about.map((item, index) => {

          return (
            <div key={index} className='flex items-start p-4 rounded-md my-1 bg-red-600 bg-opacity-10 w-full gap-2'>

              <div className='w-full'>
                <div className='w-full'>
                  <label htmlFor="title" className="block mb-1 text-sm font-medium text-gray-900">Title</label>
                  <input type="text" name='title' value={item.title || ''} id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5" placeholder="Title" required />
                </div>

                <div className='w-full'>
                  <label htmlFor="description" className="block mb-1 text-sm font-medium text-gray-900">Description</label>
                  <textarea type="text" rows={4} value={item.description || ''} name='description' id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full px-2.5" placeholder="Desciption" required />
                </div>
              </div>
              <div className="grid h-full content-center items-center">
                <button className='bg-white text-red-600 hover:bg-red-600 hover:text-white p-1 rounded-md' type='button' onClick={() => handleDelete(item._id)}>
                  <TrashIcon className='h-6 w-6' /></button>
              </div>
            </div>
          )
        })}
        <div className='flex items-center bg-green-600 bg-opacity-20 hover:bg-opacity-10 py-2 rounded-md text-green-800 hover:text-green-500 justify-center my-4 text-xl'>
          <button type='button' onClick={() => setEnabled(true)}>Add New</button>
        </div>
        {/* <div className='py-3 flex justify-end gap-2 px-4 bg-opacity-20 bg-black rounded-md mt-3'>
          <button className='bg-red-600 text-white px-4 py-1 rounded-md' type='button'>Cancel</button>
          <button className='bg-white px-4 py-1 rounded-md' type='submit'>Done</button>
        </div> */}
      </div>
      {modal}
    </div>
  )
}

export default About