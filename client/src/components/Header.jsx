import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-lg font-semibold">Product Management System</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">
          Categories
        </Link>
        <Link to="/products" className="hover:underline">
          Products
        </Link>
      </div>
    </nav>
  );
};

export default Header;
