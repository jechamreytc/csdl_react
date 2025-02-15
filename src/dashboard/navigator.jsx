import React, { useEffect } from "react";
import { CircleUser, LogOutIcon, PanelsRightBottom, QrCodeIcon, User, List, Mail, Calendar, Search, ChevronLeft, ChevronRight, FolderClosed } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

function Navigator() {
    const navigateTo = useNavigate();
    const handleLogOut = () => {
        navigateTo("/");
        secureLocalStorage.removeItem("adminLogin");
    };

    // tig validate if admin login
    useEffect(() => {
        if (secureLocalStorage.getItem("adminLogin") !== "true") {
            handleLogOut();
        }
    }, []);
    return (
        <aside className="w-64 bg-green-700 text-white p-6">
            <div className="mb-6">
                <div className="flex items-center mb-6">
                    <img
                        src="images/csdl.jpg"
                        alt="CSDL Logo"
                        className="w-24 h-24 rounded-full mr-3"
                    />
                    <div>
                        <h1 className="text-xl font-bold">HK SMS</h1>
                        <p className="text-md">HK Scholars Management System</p>
                    </div>
                </div>

                <nav>
                    <ul className="space-y-4">
                        <li>
                            <button
                                className="flex items-center p-3 hover:bg-green-600 rounded-md w-full transition-all duration-200"
                                onClick={() => navigateTo("/MainDashboard")}
                            >
                                <PanelsRightBottom className="mr-2" />
                                <span className="text-sm">Dashboard</span>
                            </button>
                        </li>
                        <li>
                            <button
                                className="flex items-center p-3 hover:bg-green-600 rounded-md w-full transition-all duration-200"
                                onClick={() => navigateTo("/ScholarList")}
                            >
                                <List className="mr-2" />
                                <span className="text-sm">Scholar List</span>
                            </button>
                        </li>
                        <li>
                            <button
                                className="flex items-center p-3 hover:bg-green-600 rounded-md w-full transition-all duration-200"
                                onClick={() => navigateTo("/qrcode")}
                            >
                                <QrCodeIcon className="mr-2" />
                                <span className="text-sm">QR Code</span>
                            </button>
                        </li>
                        <li>
                            <button
                                className="flex items-center p-3 hover:bg-green-600 rounded-md w-full transition-all duration-200"
                                onClick={() => navigateTo("/AssignStudent")}
                            >
                                <User className="mr-2" />
                                <span className="text-sm">Assign Office</span>
                            </button>
                        </li>
                        <li>
                            <button
                                className="flex items-center p-3 hover:bg-green-600 rounded-md w-full transition-all duration-200"
                                onClick={() => navigateTo("/StudentFacilitator")}
                            >
                                <User className="mr-2" />
                                <span className="text-sm">Assign Student Facilitator</span>
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
                                className="flex items-center p-3 hover:bg-green-600 rounded-md w-full transition-all duration-200"
                                onClick={() => navigateTo("/Account")}
                            >
                                <CircleUser className="mr-2" />
                                <span className="text-sm">Account</span>
                            </button>
                        </li>
                        <li>
                            <button
                                className="flex items-center p-3 hover:bg-green-700 rounded-md w-full transition-all duration-200"
                                onClick={() => navigateTo("/Batch")}
                            >
                                <CircleUser className="mr-2" />
                                <span className="text-sm">Batch Scholar</span>
                            </button>
                        </li>
                        <li>
                            <button
                                className="flex items-center p-3 hover:bg-green-700 rounded-md w-full transition-all duration-200"
                                onClick={() => navigateTo("/BatchSubject")}
                            >
                                <CircleUser className="mr-2" />
                                <span className="text-sm">Batch Subject</span>
                            </button>
                        </li>
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
        </aside>
    )
}

export default Navigator