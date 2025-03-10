import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditCategory = () => {
  const { id } = useParams();
  const [category, setCategory] = useState({
    category_name: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/categories/${id}`
        );
        setCategory(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching category", error);
        setIsLoading(false);
      }
    };
    fetchCategory();
  }, [id]);

  const handleSubmit = async (formData) => {
    const categoryName = formData.get("category_name").trim();
    const categoryDescription = formData.get("description").trim();

    if (!categoryName) {
      return;
    }

    try {
      await axios.put(`http://localhost:3000/categories/${id}`, {
        category_name: categoryName,
        description: categoryDescription,
      });
      navigate("/");
    } catch (error) {
      console.error("Error updating category", error);
    }
  };

  if (isLoading) {
    return <div className="p-4 text-white">Loading...</div>;
  }

  return (
    <div className="p-4 max-w-md mx-auto mt-8 bg-gray-900 rounded shadow-md text-white">
      <h2 className="text-2xl font-semibold mb-4">Edit Category</h2>
      <form action={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="category_name"
            className="block mb-2 text-sm font-bold"
          >
            Category Name:
          </label>
          <input
            type="text"
            id="category_name"
            name="category_name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 text-white border-gray-700"
            placeholder="Category Name"
            defaultValue={category.category_name}
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-2 text-sm font-bold">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 text-white border-gray-700"
            placeholder="Description"
            defaultValue={category.description}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Update Category
          </button>
          <button
            onClick={() => navigate("/")}
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

export default EditCategory;
