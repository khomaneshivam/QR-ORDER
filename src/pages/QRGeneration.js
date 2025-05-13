import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../Services/CONSTANT";

const TableQRManagement = () => {
  const [tableNumber, setTableNumber] = useState("");
  const [tables, setTables] = useState([]);
  const [qrCode, setQRCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({ qr: false, tables: false });

  const hotelId = localStorage.getItem("hotelId");

  // Fetch tables
  const fetchTables = async () => {
    setLoading((prev) => ({ ...prev, tables: true }));
    try {
      const response = await axios.get(`${apiUrl}/api/tables`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setTables(response.data.tables);
    } catch (error) {
      setError("Failed to fetch tables. Please try again.");
    } finally {
      setLoading((prev) => ({ ...prev, tables: false }));
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

  // Generate QR Code
  const generateQRCode = async () => {
    if (!tableNumber.trim()) {
      setError("Please enter a valid table number");
      return;
    }

    setLoading((prev) => ({ ...prev, qr: true }));
    try {
      const response = await axios.post(
        `${apiUrl}/api/tables/generateQR`,
        { tableNumber },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setQRCode(response.data.table.qrCode);
      setTableNumber(""); // Clear input after generation
      fetchTables(); // Refresh tables list
    } catch (error) {
      setError(error.response?.data?.error || "Failed to generate QR code.");
    } finally {
      setLoading((prev) => ({ ...prev, qr: false }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* QR Generation */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-4">Generate Table QR Code</h1>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Enter table number"
              value={tableNumber}
              onChange={(e) => {
                setTableNumber(e.target.value);
                setError(""); // Clear error on input change
              }}
              className="flex-1 p-2 border rounded-lg"
              aria-label="Table number input"
            />
            <button
              onClick={generateQRCode}
              disabled={loading.qr}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
              aria-label="Generate QR code"
            >
              {loading.qr ? "Generating..." : "Generate QR"}
            </button>
          </div>
          {error && <p className="text-red-600 mt-2">{error}</p>}
          {qrCode && (
            <div className="mt-4 text-center">
              <img src={qrCode} alt="QR Code" className="mx-auto w-40 h-40" />
            </div>
          )}
        </div>

        {/* Table List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Table List</h2>
          {loading.tables ? (
            <p>Loading tables...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : (
            <ul className="divide-y">
              {tables.map((table) => (
                <li key={table._id} className="flex justify-between items-center py-2">
                  <span>Table {table.tableNumber}</span>
                  <img src={table.qrCode} alt={`QR Code for Table ${table.tableNumber}`} className="w-16 h-16" />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default TableQRManagement;