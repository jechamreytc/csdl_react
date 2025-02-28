import { QRCodeCanvas } from 'qrcode.react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeftCircle, BellIcon, CircleUser, FolderClosed, LogOutIcon, PanelsRightBottom, QrCodeIcon, User,
    Trash2, Edit, Gauge, List, QrCode, GraduationCap, Book, Settings, Bell, Mail, LogOut, Calendar, Search,
} from 'lucide-react';
import { useState } from 'react';
import Navigator from '../dashboard/navigator';

function Qrcode() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [studentId, setStudentId] = useState('');
    const [course, setCourse] = useState('');
    const [qrData, setQrData] = useState('');

    const handleGenerateQR = () => {
        if (firstName && lastName && studentId && course) {
            const data = `${firstName} ${lastName}, ${studentId}, ${course}`;
            setQrData(data);
        } else {
            alert("Please fill in all required fields.");
        }
    };

    const handleClearQR = () => {
        setQrData('');
        setFirstName('');
        setLastName('');
        setStudentId('');
        setCourse('');
    };

    const navigateTo = useNavigate();
    const handleLogOut = () => {
        navigateTo("/");

    }

    return (
        <div className="flex h-screen" style={{ backgroundColor: "rgb(8, 54, 100)" }}>
            <Navigator />
            <div className="flex-grow p-10 bg-white">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <div className="text-left mb-8">
                        <h1 className="text-5xl font-mono text-green-900 mb-2">QR Code</h1>
                    </div>

                    <div className="bg-green-900 p-6 rounded-lg shadow-lg">
                        <div className="text-left mb-8">
                            <h1 className="text-3xl font-normal text-white mb-2">Generate QR Code</h1>
                            <p className="text-white text-lg">Generate a QR code quickly: Enter the student info and get a shareable code for easy scanning.</p>
                        </div>

                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="w-full md:w-1/2">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block mb-2 text-sm text-white">First Name*</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 rounded bg-white text-black"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm text-white">Last Name*</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 rounded bg-white text-black"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm text-white">Student ID*</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 rounded bg-white text-black"
                                            value={studentId}
                                            onChange={(e) => setStudentId(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm text-white">Course*</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 rounded bg-white text-black"
                                            value={course}
                                            onChange={(e) => setCourse(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-between mt-4">
                                    <button
                                        onClick={handleGenerateQR}
                                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                                        aria-label="Generate QR Code"
                                    >
                                        Generate QR Code
                                    </button>
                                    <button
                                        onClick={handleClearQR}
                                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                                        aria-label="Clear Fields"
                                    >
                                        Clear
                                    </button>
                                </div>
                            </div>

                            {qrData && (
                                <div className="w-full md:w-1/2 flex justify-center items-center mt-6 md:mt-0">
                                    <QRCodeCanvas value={qrData} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Qrcode;
