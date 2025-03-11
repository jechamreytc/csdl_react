import React, { useState, useEffect } from 'react';
import { Sun, Moon, CircleUser, FolderClosed, LogOutIcon, PanelsRightBottom, QrCodeIcon, User, List, Mail, Calendar, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import secureLocalStorage from 'react-secure-storage';
import axios from 'axios';
import Navigator from './navigator';
import Navigatortwo from './navigatortwo';

const MainDashboard = () => {
    const [formData, setFormData] = useState({
        course: "",
        yearLevel: "",
    });
    const [yearLevels, setYearLevels] = useState([]);
    const [courses, setCourses] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [darkMode, setDarkMode] = useState(false);
    const [adminLevel, setAdminLevel] = useState(secureLocalStorage.getItem("adminLevel"));
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
        // setAdminLevel(secureLocalStorage.getItem("adminLevel"));
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

        >
            <Navigator />
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
                        src={`http://localhost/csdl/images/${secureLocalStorage.getItem("userImage")}`}
                        alt="User Avatar of Mae Jabulan"
                        className="w-24 h-24 mr-4 rounded-xl"
                    />
                    <div>
                        <h3 className="text-2xl font-sans text-green-900">{secureLocalStorage.getItem("fullName")}</h3>
                        <p className="text-lg text-green-900">{secureLocalStorage.getItem("email")} </p>
                        <p className="text-lg text-green-900">Administrator</p>
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

export default MainDashboard;
