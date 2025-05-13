import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../Services/CONSTANT";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedStatus, setSelectedStatus] = useState({});
  const hotelId = localStorage.getItem("hotelId"); // Get hotelId from localStorage

  // Fetch Orders
  useEffect(() => {
    const fetchOrders = async () => {
      if (!hotelId) {
        setError("Hotel ID is missing.");
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get(`${apiUrl}/api/orders?hotelId=${hotelId}`);
        setOrders(response.data.orders);
      } catch (err) {
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [hotelId]);

  // Handle Status Change Locally
  const handleStatusChange = (orderId, status) => {
    setSelectedStatus((prev) => ({ ...prev, [orderId]: status }));
  };

  // Update Order Status
  const updateOrderStatus = async (orderId) => {
    const status = selectedStatus[orderId];
    if (!status) {
      setError("Please select a status.");
      return;
    }

    try {
      const response = await axios.put(`${apiUrl}/api/orders/orders/${orderId}`, { status });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: response.data.order.status } : order
        )
      );
      setError("");
    } catch (err) {
      setError("Failed to update order status");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">Order Management</h1>
      {loading && <p>Loading orders...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="bg-white p-4 shadow rounded-lg">
            <p><strong>Table:</strong> {order.tableNumber}</p>
            <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
            <p><strong>Status:</strong> {order.status}</p>

            {/* Status Update */}
            <div className="mt-2 flex items-center space-x-2">
              <select
                value={selectedStatus[order._id] || order.status}
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                className="border px-3 py-1 rounded"
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <button
                onClick={() => updateOrderStatus(order._id)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderManagement;
