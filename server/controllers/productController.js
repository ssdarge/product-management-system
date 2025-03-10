import pool from "../config/db.js";

// Create product
const createProduct = async (req, res) => {
  const { product_name, category_id } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO products (product_name, category_id) VALUES ($1, $2) RETURNING *`,
      [product_name, category_id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Failed to create product" });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  const page = Number(req.query.page) || 1; // Default to page 1
  const limit = Number(req.query.limit) || 10; // Default limit, match frontend
  const offset = (page - 1) * limit;

  try {
    const { rows: products } = await pool.query(
      "SELECT * FROM products LIMIT $1 OFFSET $2",
      [limit, offset]
    );

    const { rows: countResult } = await pool.query(
      "SELECT COUNT(*) FROM products"
    );
    const totalProducts = Number(countResult[0].count);
    const totalPages = Math.ceil(totalProducts / limit);

    res.json({ products, totalPages });
  } catch (error) {
    console.error("Failed to fetch products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// Get a single product
const getProduct = async (req, res) => {
  const productId = Number(req.params.id);
  try {
    const result = await pool.query(
      `SELECT * FROM products WHERE product_id = $1`,
      [productId]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Failed to fetch product:", error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

// Update product
const updateProduct = async (req, res) => {
  const productId = Number(req.params.id);
  const { product_name, category_id } = req.body;
  try {
    const result = await pool.query(
      `UPDATE products SET product_name = $1, category_id = $2 WHERE product_id = $3 RETURNING *`,
      [product_name, category_id, productId]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Failed to update product:", error);
    res.status(500).json({ error: "Failed to update product" });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  const productId = Number(req.params.id);
  try {
    await pool.query(`DELETE FROM products WHERE product_id = $1`, [productId]);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Failed to delete product:", error);
    res.status(500).json({ error: "Failed to delete product" });
  }
};

export {
  createProduct,
  getProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
};
