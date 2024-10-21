import React, { useState, useEffect } from 'react';
import { BellIcon, CircleUser, FolderClosed, LogOutIcon, PanelsRightBottom, QrCodeIcon, User, List, Mail, Calendar, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import secureLocalStorage from 'react-secure-storage';
import axios from 'axios';


const Dashboard = () => {
    const [formData, setFormData] = useState({
        course: "",
        yearLevel: "",

    });
    const [yearLevels, setYearLevels] = useState([]);
    const [courses, setCourses] = useState([]);
    const navigateTo = useNavigate();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = secureLocalStorage.getItem('url') + 'CSDL.php';
                const formData = new FormData();
                formData.append('operation', 'getAddScholarDropDown');
                const res = await axios.post(url, formData);
                setCourses(res.data.course);
                setYearLevels(res.data.yearLevel);
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
    const handleLogOut = () => {
        navigateTo("/");

    }


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

            <main
                className="flex-1 p-8 relative"
                style={{ backgroundImage: `url('/path/to/your/background-image.jpg')`, backgroundSize: 'cover' }}
            >
                <div
                    className="absolute right-[-60px] bg-center opacity-10 rounded-full"
                    style={{
                        backgroundImage: `url('images/csdl.jpg')`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right bottom',
                        width: '700px',
                        height: '700px',
                        zIndex: 0,
                    }}
                />
                <h2 className="text-3xl text-white font-bold flex items-center">
                    Time Sheets - October 2024
                    <Calendar className="ml-2 text-5xl" />
                </h2>
                <br />


                <div className="flex items-center p-6">
                    <img
                        src="images/sakana.jpg"
                        alt="User Avatar of Mae Jabulan"
                        className="w-24 h-24 mr-4 rounded-xl"
                    />
                    <div>
                        <h3 className="text-2xl font-sans text-white">{secureLocalStorage.getItem("fullName")}</h3>
                        <p className="text-lg text-white">{secureLocalStorage.getItem("email")} </p>
                        <p className="text-lg text-white">Administrator</p>
                    </div>
                    <div className="relative ml-auto">
                        <Search className="absolute left-2 top-3 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search scholar"
                            className="p-2 pl-8 rounded-md bg-white shadow-md"
                        />
                    </div>
                </div>


                <header className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-white mb-6">{secureLocalStorage.getItem("firstName") + "'s"} Timeline</h1>
                    <div className="flex items-center space-x-3">
                        <select
                            name="yearLevel"
                            value={formData.yearLevel}
                            onChange={handleInputChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 z-10"
                            required
                        >
                            <option value="">Select Year Level</option>
                            {yearLevels.length > 0 ? yearLevels.map((level, index) => (
                                <option key={index} value={level.year_level_id}>
                                    {level.year_level_name}
                                </option>
                            )) : (<option>No School Year Yet</option>)}
                        </select>
                        <select
                            name="course"
                            value={formData.course}
                            onChange={handleInputChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 z-10" // Added z-10
                            required
                        >
                            <option value="">Select Course</option>
                            {courses.length > 0 ? courses.map((course, index) => (
                                <option key={index} value={course.crs_id}>
                                    {course.crs_name}
                                </option>
                            )) : (<option>No Course Yet</option>)}
                        </select>
                        <button className="bg-white text-blue-600 p-2 rounded-md flex items-center shadow-md">
                            <Calendar className="mr-2" />
                            Select Date
                        </button>
                    </div>
                </header>

                <div className="relative z-10 bg-white p-6 rounded-lg">
                    <table className="w-full table-auto text-left">
                        <thead>
                            <tr className="border-b">
                                <th className="p-4">Date</th>
                                <th className="p-4">Name</th>
                                <th className="p-4">Supervisor</th>
                                <th className="p-4">Duty Hours</th>
                                <th className="p-4">Starting Time</th>
                                <th className="p-4">End Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b">
                                <td className="p-4">Dec. 15, 2023</td>
                                <td className="p-4">Ralph Jan Gallegos</td>
                                <td className="p-4">Ralph Jan Gallegos</td>
                                <td className="p-4">180 Hours</td>
                                <td className="p-4">9:30 AM</td>
                                <td className="p-4">3:30 PM</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-4">Dec. 15, 2023</td>
                                <td className="p-4">Mel Angelo Macario</td>
                                <td className="p-4">Mel Angelo Macario</td>
                                <td className="p-4">180 Hours</td>
                                <td className="p-4">10:30 AM</td>
                                <td className="p-4">5:30 PM</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>

        </div >
    );
};

export default Dashboard;
