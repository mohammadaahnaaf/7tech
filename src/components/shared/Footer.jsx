import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
// import Image from 'next/image'

export function Footer() {
  return (
    <footer className='flex gap-2 align-bottom justify-center text-lg bg-black py-2'>
      <div className='flex text-sm gap-2 justify-center'>
        <h1 className='text-red-600'>
          Copyright © SevenTech 2022.
        </h1>
        {/* <a className='text-gray-800 hover:text-white' href='https://www.ahnafyaes.tech/'>@Ahnaf</a>{' '} & {' '} */}
        {/* <a className='text-gray-800 hover:text-white' href='https://www.facebook.com/tanvir.stmz'>@Tanvir.</a> */}
      </div>
    </footer>
  )
}
// [url('/banners/redragon4.png')] bg-no-repeat

export function Footers() {
  return (

    <footer className="bg-black font-normal bg-center bg-cover">
      <div className='bg-black bg-opacity-0 p-6'>
        <div className="md:flex md:justify-between">
          <div className="md:hidden block mb-6">
            <Link href="/">
              <a className="grid gap-2 items-center justify-items-center">
                <Image height={45} width={100} src="/logo.png" className="w-auto h-8" alt="Logo" />
                <span className="self-center text-lg font-medium whitespace-nowrap text-white hover:text-red-600">SevenTech Engineering LTD.</span>
              </a>
            </Link>
          </div>
          <div className="hidden md:block">
            <Link href="/">
              <a className="grid gap-2 items-center justify-items-center">
                <Image height={60} width={120} src="/logo.png" className="hidden md:block w-auto h-8" alt="Logo" />
                <span className="self-center text-lg font-medium whitespace-nowrap text-white hover:text-red-600">SevenTech Engineering Ltd.</span>
              </a>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div>

              <h2 className="mb-3 text-sm font-semibold uppercase text-white">Call Us</h2>
              <ul className="text-white">
                <li className="mb-2 hover:text-red-600 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <Link href='tel:+8801911444466'>
                    <a className="font-normal">+8801911444466</a>
                  </Link>
                </li>
                <li className="flex hover:text-red-600 items-center">
                  <svg
                    className="h-4 w-4 mr-1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  <Link href='tel:+8801911444466'>
                    <a className="font-normal">+8801911444466</a>
                  </Link>
                </li>
              </ul>
            </div>


            <div>
              <h2 className="mb-3 text-sm font-semibold uppercase text-white">About</h2>
              <ul className="text-white">
                <li className="mb-2">
                  <Link href="/about">
                    <a className="hover:text-red-600">About us</a>
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/about/terms">
                    <a className="hover:text-red-600">Terms &amp; Conditions</a>
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/about/privacy">
                    <a className="hover:text-red-600">Privacy Policy</a>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-3 text-sm font-semibold uppercase text-white">Contact</h2>
              <ul className="text-white">
                <li className="mb-2">
                  <Link href="https://www.facebook.com/rdragonbd/">
                    <a className="flex items-center hover:text-red-600">

                      <svg
                        className="h-4 w-4 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                      </svg>

                      <span> Facebook </span>
                    </a>
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="https://twitter.com/redragonusa">
                    <a className="hover:text-red-600 flex items-center">
                      <svg
                        className="h-4 w-4 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                      </svg>
                      <span>Twitter</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="https://www.instagram.com/redragon_usa">
                    <a className="hover:text-red-600 flex items-center">

                      <svg
                        className="h-4 w-4 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                      <span>Instagram</span>
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-3 text-sm font-semibold text-white uppercase">Find us</h2>
              <ul className="text-white">
                <li className="mb-2">
                  <Link href='https://goo.gl/maps/7nBfZRWCmJXRNqdX8'>
                    <a className='cursor-pointer hover:text-red-600'>
                      <p className='flex items-center mb-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        Level-5/39, Kazi Bhaban,
                      </p>
                      <p className='mb-2 ml-5'>New Elephant Road,</p>
                      <p className='ml-5'>Dhaka-1205, Bangladesh.</p>
                    </a>
                  </Link>
                </li>
                <li>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-3 border-gray-700 sm:mx-auto lg:my-6" />
        <div className="sm:flex sm:items-center sm:justify-center">
          <span className="text-sm text-blue-600 text-center">© 2023{' '}
            <Link href="https://www.seventech.com.bd">
              <a className="hover:text-red-600">
                SevenTech™{' '}
              </a>
            </Link>
            All rights reserved.
          </span>
          {/* <div className="flex mt-4 space-x-6 justify-center sm:mt-0">
          <Link href="https://www.facebook.com/rdragonbd/">
            <a className="text-gray-300 hover:text-gray-200">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path></svg>
            </a>
          </Link>
          <Link href="#">
            <a className="text-gray-300 hover:text-gray-200">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path></svg>
            </a>
          </Link>
          <Link href="#" >
            <a className="text-gray-300 hover:text-gray-200">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg>
            </a>
          </Link>
        </div> */}
        </div>
      </div>
    </footer>

  )
}