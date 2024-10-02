import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import secureLocalStorage from 'react-secure-storage';

const GetCourse = () => {
    const [formData, setFormData] = useState({
        course: "",
    });

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const getCourses = async () => {
            try {
                const url = secureLocalStorage.getItem("url") + "CSDL.php";
                const formData = new FormData();
                formData.append("operation", "getcourse");
                const res = await axios.post(url, formData);

                // Ensure response data is an array
                const courseData = Array.isArray(res.data) ? res.data : [];
                setCourses(courseData);

                toast.success("Courses loaded successfully");
                console.log('Courses:', courseData);
            } catch (error) {
                console.log('Failed to load courses:', error);
                toast.error("Failed to load courses");
            }
        };
        getCourses();
    }, []);

    const handleCourseClick = (course) => {
        setFormData({ ...formData, course });
    };

    return (
        <div className="bg-blue-700 w-full max-w-md mx-auto rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
                <span className="text-white text-xl font-bold text-center flex-1">Course List</span>
            </div>
            <div className="flex flex-col space-y-4">
                {courses.length > 0 ? (
                    courses.map((course) => (
                        <div
                            key={course.crs_id}
                            className="flex items-center justify-between bg-blue-800 rounded-md py-3 px-5 text-white cursor-pointer hover:bg-blue-900 hover:scale-105 transition-transform duration-300"
                            onClick={() => handleCourseClick(course.crs_name)}
                        >
                            <span className="text-lg">{'>'}</span>
                            <span className="text-lg font-medium">{course.crs_name}</span>
                        </div>
                    ))
                ) : (
                    <p className="text-white text-center">Loading courses...</p>
                )}
            </div>
        </div>
    );
};

export default GetCourse;
