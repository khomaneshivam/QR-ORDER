import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../Services/CONSTANT";

const HotelOrderPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState({ menu: false, order: false });
  const [error, setError] = useState("");

  // Fetch menu items
  const fetchMenuItems = async () => {
    setLoading((prev) => ({ ...prev, menu: true }));
    try {
      // Retrieve hotelId from URL query params first
      const urlParams = new URLSearchParams(window.location.search);
      let hotelId = urlParams.get("hotelId");
  
      // Fallback: Retrieve from localStorage if not found in URL
      if (!hotelId) {
        hotelId = localStorage.getItem("hotelId");
      }
  
      // Final check: If hotelId is still missing, show an error
      if (!hotelId) {
        setError("Hotel ID is missing. Please scan a valid QR code.");
        setLoading((prev) => ({ ...prev, menu: false }));
        return;
      }
  
      // Make GET request with the correct hotelId
      const response = await axios.get(`${apiUrl}/api/menu1?hotelId=${hotelId}`);
  
      setMenuItems(response.data.menuItems);
      setError("");
    } catch (error) {
      console.error("Error fetching menu items:", error);
      setError("Failed to fetch menu items. Please try again.");
    } finally {
      setLoading((prev) => ({ ...prev, menu: false }));
    }
  };
  
  // Fetch menu items when component mounts
  useEffect(() => {
    fetchMenuItems();
  }, []);
  

  // Add item to order
  const addToOrder = (item) => {
    setError("");
    setOrderItems((prev) => {
      const existing = prev.find((i) => i.menuId === item._id);
      if (existing) {
        return prev.map((i) =>
          i.menuId === item._id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { menuId: item._id, name: item.name, price: item.price, quantity: 1 }];
    });
  };

  // Remove item from order
  const removeFromOrder = (menuId) => {
    setOrderItems((prev) => prev.filter((item) => item.menuId !== menuId));
  };

  // Place order
  const placeOrder = async () => {
    if (orderItems.length === 0) {
      setError("Please add items to order.");
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const hotelId = urlParams.get("hotelId");
    const tableNumber = urlParams.get("table");
    
    if (!hotelId || !tableNumber) {
      setError("Invalid QR Code. Missing hotel or table information.");
      return;
    }

    const totalAmount = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

    setLoading((prev) => ({ ...prev, order: true }));
    try {
      const response = await axios.post(`${apiUrl}/api/orders/orders`, {
        hotelId,
        tableNumber,
        items: orderItems,
        totalAmount, // ✅ Ensuring total amount is included
      });

      console.log("Order Response:", response.data);
      setOrderItems([]);
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error);
      setError(error.response?.data?.message || "Failed to place order. Please try again.");
    } finally {
      setLoading((prev) => ({ ...prev, order: false }));
    }
  };

  // Calculate totals
  const totalItems = orderItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Order Your Food 🍽️
        </h1>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        {/* Menu Section */}
        <section aria-labelledby="menu-heading">
          <h2 id="menu-heading" className="text-lg font-semibold mb-4">
            Menu
          </h2>
          {loading.menu ? (
            <p>Loading menu...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {menuItems.map((item) => (
                <div key={item._id} className="border p-4 rounded-lg flex flex-col items-center">
                  <h3 className="font-bold text-gray-700">{item.name}</h3>
                  <p className="text-gray-500">₹{item.price.toFixed(2)}</p>
                  <button
                    onClick={() => addToOrder(item)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-2 hover:bg-blue-700"
                    aria-label={`Add ${item.name} to order`}
                  >
                    Add to Order
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Order Section */}
        <section aria-labelledby="order-heading" className="mt-6">
          <h2 id="order-heading" className="text-lg font-semibold">
            Your Order ({totalItems} items)
          </h2>
          {orderItems.length === 0 ? (
            <p className="text-gray-500">No items added yet.</p>
          ) : (
            <ul>
              {orderItems.map((item) => (
                <li key={item.menuId} className="flex justify-between items-center border-b py-2">
                  {item.quantity}x {item.name} - ₹{(item.price * item.quantity).toFixed(2)}
                  <button
                    onClick={() => removeFromOrder(item.menuId)}
                    className="text-red-600 hover:text-red-800"
                    aria-label={`Remove ${item.name} from order`}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
          <div className="font-bold text-lg mt-4 text-center">
            Total: ₹{totalPrice}
          </div>
        </section>

        {/* Place Order Button */}
        <button
          onClick={placeOrder}
          disabled={loading.order || orderItems.length === 0}
          className={`w-full py-3 mt-4 rounded-lg font-semibold ${
            loading.order || orderItems.length === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 text-white hover:bg-green-700"
          }`}
          aria-label="Confirm order"
        >
          {loading.order ? "Placing Order..." : "Confirm Order"}
        </button>
      </div>
    </div>
  );
};

export default HotelOrderPage;
