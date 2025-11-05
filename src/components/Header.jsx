import { useContext, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { toast } from "react-toastify";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
      toast.success("Logout successfully...");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div
            className="text-2xl font-bold cursor-pointer text-gray-800 hover:text-blue-600 transition"
            onClick={() => navigate("/")}
          >
            Lab Management System
          </div>

          <div className="hidden md:flex gap-7">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition">
              Dashboard
            </Link>
            <Link to="/lab-table" className="text-gray-700 hover:text-blue-600 transition">
              Labs
            </Link>
            <Link to="/pc-table" className="text-gray-700 hover:text-blue-600 transition">
              PCs
            </Link>
            <Link to="/student-table" className="text-gray-700 hover:text-blue-600 transition">
              Students
            </Link>
          </div>

          <div className="hidden md:flex">
            {user ? (
              <button
                className="py-2 px-5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="py-2 px-5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
              >
                Login
              </Link>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white shadow-lg absolute w-full z-50 border-t border-gray-200 transition-all duration-200">
          <div className="flex flex-col space-y-3 px-6 py-4">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Dashboard
            </Link>
            <Link
              to="/lab-table"
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Labs
            </Link>
            <Link
              to="/pc-table"
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:text-blue-600 transition"
            >
              PCs
            </Link>
            <Link
              to="/student-table"
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Students
            </Link>

            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="mt-3 py-2 px-5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition w-full text-center"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="mt-3 py-2 px-5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition w-full text-center"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
