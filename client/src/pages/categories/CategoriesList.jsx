import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CategoriesList = () => {
  const [categoriesList, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const categoriesPerPage = 5;
  const navigate = useNavigate();

  const fetchData = async (page) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/categories?page=${page}&limit=${categoriesPerPage}`
      );

      // Handle different response formats
      if (Array.isArray(response.data)) {
        setCategories(response.data);
        setTotalPages(Math.ceil(response.data.length / categoriesPerPage));
      } else {
        setCategories(response.data.categories || []);
        setTotalPages(response.data.totalPages || 1);
      }

      setCurrentPage(page);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching categories", error);
      setCategories([]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const deleteCategory = async (categoryId) => {
    try {
      await axios.delete(`http://localhost:3000/categories/${categoryId}`);
      fetchData(currentPage);
    } catch (error) {
      console.error("Error deleting category", error);
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
      <button
        onClick={() => navigate("/add-category")}
        className="mb-4 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
      >
        Add Category
      </button>
      <table className="w-full border border-gray-700 text-white">
        <thead className="bg-gray-800">
          <tr>
            <th className="p-2 border">Category ID</th>
            <th className="p-2 border">Category Name</th>
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-gray-900">
          {categoriesList.map((category) => (
            <tr key={category.category_id} className="hover:bg-gray-700">
              <td className="p-2 border">{category.category_id}</td>
              <td className="p-2 border">{category.category_name}</td>
              <td className="p-2 border">{category.description}</td>
              <td className="p-2 border space-x-2">
                <button
                  onClick={() =>
                    navigate(`/edit-category/${category.category_id}`)
                  }
                  className="px-2 py-1 bg-blue-500 hover:bg-blue-600 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteCategory(category.category_id)}
                  className="px-2 py-1 bg-red-500 hover:bg-red-600 rounded"
                >
                  Delete
                </button>
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

export default CategoriesList;
