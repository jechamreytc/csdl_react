import React from 'react';

const Login = () => {
    return (
        <div className="flex h-screen bg-gradient-to-r from-blue-800 to-green-500">
            <div className="flex items-center justify-center w-1/2 relative">

                <img
                    src="images/topleft.png"
                    alt="Logo"
                    className="absolute top-5 left-5 w-16 h-16"
                />
                <div className="text-white text-center">
                    <h1 className="text-6xl font-bold">HK SMS</h1>
                    <p className="text-2xl mt-2">HK Scholars Management System</p>
                </div>
            </div>
            <div className="flex items-center justify-center w-1/2">
                <div className="bg-black bg-opacity-80 p-8 rounded-lg shadow-lg">
                    <h2 className="text-white text-4xl font-semibold mb-4">Sign in</h2>
                    <p className="text-gray-300 mb-6">Sign in your account</p>
                    <form>
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Login"
                                className="w-full p-3 rounded-md bg-gray-800 text-white focus:outline-none"
                            />
                        </div>
                        <div className="mb-4 relative">
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full p-3 rounded-md bg-gray-800 text-white focus:outline-none"
                            />
                            <button type="button" className="absolute right-3 top-3 text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        fillRule="evenodd"
                                        d="M10 3a7 7 0 016.938 6H17a8 8 0 10-3.066 5.626l-1.04-1.03A6 6 0 114 10h-.938A7 7 0 0110 3zm1.707 7l1.415 1.414a1 1 0 11-1.414 1.415l-2-2a1 1 0 010-1.415l2-2a1 1 0 011.414 1.415L11.707 10z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                                <input type="checkbox" className="text-blue-500 focus:ring-2 focus:ring-blue-600 h-4 w-4" />
                                <label className="ml-2 text-gray-300">Remember me</label>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full p-3 rounded-md bg-green-500 text-white hover:bg-green-600 transition-colors">
                            Login
                        </button>
                    </form>
                    <p className="text-gray-500 text-center mt-6">Powered by: PHINMA COC</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
