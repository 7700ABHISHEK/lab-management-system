import { onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { toast } from "react-toastify";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(undefined);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (userData) => {
            setUser(userData);
            setLoading(false);
        });

        return () => unSubscribe();
    }, []);

    const handleLogin = async (email, password) => {
        try {
            return await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            switch (error.code) {
                case "auth/user-not-found":
                    toast.error("No account found with this email.");
                    break;
                case "auth/wrong-password":
                    toast.error("Incorrect password. Try again.");
                    break;
                case "auth/invalid-email":
                    toast.error("Invalid email format.");
                    break;
                case "auth/user-disabled":
                    toast.error("This account has been disabled.");
                    break;
                default:
                    toast.error("Login failed. Please try again.");
            }
            throw error;
        }
    };

    const handleForgotPassword = async (email) => {
        try {
            await sendPasswordResetEmail(auth, email)
        } catch (error) {
            toast.error("Something went wrong");
        }
    }

    if (loading) {
        return <div className="flex items-center justify-center h-screen">
            <img src="/loader-img.gif" alt="loader" />
        </div>
    }

    const data = { user, handleLogin, handleForgotPassword };

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
