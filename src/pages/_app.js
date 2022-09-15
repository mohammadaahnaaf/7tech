import '../styles/globals.css'
import '../styles/tag.css'
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from 'next/router';
import { CartProvider } from 'react-use-cart';
import { useRef } from 'react';
import { useState, RefObject, useEffect } from "react";



function MyApp({ Component, pageProps }) {
  const ref = useRef(null);
  const router = useRouter();

  const variants = {
    initialState: {
      opacity: 0,
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
    },
    animateState: {
      color: "#001451",
      opacity: 1,
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
    },
    exitState: {
      clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
    },
  }

  return (
    <CartProvider>
      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={router.route}
          initial="initialState"
          animate="animateState"
          exit="exitState"
          transition={{
            backgroundColor: "#001451",
            duration: 0.75,
          }}
          variants={variants}
          className="animation-style"
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </CartProvider>
  );

}

export default MyApp