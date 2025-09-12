import { useEffect, useState } from "react";
import axios from "axios";

const SellerReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        console.log('Fetching seller reviews...'); // Debug log
        const res = await axios.get("/api/review/seller", {
          withCredentials: true, // important for cookie auth
        });
        console.log('Response:', res.data); // Debug log
        
        if (res.data.success) {
          setReviews(res.data.reviews || []);
        } else {
          setError(res.data.message || 'Failed to fetch reviews');
        }
      } catch (err) {
        console.error("Error fetching seller reviews:", err);
        setError(err.response?.data?.message || err.message || 'Network error');
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  if (loading) return <p className="p-4">Loading reviews...</p>;
  
  if (error) {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-6">Product Reviews</h2>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p><strong>Error:</strong> {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-6">Product Reviews</h2>

      {reviews.length === 0 ? (
        <p>No reviews available yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2 text-left">Product</th>
                <th className="border px-4 py-2 text-left">User</th>
                <th className="border px-4 py-2 text-left">Rating</th>
                <th className="border px-4 py-2 text-left">Comment</th>
                <th className="border px-4 py-2 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review._id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">
                    {review.productId?.name || "Deleted Product"}
                  </td>
                  <td className="border px-4 py-2">
                    {review.userId?.name || "Unknown User"}
                  </td>
                  <td className="border px-4 py-2">⭐ {review.rating}</td>
                  <td className="border px-4 py-2">{review.comment}</td>
                  <td className="border px-4 py-2">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SellerReviews;
