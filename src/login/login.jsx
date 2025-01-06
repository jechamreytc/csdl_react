import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import secureLocalStorage from 'react-secure-storage';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            toast.error("Please enter username and password");
            return;
        }

        try {
            const url = secureLocalStorage.getItem("url") + "user.php";
            const jsonData = { username, password };
            const formData = new FormData();
            formData.append("json", JSON.stringify(jsonData));
            formData.append("operation", "adminLogin");

            const res = await axios.post(url, formData);
            if (res.data !== 0) {
                secureLocalStorage.setItem("email", res.data.adm_email);
                secureLocalStorage.setItem("userId", res.data.adm_id);
                const fullName = `${res.data.adm_first_name} ${res.data.adm_last_name}`;
                secureLocalStorage.setItem("fullName", fullName);
                secureLocalStorage.setItem("firstName", res.data.adm_first_name);
                secureLocalStorage.setItem("userImage", res.data.adm_image);
                toast.success("Login successful");
                setTimeout(() => router("/MainDashboard"), 500);
            } else {
                toast.error("Invalid login credentials");
            }
        } catch (error) {
            if (error.response) {
                toast.error(`Error: ${error.response.data}`);
            } else if (error.request) {
                toast.error("No response from server");
            } else {
                toast.error(`Error: ${error.message}`);
            }
        }
    };

    useEffect(() => {
        if (!secureLocalStorage.getItem("url")) {
            secureLocalStorage.setItem("url", "http://localhost/csdl/");
        }
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-600 to-green-500">
            <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-6xl shadow-lg rounded-xl">
                <div className="hidden md:flex flex-col justify-center items-center bg-blue-900 text-white rounded-l-xl">
                    <h1 className="text-5xl font-bold">HK SMS</h1>
                    <p className="text-lg mt-2">HK Scholars Management System</p>
                </div>
                <div className="bg-white p-8 rounded-r-xl">
                    <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">Sign in</h2>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email or ID
                            </label>
                            <input
                                type="text"
                                id="email"
                                placeholder="Email or ID"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="remember-me"
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>
                            <a href="#" className="text-sm text-blue-600 hover:underline">
                                Forgot password?
                            </a>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
