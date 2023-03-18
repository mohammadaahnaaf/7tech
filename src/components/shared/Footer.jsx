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

export function Footers() {
  return (

    <footer className="p-4 border-t-2 border-red-600 bg-black sm:p-6">
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
              <span className="self-center text-lg font-medium whitespace-nowrap hover:text-white text-red-600">SevenTech Engineering Ltd.</span>
            </a>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>

            <h2 className="mb-3 text-sm font-semibold uppercase text-red-600">Call Us</h2>
            <ul className="text-red-600">
              <li className="mb-2 hover:text-gray-200 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <Link href='tel:+8801911444466'>
                  <a className="font-normal">+8801911444466</a>
                </Link>
              </li>
              <li className="flex hover:text-gray-200 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <Link href='tel:+8801911444466'>
                  <a className="font-normal">+8801911444466</a>
                </Link>
              </li>
            </ul>
          </div>


          <div>
            <h2 className="mb-3 text-sm font-semibold uppercase text-red-600">About</h2>
            <ul className="text-red-600">
              <li className="mb-2">
                <Link href="/about">
                  <a className="hover:text-gray-100">About us</a>
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/about/terms">
                  <a className="hover:text-gray-100">Terms &amp; Conditions</a>
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/about/privacy">
                  <a className="hover:text-gray-100">Privacy Policy</a>
                </Link>
              </li>
              {/* <li>
                <a href="#" className="hover:text-red-600">Help</a>
              </li> */}
            </ul>
          </div>
          <div>
            <h2 className="mb-3 text-sm font-semibold uppercase text-red-600">Contact</h2>
            <ul className="text-red-600">
              <li className="mb-2">
                <Link href="https://www.facebook.com/rdragonbd/">
                  <a className="hover:text-gray-100">Facebook</a>
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#">
                  <a className="hover:text-gray-100 ">Twitter</a>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <a className="hover:text-gray-100">Instagram</a>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-3 text-sm font-semibold text-red-600 uppercase">Find us</h2>
            <ul className="text-red-600">
              <li className="mb-2">
                <Link href='https://goo.gl/maps/7nBfZRWCmJXRNqdX8'>
                  <a className='cursor-pointer hover:text-gray-100'>
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
                {/* <Link href='tel:+8801911444466'>
                  <a className='flex items-center mt-2  hover:text-gray-100'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    +8801911444466
                  </a>
                </Link> */}
              </li>
              <li>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr className="my-3 border-red-600 sm:mx-auto lg:my-8" />
      <div className="sm:flex sm:items-center sm:justify-center">
        <span className="text-sm text-red-600 text-center">© 2023{' '}
          <Link href="https://www.seventech.com.bd">
            <a className="hover:text-green-500 text-blue-600">
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
    </footer>

  )
}