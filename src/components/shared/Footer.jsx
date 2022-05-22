import React from 'react'
// import styles from '../../styles/Home.module.css'
import Image from 'next/image'

function Footer() {
  return (
    <footer className='flex gap-2 justify-center text-lg rounded-sm bg-gray-50 py-4'>
      <div className='flex gap-2 justify-center text-gray-500'>
        <h1>
          This site is developed by{' '}
        </h1>
        <a className='text-green-500 hover:text-blue-500' href='https://www.ahnafyaes.tech/'>@Ahnaf</a>{' '} & {' '}
        <a className='text-green-500 hover:text-blue-500' href='https://www.facebook.com/tanvir.stmz'>@Tanvir.</a>
      </div>

      <div className='flex justify-center'>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </div>
    </footer>
  )
}

export default Footer