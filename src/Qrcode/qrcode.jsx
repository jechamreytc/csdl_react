import { QRCodeCanvas } from 'qrcode.react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftCircle, BellIcon, CircleUser, FolderClosed, LogOutIcon, PanelsRightBottom, QrCodeIcon, User } from 'lucide-react';
import { useState } from 'react';
import {
    Trash2, Edit, Gauge, List, QrCode, GraduationCap, Book,
    Settings, Bell, Mail, LogOut, Calendar, Search,
} from 'lucide-react';
import { BsQrCode } from 'react-icons/bs';

function Qrcode() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [studentId, setStudentId] = useState('');
    const [course, setCourse] = useState('');
    const [qrData, setQrData] = useState('');

    const handleGenerateQR = () => {
        const data = `${firstName} ${lastName}, ${studentId}, ${course}`;
        setQrData(data);
    };

    const handleClearQR = () => {
        setQrData('');
    };

    const navigateTo = useNavigate();

    return (
        <div className="flex min-h-screen bg-blue-800">
            <aside className="w-1/4 bg-green-600 p-6 flex flex-col justify-between">
                <div className="text-white mb-8">

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


                    <nav>
                        <ul className="text-white space-y-4">
                            <li>
                                <button
                                    className="flex items-center p-2 hover:bg-blue-700 rounded-md w-full transition-colors duration-200"
                                    onClick={() => navigateTo("/MainDashboard")}
                                >
                                    <PanelsRightBottom className="mr-2" />
                                    <span>Dashboard</span>
                                </button>
                            </li>


                            <li>
                                <button
                                    className="flex items-center p-2 hover:bg-blue-700 rounded-md w-full transition-colors duration-200"
                                    onClick={() => navigateTo("/ScholarList")}
                                >
                                    <List className="mr-2" />
                                    <span>Scholar List</span>
                                </button>
                            </li>
                            <li>
                                <button
                                    className="flex items-center p-2 hover:bg-blue-700 rounded-md w-full transition-colors duration-200"
                                    onClick={() => navigateTo("/qrcode")}
                                >
                                    <BsQrCode className="mr-2" />
                                    <span>QR Code</span>
                                </button>
                            </li>
                            <li>
                                <button
                                    className="flex items-center p-2 hover:bg-blue-700 rounded-md w-full transition-colors duration-200"
                                >
                                    <User className="mr-2" />
                                    <span>Assigned Student</span>
                                </button>
                            </li>
                            <li>
                                <button
                                    className="flex items-center p-2 hover:bg-blue-700 rounded-md w-full transition-colors duration-200"
                                    onClick={() => navigateTo("/AdminDashboard")}
                                >
                                    <FolderClosed className="mr-2" />
                                    <span>Master Files</span>
                                </button>
                            </li>
                            <li>
                                <button
                                    className="flex items-center p-2 hover:bg-blue-700 rounded-md w-full transition-colors duration-200"
                                >
                                    <CircleUser className="mr-2" />
                                    <span>Account</span>
                                </button>
                            </li>
                            <li>
                                <button
                                    className="flex items-center p-2 hover:bg-blue-700 rounded-md w-full transition-colors duration-200"
                                >
                                    <BellIcon className="mr-2" />
                                    <span>Notification</span>
                                </button>
                            </li>
                            <li>
                                <button
                                    className="flex items-center p-2 hover:bg-blue-700 rounded-md w-full transition-colors duration-200"
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

            <div className="min-h-screen bg-blue-900 flex flex-col items-center p-6">
                <div className="bg-blue-500 p-6 rounded-lg shadow-lg text-white max-w-4xl w-full">
                    <h1 className="text-4xl font-bold mb-4">Generate QR Code</h1>
                    <p className="text-sm mb-6">
                        Generate a QR code quickly: Enter the student info and get a shareable code for easy scanning.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-2 text-sm">First Name*</label>
                            <input
                                type="text"
                                className="w-full p-2 rounded bg-white text-black"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm">Last Name*</label>
                            <input
                                type="text"
                                className="w-full p-2 rounded bg-white text-black"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm">Student ID*</label>
                            <input
                                type="text"
                                className="w-full p-2 rounded bg-white text-black"
                                value={studentId}
                                onChange={(e) => setStudentId(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm">Select Course*</label>
                            <select
                                className="w-full p-2 rounded bg-white text-black"
                                value={course}
                                onChange={(e) => setCourse(e.target.value)}
                            >
                                <option value="">Select Course</option>
                                <option value="Course 1">Course 1</option>
                                <option value="Course 2">Course 2</option>
                                <option value="Course 3">Course 3</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-between items-center">
                        <button
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            onClick={handleGenerateQR}
                        >
                            Generate QR
                        </button>
                        <button
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            onClick={handleClearQR}
                        >
                            Clear QR Code
                        </button>
                    </div>

                    <div className="mt-6 bg-white p-4 rounded shadow-lg">
                        {qrData && <QRCodeCanvas value={qrData} size={200} />} {/* Use QRCodeCanvas */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Qrcode;
