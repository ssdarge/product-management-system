import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProductsList = () => {
  const [productsList, setProducts] = useState([]);
  const [categories, setCategories] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const productsPerPage = 10;
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/categories?limit=1000"
      );

      const categoriesData = Array.isArray(response.data)
        ? response.data
        : response.data.categories || [];

      const categoriesMap = {};
      categoriesData.forEach((category) => {
        categoriesMap[category.category_id] = category.category_name;
      });

      setCategories(categoriesMap);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  const fetchData = async (page) => {
    setIsLoading(true);
    try {
      await fetchCategories();

      const response = await axios.get(
        `http://localhost:3000/products?page=${page}&limit=${productsPerPage}`
      );

      setProducts(response.data.products);
      setTotalPages(response.data.totalPages);
      setCurrentPage(page);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching products", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const deleteProduct = async (formData) => {
    const productId = formData.get("productId");
    try {
      await axios.delete(`http://localhost:3000/products/${productId}`);
      fetchData(currentPage);
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (isLoading) {
    return <div className="p-4 text-white">Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Product Management System</h1>
      <div className="flex justify-between mb-4">
        <button
          onClick={() => navigate("/add-product")}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
        >
          Add Product
        </button>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
        >
          Categories
        </button>
      </div>
      <table className="w-full border border-gray-700 text-white">
        <thead className="bg-gray-800">
          <tr>
            <th className="p-2 border">Product ID</th>
            <th className="p-2 border">Product Name</th>
            <th className="p-2 border">Category ID</th>
            <th className="p-2 border">Category Name</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-gray-900">
          {productsList.map((product) => (
            <tr key={product.product_id} className="hover:bg-gray-700">
              <td className="p-2 border">{product.product_id}</td>
              <td className="p-2 border">{product.product_name}</td>
              <td className="p-2 border">{product.category_id}</td>
              <td className="p-2 border">
                {categories[product.category_id] || "Unknown"}
              </td>
              <td className="p-2 border space-x-2">
                <form action={deleteProduct} className="inline">
                  <input
                    type="hidden"
                    name="productId"
                    value={product.product_id}
                  />
                  <button
                    onClick={() =>
                      navigate(`/edit-product/${product.product_id}`)
                    }
                    type="button"
                    className="px-2 py-1 bg-blue-500 hover:bg-blue-600 rounded"
                  >
                    Edit
                  </button>
                  <button
                    type="submit"
                    className="px-2 py-1 bg-red-500 hover:bg-red-600 rounded ml-2"
                  >
                    Delete
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center mt-4 space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded ${
            currentPage === 1
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-gray-800 hover:bg-gray-700 text-white"
          }`}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded ${
            currentPage === totalPages
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-gray-800 hover:bg-gray-700 text-white"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductsList;
