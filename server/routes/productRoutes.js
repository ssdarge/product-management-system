import express from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
  updateProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/", createProduct);
router.get("/:id", getProduct);
router.get("/", getAllProducts);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
