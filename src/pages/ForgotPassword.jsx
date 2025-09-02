import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider";
import { toast } from "react-toastify";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate()

    const { handleForgotPassword } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!email.includes("@")) {
            setError("Enter a valid email address...");
            return;
        }

        try {
            await handleForgotPassword(email);
            toast.success("Password reset link sent! Check your email.");
            setEmail("");
            navigate("/login");
        } catch (err) {
            toast.error("Failed to send reset link.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
                <div className="flex flex-col items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Forgot Password</h1>
                    <p className="text-sm text-gray-500 text-center">
                        Enter your email address and we'll send you a reset link
                    </p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            placeholder="Enter your registered email"
                            className={`w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ${error && "border-red-500"}`}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 transition shadow-lg"
                    >
                        Send Reset Link
                    </button>

                    <p className="text-center text-sm text-gray-600 mt-4">
                        Remembered your password?{" "}
                        <Link to="/login" className="text-indigo-600 underline font-medium hover:underline">
                            Back to Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
