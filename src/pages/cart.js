import Head from 'next/head'
import React from 'react'
import { CartProvider } from 'react-use-cart';
import Cart from '../components/client/Cart'

function CartPage() {
    return (
        <>
            <Head>
                <title>SevenTech | Cart</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <CartProvider>
                <Cart />
            </CartProvider>
        </>
    )
}

export default CartPage;