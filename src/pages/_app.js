import '../styles/tag.css'
import '../styles/globals.css'
import { CartProvider } from 'react-use-cart';
import React from 'react';

function MyApp({ Component, pageProps }) {
  
  const [view, setView] = React.useState(false)
  
  React.useEffect(() => {
    setView(true)
  }, [])

  return view ? (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  ) : null;
}

export default MyApp;