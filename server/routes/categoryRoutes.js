import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategory,
  getAllCategories,
  updateCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router.post("/", createCategory);
router.get("/:id", getCategory);
router.get("/", getAllCategories);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;
