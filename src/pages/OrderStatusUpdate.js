import React, { useState } from 'react';
import axios from 'axios';

const OrderStatusUpdate = ({ orderId }) => {
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/orders/orders/${orderId}`, { status });
      setMessage('Order status updated successfully!');
      console.log('Updated Order:', response.data.order);
    } catch (error) {
      setMessage('Failed to update order status.');
      console.error('Error updating order status:', error);
    }
  };

  return (
    <div>
      <h2>Update Order Status</h2>
      <form onSubmit={handleSubmit}>
        <label>Status:</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="">Select status</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <button type="submit">Update Status</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default OrderStatusUpdate;