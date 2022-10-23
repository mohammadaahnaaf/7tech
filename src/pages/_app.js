import '../styles/globals.css'
import '../styles/tag.css'
import { CartProvider } from 'react-use-cart';
// import { motion, AnimatePresence } from "framer-motion";
// import { useRef } from 'react';
// import { useFollowPointer } from '../hoc/use-follow-pointer.ts';
// import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {

  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  );

}

export default MyApp