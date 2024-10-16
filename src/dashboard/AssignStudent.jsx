import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BellIcon, CircleUser, FolderClosed, LogOutIcon, PanelsRightBottom, QrCodeIcon, User, List, Mail } from 'lucide-react';
import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';
import { toast } from 'sonner';
function AssignStudent() {
    const [formData, setFormData] = useState({
        dutyAssignment: '',
        subjectcode: '',
        section: '',
        time: '',
        day: '',
        room: '',
        building: '',
    });
    const [dutyAssignment, setDutyAssignment] = useState('');
    const [subjectcode, setsubjectcode] = useState('');
    const [section, setSection] = useState('');
    const [time, setTime] = useState('');
    const [days, setDays] = useState('');
    const [rooms, setRooms] = useState('');
    const [buildings, setBuildings] = useState('');
    const [dutyHours, setDutyHours] = useState('');
    const navigateTo = useNavigate();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = secureLocalStorage.getItem('url') + 'CSDL.php';

                const formData = new FormData();
                formData.append('operation', 'getDutyAssign');
                const res = await axios.post(url, formData);
                setBuildings(res.data);
                setRooms(res.data);
                console.log("res ni room", res.data);
                setDays(res.data);
                setsubjectcode(res.data.subjectcode);
                setDutyHours(res.data.dutyHours);
                toast.success('Form data loaded successfully');

            } catch (error) {
                toast.error('Failed to load form data');
            }
        };

        fetchData();
    }, []);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    // }

    return (
        <div className="flex h-screen" style={{ backgroundColor: "rgb(8, 54, 100)" }}>
            <aside className="w-1/6 p-4 flex flex-col justify-between" style={{ backgroundColor: "#109315" }}>
                <div className="text-white mb-6">
                    <div className="flex items-center mb-6">
                        <img
                            src="images/csdl.jpg"
                            alt="CSDL Logo"
                            className="w-16 h-16 rounded-full mr-3"
                        />
                        <div>
                            <h1 className="text-xl font-bold">HK SMS</h1>
                            <p className="text-xs opacity-80">HK Scholars Management System</p>
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
                                >
                                    <CircleUser className="mr-2" />
                                    <span className="text-sm">Account</span>
                                </button>
                            </li>
                            <li>
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
                            </li>
                            <li className="mt-4">
                                <button
                                    className="flex items-center p-3 bg-red-600 hover:bg-red-700 rounded-md w-full transition-all duration-200"
                                >
                                    <LogOutIcon className="mr-2" />
                                    <span className="text-sm">Logout</span>
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
                <p className="text-white text-xs opacity-70 mt-4">Powered by PHINMA</p>
            </aside>

            <main className="bg-white p-8 rounded-lg shadow-lg relative">

                <h1 className="text-3xl font-semibold text-blue-900 mb-6">Assigned Students</h1>


                <div className="bg-blue-800 p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold text-white mb-3">Duty Assigned</h2>
                    <p className="text-gray-300 mb-6">Generate a student duty: Input the necessary details with a unique identifier for easy reference.</p>


                    <div className="space-y-6">
                        <div className="sm:flex sm:space-x-4">

                            <div className="flex-1">
                                <label className="block text-white font-semibold mb-2">Student*</label>
                                {/* <div className="flex items-center bg-blue-700 rounded-lg px-4 py-3">
                                    <select
                                        value={student}
                                        onChange={(e) => setStudent(e.target.value)}
                                        className="w-full bg-transparent text-white focus:outline-none"
                                    >
                                        <option value="">Select Student</option>
                                        <option value="Student1">Student 1</option>
                                        <option value="Student2">Student 2</option>
                                        <option value="Student3">Student 3</option>
                                    </select>
                                    <span className="ml-2 text-white">&gt;</span>
                                </div> */}
                            </div>

                            {/* Room Dropdown */}
                            <div className="flex-1">
                                <label className="block text-white font-semibold mb-2">Room</label>
                                <div className="flex items-center bg-blue-700 rounded-lg px-4 py-3">
                                    <select
                                        name="room"
                                        value={formData.room}
                                        onChange={handleInputChange}
                                        className="w-full bg-transparent text-white focus:outline-none"
                                    >
                                        <option value="">Select Room</option>
                                        {rooms.length > 0 ? rooms.map((room, index) => (
                                            <option key={index} value={room.room_id}>
                                                {room.room_number}
                                            </option>
                                        )) : (<p> No Room Available </p>)}
                                    </select>
                                    <span className="ml-2 text-white">&gt;</span>
                                </div>
                            </div>
                        </div>

                        <div className="sm:flex sm:space-x-4">
                            {/* Building Dropdown */}
                            <div className="flex-1">
                                <label className="block text-white font-semibold mb-2">Select Building</label>
                                <div className="flex items-center bg-blue-700 rounded-lg px-4 py-3">
                                    <select
                                        name="building"
                                        value={formData.building}
                                        onChange={handleInputChange}
                                        className="w-full bg-transparent text-white focus:outline-none"
                                    >
                                        <option value="">Select Building</option>
                                        {buildings.length > 0 ? (
                                            buildings.map((build, index) => (
                                                <option key={index} value={build.build_id}>
                                                    {build.build_name}
                                                </option>
                                            ))
                                        ) : (
                                            <option value="" disabled>No Buildings Available</option>
                                        )}
                                    </select>
                                    <span className="ml-2 text-white">&gt;</span>
                                </div>
                            </div>
                            <div className="flex-1">
                                <label className="block text-white font-semibold mb-2">Select Day</label>
                                <div className="flex items-center bg-blue-700 rounded-lg px-4 py-3">
                                    <select
                                        name="building"
                                        value={formData.day}
                                        onChange={handleInputChange}
                                        className="w-full bg-transparent text-white focus:outline-none"
                                    >
                                        <option value="">Select Day</option>
                                        {days.length > 0 ? (
                                            days.map((day, index) => (
                                                <option key={index} value={day.day_id}>
                                                    {day.day_name}
                                                </option>
                                            ))
                                        ) : (
                                            <option value="" disabled>No Days Available</option>
                                        )}
                                    </select>
                                    <span className="ml-2 text-white">&gt;</span>
                                </div>
                            </div>
                        </div>

                        {/* Buttons */}
                        <button className="flex items-center justify-center bg-blue-600 text-white rounded-lg py-3 w-full mb-4">
                            <span>Assigned History</span>
                            <svg
                                className="w-6 h-6 ml-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 8v4l3 3m6-4a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </button>

                        <button className="bg-green-600 text-white font-bold py-3 rounded-lg w-full">Assigned</button>
                    </div>
                </div>
            </main>



        </div>
    );
}

export default AssignStudent;
