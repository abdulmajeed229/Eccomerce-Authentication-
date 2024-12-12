"use client"
import React, { useState } from 'react'
import { Package, ShoppingCart, Plus, ImageIcon, Type, FileText, DollarSign } from 'lucide-react' ;
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../lib/firebase';  

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('products')

  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState('');
  const [productDescription, setProductDescription] = useState('');
  

  // Handle adding product to Firebase
  async function handleAddProduct() {
    try {
      const docRef = await addDoc(collection(db, 'products'), {
        name: productName,
        price: parseFloat(productPrice),
        image: productImage,
        description: productDescription,
      });
    
      alert("Product added successfully!");
    } catch (e) {
      
      alert("Error adding product");

    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        </div>
        <nav className="mt-4">
          <a
            href="#"
            className={`flex items-center px-4 py-2 text-gray-700 ${activeTab === 'products' ? 'bg-gray-200' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            <Package className="mr-2" size={20} />
            Products
          </a>
          <a
            href="#"
            className={`flex items-center px-4 py-2 text-gray-700 ${activeTab === 'orders' ? 'bg-gray-200' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <ShoppingCart className="mr-2" size={20} />
            Orders
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {activeTab === 'products' && <ProductForm />}
        {activeTab === 'orders' && <OrdersTable />}
      </div>
    </div>
  );
}

function ProductForm() {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState('');
  const [productDescription, setProductDescription] = useState('');

  async function handleAddProduct() {
    try {
      // Add product data to Firestore
      const docRef = await addDoc(collection(db, 'products'), {
        name: productName,
        price: parseFloat(productPrice),
        image: productImage,
        description: productDescription,
      });
      console.log("Product added with ID: ", docRef.id);
      setProductName('');
      setProductPrice('');
      setProductImage('');
      setProductDescription('');
    } catch (e) {
      console.error("Error adding product: ", e);
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            <Type className="inline mr-2" size={16} />
            Product Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Enter product name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imageUrl">
            <ImageIcon className="inline mr-2" size={16} />
            Image URL
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="imageUrl"
            type="text"
            value={productImage}
            onChange={(e) => setProductImage(e.target.value)}
            placeholder="Enter image URL"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            <FileText className="inline mr-2" size={16} />
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            placeholder="Enter product description"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            rows={4}
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
            <DollarSign className="inline mr-2" size={16} />
            Price
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="price"
            type="number"
            step="0.01"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            placeholder="Enter product price"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
            type="button"
            onClick={handleAddProduct}
          >
            <Plus className="mr-2" size={16} />
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}

function OrdersTable() {
  const orders = [
    { id: 1, customer: 'John Doe', date: '2023-05-01', total: 99.99, status: 'Shipped' },
    { id: 2, customer: 'Jane Smith', date: '2023-05-02', total: 149.99, status: 'Processing' },
    { id: 3, customer: 'Bob Johnson', date: '2023-05-03', total: 79.99, status: 'Delivered' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Order ID</th>
              <th className="px-4 py-2 text-left">Customer</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Total</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="px-4 py-2">{order.id}</td>
                <td className="px-4 py-2">{order.customer}</td>
                <td className="px-4 py-2">{order.date}</td>
                <td className="px-4 py-2">${order.total.toFixed(2)}</td>
                <td className="px-4 py-2">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
