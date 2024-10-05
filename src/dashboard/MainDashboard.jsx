import React from 'react';
import { ArrowLeftCircle, BellIcon, CircleUser, FolderClosed, LogOutIcon, PanelsRightBottom, QrCodeIcon, User } from 'lucide-react';

import {
    FaTrash, FaEdit, FaTachometerAlt, FaList,
    FaQrcode, FaUserGraduate, FaBook, FaCogs,
    FaBell, FaEnvelope, FaSignOutAlt, FaCalendar,
    FaSearch
} from 'react-icons/fa';
import {
    Trash2, Edit, Gauge, List, QrCode, GraduationCap, Book,
    Settings, Bell, Mail, LogOut, Calendar, Search,
} from 'lucide-react';
import { BsQrCode } from 'react-icons/bs';

import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigateTo = useNavigate();

    return (
        <div className="flex h-screen bg-blue-900">

            <aside className="w-1/4 bg-green-600 p-6 flex flex-col justify-between">
                <div className="text-white mb-8">
                    {/* Logo and Brand Section */}
                    <div className="flex items-center mb-8">
                        <img
                            src="images/csdl.jpg"
                            alt="Logo"
                            className="w-20 h-20 rounded-full mr-4"
                        />
                        <div>
                            <h1 className="text-2xl font-bold">HK SMS</h1>
                            <p className="text-sm">HK Scholars Management System</p>
                        </div>
                    </div>

                    {/* Navigation Section */}
                    <nav>
                        <ul className="text-white space-y-4">
                            <li>
                                <button
                                    className="flex items-center p-2 hover:bg-green-700 rounded-md w-full transition-colors duration-200"
                                    onClick={() => navigateTo("/MainDashboard")}
                                >
                                    <PanelsRightBottom className="mr-2" />
                                    <span>Dashboard</span>
                                </button>
                            </li>

                            <li>
                                <button
                                    className="flex items-center p-2 hover:bg-green-700 rounded-md w-full transition-colors duration-200"
                                    onClick={() => navigateTo("/ScholarList")}
                                >
                                    <List className="mr-2" />
                                    <span>Scholar List</span>
                                </button>
                            </li>
                            <li>
                                <button
                                    className="flex items-center p-2 hover:bg-green-700 rounded-md w-full transition-colors duration-200"
                                    onClick={() => navigateTo("/qrcode")}
                                >
                                    <BsQrCode className="mr-2" />
                                    <span>QR Code</span>
                                </button>
                            </li>
                            <li>
                                <button
                                    className="flex items-center p-2 hover:bg-green-700 rounded-md w-full transition-colors duration-200"
                                >
                                    <User className="mr-2" />
                                    <span>Assigned Student</span>
                                </button>
                            </li>
                            <li>
                                <button
                                    className="flex items-center p-2 hover:bg-green-700 rounded-md w-full transition-colors duration-200"
                                    onClick={() => navigateTo("/AdminDashboard")}
                                >
                                    <FolderClosed className="mr-2" />
                                    <span>Master Files</span>
                                </button>
                            </li>
                            <li>
                                <button
                                    className="flex items-center p-2 hover:bg-green-700 rounded-md w-full transition-colors duration-200"
                                >
                                    <CircleUser className="mr-2" />
                                    <span>Account</span>
                                </button>
                            </li>
                            <li>
                                <button
                                    className="flex items-center p-2 hover:bg-green-700 rounded-md w-full transition-colors duration-200"
                                >
                                    <BellIcon className="mr-2" />
                                    <span>Notification</span>
                                </button>
                            </li>
                            <li>
                                <button
                                    className="flex items-center p-2 hover:bg-green-700 rounded-md w-full transition-colors duration-200"
                                >
                                    <Mail className="mr-2" />
                                    <span>Messages</span>
                                </button>
                            </li>
                            <li>
                                <button
                                    className="flex items-center p-2 hover:bg-red-600 rounded-md w-full transition-colors duration-200"
                                >
                                    <LogOutIcon className="mr-2" />
                                    <span>Logout</span>
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>


                <p className="text-white text-xs">Powered by PHINMA</p>
            </aside>

            <main className="flex-1 bg-blue-600 p-8">
                <header className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl text-white font-bold">Time Sheets - December 2023</h2>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <FaSearch className="absolute left-2 top-3 text-gray-400" />
                            <input type="text" placeholder="Search scholar" className="p-2 pl-8 rounded-md bg-white" />
                        </div>
                        <button className="bg-blue-600 text-white p-2 rounded-md flex items-center">
                            <FaUserGraduate className="mr-2" />
                            Select Year Level
                        </button>
                        <button className="bg-blue-600 text-white p-2 rounded-md flex items-center">
                            <FaBook className="mr-2" />
                            Select Course
                        </button>
                        <button className="bg-blue-600 text-white p-2 rounded-md flex items-center">
                            <FaCalendar className="mr-2" />
                            Select Date
                        </button>
                    </div>
                </header>

                <div className="flex items-center bg-white p-6 rounded-lg shadow-md mb-6">
                    <img
                        src="images/csdl.jpg"
                        alt="User Avatar"
                        className="w-20 h-20 rounded-full mr-4"
                    />
                    <div>
                        <h3 className="text-xl font-bold">Grizon Russell Sacay</h3>
                        <p className="text-sm text-gray-600">grbs.sacay.coc@phinmed.com</p>
                        <p className="text-sm text-gray-600">Administrator</p>
                    </div>
                </div>

                {/* Timeline Table */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <table className="w-full table-auto text-left">
                        <thead>
                            <tr className="border-b">
                                <th className="p-4">Date</th>
                                <th className="p-4">Name</th>
                                <th className="p-4">Supervisor</th>
                                <th className="p-4">Duty Hours</th>
                                <th className="p-4">Starting Time</th>
                                <th className="p-4">End Time</th>
                                <th className="p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Example row */}
                            <tr className="border-b">
                                <td className="p-4">Dec. 15, 2023</td>
                                <td className="p-4">Ralph Jan Gallegos</td>
                                <td className="p-4">Ralph Jan Gallegos</td>
                                <td className="p-4">180 Hours</td>
                                <td className="p-4">9:30 AM</td>
                                <td className="p-4">3:30 PM</td>
                                <td className="p-4 flex space-x-2">
                                    <button className="text-blue-500 hover:text-blue-700">
                                        <FaEdit />
                                    </button>
                                    <button className="text-red-500 hover:text-red-700">
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
