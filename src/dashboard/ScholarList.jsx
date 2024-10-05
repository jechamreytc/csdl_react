import { ArrowLeftCircle, BellIcon, CircleUser, FolderClosed, LogOutIcon, PanelsRightBottom, QrCodeIcon, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import React, { useState, useEffect } from 'react';
import secureLocalStorage from 'react-secure-storage';
import {
    Trash2, Edit, Gauge, List, QrCode, GraduationCap, Book,
    Settings, Bell, Mail, LogOut, Calendar, Search,
} from 'lucide-react';
import { BsQrCode } from 'react-icons/bs';


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
    const [course, setCourse] = useState([]);
    const [filteredScholars, setFilteredScholars] = useState([]);
    const [allScholars, setAllScholars] = useState([
        { scholarshipType: 'HK 100', name: 'Ralph Jan Gallegos', status: 'Pending' },
        { scholarshipType: 'HK 50', name: 'Grizon Russell Sacay', status: 'Active' },
        { scholarshipType: 'HK 75', name: 'Jane Doe', status: 'Active' }
    ]);

    useEffect(() => {
        const getAllList = async () => {
            try {
                const url = secureLocalStorage.getItem("url") + "CSDL.php";
                const formData = new FormData();
                formData.append("operation", "getAllScholarList");
                const res = await axios.post(url, formData);
                setScholarshipType(res.data.scholarshiptypelist || []);
                setYearLevel(res.data.SchoolYearLevel || []);
                setCourse(res.data.courselist || []);
                setAllScholars(res.data.scholars || []);
                toast.success("Scholar data loaded successfully");
            } catch (error) {
                console.log('Failed to load scholar data:', error);
                toast.error("Failed to load scholar data");
            }
        };
        getAllList();
    }, []);

    const handleFilter = () => {
        const { scholarshipType, yearLevels, course, search } = formData;

        if (!allScholars || !Array.isArray(allScholars)) {
            setFilteredScholars([]);
            return;
        }

        const filtered = allScholars.filter(scholar => {
            return (
                (scholarshipType === '' || scholar.scholarshipType === scholarshipType) &&
                (yearLevels === '' || scholar.yearLevels === yearLevels) &&
                (course === '' || scholar.course === course) &&
                (search === '' || scholar.name.toLowerCase().includes(search.toLowerCase()))
            );
        });
        setFilteredScholars(filtered);
    };

    useEffect(() => {
        handleFilter();
    }, [formData, allScholars]);

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

            <div className="flex-1 p-10 bg-blue-600">
                <div className="flex-1 p-10 bg-white border-spacing-2">
                    <h2 className="text-3xl font-semibold mb-4">Scholar List</h2>
                    <p className="mb-6">Compile and maintain a comprehensive Scholar List</p>
                    <div className="flex space-x-4 mb-6">
                        <input
                            type="text"
                            placeholder="Search scholar"
                            className="p-2 border border-gray-300 rounded-md w-full"
                            value={formData.search}
                            onChange={e => setFormData({ ...formData, search: e.target.value })}
                        />
                        <select
                            className="p-2 border border-gray-300 rounded-md"
                            value={formData.scholarshipType}
                            onChange={e => setFormData({ ...formData, scholarshipType: e.target.value })}
                        >
                            <option value="">Select Scholarship Type</option>
                            {scholarshipType.length > 0 ? scholarshipType.map((scholarship, index) => (
                                <option key={index} value={scholarship.type_id}>
                                    {scholarship.type_name}
                                </option>
                            )) : (<option disabled>No Scholarship Type</option>)}
                        </select>

                        <select
                            className="p-2 border border-gray-300 rounded-md"
                            value={formData.yearLevels}
                            onChange={e => setFormData({ ...formData, yearLevels: e.target.value })}
                        >
                            <option value="">Select Year Level</option>
                            {yearLevel.length > 0 ? yearLevel.map((yearLevel, index) => (
                                <option key={index} value={yearLevel.year_level_id}>
                                    {yearLevel.year_level_name}
                                </option>
                            )) : (<option disabled>No Year Level</option>)}
                        </select>

                        <select
                            className="p-2 border border-gray-300 rounded-md"
                            value={formData.course}
                            onChange={e => setFormData({ ...formData, course: e.target.value })}
                        >
                            <option value="">Select Course</option>
                            {course.length > 0 ? course.map((course, index) => (
                                <option key={index} value={course.crs_id}>
                                    {course.crs_name}
                                </option>
                            )) : (<option disabled>No Course Available</option>)}
                        </select>
                    </div>

                    <table className="w-full border-collapse bg-white">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="p-4 border-b">Scholarship Type</th>
                                <th className="p-4 border-b">Name</th>
                                <th className="p-4 border-b">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredScholars.length > 0 ? (
                                filteredScholars.map((scholar, index) => (
                                    <tr key={index} className="hover:bg-gray-100">
                                        <td className="p-4 border-b">{scholar.scholarshipType}</td>
                                        <td className="p-4 border-b">{scholar.name}</td>
                                        <td className="p-4 border-b">{scholar.status}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="p-4 text-center">
                                        No scholars found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ScholarList;
