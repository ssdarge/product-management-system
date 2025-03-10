import express from "express";
import cors from "cors";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();
const PORT = 3000;

// middlware
app.use(express.json());
app.use(cors());

// Routes
app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
