import { Routes, Route } from "react-router-dom";
import CategoriesList from "./pages/categories/CategoriesList";
import ProductsList from "./pages/products/ProductsList";
import AddCategory from "./pages/categories/AddCategory";
import EditCategory from "./pages/categories/EditCategory";
import AddProduct from "./pages/products/AddProduct";
import Header from "./components/Header";
import EditProduct from "./pages/products/EditProduct";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<CategoriesList />} />
        <Route path="/products" element={<ProductsList />} />
        <Route path="/add-category" element={<AddCategory />} />
        <Route path="/edit-category/:id" element={<EditCategory />} />{" "}
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />{" "}
      </Routes>
    </>
  );
};

export default App;
