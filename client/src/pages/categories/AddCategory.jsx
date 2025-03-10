import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    const categoryName = formData.get("category_name").trim();
    const categoryDescription = formData.get("description").trim();

    if (!categoryName) {
      return;
    }

    try {
      await axios.post("http://localhost:3000/categories", {
        category_name: categoryName,
        description: categoryDescription,
      });
      navigate("/");
    } catch (error) {
      console.error("Error creating category", error);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto mt-8 bg-gray-900 rounded shadow-md text-white">
      <h2 className="text-2xl font-semibold mb-4">Add New Category</h2>
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
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="px-4 py-2 bg-green-500 hover:bg-green-700 text-white font-bold rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Add Category
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

export default AddCategory;
