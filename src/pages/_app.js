import '../styles/tag.css'
import '../styles/globals.css'
import { CartProvider } from 'react-use-cart';


const CartContextProvider = ({ children }) => {
  return (
    <CartProvider>
      {children}
    </CartProvider>
  );
};

function MyApp({ Component, pageProps }) {

  return (
    <CartContextProvider>   
        <Component {...pageProps} />
    </CartContextProvider>
  );

}

export default MyApp