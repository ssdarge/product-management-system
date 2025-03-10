import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      // Add cache-busting parameter and fetch all categories with pagination
      const response = await axios.get("http://localhost:3000/categories", {
        params: {
          page: 1,
          limit: 1000, // Adjust based on expected maximum categories
          _: new Date().getTime(), // Prevents caching
        },
      });
      // Handle different response structures
      const categoriesData = Array.isArray(response.data)
        ? response.data
        : response.data.categories || [];
      setCategories(categoriesData);
      setIsLoading(false);
    } catch (error) {
      setCategories([]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const productName = formData.get("product_name").trim();
    const categoryId = formData.get("category_id");

    if (!productName || !categoryId) return;

    try {
      await axios.post("http://localhost:3000/products", {
        product_name: productName,
        category_id: categoryId,
      });
      navigate("/products");
    } catch (error) {
      console.error("Error creating product", error);
    }
  };

  if (isLoading) return <div className="p-4 text-white">Loading...</div>;

  return (
    <div className="p-4 max-w-md mx-auto mt-8 bg-gray-900 rounded shadow-md text-white">
      <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="product_name"
            className="block mb-2 text-sm font-bold"
          >
            Product Name:
          </label>
          <input
            type="text"
            id="product_name"
            name="product_name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 text-white border-gray-700"
            placeholder="Product Name"
            required
          />
        </div>
        <div>
          <label htmlFor="category_id" className="block mb-2 text-sm font-bold">
            Category:
          </label>
          <select
            id="category_id"
            name="category_id"
            onFocus={fetchCategories} // Refresh on focus
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 text-white border-gray-700"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.category_id} value={category.category_id}>
                {category.category_name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="px-4 py-2 bg-green-500 hover:bg-green-700 text-white font-bold rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Add Product
          </button>
          <button
            onClick={() => navigate("/products")}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-700 text-white font-bold rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
