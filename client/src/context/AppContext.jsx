import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from 'react-hot-toast'
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

export const AppContextProvider = ({children})=>{
    const currency = import.meta.env.VITE_CURRENCY;
    const navigate = useNavigate();
    const [user, setUser] = useState(null)
    const [isSeller, setIsSeller] = useState(false)
    const [showUserLogin, setShowUserLogin] = useState(false)
    const [products, setProducts] = useState([])
    const [cartItems, setCartItems] = useState({})
    const [searchQuery, setSearchQuery] = useState({})
    const [wishlistProducts, setWishlistProducts] = useState([]);

    //fetch user authentication
    const fetchUser = async() => {
     try {
        const {data} = await axios.get('/api/user/is-auth');
        if (data.success){
            setUser(data.user);
            setCartItems(data.user.cartItems);
        }
     } catch (error) {
        console.error('Authentication error:', error);
        setUser(null)
     }
   }

    const  fetchProducts = async()=>{
        setProducts(dummyProducts)
    }
    const addToCart =(itemId)=>{
        let cartData=structuredClone(cartItems);

        if (cartData[itemId]){
            cartData[itemId]+=1;
        }else{
            cartData[itemId]=1;
        }
        setCartItems(cartData);
        toast.success("Added to cart")
    }

    const updateCartItem=(itemId,quantity)=>{
        let cartData=structuredClone(cartItems);
        cartData[itemId]=quantity;
        setCartItems(cartData);
        toast.success("Cart Updated")
    }

    const removeFromCart=(itemId)=>{
        let cartData= structuredClone(cartItems);
        if (cartData[itemId]){
            cartData[itemId]-=1;
            if (cartData[itemId]===0){
                delete cartData[itemId];
            }
        }
        setCartItems(cartData);
        toast.success("Removed from Cart")
    }

    const getcartcount = ()=>{
        let totalcount= 0;
        for(const item in cartItems){
            totalcount+=cartItems[item];
        }
        return totalcount;
    }

    const getcartamount = ()=>{
        let totalamount = 0;
        for (const items in cartItems){
            let itemInfo= products.find((product)=>product._id === items);
            if(cartItems[items]>0){
                totalamount+=itemInfo.offerPrice * cartItems[items];
            }
        }
        return Math.floor(totalamount*100)/100;
    }

    const addToWishlist = async (productId) => {
      if (!user) return toast.error("Please login first");
      try {
       const { data } = await axios.post('/api/wishlist/add', { productId });
       if (data.success) toast.success(data.message);
        fetchWishlist();
      } catch (error) {
        toast.error(error.message);
      }
    }; 

    const removeFromWishlist = async (productId) => {
      if (!user) return toast.error("Please login first");
      try {
        const { data } = await axios.post('/api/wishlist/remove', { productId });
        if (data.success) toast.success(data.message);
          fetchWishlist();
      } catch (error) {
        toast.error(error.message);
      }
    };

    const fetchWishlist = async () => {
      if (!user) return;
      try {
        const { data } = await axios.get('/api/wishlist');
        if (data.success) setWishlistProducts(data.products);
      } catch (error) {
        toast.error(error.message);
      }
    };


    useEffect(()=>{
        fetchUser()
        fetchProducts()
    },[])

    //updating database cart items:
     useEffect(()=>{
       const updateCart= async()=>{
        try {
            const {data} = await axios.post('/api/cart/update',{cartItems})
            if (!data.success){
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message) 
        }
       }
       if (user){
        updateCart()
       }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[cartItems])

    const value ={navigate, user, setUser, isSeller, setIsSeller, showUserLogin, setShowUserLogin,products,currency,
        addToCart,updateCartItem, removeFromCart, cartItems, searchQuery, setSearchQuery,getcartcount, 
        getcartamount,axios,fetchProducts,setCartItems,addToWishlist, removeFromWishlist, fetchWishlist, wishlistProducts};
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = ()=>{
    return useContext(AppContext)

}

