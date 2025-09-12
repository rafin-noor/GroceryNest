import React, { useEffect, useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import toast from 'react-hot-toast';

const WishlistPage = () => {
  const { wishlistProducts, fetchWishlist } = useAppContext();
  const warnedProductsRef = useRef(new Set()); // Track products already warned

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const inStockProducts = wishlistProducts.filter(product => {
    if (product.inStock) {
      // Product is in stock, remove from warned set in case it goes out of stock later
      warnedProductsRef.current.delete(product._id);
      return true;
    } else {
      // Product is out of stock
      if (!warnedProductsRef.current.has(product._id)) {
        toast.error(`${product.name} is out of stock`);
        warnedProductsRef.current.add(product._id);
      }
      return false; // hide out-of-stock products
    }
  });

  if (inStockProducts.length === 0) {
    return <p className="mt-10 text-center text-gray-500">No items in wishlist</p>;
  }

  return (
    <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {inStockProducts.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default WishlistPage;

