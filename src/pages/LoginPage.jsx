import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

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

        try{
            await login(identifier, password);
            navigate("/admin/dashboard");
        }catch(err){
            console.error("Login error:", err);
            setError("Invalid email/phone or password");
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">Admin Login</h2>

                {error && (
                    <p className="bg-red-100 text-red-600 p-2 rounded mb-4 text-center">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email Or Phone</label>
                        <input
                            type="text"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
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
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
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
                </form>

            </div>
        </div>
    );
}