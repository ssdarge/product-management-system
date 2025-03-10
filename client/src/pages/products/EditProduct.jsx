import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({ product_name: "", category_id: "" });
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
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
    } catch (error) {
      console.error("Error fetching categories", error);
      setCategories([]);
    }
  };

  useEffect(() => {
    const fetchProductAndCategories = async () => {
      try {
        // Fetch product data
        const productResponse = await axios.get(
          `http://localhost:3000/products/${id}`
        );
        setProduct(productResponse.data);

        // Fetch latest categories
        await fetchCategories();
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching product and categories", error);
        setIsLoading(false);
      }
    };
    fetchProductAndCategories();
  }, [id]);

  const handleSubmit = async (formData) => {
    const productName = formData.get("product_name").trim();
    const categoryId = formData.get("category_id");

    try {
      await axios.put(`http://localhost:3000/products/${id}`, {
        product_name: productName,
        category_id: categoryId,
      });
      navigate("/products");
    } catch (error) {
      console.error("Error updating product", error);
    }
  };

  if (isLoading) {
    return <div className="p-4 text-white">Loading...</div>;
  }

  return (
    <div className="p-4 max-w-md mx-auto mt-8 bg-gray-900 rounded shadow-md text-white">
      <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>
      <form action={handleSubmit} className="space-y-4">
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
            defaultValue={product.product_name}
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
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 text-white border-gray-700"
            defaultValue={product.category_id}
            onFocus={fetchCategories}
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
            className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Update Product
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

export default EditProduct;
