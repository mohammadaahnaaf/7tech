import React, { useState, useEffect } from 'react'
import AdminLayout from '../../layout/AdminLayout'
import { v4 as uuidv4 } from 'uuid';
// import { dataCategories } from '../../../data/CategoriesData';
import { useRouter } from 'next/router';
import axiosRoot from '../../utils/axios-root';
import axiosAPI from '../../utils/axios-api';

export function Detail() {

  const router = useRouter()
  const itemId = router.query.id
  const [error, setError] = React.useState('')
  const [success, setSuccess] = React.useState('')
  const [featured, setFeatured] = React.useState(false)
  const [itemo, setItemo] = useState({
    _id: '',
    name: ''
  });
  const [formValues, setFormValues] = useState([
    {
      _id: '',
      names: ''
    }
  ])

  // get data
  useEffect(() => {

    async function getCategory() {
      const res = await axiosRoot.get(`/categories/${itemId}`);
      setItemo(res.data)
      setFeatured(res.data.isFeatured)
      let childs = res.data.subCategories.map((x) => ({
        _id: x._id,
        names: x.name
      }))
      setFormValues(childs)
    }

    getCategory()
  }, []);


  // submit edited data

  async function handleSubmit(event) {

    try {
      event.preventDefault()

      const data = new FormData(event.currentTarget);

      const reqData = {
        name: itemo.name,
        isFeatured: featured,
        subCategories: formValues.map(value => (
          {
            name: value.names,
          }
        ))
      }
      await axiosAPI.put(`/categories/${itemId}`, reqData);
      setSuccess('Category Edited.')
      setTimeout(() => {
        setSuccess('')
      }, 2000)

    } catch (error) {
      console.log(error)
      setError(error.response?.data?.message)
    }
  }

  const handleChange = (id, event) => {
    const newInputFields = formValues.map(i => {
      if (id === i._id) {
        i[event.target.name] = event.target.value
      }
      return i;
    })

    setFormValues(newInputFields);
  };

  function handleName(id, e) {
    const { name, value } = e.target;
    setItemo(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const addFormFields = () => {
    setFormValues([...formValues,
    {
      _id: uuidv4(),
      names: ''
    }])
  };

  const removeFormFields = id => {
    const values = [...formValues];
    values.splice(values.findIndex(value => value._id === id), 1);
    setFormValues(values);
  }

  // Featured? 
  const handleFeature = () => {
    if (featured === false) {
      setFeatured(true)
    } else {
      setFeatured(false)
    }
  }

  return (

    <div className='p-5 min-h-screen bg-white rounded-lg m-3'>

      <h1 className='text-center py-3 mb-5 rounded-lg bg-gray-200 text-2xl'>Category Details</h1>

      {error && (
        <div class="p-3 my-2 text-sm text-red-700 bg-yellow-100 rounded-lg" role="alert">
          <span class="font-medium">Warning!</span> {error}
        </div>
      )}
      {success && (
        <div class="p-3 my-2 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
          <span class="font-medium">success!</span> {success}
        </div>
      )}

      <div className="grid gap-2 mx-auto max-w-4xl bg-gray-100 shadow rounded-lg ring-2 ring-gray-300 mb-6">
        <form onSubmit={handleSubmit}>

          <div className='w-full px-4'>
            <label htmlFor="name" className="block my-2 text-xs font-medium text-gray-900">Category name</label>
            <input type="text" id="name" name='name' placeholder="Category name" required
              value={itemo?.name || ''}
              // value={res.name}
              onChange={(e) => handleName(itemo._id, e)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>

          <div className='px-4 grid items-center w-full gap-2'>

            {formValues?.map((element, index) => (
              <div className='grid grid-cols-10 w-full' key={index}>
                <div className='col-span-9'>
                  <label htmlFor="names" className="block mb-2 text-xs text-gray-900">Subcategories</label>
                  <input
                    type="text" name="names" id="names" value={element.names || ""}
                    onChange={(e) => handleChange(element._id, e)}
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" placeholder="Enter a child" required />
                </div>
                {formValues.length != 1 && (
                  <button type="button" className="items-end flex" onClick={() => removeFormFields(element._id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2 mb-2 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
            <div>
              <button className="w-auto text-white bg-black hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-lg text-xs sm:w-auto px-4 py-2 text-center" type="button" onClick={addFormFields}>Add Child</button>
            </div>
          </div>

          <div className='py-2 px-4 border-t-2 border-t-gray-300 rounded-b-lg mt-2 bg-gray-300 flex justify-end'>
            <div className='w-full'>
              <input id="bordered-checkbox-1" type="checkbox" onClick={handleFeature} checked={featured} name="bordered-checkbox" className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-600" />
              <label htmlFor="bordered-checkbox-1" className="py-2.5 ml-2 w-full text-sm font-medium text-gray-900">Featured on home</label>
            </div>
            <button type='submit' className='rounded-lg hover:bg-red-600 bg-black text-xs text-white px-4 py-2'>Done</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function Details() {
  return (
    <AdminLayout>
      <Detail />
    </AdminLayout>
  )
}