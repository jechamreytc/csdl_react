// import { useState, useEffect } from 'react';

// import axios from 'axios';
// import { toast } from 'sonner';
// import SecureStorage from 'react-secure-storage';
// import secureLocalStorage from 'react-secure-storage';

// const AuthPage = () => {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");


//     const handleLogin = async (e) => {
//         e.preventDefault();

//         if (!username || !password) {
//             toast.error("Please enter username and password");
//             return;
//         }

//         try {
//             const url = secureLocalStorage.getItem("url") + "CSDL.php";
//             const jsonData = { username, password };
//             const formData = new FormData();
//             formData.append("operation", "getAdmin");

//             const res = await axios.post(url, formData);
//             console.log("Login response:", res.data);

//             if (res.data.error) {
//                 toast.error(res.data.error);
//             } else {
//                 toast.success("Login successful");

//                 // Securely store user_id and user_level using react-secure-storage
//                 SecureStorage.setItem("adm_email", res.data.adm_email);
//                 SecureStorage.setItem("user_level", res.data.user_level);

//                 if (res.data.user_level === "admin") {
//                     setTimeout(() => router.push("/admin"), 500);
//                 } else if (res.data.user_level === "user") {
//                     setTimeout(() => router.push("/dashboard"), 500);
//                 } else {
//                     toast.error("Unrecognized user level");
//                 }
//             }
//         } catch (error) {
//             if (error.response) {
//                 toast.error(`Error: ${error.response.data}`);
//             } else if (error.request) {
//                 toast.error("No response from server");
//             } else {
//                 toast.error(`Error: ${error.message}`);
//             }
//         }
//     };

//     useEffect(() => {
//         if (!SecureStorage.getItem("url")) {
//             SecureStorage.setItem("url", "http://localhost/gabs/user.php");
//         }
//     }, []);

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-600 to-green-500">
//             <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-6xl shadow-lg rounded-xl">
//                 {/* Left Side - Branding */}
//                 <div className="hidden md:flex flex-col justify-center items-center bg-blue-900 text-white rounded-l-xl">
//                     <h1 className="text-5xl font-bold">HK SMS</h1>
//                     <p className="text-lg mt-2">HK Scholars Management System</p>
//                 </div>

//                 {/* Right Side - Login Form */}
//                 <div className="bg-white p-8 rounded-r-xl">
//                     <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">Sign in</h2>
//                     <form onSubmit={handleLogin} className="space-y-4">
//                         <div>
//                             <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                                 Email
//                             </label>
//                             <input
//                                 type="text"
//                                 id="email"
//                                 placeholder="email"
//                                 value={username}
//                                 onChange={(e) => setUsername(e.target.value)}
//                                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                             />
//                         </div>
//                         <div>
//                             <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                                 Password
//                             </label>
//                             <input
//                                 type="password"
//                                 id="password"
//                                 placeholder="Password"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                             />
//                         </div>
//                         <div className="flex items-center justify-between">
//                             <div className="flex items-center">
//                                 <input
//                                     type="checkbox"
//                                     id="remember-me"
//                                     className="h-4 w-4 text-blue-600 border-gray-300 rounded"
//                                 />
//                                 <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
//                                     Remember me
//                                 </label>
//                             </div>
//                             <a href="#" className="text-sm text-blue-600 hover:underline">
//                                 Forgot password?
//                             </a>
//                         </div>
//                         <button
//                             type="submit"
//                             className="w-full py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition">
//                             Login
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AuthPage;
