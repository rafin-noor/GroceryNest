import { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Link, useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import ProductCard from '../components/ProductCard';
import toast from "react-hot-toast";

const ProductDetails = () => {
  const { products, navigate, currency, addToCart, addReview, fetchReviews, user } = useAppContext();
  const { id } = useParams();

  const [relatedProducts, setRelatedProducts] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const product = products.find((item) => item._id == id);

  // Review States
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  // Load related products
  useEffect(() => {
    if (products.length > 0 && product) {
      let productCopy = products.slice();
      productCopy = productCopy.filter(
        (item) => product.category === item.category && item._id !== product._id
      );
      setRelatedProducts(productCopy.slice(0, 5));
    }
  }, [products, product]);

  // Load selected product image
  useEffect(() => {
    setThumbnail(product?.image?.[0] ? product.image[0] : null);
  }, [product]);

  // Load reviews
  useEffect(() => {
    if (product?._id) {
      fetchReviews(product._id).then(setReviews);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  const handleSubmitReview = async () => {
    if (!user) return toast.error("Login to review");
    await addReview(product._id, rating, comment);
    setComment("");
    setRating(5);
    fetchReviews(product._id).then(setReviews);
  };

  // Show loading or not found message while products are loading or product is missing
  if (!product) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-2xl font-medium text-[var(--color-primary)]">
          Loading product details...
        </p>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <p>
        <Link to={"/"}>Home</Link> /
        <Link to={"/products"}> Products</Link> /
        <Link to={`/products/${product.category.toLowerCase()}`}> {product.category}</Link> /
        <span className="text-[var(--color-primary)]"> {product.name}</span>
      </p>

      {/* Product Section */}
      <div className="flex flex-col md:flex-row gap-16 mt-4">
        <div className="flex gap-3">
          <div className="flex flex-col gap-3">
            {product.image.map((image, index) => (
              <div
                key={index}
                onClick={() => setThumbnail(image)}
                className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer"
              >
                <img src={image} alt={`Thumbnail ${index + 1}`} />
              </div>
            ))}
          </div>

          <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
            <img
              src={thumbnail}
              alt="Selected product"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="text-sm w-full md:w-1/2">
          <h1 className="text-3xl font-medium">{product.name}</h1>

          <div className="flex items-center gap-0.5 mt-1">
            {Array(5)
              .fill('')
              .map((_, i) => (
                <img
                  key={i}
                  src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                  alt=""
                  className="md:w-4 w-3.5"
                />
              ))}
            <p className="text-base ml-2">(4)</p>
          </div>

          <div className="mt-6">
            {product.offerPrice > 0 ? (
              <>
                <p className="text-gray-500/70 line-through">
                  MRP: {currency}
                  {product.price}
                </p>
                <p className="text-2xl font-medium">
                  Price: {currency}
                  {product.offerPrice}
                </p>
              </>
            ) : (
              <p className="text-2xl font-medium">
                Price: {currency}
                {product.price}
              </p>
            )}
            <span className="text-gray-500/70">(inclusive of all taxes)</span>
          </div>

          <p className="text-base font-medium mt-6">About Product</p>
          <ul className="list-disc ml-4 text-gray-500/70">
            {product.description.map((desc, index) => (
              <li key={index}>{desc}</li>
            ))}
          </ul>

          <div className="flex items-center mt-10 gap-4 text-base">
            <button
              onClick={() => addToCart(product._id)}
              className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition"
            >
              Add to Cart
            </button>
            <button
              onClick={() => {
                addToCart(product._id);
                navigate('/cart');
              }}
              className="w-full py-3.5 cursor-pointer font-medium bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dull)] transition"
            >
              Buy now
            </button>
          </div>
        </div>
      </div>

      {/* Review Section */}
      <div className="mt-16 w-full md:w-2/3">
        <h2 className="text-2xl font-semibold mb-4">Buyers Reviews</h2>

        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet. Be the first!</p>
        ) : (
          reviews.map((r, index) => (
            <div key={index} className="border-b py-3">
              <div className="flex items-center gap-2">
                <p className="font-medium">{r.userId?.name}</p>
                <span className="text-yellow-500">
                  {"★".repeat(r.rating)}
                  {"☆".repeat(5 - r.rating)}
                </span>
              </div>
              <p className="text-gray-700">{r.comment}</p>
              <p className="text-xs text-gray-400">
                {new Date(r.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        )}

        {/* Add Review */}
        {user && (
          <div className="mt-6">
            <h3 className="text-lg font-medium">Write a Review</h3>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="border rounded px-3 py-2 mt-2"
            >
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>
                  {n} Star{n > 1 && "s"}
                </option>
              ))}
            </select>
            <textarea
              className="w-full border rounded px-3 py-2 mt-2"
              placeholder="Your review..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              onClick={handleSubmitReview}
              className="bg-[var(--color-primary)] text-white px-4 py-2 rounded mt-2"
            >
              Submit Review
            </button>
          </div>
        )}
      </div>

      {/* Related Products */}
      <div className="flex flex-col items-center mt-20">
        <div className="flex flex-col items-center w-max">
          <p className="text-3xl font-medium">Related Products</p>
          <div className="w-20 h-0.5 bg-[var(--color-primary)] rounded-full mt-2"></div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6 w-full">
          {relatedProducts
            .filter((product) => product.inStock)
            .map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
        </div>
        <button
          onClick={() => {
            navigate('/products');
            scrollTo(0, 0);
          }}
          className="mx-auto cursor-pointer px-12 my-16 py-2.5 border rounded 
                text-[var(--color-primary)] hover:bg-[var(--color-primary/10 transition)]"
        >
          See More Products
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
