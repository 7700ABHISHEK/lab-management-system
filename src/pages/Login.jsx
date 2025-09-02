import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider";
import { toast } from "react-toastify";

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const { handleLogin } = useContext(AuthContext);

    const handleChange = (e) => {
        setInput({ ...input, [e.target.id]: e.target.value });
        setErrors({ ...errors, [e.target.id]: '' })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationError = {};

        if (input.email.trim() == '') {
            validationError.email = "Enter Valid Email...";
        }

        if (input.password.trim() == '' && input.password.length < 8) {
            validationError.password = "Enter Valid Password...";
        }

        setErrors(validationError);

        if (Object.keys(validationError).length > 0) return;

        try {
            const res = await handleLogin(input.email, input.password);
            navigate("/")
            toast.success("Logged in successfully");
        } catch (error){
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
                <div className="flex flex-col items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
                    <p className="text-sm text-gray-500">Please login to your account</p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={input.email}
                            placeholder="Enter your email"
                            className={`w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${errors.email && 'border-red-500'} `}
                            onChange={handleChange}
                        />
                        {
                            errors.email && <p className="text-red-600 font-semibold ">{errors.email}</p>
                        }
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={input.password}
                            placeholder="Enter your password"
                            className={`w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${errors.password && 'border-red-500'} `}
                            onChange={handleChange}
                        />
                        {
                            errors.password && <p className="text-red-600 font-semibold ">{errors.password}</p>
                        }
                    </div>

                    <div className="flex justify-between items-center text-sm">
                        <Link to={"/change-password"} className="text-blue-600 hover:underline">
                            Change Password
                        </Link>
                        <Link to={"/forgot-password"} className="text-blue-600 hover:underline">
                            Forgot password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition shadow-lg"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
