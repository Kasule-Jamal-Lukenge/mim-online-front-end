import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import logo from "../assets/alostore-logo.jpg";

export default function LoginPage(){
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async(e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            // Calling Login() From AuthContext
            const { user } = await login(identifier, password);

            // Implementing Role-Based Redirection
            if (user.role === "admin") {
                toast.success("Welcome, Admin!");
                navigate("/admin/dashboard");
            } else {
                toast.success("Login Successful!");
                navigate("/");
            }
        } catch (err) {
            console.error("Login error:", err);
            setError("Invalid Email/Phone Or assword");
            toast.error("Login Failed. Please Try Again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                {/* Logo Section */}
                <div className="flex justify-center mb-4">
                    <img 
                        src={logo} 
                        alt="Alostore Africa Logo" 
                        className="w-20 h-20 h-auto border-2 rounded-full" // Adjust width as you like
                    />
                </div>
                <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">Login Here</h2>

                {error && (
                    <p className="bg-red-100 text-red-600 p-2 rounded mb-4 text-center">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email Or Phone:</label>
                        <input
                            type="text"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            className="mt-1 block w-full text-gray-700 bg-white border border-gray-400 rounded-md shadow-sm p-2"
                            required
                            placeholder="Enter Your Email or Phone..."
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full text-gray-600 bg-white border border-gray-400 rounded-md shadow-sm p-2"
                            required
                            placeholder="Enter Your Password..."
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                    <p className="text-center text-gray-600 text-sm mt-4">
                        Don't Have An Account?{" "}
                        <span
                            onClick={() => navigate("/register")}
                            className="text-blue-600 cursor-pointer hover:underline font-medium"
                        >
                            Let's Register
                        </span>
                    </p>
                </form>

            </div>
        </div>
    );
}