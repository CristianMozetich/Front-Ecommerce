import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Products from './components/Products/Products'
import NewProducts from './components/NewProducts/NewProducts'
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import ProductDetails from './components/ProductDetails/ProductDetails'
import Cart from './components/Cart/Cart'
import ContextProvider from './utils/ContextProviders'
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
      </Routes> 
      </BrowserRouter>
    </ContextProvider>

    </>
  )
}

export default App
