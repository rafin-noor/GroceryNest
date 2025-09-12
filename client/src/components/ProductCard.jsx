import React from 'react';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';

const ProductCard = ({ product }) => {
    const { currency, addToCart, removeFromCart, cartItems, navigate,
            wishlistProducts, addToWishlist, removeFromWishlist, user } = useAppContext();

    const isWishlisted = wishlistProducts.some(w => w._id === product._id);

    return product && (
        <div
          onClick={() => { navigate(`/products/${product.category.toLowerCase()}/${product._id}`); scrollTo(0,0); }}
          className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300 p-4 w-full max-w-[220px] cursor-pointer flex flex-col"
        >
            {/* Product Image */}
            <div className="relative overflow-hidden rounded-xl h-40 flex items-center justify-center mb-3">
                <img
                    className="object-contain transition-transform duration-300 hover:scale-105 h-full"
                    src={product.image[0]}
                    alt={product.name}
                />
                {product.discount && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-medium px-2 py-0.5 rounded-lg">
                        {product.discount}% OFF
                    </span>
                )}
            </div>

            {/* Category & Name */}
            <p className="text-gray-400 text-sm">{product.category}</p>
            <p className="text-gray-800 font-semibold text-lg truncate">{product.name}</p>

            {/* Rating */}
            <div className="flex items-center gap-1 mt-1">
                {Array(5).fill('').map((_, i) => (
                    <img key={i} src={i < 4 ? assets.star_icon : assets.star_dull_icon} alt="/" className="w-3 h-3 md:w-4 md:h-4" />
                ))}
                <span className="text-gray-500 text-xs">(4)</span>
            </div>

            {/* Price & Actions */}
            <div className="flex items-center justify-between mt-3">
                <div className="flex flex-col">
                    {product.offerPrice > 0 ? (
                        <span className="text-[var(--color-primary)] font-semibold md:text-xl text-base">
                            {currency}{product.offerPrice}
                            <span className="line-through text-gray-400 text-xs md:text-sm ml-1">
                                {currency}{product.price}
                            </span>
                        </span>
                    ) : (
                        <span className="text-[var(--color-primary)] font-semibold md:text-xl text-base">
                            {currency}{product.price}
                        </span>
                    )}
                </div>

                <div onClick={(e) => e.stopPropagation()} className="flex flex-col gap-2">
                    {/* Cart Buttons */}
                    {!cartItems[product._id] ? (
                        <button
                            onClick={() => addToCart(product._id)}
                            className="flex items-center justify-center gap-1 bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/40 text-[var(--color-primary)] rounded-lg md:w-20 w-16 h-9 hover:bg-[var(--color-primary)]/20 transition"
                        >
                            <img src={assets.cart_icon} alt="cart_icon" className="w-4 h-4"/>
                            Add
                        </button>
                    ) : (
                        <div className="flex items-center justify-center gap-2 bg-[var(--color-primary)]/25 rounded-lg h-9 md:w-20 w-16 select-none">
                            <button onClick={() => removeFromCart(product._id)} className="px-2 text-gray-700 hover:text-gray-900">-</button>
                            <span className="w-5 text-center font-medium">{cartItems[product._id]}</span>
                            <button onClick={() => addToCart(product._id)} className="px-2 text-gray-700 hover:text-gray-900">+</button>
                        </div>
                    )}

                    {/* Wishlist Button */}
                    {user && (
                       <button
                          onClick={() => isWishlisted ? removeFromWishlist(product._id) : addToWishlist(product._id)}
                          className={`text-sm px-3 py-2 rounded-xl border font-medium transition flex items-center justify-center gap-1 ${
                           isWishlisted
                             ? "text-[var(--color-primary)]-500 border-green-500 bg-green-50 hover:bg-green-100"
                             : "text-[var(--color-primary)] border-[var(--color-primary)] hover:bg-[var(--color-primary)]/10"
                          }`}
                       >
                          {isWishlisted ? "★ Saved" : "☆ Save"}
                       </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;

