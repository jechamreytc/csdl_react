import React, { useState, useEffect } from 'react';
import { BellIcon, CircleUser, FolderClosed, LogOutIcon, PanelsRightBottom, QrCodeIcon, User, List, Mail, Calendar, Search } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import secureLocalStorage from 'react-secure-storage';
import { useNavigate } from 'react-router-dom';

const ScholarList = () => {
    const navigateTo = useNavigate();

    const [formData, setFormData] = useState({
        scholarshipType: '',
        yearLevels: '',
        course: '',
        search: ''
    });
    const [scholarshipType, setScholarshipType] = useState([]);
    const [yearLevel, setYearLevel] = useState([]);
    const [courses, setCourses] = useState([]);
    const [filteredScholars, setFilteredScholars] = useState([]);
    const [allScholars, setAllScholars] = useState([]);

    useEffect(() => {
        const getAllList = async () => {
            try {
                const url = secureLocalStorage.getItem("url") + "CSDL.php";
                const postData = new FormData();
                postData.append("operation", "getAllScholarList");
                const res = await axios.post(url, postData);

                // Safely accessing the response data
                setScholarshipType(res.data.scholarshiptypelist || []);
                setYearLevel(res.data.SchoolYearLevel || []);
                setCourses(res.data.courselist || []);
                setAllScholars(res.data.scholars || []);

                toast.success("Scholar data loaded successfully");
            } catch (error) {
                toast.error("Failed to load scholar data");
            }
        };
        getAllList();
    }, []);

    const handleFilter = () => {
        const { scholarshipType, yearLevels, course, search } = formData;

        const filtered = allScholars.filter(scholar => {
            return (
                (!scholarshipType || scholar.scholarshipType === scholarshipType) &&
                (!yearLevels || scholar.yearLevels === yearLevels) &&
                (!course || scholar.course === course) &&
                (!search || scholar.name.toLowerCase().includes(search.toLowerCase()))
            );
        });
        setFilteredScholars(filtered);
    };

    useEffect(() => {
        handleFilter();
    }, [formData, allScholars]);

    const handleLogOut = () => {
        navigateTo("/");
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

            <div className="container mx-auto p-8 bg-blue-900 min-h-screen">
                <div className="bg-white text-blue-900 p-6 rounded-t-lg shadow-lg">
                    <h2 className="text-4xl font-bold mb-2">Scholar List</h2>
                    <p className="text-sm">Compile and maintain a comprehensive Scholar List</p>
                </div>

                <div className="bg-white p-6 rounded-b-lg shadow-lg mt-4">
                    <div className="flex flex-wrap gap-4 items-center mb-6">
                        <div className="relative flex-grow">
                            <input
                                type="text"
                                placeholder="Search scholar"
                                value={formData.search}
                                onChange={e => setFormData({ ...formData, search: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex-grow sm:flex-1">
                            <select
                                value={formData.scholarshipType}
                                onChange={e => setFormData({ ...formData, scholarshipType: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-blue-900 bg-blue-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">HK 25</option>
                                {scholarshipType.map((type) => (
                                    <option key={type.type_id} value={type.type_id}>
                                        {type.type_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex-grow sm:flex-1">
                            <select
                                value={formData.yearLevels}
                                onChange={e => setFormData({ ...formData, yearLevels: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-blue-900 bg-blue-900 text-white focus:outline-none focus:ring-2 focus:ring-white"
                            >
                                <option value="">First Year</option>
                                {yearLevel.map((level) => (
                                    <option key={level.year_level_id} value={level.year_level_id}>
                                        {level.year_level_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex-grow sm:flex-1">
                            <select
                                value={formData.course}
                                onChange={e => setFormData({ ...formData, course: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-blue-500 bg-blue-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select Course</option>
                                {courses.map((course) => (
                                    <option key={course.crs_id} value={course.crs_id}>
                                        {course.crs_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
                        <thead>
                            <tr className="bg-blue-600 text-white">
                                <th className="px-4 py-2 text-left">Name</th>
                                <th className="px-4 py-2 text-left">Scholarship</th>
                                <th className="px-4 py-2 text-left">Status</th>

                            </tr>
                        </thead>
                        <tbody>
                            {filteredScholars.length > 0 ? (
                                filteredScholars.map(scholar => (
                                    <tr key={scholar.scholar_id} className="hover:bg-blue-200 border-b border-gray-300">
                                        <td className="px-4 py-2">{scholar.name}</td>
                                        <td className="px-4 py-2">{scholar.scholarshipType}</td>
                                        <td className="px-4 py-2">{scholar.yearLevels}</td>
                                        <td className="px-4 py-2">{scholar.course}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-4 py-2 text-center">No matching scholars found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    );
};

export default ScholarList;
