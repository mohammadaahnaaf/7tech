import React, { useState, useEffect } from 'react'
import AdminLayout from '../../layout/AdminLayout'
import { v4 as uuidv4 } from 'uuid';
import { dataCategories } from '../../../data/CategoriesData';
import { useRouter } from 'next/router';
// import { useParams } from 'react-router-dom';

export function Detail() {

  const [itemId, setItemId] = useState()
  const router = useRouter()
  // let itemId = router.query.id || 1
  console.log("ItemId: " + itemId)

  const [loading, setLoading] = useState(false)
  const [itemo, setItemo] = useState({
    id: '',
    name: '',

  });

  useEffect(() => {
    setItemId(router.query.id)
    const data = dataCategories.find(i => i.id === 1)
    async function getProduct() {
      // const res = await axiosAPI.get('/products/' + itemId);
      // setOrder(res.data)
      setItemo(data)
      setFormValues(data?.childs)
    }
    console.log("itemo: ", itemo)
    getProduct()
  }, []);

  const [formValues, setFormValues] = useState([
    { id: uuidv4(), name: "" }
  ])

  const handleChange = (id, event) => {
    const newInputFields = formValues.map(i => {
      if (id === i.id) {
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
      id: uuidv4(),
      name: ''
    }])
  };

  const removeFormFields = id => {
    const values = [...formValues];
    values.splice(values.findIndex(value => value.id === id), 1);
    setFormValues(values);
  }


  return (
    <div className='p-5 min-h-screen bg-white rounded-lg m-3'>
      <form>
        <h1 className='text-center py-3 mb-5 rounded-lg bg-gray-200 text-2xl'>Category Details</h1>
        <div className="grid gap-2 mx-auto max-w-4xl bg-gray-100 shadow rounded-lg ring-2 ring-gray-300 mb-6">

          <div className='w-full px-4'>
            <label htmlFor="name" className="block my-2 text-xs font-medium text-gray-900">Category name</label>
            <input type="text" id="name" name='name' placeholder="Category name" required
              value={itemo?.name || ''}
              // value={res.name}
              onChange={(e) => handleName(itemo.id, e)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>

          <div className='px-4 grid items-center w-full gap-2'>

            {formValues?.map((element, index) => (
              <div className='grid grid-cols-10 w-full' key={index}>
                <div className='col-span-9'>
                  <label htmlFor="child" className="block mb-2 text-xs text-gray-900">childs</label>
                  <input
                    type="text" name="name" id="child" value={element.name || ""}
                    onChange={(e) => handleChange(element.id, e)}
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" placeholder="Enter a child" required />
                </div>
                {formValues.length != 1 && (
                  <button type="button" className="items-end flex" onClick={() => removeFormFields(element.id)}>
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
            <button type='submit' className='rounded-lg hover:bg-red-600 bg-black text-xs text-white px-4 py-2'>Done</button>
          </div>
        </div>
      </form>
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