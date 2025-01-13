import React, { useState, useEffect } from 'react';
import { Sun, Moon, CircleUser, FolderClosed, LogOutIcon, PanelsRightBottom, QrCodeIcon, User, List, Mail, Calendar, Search, ChevronLeft, ChevronRight } from 'lucide-react';
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
    const [assignments, setAssignments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [darkMode, setDarkMode] = useState(false);
    const itemsPerPage = 4;
    const navigateTo = useNavigate();


    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = assignments.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(assignments.length / itemsPerPage);

    // Navigation functions
    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

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

    useEffect(() => {
        const getAssignmentList = async () => {
            try {
                const url = secureLocalStorage.getItem('url') + 'assign.php';
                const formData = new FormData();
                formData.append('operation', 'getAssignmentList');
                const res = await axios.post(url, formData);
                setAssignments(res.data);
            } catch (error) {
                console.error('Failed to fetch data:', error);
                toast.error('Failed to fetch data');
            }
        };
        getAssignmentList();
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
    };

    return (
        <div
            className={`flex h-screen ${darkMode ? 'bg-gray-950' : ''}`}
            style={!darkMode ? { backgroundColor: "rgb(8, 54, 100)" } : {}}
        >
            <aside
                className={`w-1/6 p-4 flex flex-col justify-between ${darkMode ? 'bg-blue-900' : ''}`}
                style={{ backgroundColor: darkMode ? undefined : "#109315" }}
            >
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

            {/* <main className="flex-1 p-8 relative">
                <div
                    className="absolute right-[-60px] bg-center opacity-10 rounded-full ${darkMode ? 'bg-gray-950' : 'bg-blue-900}"
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
                <div className="flex justify-between items-center mb-6">
                    <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-white'}`}>Time Sheets - October 2024</h2>
                    <button onClick={toggleDarkMode} className="p-2 rounded-full bg-white text-white shadow-md">
                        {darkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-black" />}
                    </button>
                </div>

                <div className="flex items-center p-6">
                    <img
                        src={`http://localhost/csdl/images/${secureLocalStorage.getItem("userImage")}`}
                        alt="User Avatar"
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
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 z-10"
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

                <div className="relative z-10 bg-white p-6 rounded-lg ${darkMode ? 'bg-gray-950' : 'bg-white'}">
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
                            {currentItems.length > 0 ? (
                                currentItems.map((assignment, index) => (
                                    <tr className="border-b hover:bg-gray-50" key={index}>
                                        <td className="p-4"></td>
                                        <td className="p-4">{assignment.Fullname}</td>
                                        <td className="p-4">{assignment.SupervisorFullname}</td>
                                        <td className="p-4">{Math.round(assignment.assign_duty_hours / 3600)} Hours</td>
                                        <td className="p-4">{assignment.timeShed_name}</td>
                                        <td className="p-4">{assignment.time_out_name}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="p-4 text-center">
                                        No assignments found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* Pagination Controls */}
            {/* <div className={`flex items-center justify-between border-t ${darkMode ? 'bg-gray-950' : 'bg-white'} px-4 py-3 sm:px-6 mt-4`}>

                        <div className="flex flex-1 justify-between sm:hidden">
                            <button
                                onClick={prevPage}
                                disabled={currentPage === 1}
                                className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium ${currentPage === 1 ? 'text-gray-300' : 'text-gray-700 hover:bg-gray-50'}`}
                            >
                                Previous
                            </button>
                            <button
                                onClick={nextPage}
                                disabled={currentPage === totalPages}
                                className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium ${currentPage === totalPages ? 'text-gray-300' : 'text-gray-700 hover:bg-gray-50'}`}
                            >
                                Next
                            </button>
                        </div>
                        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                                    <span className="font-medium">
                                        {Math.min(indexOfLastItem, assignments.length)}
                                    </span>{' '}
                                    of <span className="font-medium">{assignments.length}</span> results
                                </p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={prevPage}
                                    disabled={currentPage === 1}
                                    className={`p-2 rounded-full ${currentPage === 1 ? 'text-gray-300' : 'text-gray-700 hover:bg-gray-100'}`}
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <span className="text-sm text-gray-700">
                                    Page {currentPage} of {totalPages}
                                </span>
                                <button
                                    onClick={nextPage}
                                    disabled={currentPage === totalPages}
                                    className={`p-2 rounded-full ${currentPage === totalPages ? 'text-gray-300' : 'text-gray-700 hover:bg-gray-100'}`}
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main> */}
        </div>
    );
};

export default Dashboard;