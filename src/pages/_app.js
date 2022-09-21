import '../styles/globals.css'
import '../styles/tag.css'
import { motion, AnimatePresence } from "framer-motion";
import { CartProvider } from 'react-use-cart';
import { useRef } from 'react';
// import { useFollowPointer } from '../hoc/use-follow-pointer.ts';
// import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {

  const ref = useRef(null);
  // const { x, y } = useFollowPointer(ref);
  // const router = useRouter();
  // const variants = {
  //   initialState: {
  //     opacity: 0,
  //     clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
  //   },
  //   animateState: {
  //     color: "#001451",
  //     opacity: 1,
  //     clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
  //   },
  //   exitState: {
  //     clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
  //   },
  // }

  return (
    <CartProvider>
      <AnimatePresence exitBeforeEnter>
        {/* <motion.div
          ref={ref}
          animate={{ x, y }}
          transition={{
            type: "spring",
            damping: 3,
            stiffness: 50,
            restDelta: 0.001
          }}
          className="animation-style"
        /> */}
        <Component {...pageProps} />

      </AnimatePresence>
    </CartProvider>
  );

}

export default MyApp