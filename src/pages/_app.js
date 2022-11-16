import '../styles/globals.css'
import '../styles/tag.css'
import { CartProvider } from 'react-use-cart';
// import { Provider } from 'react-redux'
// import store from '../store/store';

function MyApp({ Component, pageProps }) {

  return (
    <CartProvider>
        <Component {...pageProps} />
    </CartProvider>
  );

}

export default MyApp