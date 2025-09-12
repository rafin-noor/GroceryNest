import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import toast from "react-hot-toast";

const Orders = () => {
  const { currency, axios } = useAppContext();
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("newest");
  const [search, setSearch] = useState("");

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/seller");
      if (data.success) {
        setOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Filter
  const filteredOrders = orders.filter((order) => {
    if (filter === "paid") return order.isPaid;
    if (filter === "pending") return !order.isPaid;
    return true;
  });

  //Search (by name or phone)
  const searchedOrders = filteredOrders.filter((order) => {
    const fullName = `${order.address.firstName} ${order.address.lastName}`.toLowerCase();
    const phone = order.address.phone?.toLowerCase() || "";
    return (
      fullName.includes(search.toLowerCase()) ||
      phone.includes(search.toLowerCase())
    );
  });

  // Sort
  const sortedOrders = [...searchedOrders].sort((a, b) => {
    if (sort === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
    if (sort === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
    if (sort === "high") return b.grandTotal - a.grandTotal;
    if (sort === "low") return a.grandTotal - b.grandTotal;
    return 0;
  });

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col">
      <div className="md:p-10 p-4 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-xl font-semibold text-gray-800">📦 Orders List</h2>

          {/* Controls */}
          <div className="flex flex-wrap gap-3">
            {/* Search */}
            <input
              type="text"
              placeholder="Search by name or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm shadow-sm w-56"
            />

            {/* Filter */}
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm shadow-sm"
            >
              <option value="all">All Orders</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
            </select>

            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm shadow-sm"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="high">Total (High → Low)</option>
              <option value="low">Total (Low → High)</option>
            </select>
          </div>
        </div>

        {/* Orders List */}
        {sortedOrders.length === 0 ? (
          <div className="text-center py-10 text-gray-500 border rounded-md shadow-sm bg-white">
            No orders found.
          </div>
        ) : (
          sortedOrders.map((order, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row md:items-center gap-6 justify-between p-6 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition"
            >
              {/* Product Info */}
              <div className="flex gap-4 max-w-sm">
                <img
                  className="w-14 h-14 object-contain bg-gray-50 p-2 rounded-lg border"
                  src={assets.box_icon}
                  alt="boxIcon"
                />
                <div>
                  {order.items.map((item, idx) => (
                    <p
                      key={idx}
                      className="font-medium text-gray-700 leading-snug"
                    >
                      {item.product.name}{" "}
                      <span className="text-[var(--color-primary)]">
                        × {item.quantity}
                      </span>
                    </p>
                  ))}
                </div>
              </div>

              {/* User Info */}
              <div className="text-sm md:text-base text-gray-600 leading-relaxed">
                <p className="font-medium text-gray-800">
                  👤 {order.address.firstName} {order.address.lastName}
                </p>
                <p>Address: {order.address.street}</p>
                <p>Phone: {order.address.phone}</p>
              </div>

              {/* Total */}
              <p className="font-semibold text-lg text-[var(--color-primary)] my-auto">
                Total: {currency}
                {order.grandTotal}
              </p>

              {/* Payment Info */}
              <div className="flex flex-col text-sm md:text-base text-gray-600 leading-relaxed">
                <p> Method: {order.paymentType}</p>
                <p> Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                <p>
                   Payment:{" "}
                  <span
                    className={`font-medium ${
                      order.isPaid ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {order.isPaid ? "Paid" : "Pending"}
                  </span>
                </p>
                {order.paymentType === "Online" && (
                  <p>bKash: {order.bkashNumber}</p>
                )}

                {/* Mark as Paid button (only if COD + Pending) */}
                {order.paymentType === "COD" && !order.isPaid && (
                  <button
                    onClick={async () => {
                      try {
                        const { data } = await axios.put(
                          `/api/order/mark-paid/${order._id}`
                        );
                        if (data.success) {
                          toast.success("Order marked as Paid");
                          fetchOrders(); // refresh list
                        } else {
                          toast.error(data.message);
                        }
                      } catch (error) {
                        toast.error(error.message);
                      }
                    }}
                    className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm shadow hover:bg-green-700"
                  >
                    Mark as Paid
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;





