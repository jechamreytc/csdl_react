import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import secureLocalStorage from 'react-secure-storage';
import { FaTrash, FaEdit } from 'react-icons/fa';

const GetCourse = () => {
    const [courses, setCourses] = useState([]);  // Initialize courses as an empty array
    const [expandedCourse, setExpandedCourse] = useState(null);

    useEffect(() => {
        const getCourse = async () => {
            try {
                const url = secureLocalStorage.getItem("url") + "CSDL.php";
                const formData = new FormData();
                formData.append("operation", "getcourse");
                const res = await axios.post(url, formData);

                console.log(res.data);  // Log the response data to inspect its structure

                // Ensure res.data is an array before setting it to state
                if (Array.isArray(res.data)) {
                    setCourses(res.data);
                    toast.success("Course loaded successfully");
                } else {
                    console.log('Unexpected response format:', res.data);
                    toast.error("Unexpected data format");
                }
            } catch (error) {
                console.log('Failed to load Courses:', error);
                toast.error("Failed to load Courses");
            }
        };
        getCourse();
    }, []);

    const deleteCourse = async (crs_id) => {
        console.log("hahaha1T", crs_id);
        try {
            const url = secureLocalStorage.getItem("url") + "CSDL.php";
            const jsonData = {
                crs_id: crs_id
            };
            console.log("hahaha2T", jsonData);
            const formData = new FormData();
            formData.append("operation", "deleteCourse");
            formData.append("json", JSON.stringify(jsonData));
            const res = await axios.post(url, formData);
            if (res.data === 1) {
                setCourses((prevCourses) =>
                    prevCourses.filter(course => course.crs_id !== crs_id)
                );
                toast.success("Course deleted successfully");
            } else {
                toast.error(res.data.message || "Failed to delete Course");
            }
        } catch (error) {
            console.log('Failed to delete course:', error);
            toast.error("Failed to delete course");
        }
    };

    const handleCourseClick = (course) => {
        setExpandedCourse(expandedCourse === course ? null : course);
    };

    const handleDelete = (courseId) => {

        console.log("hahaha", courseId);
        if (window.confirm("Are you sure you want to delete this course?")) {
            deleteCourse(courseId);
        }
    };

    const handleUpdate = (courseId) => {
        toast.success(`Course ${courseId} updated successfully`);
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
                                className="flex items-center justify-between bg-blue-800 rounded-md py-3 px-5 text-white cursor-pointer hover:bg-blue-900 hover:scale-105 transition-transform duration-300"
                                onClick={() => handleCourseClick(course.crs_name)}
                            >
                                <span className="text-lg">{expandedCourse === course.crs_name ? '▼' : '▲ '}</span>
                                <span className="text-lg font-medium flex-1">{course.crs_name}</span>
                                {expandedCourse === course.crs_name && (
                                    <div className="flex space-x-2">
                                        <button
                                            className="text-red-500 hover:bg-red-600 hover:text-white p-1 rounded-md"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(course.crs_id);
                                            }}
                                        >
                                            <FaTrash />
                                        </button>
                                        <button
                                            className="text-yellow-500 hover:bg-yellow-600 hover:text-white p-1 rounded-md"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleUpdate(course.crs_id);
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
        </div>
    );
};

export default GetCourse;
