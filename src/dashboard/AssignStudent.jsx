import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Sun, Moon, CircleUser, FolderClosed, LogOutIcon, PanelsRightBottom, QrCodeIcon, User, List, Mail, Calendar, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import Dashboard from './MainDashboard';
import Select from 'react-select';
import Navigator from "./navigator";

function AssignStudent() {
    const [formData, setFormData] = useState({
        student: '',
        mode: 'Office',  // Hardcoded value for Mode
        department: '',
        subject: '',
        session: '',
        hours: '180 hours', // Fixed to 180 hours
        supervisor: '',
    });

    const [students, setStudents] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [supervisor, setSupervisor] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [session, setSession] = useState('');
    const [offTId, setOffTId] = useState(null);  // Add state for offT_id
    const navigateTo = useNavigate();

    const fetchData = async () => {
        try {
            const url = secureLocalStorage.getItem('url') + 'CSDL.php';
            const formData = new FormData();
            formData.append('operation', 'getAssignScholar');
            const res = await axios.post(url, formData);
            console.log('Fetched data:', res.data); // Log the fetched data
            setStudents(res.data.getScholarSession || []);
            setSubjects(res.data.getSubject || []);
            setSupervisor(res.data.getSupervisorMaster || []);
            setDepartments(res.data.getDepartmentMaster || []);
            toast.success('Form data loaded successfully');

            console.log(students);
        } catch (error) {
            toast.error('Failed to load form data');
            console.error('Error fetching data:', error); // Log error if fetching fails
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleStudentChange = (selectedOption) => {
        console.log('Selected student:', selectedOption); // Log student change
        setFormData((prevFormData) => ({
            ...prevFormData,
            student: selectedOption ? selectedOption.value : '',
        }));

        const student = students.find((stud) => stud.stud_active_id === selectedOption?.value);
        setSelectedStudent(student || null);  // This should store the full student object
        setSession(student ? student.session_name : ''); // Update session if a student is selected
    };

    const handleDepartmentChange = async (selectedOption) => {
        console.log('Selected department:', selectedOption); // Log selected department

        setFormData((prevFormData) => ({
            ...prevFormData,
            department: selectedOption ? selectedOption.value : '',
        }));

        const selectedDept = departments.find(
            (dep) => dep.dept_name === selectedOption?.value
        );

        if (selectedDept) {
            console.log('offT_dept_id:', selectedDept.offT_dept_id); // Display the offT_dept_id
            alert(`Selected offT_dept_id: ${selectedDept.offT_dept_id}`);
        }

        setSelectedDepartment(selectedDept || null);
    };


    const handleSave = async () => {
        // Directly using the displayed values
        const jsonData = {
            assign_stud_id: formData.student,
            offT_dept_id: selectedDepartment?.offT_dept_id || '',  // Include offT_id in the data
            assignment_name: formData.mode,
            // offT_dept_id: formData.department,
            // off_subject_id: formData.subject,
            session_name: selectedStudent?.session_name || '',
            dutyH_name: formData.hours, // Fixed 180 hours value
            // offT_supM_id: selectedDepartment?.sup_supM_id || '', // Displayed supervisor value
        };

        console.log('Form data before save:', jsonData); // Log form data before saving

        try {
            const url = secureLocalStorage.getItem('url') + 'CSDL.php';
            toast.success("Assignment saved successfully!");
            const data = new FormData();
            data.append('json', JSON.stringify(jsonData)); // Add JSON data
            data.append('operation', 'AddOfficeStudent');
            const res = await axios.post(url, data);
            console.log('Save response:', res.data); // Log the response from the save operation
            if (res.data !== 0) {
                toast.success('Scholar added successfully');
            } else {
                toast.error('Failed to add scholar');
            }
        } catch (error) {
            toast.error('An error occurred while adding scholar');
            console.error('Error saving assignment:', error); // Log error during save
        }
    };

    const studentOptions = students.map((stud) => ({
        value: stud.stud_active_id,
        label: `${stud.stud_active_id} - ${stud.stud_name}`,
    }));

    const departmentOptions = departments.map((dept) => ({
        value: dept.dept_name,
        label: dept.dept_name,
    }));

    const handleLogOut = () => {
        navigateTo("/");
    };

    return (
        <div className="flex h-screen bg-white">
            {/* Sidebar */}
            {/* <aside className="w-64 bg-green-700 text-white p-6">
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
            </aside> */}
            <Navigator />

            {/* Main Content */}
            <main className="flex-1 bg-white text-gray-900 p-8">
                <h1 className="text-3xl font-bold text-center mb-8">Assign Duty to Students</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Mode (Hardcoded to "Office") */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Mode</label>
                        <p className="w-full bg-gray-100 py-3 pl-4 rounded-lg">{formData.mode}</p>
                    </div>

                    {/* Department Combobox */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Department</label>
                        <Select
                            options={departmentOptions}
                            value={departmentOptions.find((option) => option.value === formData.department)}
                            onChange={handleDepartmentChange}
                            placeholder="Select Department"
                            className="text-black"
                        />
                        {selectedDepartment && (
                            <div className="mt-4">
                                <h2 className="text-gray-700 font-medium">Day:</h2>
                                <p className="w-full bg-gray-100 py-3 pl-4 rounded-lg">{selectedDepartment.day_name || 'N/A'}</p>

                                <h2 className="text-gray-700 font-medium mt-4">Time:</h2>
                                <p className="w-full bg-gray-100 py-3 pl-4 rounded-lg">{selectedDepartment.offT_time || 'N/A'}</p>

                                <h2 className="text-gray-700 font-medium mt-4">Supervisor:</h2>
                                <p className="w-full bg-gray-100 py-3 pl-4 rounded-lg">{selectedDepartment.supM_name || 'N/A'}</p>
                            </div>
                        )}
                    </div>

                    {/* Student Combobox */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Student</label>
                        <Select
                            options={studentOptions}
                            value={studentOptions.find((option) => option.value === formData.student)}
                            onChange={handleStudentChange}
                            placeholder="Select Student"
                            className="text-black"
                        />
                    </div>
                </div>

                {/* Displaying Academic Session */}
                {selectedStudent && (
                    <div className="mt-4">
                        <h2 className="text-gray-700 font-medium">Academic Session:</h2>
                        <p className="w-full bg-gray-100 py-3 pl-4 rounded-lg">{session}</p>
                    </div>
                )}

                {/* Displaying Hours */}
                <div className="mt-4">
                    <h2 className="text-gray-700 font-medium">Assigned Hours:</h2>
                    <p className="w-full bg-gray-100 py-3 pl-4 rounded-lg">{formData.hours}</p>
                </div>

                <button
                    type="button"
                    onClick={handleSave}
                    className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition"
                >
                    Save Assignment
                </button>
            </main>
        </div>

    );
}

export default AssignStudent;
