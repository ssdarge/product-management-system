import pool from "../config/db.js";

// Create category
const createCategory = async (req, res) => {
  const { category_name, description } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO categories (category_name, description) VALUES ($1, $2) RETURNING *`,
      [category_name, description]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ error: "Failed to create category" });
  }
};

// Get a single category
const getCategory = async (req, res) => {
  const categoryId = Number(req.params.id);
  try {
    const result = await pool.query(
      `SELECT * FROM categories WHERE category_id = $1`,
      [categoryId]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).json({ error: "Failed to fetch category" });
  }
};

// Get all categories
const getAllCategories = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const offset = (page - 1) * limit;

  try {
    const { rows: categories } = await pool.query(
      "SELECT * FROM categories LIMIT $1 OFFSET $2",
      [limit, offset]
    );

    const { rows: countResult } = await pool.query(
      "SELECT COUNT(*) FROM categories"
    );
    const totalCategories = Number(countResult[0].count);
    const totalPages = Math.ceil(totalCategories / limit);

    res.json({ categories, totalPages });
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

// Update category
const updateCategory = async (req, res) => {
  const categoryId = Number(req.params.id);
  const { category_name, description } = req.body;
  try {
    const result = await pool.query(
      `UPDATE categories SET category_name = $1, description = $2 WHERE category_id = $3 RETURNING *`,
      [category_name, description, categoryId]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Failed to update category:", error);
    res.status(500).json({ error: "Failed to update category" });
  }
};

// Delete category
const deleteCategory = async (req, res) => {
  const categoryId = Number(req.params.id);
  try {
    await pool.query(`DELETE FROM categories WHERE category_id = $1`, [
      categoryId,
    ]);
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Failed to delete category:", error);
    res.status(500).json({ error: "Failed to delete category" });
  }
};

export {
  createCategory,
  getCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
