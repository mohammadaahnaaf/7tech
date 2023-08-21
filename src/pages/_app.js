import '../styles/tag.css'
import '../styles/globals.css'
import { CartProvider } from 'react-use-cart';

function MyApp({ Component, pageProps }) {

  return (
    <CartProvider>   
        <Component {...pageProps} />
    </CartProvider>
  );

}

export default MyApp;