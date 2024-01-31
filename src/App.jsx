import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Products from './components/Products/Products'
import NewProducts from './components/NewProducts/NewProducts'
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import ProductDetails from './components/ProductDetails/ProductDetails'
import ContextProvider from './utils/ContextProviders'
import Cart from './components/Cart/Cart'
import Checkout from './components/Checkout/Checkout'
import Footer from './components/Footer/Footer'
import './App.css'








function App() {


  return (
    <>
    <ContextProvider>
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} /> 
        <Route path='/products' element={<Products />} /> 
        <Route path='/products/:id' element={<ProductDetails/>} />
        <Route path='/carts/:id' element={<Cart/>} />
        <Route path='/new-products' element={<NewProducts />} />
        <Route path='/checkout' element={<Checkout/>} />
      </Routes> 
      <Footer/>
      </BrowserRouter>
    </ContextProvider>

    </>
  )
}

export default App
