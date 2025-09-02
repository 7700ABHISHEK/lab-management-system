import { useState } from "react";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { auth } from "../config/firebase";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const ChangePassword = () => {
    const [passwords, setPasswords] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const navigate = useNavigate()

    const handleChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (passwords.newPassword.length < 8) {
            toast.error("Password must be at least 8 characters long.");
            return;
        }

        if (passwords.newPassword !== passwords.confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        try {
            const user = auth.currentUser;

            if (user && user.email) {
                // Step 1: Reauthenticate user with current password
                const credential = EmailAuthProvider.credential(user.email, passwords.currentPassword);
                await reauthenticateWithCredential(user, credential);

                // Step 2: Update password
                await updatePassword(user, passwords.newPassword);
                toast.success("Password updated successfully!");
                navigate("/login");

                setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
            } else {
                toast.error("You must be logged in to change password.");
            }
        } catch (error) {
            toast.error("Something went wrong.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Change Password
                </h1>

                <form onSubmit={handleChangePassword} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-1">Current Password</label>
                        <input
                            type="password"
                            name="currentPassword"
                            value={passwords.currentPassword}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter current password"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-1">New Password</label>
                        <input
                            type="password"
                            name="newPassword"
                            value={passwords.newPassword}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter new password"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-1">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={passwords.confirmPassword}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Confirm new password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Update Password
                    </button>

                    <p className="text-center text-sm text-gray-600 mt-4">
                        Don't want to change your password?{" "}
                        <Link to="/login" className="text-indigo-600 underline font-medium hover:underline">
                            Back to Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;
