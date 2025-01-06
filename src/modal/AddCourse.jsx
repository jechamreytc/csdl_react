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
                console.log("API Response:", res.data); // Check this
                setDepartments(res.data.map(dept => ({
                    value: dept.dept_id,
                    label: dept.dept_name
                })));
                toast.success("Departments loaded successfully");
            } catch (error) {
                console.log('Failed to load departments:', error);
                toast.error("Failed to load departments");
            }
        };

        getDepartments();
    }, []);

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
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

        const courseExists = courses.find(
            (dept) => dept.course_name?.toLowerCase() === formData.course.toLowerCase()
        );

        if (courseExists) {
            toast.error("Course with the same name already exists.");
            return;
        }

        try {
            const url = secureLocalStorage.getItem("url") + "CSDL.php";
            const jsonData = {
                course_name: formData.course,
                course_dept_id: formData.department,
            };
            const formDataToSend = new FormData();
            formDataToSend.append("json", JSON.stringify(jsonData));
            formDataToSend.append("operation", "addCourse");
            const res = await axios.post(url, formDataToSend);

            if (res.data !== 0) {
                toast.success("Course added successfully");
                setFormData({
                    course: "",
                    department: ""
                });
            } else {
                toast.error("Failed to add Course");
            }
        } catch (error) {
            console.log(error);
            toast.error("An error occurred while adding the Course");
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
