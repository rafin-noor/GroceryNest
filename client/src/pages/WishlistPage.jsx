import React, { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import ProductCard from '../components/ProductCard';

const WishlistPage = () => {
    const { wishlistProducts, fetchWishlist, products } = useAppContext();

    useEffect(() => {
        fetchWishlist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const wishlistItems = products.filter(p => wishlistProducts.includes(p._id));

    if (wishlistItems.length === 0) return <p className="mt-10 text-center text-gray-500">No items in wishlist</p>;

    return (
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {wishlistItems.map(product => (
                <ProductCard key={product._id} product={product} />
            ))}
        </div>
    );
};

export default WishlistPage;
