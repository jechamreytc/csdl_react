import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import secureLocalStorage from 'react-secure-storage';
import { FaTrash, FaEdit } from 'react-icons/fa';

const GetCourse = () => {
    const [courses, setCourses] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [expandedCourse, setExpandedCourse] = useState(null);
    const [editCourse, setEditCourse] = useState(null);
    const [newCourseName, setNewCourseName] = useState('');
    const [newDepartment, setNewDepartment] = useState('');

    useEffect(() => {
        const getCourse = async () => {
            try {
                const url = secureLocalStorage.getItem("url") + "CSDL.php";
                const formData = new FormData();
                formData.append("operation", "getcourse");
                const res = await axios.post(url, formData);

                if (Array.isArray(res.data)) {
                    setCourses(res.data);
                    toast.success("Courses loaded successfully");
                } else {
                    toast.error("Unexpected data format");
                }
            } catch (error) {
                toast.error("Failed to load Courses");
            }
        };

        const getDepartments = async () => {
            try {
                const url = secureLocalStorage.getItem("url") + "CSDL.php";
                const formData = new FormData();
                formData.append("operation", "getDepartment");
                const res = await axios.post(url, formData);

                if (Array.isArray(res.data)) {
                    setDepartments(res.data);
                    toast.success("Departments loaded successfully");
                } else {
                    toast.error("Unexpected data format for departments");
                }
            } catch (error) {
                toast.error("Failed to load departments");
            }
        };

        getCourse();
        getDepartments();
    }, []);

    const deleteCourse = async (crs_id) => {
        try {
            const url = secureLocalStorage.getItem("url") + "CSDL.php";
            const formData = new FormData();
            formData.append("operation", "deleteCourse");
            formData.append("crs_id", crs_id);
            const res = await axios.post(url, formData);
            if (res.data === 1) {
                setCourses(prevCourses => prevCourses.filter(course => course.crs_id !== crs_id));
                toast.success("Course deleted successfully");
            } else {
                toast.error("Failed to delete Course");
            }
        } catch (error) {
            toast.error("Failed to delete course");
        }
    };

    const openEditModal = (course) => {
        setEditCourse(course);
        setNewCourseName(course.crs_name);
        setNewDepartment(course.department || '');
    };

    const handleUpdate = async () => {
        try {
            const url = secureLocalStorage.getItem("url") + "CSDL.php";
            const formData = new FormData();
            formData.append("operation", "updateCourse");
            formData.append("crs_id", editCourse.crs_id);
            formData.append("crs_name", newCourseName);
            formData.append("department", newDepartment);
            const res = await axios.post(url, formData);

            if (res.data === 1) {
                setCourses(prevCourses =>
                    prevCourses.map(course =>
                        course.crs_id === editCourse.crs_id
                            ? { ...course, crs_name: newCourseName, department: newDepartment }
                            : course
                    )
                );
                toast.success("Course updated successfully");
                setEditCourse(null);
            } else {
                toast.error("Failed to update Course");
            }
        } catch (error) {
            toast.error("Failed to update course");
        }
    };

    return (
        <div className="bg-blue-700 w-full max-w-md mx-auto rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
                <span className="text-white text-xl font-bold text-center flex-1">Course List</span>
            </div>
            <div className="flex flex-col space-y-4">
                {courses.length > 0 ? (
                    courses.map((course) => (
                        <div key={course.crs_id}>
                            <div
                                className="flex items-center justify-between bg-blue-800 rounded-md py-3 px-5 text-white cursor-pointer hover:bg-blue-900 transition-transform duration-300"
                                onClick={() => setExpandedCourse(expandedCourse === course ? null : course)}
                            >
                                <span className="text-lg font-medium flex-1">{course.crs_name}</span>
                                {expandedCourse === course && (
                                    <div className="flex space-x-2">
                                        <button
                                            className="text-red-500 hover:bg-red-600 hover:text-white p-1 rounded-md"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                deleteCourse(course.crs_id);
                                            }}
                                        >
                                            <FaTrash />
                                        </button>
                                        <button
                                            className="text-yellow-500 hover:bg-yellow-600 hover:text-white p-1 rounded-md"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                openEditModal(course);
                                            }}
                                        >
                                            <FaEdit />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-white text-center">No Data Found</p>
                )}
            </div>

            {editCourse && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
                        <h2 className="text-xl font-bold mb-4">Edit Course</h2>
                        <label className="block mb-2 text-gray-700">Course Name</label>
                        <input
                            type="text"
                            value={newCourseName}
                            onChange={(e) => setNewCourseName(e.target.value)}
                            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                        />
                        <label className="block mb-2 text-gray-700">Department</label>
                        <select
                            value={newDepartment}
                            onChange={(e) => setNewDepartment(e.target.value)}
                            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                        >
                            <option value="">Select Department</option>
                            {departments.map(dept => (
                                <option key={dept.dept_id} value={dept.dept_name}>{dept.dept_name}</option>
                            ))}
                        </select>
                        <div className="flex justify-end space-x-2">
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded-md"
                                onClick={() => setEditCourse(null)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded-md"
                                onClick={handleUpdate}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GetCourse;
