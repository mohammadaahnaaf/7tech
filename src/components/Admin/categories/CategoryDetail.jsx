import React from 'react'
import { useRouter } from 'next/router';
import { ErrorText, SuccessText } from '@seventech/shared';
import { AdminLayout } from '@seventech/layout';
import axiosRoot from '@seventech/utils/axios-root';
import axiosAPI from '@seventech/utils/axios-api';

function Detail() {

  const router = useRouter()
  let itemId = router.query.id

  const [category, setCategory] = React.useState({
    _id: '',
    name: '',
    subCategories: []
  })
  const [formValues, setFormValues] = React.useState([
    {
      _id: '',
      name: ""
    }
  ])
  const [sub, setSub] = React.useState(
    {
      _id: '',
      name: ""
    })
  const [error, setError] = React.useState('')
  const [success, setSuccess] = React.useState('')
  const [featured, setFeatured] = React.useState(false)
  const [indexing, setIndexing] = React.useState(0)

  //Get Data
  React.useEffect(() => {
    async function getCategory() {
      const res = await axiosRoot.get(`/categories/${itemId}`);
      setCategory(res.data)
      setFeatured(res.data.isFeatured)
      setIndexing(res.data.index)
      setFormValues(res.data.subCategories)
    }
    itemId && getCategory()
  }, [success, itemId]);

  // submit form data
  const handleSubmit = async (event) => {

    try {
      event.preventDefault()

      const data = new FormData(event.currentTarget);

      const reqData = {
        // subCategories: JSON.stringify(formValues),
        // name: data.get('categoryName'),
        name: category.name,
        tagline: data.get('tagline'),
        isFeatured: featured,
        index: +indexing
      }
      await axiosAPI.put(`/categories/${itemId}`, reqData)

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

  // Add subcategory
  async function addFormFields() {
    const reqSubData = {
      name: sub.name,
    }
    await axiosAPI.post(`/categories/${itemId}/sub-category`, reqSubData)
    setSuccess('subcategory added')
    setTimeout(() => { setSuccess('') }, 2000)

    // setFormValues([...formValues,
    // {
    //   _id: uuidv4(),
    //   name: ''
    // }])
  };

  // delete subcategory 
  function removeFormFields(id) {
    axiosAPI.delete(`/categories/${itemId}/sub-category/${id}`)

    const values = [...formValues];
    values.splice(values.findIndex(value => value.id === id), 1);
    setFormValues(values);
    setSuccess('Subcategory vanished')
    setTimeout(() => { setSuccess('') }, 2000)
  }

  // edit category 
  const handleCatChange = (event) => {
    const { name, value } = event.target;
    setCategory((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  return (

    <div className='p-5 min-h-screen bg-white rounded-lg m-3'>
      <SuccessText success={success} />
      <ErrorText error={error} />
      <form onSubmit={handleSubmit}>
        <h1 className='text-center py-3 mb-5 rounded-lg bg-gray-200 text-2xl'>Edit Category</h1>
        <div className="grid gap-2 max-w-4xl mx-auto bg-gray-100 shadow rounded-lg ring-2 ring-gray-300 mb-6">
          {featured && (
            <>
              <div className='w-full px-4 pt-2'>
                <label htmlFor="tagline" className="block my-2 text-xs font-medium text-gray-900">Tagline</label>
                <input type="text" value={category.tagline || ''} onChange={(e) => handleCatChange(e)} name='tagline' id="tagline" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5" placeholder="Category Title" />
              </div>

              <div className='w-full px-4 pt-2'>
                <label htmlFor="indexing" className="block my-2 text-xs font-medium text-gray-900">Index</label>
                <select id="indexing" onChange={(e) => setIndexing(e.target.value)} value={indexing || ""} name='indexing' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5" placeholder="Category Index">
                  <option value='1'>1st</option>
                  <option value='2'>2nd</option>
                  <option value='3'>3rd</option>
                  <option value='4'>4th</option>
                  <option value='5'>5th</option>
                </select>
              </div>
            </>
          )}
          <div className='w-full px-4'>
            <label htmlFor="name" className="block my-2 text-xs font-medium text-gray-900">Category name</label>
            <input type="text" name='name' id="name"
              value={category.name || ''}
              onChange={(e) => handleCatChange(e)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5" placeholder="Category Name" required />
          </div>

          <div className='px-4 grid items-center w-full gap-2'>

            {formValues?.map((value, index) => (
              <div className='flex w-full' key={index}>
                <div className='w-[96%]'>
                  <label htmlFor="name" className="block mb-2 text-xs text-gray-900">childs</label>
                  <input
                    type="text" name="name" id="name" value={value.name || ""}
                    onChange={(e) => handleChange(value._id, e)}
                    className="bg-gray-50 w-full border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-red-500 focus:border-red-500 block p-2.5" placeholder="Enter a subcategory" required />
                </div>

                {formValues.length != 0 ? (
                  <button type="button" className="col-span-1 items-end flex" onClick={() => removeFormFields(value._id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2 mb-2 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                ) : (
                  <button type="button" className="col-span-1 items-end flex cursor-not-allowed">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2 mb-2 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                )}
              </div>
            ))}

            <div>
              <div className='w-[96%]'>
                <label htmlFor="name" className="block mb-2 text-xs text-gray-900">New child</label>
                <input
                  type="text" name="name" id="name"
                  value={sub.name || ""}
                  onChange={(e) => setSub({ name: e.target.value })}
                  className="bg-gray-50 w-full border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-red-500 focus:border-red-500 block p-2.5" placeholder="Enter a subcategory" />
              </div>
            </div>
            <div>
              <button className="w-auto text-white bg-black hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-lg text-xs sm:w-auto px-4 py-2 text-center" type="button" onClick={addFormFields}>Add Child</button>
            </div>
          </div>

          <div className='py-2 px-4 border-t-2 border-t-gray-300 rounded-b-lg mt-2 bg-gray-300 flex justify-end'>
            <div className='w-full'>
              <input id="bordered-checkbox-1" type="checkbox" onClick={() => setFeatured(!featured)} checked={featured} name="bordered-checkbox" className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-600" />
              <label htmlFor="bordered-checkbox-1" className="py-2.5 ml-2 w-full text-sm font-medium text-gray-900">Featured on home</label>
            </div>
            <button type='submit' className='rounded-lg hover:bg-red-600 bg-black text-xs text-white px-4 py-2'>Done</button>

          </div>
        </div>
      </form>
    </div>
  )
}

export function CategoryDetail() {
  return (
    <AdminLayout>
      <Detail />
    </AdminLayout>
  )
}