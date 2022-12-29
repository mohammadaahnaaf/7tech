import Head from 'next/head'
import React from 'react';
import Main from '../components/client/Main'

const Loading = () => (
  <div className='bg-black w-full min-h-[100vh] grid justify-center items-center'>
    <h1 className='text-red-600 text-3xl'>Opss! No Items to show</h1>
    <h1 className='text-red-700 text-xl'>You've deleted everything</h1>
  </div>
)

function MainPage() {
  const [intro, setIntro] = React.useState(true)

  return (
    <>
      <Head>
        <title>SevenTech | Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* {intro && (
        <Loading />
      )}      */}
        <Main setIntro={setIntro} />
    </>
  )
}

export default MainPage;