"use client";
import { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";  // Import Link from Next.js

export default function ProductCard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsList);
      } catch (err) {
        setError("Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="text-center text-lg font-semibold">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="flex flex-wrap justify-center items-center h-full w-full p-5 space-x-4 space-y-6">
      {products.map((product) => (
        <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl w-[280px]">
          <Link href={`/${product.id}`}>
            <img
              src={product.image}
              alt={product.name}
              className="w-full rounded-sm h-[200px] object-cover rounded-t-xl cursor-pointer"
            />
            <div className="p-5">
              <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
              <p className="mt-4 text-lg font-semibold text-blue-600">{`$${product.price}`}</p>


              <Link href={`/${product.id}`}>
  <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-300">
    View Product
  </button>
</Link>


            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
