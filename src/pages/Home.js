import React from "react";
import { motion } from "framer-motion";
import { FaQrcode, FaClock, FaChartLine } from "react-icons/fa"; // Importing icons

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section 
        className="relative w-full h-screen flex items-center justify-center text-center bg-cover bg-center" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5')" }}
      >
        <div className="bg-black bg-opacity-50 absolute inset-0"></div>
        <motion.div 
          className="z-10 max-w-3xl mx-auto text-white px-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl font-extrabold">Revolutionizing Hotel Ordering with QR Codes</h1>
          <p className="mt-4 text-lg">Scan, Order, and Enjoy - No Waiters Needed!</p>
          <motion.a 
            href="login"
            className="mt-6 inline-block bg-background p-4 text-white py-3 px-6 rounded-lg text-lg font-bold shadow-lg hover:shadow-[0_4px_10px] hover:shadow-accent-400 transition hover:text-accent transition"          
            whileHover={{ scale: 1.05 }}
          >
            Get Started
          </motion.a>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Why Choose Our QR Ordering System?</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <motion.div 
              className="p-6 shadow-lg rounded-lg bg-gray-50 border border-gray-200"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex justify-center">
              <FaQrcode className="text-6xl text-gray-600" />

              </div>
              <h3 className="text-xl font-bold mt-4">Easy QR Code Scanning</h3>
              <p className="text-gray-600 mt-2">Customers can simply scan and order within seconds.</p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
              className="p-6 shadow-lg rounded-lg bg-gray-50 border border-gray-200"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex justify-center">
                <FaClock className="text-6xl text-gray-600" />
              </div>
              <h3 className="text-xl font-bold mt-4">Faster Service</h3>
              <p className="text-gray-600 mt-2">No more waiting for waiters, orders go directly to the kitchen.</p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div 
              className="p-6 shadow-lg rounded-lg bg-gray-50 border border-gray-200"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex justify-center">
                <FaChartLine className="text-6xl text-gray-600" />
              </div>
              <h3 className="text-xl font-bold mt-4">Real-time Order Tracking</h3>
              <p className="text-gray-600 mt-2">Track customer orders and analyze sales effortlessly.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-background p-4 text-white text-center">
        <h2 className="text-3xl font-bold">Start Using QR Ordering Today!</h2>
        <p className="mt-4 text-lg">Enhance customer experience and streamline your operations.</p>
        <a 
          href="/register"
          className="mt-6 inline-block bg-background p-4 text-white py-3 px-6 rounded-lg text-lg font-bold shadow-lg hover:shadow-[0_4px_10px] hover:shadow-accent-400 transition hover:text-accent transition"          >
          Sign Up Now
        </a>
      </section>
    </div>
  );
};

export default Home;