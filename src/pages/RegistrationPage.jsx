import React, {useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function RegistrationPage(){
    const {register} = useContext(AuthContext);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        email:"",
        phone:"",
        password:"",
        password_confirmation:""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try{
            await register(form);
            navigate("/admin/dashboard");
        }catch(err){
            console.error("Registration error:", err);
            if(err.response && err.response.data.errors){
                const firstError = Object.values(err.response.data.errors)[0][0];
                setError(firstError);
            }else{
                setError("Registration failed. Please try again.");
            }
            setLoading(false);
        };
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">Create Your Account</h2>
            </div>

            {error && (
                <p className="bg-red-100 text-red-600 p-2 rounded mb-4 text-center">
                    {error}
                </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <input 
                        type="text" 
                        name="first_name" 
                        placeholder="Enter First Name..." 
                        value={form.first_name}
                        onChange={handleChange}
                        required
                        className="p-2 rounded w-full"
                    />

                    <input
                        type="text"
                        name="last_name"
                        placeholder="Enter Last Name..."
                        value={form.last_name}
                        onChange={handleChange}
                        required
                        className="p-2 border rounded w-full"
                    />

                     <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="p-2 border rounded w-full"
                    />

                    <input
                        type="text"
                        name="phone"
                        placeholder="Please Enter Your Phone Number..."
                        value={form.phone}
                        onChange={handleChange}
                        required
                        className="p-2 border rounded w-full"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Please Enter Your Password..."
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="p-2 border rounded w-full"
                    />

                    <input 
                        type="password"
                        name="password_confirmation"
                        placeholder="Confirm Your Password..."
                        value={form.password_confirmation}
                        onChange={handleChange}
                        required
                        className="p-2 border rounded w-full"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>

                    <p className="text-center text-sm mt-4">
                        Already Have An Account? {" "}
                        <span
                            onClick={() => navigate("/login")}
                            className="text-blue-600 cursor-pointer hover:underline"
                        >
                            Login
                        </span>
                    </p>
                </div>
            </form>
        </div>
    )
}