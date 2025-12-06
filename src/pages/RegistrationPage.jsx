// import React, {useState, useContext} from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import toast from "react-hot-toast";

// export default function RegistrationPage(){
//     const {register} = useContext(AuthContext);
//     const navigate = useNavigate();

//     const [form, setForm] = useState({
//         first_name: "",
//         last_name: "",
//         email:"",
//         phone:"",
//         password:"",
//         password_confirmation:""
//     });

//     const [error, setError] = useState("");
//     const [loading, setLoading] = useState(false);

//     const handleChange = (e) => {
//         setForm({...form, [e.target.name]: e.target.value});
//     };

//     const handleSubmit = async(e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError("");

//         try{
//             await register(form);
//             toast.success("Account Created Successfully");
//             navigate("/admin/dashboard");
//         }catch(err){
//             console.error("Registration error:", err);
//             if(err.response && err.response.data.errors){
//                 const firstError = Object.values(err.response.data.errors)[0][0];
//                 toast.error(firstError);
//                 // setError(firstError);
//             }else{
//                 // setError("Registration failed. Please try again.");
//                 toast.error("Registration failed. Please try again.");
//             }
//             setLoading(false);
//         };
//     }

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-100">
//             <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
//                 <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">Create Your Account</h2>
//             </div>

//             {error && (
//                 <p className="bg-red-100 text-red-600 p-2 rounded mb-4 text-center">
//                     {error}
//                 </p>
//             )}

//             <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                     <input 
//                         type="text" 
//                         name="first_name" 
//                         placeholder="Enter First Name..." 
//                         value={form.first_name}
//                         onChange={handleChange}
//                         required
//                         className="p-2 rounded w-fulltext-gray-600 bg-white"
//                     />

//                     <input
//                         type="text"
//                         name="last_name"
//                         placeholder="Enter Last Name..."
//                         value={form.last_name}
//                         onChange={handleChange}
//                         required
//                         className="p-2 border rounded w-full text-gray-600 bg-white"
//                     />

//                      <input
//                         type="email"
//                         name="email"
//                         placeholder="Email"
//                         value={form.email}
//                         onChange={handleChange}
//                         required
//                         className="p-2 border rounded w-full text-gray-600 bg-white"
//                     />

//                     <input
//                         type="text"
//                         name="phone"
//                         placeholder="Please Enter Your Phone Number..."
//                         value={form.phone}
//                         onChange={handleChange}
//                         required
//                         className="p-2 border rounded w-full text-gray-600 bg-white"
//                     />

//                     <input
//                         type="password"
//                         name="password"
//                         placeholder="Please Enter Your Password..."
//                         value={form.password}
//                         onChange={handleChange}
//                         required
//                         className="p-2 border rounded w-full text-gray-600 bg-white"
//                     />

//                     <input 
//                         type="password"
//                         name="password_confirmation"
//                         placeholder="Confirm Your Password..."
//                         value={form.password_confirmation}
//                         onChange={handleChange}
//                         required
//                         className="p-2 border rounded w-full text-gray-600 bg-white"
//                     />

//                     <button
//                         type="submit"
//                         disabled={loading}
//                         className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
//                     >
//                         {loading ? "Registering..." : "Register"}
//                     </button>

//                     <p className="text-center text-dark text-sm mt-4">
//                         Already Have An Account? {" "}
//                         <span
//                             onClick={() => navigate("/login")}
//                             className="text-blue-600 cursor-pointer hover:underline"
//                         >
//                             Login
//                         </span>
//                     </p>
//                 </div>
//             </form>
//         </div>
//     )
// }





// import React, {useState, useContext} from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import toast from "react-hot-toast";

// export default function RegistrationPage(){
//     const {register} = useContext(AuthContext);
//     const navigate = useNavigate();

//     const [form, setForm] = useState({
//         first_name: "",
//         last_name: "",
//         email:"",
//         phone:"",
//         password:"",
//         password_confirmation:""
//     });

//     const [error, setError] = useState("");
//     const [loading, setLoading] = useState(false);

//     const handleChange = (e) => {
//         setForm({...form, [e.target.name]: e.target.value});
//     };

//     const handleSubmit = async(e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError("");

//         try{
//             await register(form);
//             toast.success("Account Created Successfully");
//             navigate("/admin/dashboard");
//         }catch(err){
//             console.error("Registration error:", err);
//             if(err.response && err.response.data.errors){
//                 const firstError = Object.values(err.response.data.errors)[0][0];
//                 toast.error(firstError);
//                 setError(firstError);
//             }else{
//                 setError("Registration failed. Please try again.");
//                 toast.error("Registration failed. Please try again.");
//             }
//         } finally {
//             setLoading(false);
//         }
//     }

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-100">
//             <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
//                 <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
//                     Create Your Account
//                 </h2>

//                 {error && (
//                     <p className="bg-red-100 text-red-600 p-2 rounded mb-4 text-center">
//                         {error}
//                     </p>
//                 )}

//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                             First Name:
//                         </label>
//                         <input 
//                             type="text" 
//                             name="first_name" 
//                             placeholder="Enter First Name..." 
//                             value={form.first_name}
//                             onChange={handleChange}
//                             required
//                             className="mt-1 block w-full text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                         />
//                     </div>

//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Last Name:
//                         </label>
//                         <input
//                             type="text"
//                             name="last_name"
//                             placeholder="Enter Last Name..."
//                             value={form.last_name}
//                             onChange={handleChange}
//                             required
//                             className="mt-1 block w-full text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                         />
//                     </div>

//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Email:
//                         </label>
//                         <input
//                             type="email"
//                             name="email"
//                             placeholder="Enter Your Email..."
//                             value={form.email}
//                             onChange={handleChange}
//                             required
//                             className="mt-1 block w-full text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                         />
//                     </div>

//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Phone:
//                         </label>
//                         <input
//                             type="text"
//                             name="phone"
//                             placeholder="Enter Your Phone Number..."
//                             value={form.phone}
//                             onChange={handleChange}
//                             required
//                             className="mt-1 block w-full text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                         />
//                     </div>

//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Password:
//                         </label>
//                         <input
//                             type="password"
//                             name="password"
//                             placeholder="Enter Your Password..."
//                             value={form.password}
//                             onChange={handleChange}
//                             required
//                             className="mt-1 block w-full text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                         />
//                     </div>

//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Confirm Password:
//                         </label>
//                         <input 
//                             type="password"
//                             name="password_confirmation"
//                             placeholder="Confirm Your Password..."
//                             value={form.password_confirmation}
//                             onChange={handleChange}
//                             required
//                             className="mt-1 block w-full text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                         />
//                     </div>

//                     <button
//                         type="submit"
//                         disabled={loading}
//                         className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
//                     >
//                         {loading ? "Registering..." : "Register"}
//                     </button>

//                     <p className="text-center text-gray-600 text-sm mt-4">
//                         Already Have An Account?{" "}
//                         <span
//                             onClick={() => navigate("/login")}
//                             className="text-blue-600 cursor-pointer hover:underline font-medium"
//                         >
//                             Login
//                         </span>
//                     </p>
//                 </form>
//             </div>
//         </div>
//     )
// }





import React, {useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import logo from "../assets/alostore-logo.jpg";

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
            toast.success("Account Created Successfully");
            navigate("/admin/dashboard");
        }catch(err){
            console.error("Registration error:", err);
            if(err.response && err.response.data.errors){
                const firstError = Object.values(err.response.data.errors)[0][0];
                toast.error(firstError);
                setError(firstError);
            }else{
                setError("Registration failed. Please try again.");
                toast.error("Registration failed. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 py-12 px-4">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
                {/* Logo Section */}
                <div className="flex justify-center mb-4">
                    <img 
                        src={logo} 
                        alt="Alostore Africa Logo" 
                        className="w-20 h-20 h-auto border-2 rounded-full" // Adjust width as you like
                    />
                </div>
                <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
                    Create Your Account Now
                </h2>

                {error && (
                    <p className="bg-red-100 text-red-600 p-2 rounded mb-4 text-center">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Row 1: First Name and Last Name */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                First Name:
                            </label>
                            <input 
                                type="text" 
                                name="first_name" 
                                placeholder="Enter First Name..." 
                                value={form.first_name}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full text-gray-700 bg-white border border-gray-400 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Last Name:
                            </label>
                            <input
                                type="text"
                                name="last_name"
                                placeholder="Enter Last Name..."
                                value={form.last_name}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full text-gray-700 bg-white border border-gray-400 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {/* Row 2: Email and Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email:
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter Your Email..."
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full text-gray-700 bg-white border border-gray-400 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Phone:
                            </label>
                            <input
                                type="text"
                                name="phone"
                                placeholder="Enter Your Phone Number..."
                                value={form.phone}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full text-gray-700 bg-white border border-gray-400 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {/* Row 3: Password and Confirm Password */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password:
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter Your Password..."
                                value={form.password}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full text-gray-700 bg-white border border-gray-400 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Confirm Password:
                            </label>
                            <input 
                                type="password"
                                name="password_confirmation"
                                placeholder="Confirm Your Password..."
                                value={form.password_confirmation}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full text-gray-700 bg-white border border-gray-400 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed mt-6"
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>

                    <p className="text-center text-gray-600 text-sm mt-4">
                        Already Have An Account?{" "}
                        <span
                            onClick={() => navigate("/login")}
                            className="text-blue-600 cursor-pointer hover:underline font-medium"
                        >
                            Login
                        </span>
                    </p>
                </form>
            </div>
        </div>
    )
}