import React from 'react'
import Login from './components/Login';
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import { useAppContext } from './context/AppContext'
import {Toaster} from 'react-hot-toast'
import AllProducts from './pages/AllProducts';
import ProductCategory from './pages/ProductCategory';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import AddAddress from './pages/AddAddress';
import MyOrders from './pages/MyOrders';
import SellerLogin from './components/seller/SellerLogin';
import WishlistPage from './pages/WishlistPage'; 
import SellerLayout from './pages/seller/SellerLayout';
import AddProduct from './pages/seller/AddProduct';
import ProductList from './pages/seller/ProductList';
import Orders from './pages/seller/Orders';
import ChatPage from "./pages/ChatPage";
import SellerReviews from './pages/seller/SellerReviews';
import Footer from './components/Footer';
import Contact from "./pages/Contact";
const App = () => {
  
  const isSellerPath = useLocation().pathname.includes('seller');
  const {showUserLogin, isSeller} = useAppContext();
  return (
    <div className='text-default min-h-screen text-gray-700 bg-white'>

      {isSellerPath ? null : <Navbar/>}
      {showUserLogin ? <Login/> : null}
            
      <Toaster/>
      <div className={`${isSellerPath ? "" : 'px-6 md:px-16 lg:px-24 xl:px-32'}`}>
        <Routes>                    
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:category" element={<ProductCategory />} />
          <Route path="/products/:category/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/add-address" element={<AddAddress />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/seller" element={ isSeller? <SellerLayout/> :<SellerLogin/>}>
            <Route index element={isSeller ? <AddProduct/> : null}/>
            <Route path='product-list' element={<ProductList/>}/>
            <Route path='orders' element={<Orders/>}/>
            <Route path="reviews" element={<SellerReviews/>} />
            <Route path="chat" element={<ChatPage />} /> {/* seller chat inside layout */}
          </Route>

        </Routes>
      </div>
      {!isSellerPath && <Footer />}
    </div>
  )
}

export default App;





