import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiUrl } from '../Services/CONSTANT';

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'lunch',
  });
  const [editItemId, setEditItemId] = useState(null); // Track the item being edited
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch menu items
  const fetchMenuItems = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${apiUrl}/api/menu`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMenuItems(response.data.menuItems);
      setError('');
    } catch (error) {
      console.error('Error fetching menu items:', error);
      setError('Failed to fetch menu items. Please try again.');

      
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission (add or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      let response;
      if (editItemId) {
        // Update existing item
        response = await axios.put(
          `${apiUrl}/api/menu/${editItemId}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMenuItems(menuItems.map((item) => (item._id === editItemId ? response.data.menuItem : item)));
      } else {
        // Add new item
        response = await axios.post(`${apiUrl}/api/menu`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMenuItems([...menuItems, response.data.menuItem]);
      }
      setFormData({ name: '', description: '', price: '', category: 'lunch' });
      setEditItemId(null);
      setError('');
    } catch (error) {
      console.error('Error saving menu item:', error);
      setError('Failed to save menu item. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle edit button click
  const handleEdit = (item) => {
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
    });
    setEditItemId(item._id);
  };

  // Handle delete button click
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${apiUrl}/api/menu/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMenuItems(menuItems.filter((item) => item._id !== id));
      setError('');
    } catch (error) {
      console.error('Error deleting menu item:', error);
      setError('Failed to delete menu item. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Menu Management</h1>

      {/* Add/Edit Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {editItemId ? 'Edit Menu Item' : 'Add New Menu Item'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded-lg"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded-lg"
            required
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded-lg"
          >
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="drinks">Drinks</option>
          </select>
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? 'Saving...' : editItemId ? 'Update Item' : 'Add Item'}
        </button>
      </form>

      {/* Error Message */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Menu Items Table */}
      <h2 className="text-2xl font-semibold mb-4">Menu Items</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Description</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {menuItems.map((item) => (
                <tr key={item._id} className="border-t border-gray-200">
                  <td className="p-3">{item.name}</td>
                  <td className="p-3">{item.description}</td>
                  <td className="p-3">Rs.{item.price}</td>
                  <td className="p-3 capitalize">{item.category}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleEdit(item)}
                      className="mr-2 text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
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

export default MenuManagement;