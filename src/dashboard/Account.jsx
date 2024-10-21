import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BellIcon, CircleUser, FolderClosed, LogOutIcon, PanelsRightBottom, QrCodeIcon, User, List, Mail, Calendar, Search } from 'lucide-react';
import secureLocalStorage from 'react-secure-storage';
import axios from 'axios';

const Account = () => {
    const [file, setFile] = useState(null);
    const navigateTo = useNavigate();

    const handleLogOut = () => {
        secureLocalStorage.clear();
        navigateTo("/");
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handlePhotoUpload = () => {
        document.getElementById('photo-upload').click(); // Trigger file input click
    };

    return (
        <div className="flex h-screen" style={{ backgroundColor: "rgb(8, 54, 100)" }}>
            <aside className="w-1/6 p-4 flex flex-col justify-between" style={{ backgroundColor: "#109315" }}>
                <div className="text-white mb-6">
                    <div className="flex items-center mb-6">
                        <img
                            src="images/csdl.jpg"
                            alt="CSDL Logo"
                            className="w-24 h-24 rounded-full mr-3"
                        />
                        <div>
                            <br />
                            <h1 className="text-xl font-bold">HK SMS</h1>
                            <p className="text-xl">HK Scholars Management System</p>
                        </div>
                    </div>

                    <nav>
                        <ul className="space-y-4">
                            <li>
                                <button
                                    className="flex items-center p-3 hover:bg-green-700 rounded-md w-full transition-all duration-200"
                                    onClick={() => navigateTo("/MainDashboard")}
                                >
                                    <PanelsRightBottom className="mr-2" />
                                    <span className="text-sm">Dashboard</span>
                                </button>
                            </li>
                            <li>
                                <button
                                    className="flex items-center p-3 hover:bg-green-700 rounded-md w-full transition-all duration-200"
                                    onClick={() => navigateTo("/ScholarList")}
                                >
                                    <List className="mr-2" />
                                    <span className="text-sm">Scholar List</span>
                                </button>
                            </li>
                            <li>
                                <button
                                    className="flex items-center p-3 hover:bg-green-700 rounded-md w-full transition-all duration-200"
                                    onClick={() => navigateTo("/qrcode")}
                                >
                                    <QrCodeIcon className="mr-2" />
                                    <span className="text-sm">QR Code</span>
                                </button>
                            </li>

                            <li>
                                <button
                                    className="flex items-center p-3 hover:bg-green-700 rounded-md w-full transition-all duration-200"
                                    onClick={() => navigateTo("/AssignStudent")}
                                >
                                    <User className="mr-2" />
                                    <span className="text-sm">Assigned Student</span>
                                </button>
                            </li>
                            <li>
                                <button
                                    className="flex items-center p-3 hover:bg-green-700 rounded-md w-full transition-all duration-200"
                                    onClick={() => navigateTo("/AdminDashboard")}
                                >
                                    <FolderClosed className="mr-2" />
                                    <span className="text-sm">Master Files</span>
                                </button>
                            </li>
                            <h2 className="text-lg font-semibold mt-6 mb-2">Account</h2>
                            <li>
                                <button
                                    className="flex items-center p-3 hover:bg-green-700 rounded-md w-full transition-all duration-200"
                                    onClick={() => navigateTo("/Account")}
                                >
                                    <CircleUser className="mr-2" />
                                    <span className="text-sm">Account</span>
                                </button>
                            </li>
                            {/* <li>
                                <button
                                    className="flex items-center p-3 hover:bg-green-700 rounded-md w-full transition-all duration-200"
                                >
                                    <BellIcon className="mr-2" />
                                    <span className="text-sm">Notification</span>
                                </button>
                            </li>
                            <li>
                                <button
                                    className="flex items-center p-3 hover:bg-green-700 rounded-md w-full transition-all duration-200"
                                >
                                    <Mail className="mr-2" />
                                    <span className="text-sm">Messages</span>
                                </button>
                            </li> */}
                            <li className="mt-4">
                                <button
                                    className="flex items-center p-3 bg-red-600 hover:bg-red-700 rounded-md w-full transition-all duration-200"
                                    onClick={handleLogOut}
                                >
                                    <LogOutIcon className="mr-2" />
                                    <span className="text-sm">Logout</span>
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
                <p className="text-white text-xs mt-4">Powered by PHINMA</p>
            </aside >
            <div className="flex-1 p-10">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-normal mb-6 text-blue-900">General Info</h2>
                    <p className="mb-4 text-blue-800">Setup your profile account and edit profile details.</p>

                    {/* Profile Image Section */}
                    <div className="flex items-center mb-8 bg-blue-900 rounded-md p-8 w-full h-20">
                        <div className="w-20 h-20 bg-gray-200 rounded-full mr-4 overflow-hidden">
                            {file ? (
                                <img src={URL.createObjectURL(file)} alt="Profile" className="object-cover w-full h-full" />
                            ) : (
                                <img src="images/mae.jpg" alt="Profile" className="object-cover w-full h-full" />
                            )}
                        </div>
                        <input
                            type="file"
                            id="photo-upload"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                        <button
                            className="bg-green-600 text-white text-lg px-6 py-3 rounded hover:bg-green-700 ml-auto"
                            onClick={handlePhotoUpload}
                        >
                            Update Photo
                        </button>
                    </div>

                    {/* Account Info Form */}
                    <div className="bg-blue-900 text-white p-6 rounded-lg">
                        <h3 className="text-xl mb-4">Account Info</h3>
                        <form>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block mb-2">Full Name*</label>
                                    <input
                                        type="text"
                                        value={secureLocalStorage.getItem("fullName")}
                                        className="w-full p-2 rounded bg-blue-600 text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2">Username*</label>
                                    <input
                                        type="text"
                                        value="admin123"
                                        className="w-full p-2 rounded bg-blue-600 text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2">Password*</label>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            value="admin123"
                                            className="w-full p-2 rounded bg-blue-600 text-white"
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white">
                                            <i className="fas fa-eye-slash"></i>
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <label className="block mb-2">Confirm Password*</label>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            value="admin123"
                                            className="w-full p-2 rounded bg-blue-600 text-white"
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white">
                                            <i className="fas fa-eye-slash"></i>
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <label className="block mb-2">Email Address*</label>
                                    <input
                                        type="email"
                                        value="grba.sacay.coc@phinmaed.com"
                                        className="w-full p-2 rounded bg-blue-600 text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2">Confirm Email Address*</label>
                                    <input
                                        type="email"
                                        value="grba.sacay.coc@phinmaed.com"
                                        className="w-full p-2 rounded bg-blue-600 text-white"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="mt-6 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
                                Update Info
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;
