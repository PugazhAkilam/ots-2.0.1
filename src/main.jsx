import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import App from './App.jsx'
import { ThemeContextProvider } from './theme/ThemeContext'
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ServiceProvider } from './context/ServicesContext.jsx';
import {Provider} from 'react-redux';
import { store } from './store';

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <ThemeContextProvider>
        <Provider store={store}>

      <CartProvider>
    <WishlistProvider>
<ServiceProvider>
<App />
</ServiceProvider>
</WishlistProvider>

</CartProvider>
</Provider>   
   
   </ThemeContextProvider>
  </StrictMode>,
)
