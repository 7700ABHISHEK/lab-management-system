import { useContext, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { toast } from "react-toastify";

const Header = () => {

    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate()

    const { user } = useContext(AuthContext);

    const handleLogout = async () => {
        try {
            await signOut(auth)
            navigate('/login');
            toast.success('Logout successfully...');
        } catch (error) {
            toast.error("Something went wrong");
        }
    }

    return (
        <div>
            <nav className="w-full bg-white shadow-md fixed">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="text-2xl font-bold cursor-pointer text-gray-800" onClick={() => navigate("/")} >Lab Management System</div>
                        <div className="hidden md:flex gap-7">
                            <Link to={"/"} className="text-gray-700 hover:text-blue-600">
                                Dashboard
                            </Link>
                            <Link to={"/lab-table"} className="text-gray-700 hover:text-blue-600">
                                Labs
                            </Link>
                            <Link to={"/"} className="text-gray-700 hover:text-blue-600">
                                Computers
                            </Link>
                            <Link to={"/"} className="text-gray-700 hover:text-blue-600">
                                Students
                            </Link>
                        </div>

                        <div className="hidden md:flex">
                            {
                                user ?
                                    <button className="py-2 px-5 bg-red-600 text-white rounded-lg"
                                        onClick={handleLogout}>Logout</button>
                                    : <Link to={'/login'} className="py-2 px-5 bg-blue-600 text-white rounded-lg">Login</Link>
                            }
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
                    <div className="md:hidden bg-white shadow-lg p-5">
                        <div className="flex flex-col space-y-2 px-4 py-4">
                            <Link
                                to={"/"}
                                className="text-gray-700 hover:text-blue-600"
                                onClick={() => setIsOpen(false)}
                            >
                                Dashboard
                            </Link>
                            <Link
                                to={"/"}
                                className="text-gray-700 hover:text-blue-600"
                                onClick={() => setIsOpen(false)}
                            >
                                Labs
                            </Link>
                            <Link
                                to={"/"}
                                className="text-gray-700 hover:text-blue-600"
                                onClick={() => setIsOpen(false)}
                            >
                                Computers
                            </Link>
                            <Link
                                to={"/"}
                                className="text-gray-700 hover:text-blue-600"
                                onClick={() => setIsOpen(false)}
                            >
                                Students
                            </Link>
                        </div>
                        <div className="md:hidden flex ps-3">
                            <Link to={'/login'} className="py-2 px-5 bg-blue-600 text-white rounded-lg" onClick={() => setIsOpen(false)}>Login</Link>
                        </div>
                    </div>
                )}
            </nav>
        </div>
    )
}

export default Header