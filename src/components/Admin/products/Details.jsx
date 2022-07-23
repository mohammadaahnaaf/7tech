import React from 'react'
import AdminLayout from '../../layout/AdminLayout'
// import './thestyles.css'

const Detail = () => {

  const [formValues, setFormValues] = React.useState([{ name: "", email: "" }])

  function handleChange(i, e) {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  }

  function addFormFields() {
    setFormValues([...formValues, { name: "", email: "" }])
  }

  function removeFormFields(i) {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues)
  }

  function handleSubmit(event) {
    event.preventDefault();
    // alert(JSON.stringify(formValues));
  }

  return (

    <div className='grid p-5 bg-white rounded-lg grid-cols-1 gap-3 justify-around mx-3 my-3'>
      <div className="grid gap-6 mb-6 md:grid-cols-2">

        {/* Details  */}
        <div>
          <div>
            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">Product name</label>
            <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="John" required />
          </div>
          <div>
            <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 ">Last name</label>
            <input type="text" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Doe" required />
          </div>
          <div>
            <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900">Company</label>
            <input type="text" id="company" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Flowbite" required />
          </div>
          <div>
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 ">Phone number</label>
            <input type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />
          </div>
          <div>
            <label htmlFor="website" className="block mb-2 text-sm font-medium text-gray-900">Website URL</label>
            <input type="url" id="website" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="flowbite.com" required />
          </div>
          <div>
            <label htmlFor="visitors" className="block mb-2 text-sm font-medium text-gray-900">Unique visitors (per month)</label>
            <input type="number" id="visitors" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" required />
          </div>
        </div>

        {/* Product images  */}
        <div>
          <label className="block text-sm font-medium text-gray-700">upload photos</label>
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
        </div>

      </div>

      {/* <div className="mb-6">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email address</label>
          <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="john.doe@company.com" required />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
          <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="•••••••••" required />
        </div>
        <div className="mb-6">
          <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900">Confirm password</label>
          <input type="password" id="confirm_password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="•••••••••" required />
        </div>
        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input id="remember" type="checkbox" value="" className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300" required />
          </div>
          <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900">I agree with the <a href="#" className="text-blue-600 hover:underline">terms and conditions</a>.</label>
        </div> */}
      {/* <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button> */}

      {/* Dynamic Input fields  */}
      <>
        <div className='grid gap-3'>

          {formValues.map((element, index) => (
            <div className="flex gap-2 items-center" key={index}>
              <div className="mb-6">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                <input type="text" name='name' id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Ahnafia" required />
              </div>
              <div className='flex'>
                <div className="mb-6">
                  <label htmlFor="email" value={element.name || ""} onChange={(e) => handleChange(index, e)} className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                  <input type="email" name="email" id="email" value={element.email || ""} onChange={(e) => handleChange(index, e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="ahnaf1998ff@gmail.com" required />
                </div>
                {index != 0 && (
                  <button type="button" className="items-center ml-2 flex text-red-600 hover:text-red-500" onClick={() => removeFormFields(index)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ))}
          <div className="grid gap-2 m-5">
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" type="button" onClick={() => addFormFields()}>Add</button>
            {/* <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button> */}
          </div>
        </div>
      </>
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