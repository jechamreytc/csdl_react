import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import secureLocalStorage from 'react-secure-storage';
import Select from 'react-select';

function AddCourse() {
    const [formData, setFormData] = useState({
        course: "",
        department: ""
    });
    const [departments, setDepartments] = useState([]);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const getDepartments = async () => {
            try {
                const url = secureLocalStorage.getItem("url") + "CSDL.php";
                const formData = new FormData();
                formData.append("operation", "getDepartment");
                const res = await axios.post(url, formData);

                setDepartments(res.data.map(dept => ({
                    value: dept.dept_id,
                    label: dept.dept_name
                })));
            } catch (error) {
                toast.error("Failed to load departments");
            }
        };

        getDepartments();
    }, []);

    useEffect(() => {
        const getCourses = async () => {
            try {
                const url = secureLocalStorage.getItem("url") + "CSDL.php";
                const formData = new FormData();
                formData.append("operation", "getcourse");
                const res = await axios.post(url, formData);

                if (Array.isArray(res.data)) {
                    setCourses(res.data);
                } else {
                    toast.error("Unexpected data format");
                }
            } catch (error) {
                toast.error("Failed to load courses");
            }
        };

        getCourses();
    }, []);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleDepartmentChange = (selectedOption) => {
        setFormData({
            ...formData,
            department: selectedOption ? selectedOption.value : ""
        });
    };

    const handleAdd = async (e) => {
        e.preventDefault();

        const trimmedCourse = formData.course.trim();
        if (!trimmedCourse) {
            toast.error("Course name is required.");
            return;
        }

        if (!formData.department) {
            toast.error("Please select a department.");
            return;
        }

        // **Check for duplicates (Case-insensitive)**
        const courseExists = courses.some(course =>
            course.course_name?.toLowerCase().trim() === trimmedCourse.toLowerCase()
        );

        if (courseExists) {
            toast.error("Course with the same name already exists.");
            return;
        }

        try {
            const url = secureLocalStorage.getItem("url") + "CSDL.php";
            const jsonData = {
                course_name: trimmedCourse,
                course_dept_id: formData.department
            };

            const formDataToSend = new FormData();
            formDataToSend.append("json", JSON.stringify(jsonData));
            formDataToSend.append("operation", "addCourse");

            const res = await axios.post(url, formDataToSend);

            if (res.data !== 0) {
                toast.success("Course added successfully");
                setCourses([...courses, { course_name: trimmedCourse, course_dept_id: formData.department }]);
                setFormData({ course: "", department: "" });
            } else {
                toast.error("Failed to add course");
            }
        } catch (error) {
            toast.error("An error occurred while adding the course");
        }
    };

    return (
        <div className="flex flex-col items-center bg-blue-100 p-6 rounded-lg max-w-md mx-auto shadow-md">
            <h2 className="mb-4 text-2xl text-blue-900">Add Course</h2>

            <input
                type="text"
                name="course"
                placeholder="Enter Course Name"
                value={formData.course}
                onChange={handleInputChange}
                className="p-2 text-lg w-full mb-2 border border-blue-900 rounded"
            />

            <Select
                options={departments}
                onChange={handleDepartmentChange}
                placeholder="Select Department"
                isClearable
                value={departments.find(dept => dept.value === formData.department) || null}
                className="w-full mb-2 text-lg"
            />

            <button
                onClick={handleAdd}
                className="p-2 text-lg bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
            >
                Add
            </button>
        </div>
    );
}

export default AddCourse;
