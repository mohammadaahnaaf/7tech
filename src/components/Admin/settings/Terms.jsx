import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react'
import { terms } from 'src/data'

function Terms() {

  const [selected, setSelected] = React.useState([]);
  const [allSelected, setAllSelected] = React.useState(false)
  const [enabled, setEnabled] = React.useState(false)

  function handleAllChecked(event) {
    // !checkedAll ? setCheckedAll(true) : setCheckedAll(false)
    if (event.target.checked) {
      const newSelecteds = products.map((n) => n._id);
      setSelected(newSelecteds);
      setAllSelected(true)
      return;
    }
    setSelected([]);
    setAllSelected(false)
  }

  const handleChecked = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };
  const isSelected = (name) => selected.indexOf(name) !== -1 || allSelected;
  function closeModal() {
    setEnabled(false)
  }

  function handleSubmit(e) {
    e.preventDefault()
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
                  Add A New Terms Or Condition
                </Dialog.Title>

                <div className='grid gap-2 px-3 w-full'>
                  <div className='w-full'>
                    <div className='w-full'>
                      <label htmlFor="newtitle" className="block mb-1 text-sm font-medium text-gray-900">New Title</label>
                      <input type="text" name='newtitle' id="newtitle" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5" placeholder="Title" required />
                    </div>

                    <div className='w-full'>
                      <label htmlFor="newdescription" className="block mb-1 text-sm font-medium text-gray-900">New Description</label>
                      <textarea type="text" rows={3} name='newdescription' id="newdescription" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full px-2.5" placeholder="Desciption" required />
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
                    type="submit"
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
        <h1 className='text-center text-2xl text-red-600'>Terms and Conditions</h1>
        {terms.map((item, index) => {

          const isItemSelected = isSelected(item._id);
          return (
            <div className='flex items-start w-full gap-2'>
              {/* <div className="flex items-center">
              <input id="checkbox-all" onChange={handleAllChecked} type="checkbox" className="cursor-pointer w-4 h-4 text-red-600 bg-gray-100 rounded border-gray-300 focus:ring-red-500 focus:ring-2" />
              <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
            </div> */}

              <div className="flex pt-9 items-center">
                <input onChange={(event) => handleChecked(event, item._id)} checked={isItemSelected} id="checkbox" type="checkbox" className="cursor-pointer w-4 h-4 text-red-600 bg-gray-100 rounded border-gray-300 focus:ring-red-500 focus:ring-2" />
                <label htmlFor="checkbox" className="sr-only">checkbox</label>
              </div>

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
            </div>
          )
        })}
        <div className='flex items-center bg-green-600 bg-opacity-20 hover:bg-opacity-10 py-2 rounded-md text-green-800 hover:text-green-500 justify-center my-4 text-xl'>
          <button type='button' className='w-full' onClick={() => setEnabled(true)}>Add New</button>
        </div>
        <div className='py-3 flex justify-end gap-2 px-4 bg-opacity-20 bg-black rounded-md mt-3'>
          <button className='bg-red-600 text-white px-4 py-1 rounded-md' type='button'>Cancel</button>
          <button className='bg-white px-4 py-1 rounded-md' type='submit'>Done</button>
        </div>
      </div>
      {modal}
    </div>
  )
}

export default Terms