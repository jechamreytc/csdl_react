import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import secureLocalStorage from 'react-secure-storage';

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
                setDepartments(res.data);
                toast.success("Departments loaded successfully");

                console.log('Departments:', res.data);
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleAdd = async (e) => {
        e.preventDefault();

        // Validation: Check if the course already exists
        const courseExists = courses.find(
            (dept) => dept.crs_name?.toLowerCase() === formData.course.toLowerCase()
        );

        if (courseExists) {
            toast.error("Course with the same name already exists.");
            return; // Prevent form submission if course exists
        }

        try {
            const url = secureLocalStorage.getItem("url") + "CSDL.php";

            const jsonData = {
                crs_name: formData.course,
                crs_dept_id: formData.department,
            };

            const formDataToSend = new FormData();
            formDataToSend.append("json", JSON.stringify(jsonData));
            formDataToSend.append("operation", "addCourse");

            const res = await axios.post(url, formDataToSend);

            if (res.data !== 0) {
                toast.success("Course added successfully");
                // Reset form fields after adding the course
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

            <select
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="p-2 text-lg w-full mb-2 border border-blue-900 rounded"
            >
                <option value="">Select Department</option>
                {departments.length > 0 ? departments.map((dept, index) => (
                    <option key={index} value={dept.dept_id}>
                        {dept.dept_name}
                    </option>
                )) : (<option disabled>No department yet</option>)}
            </select>

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
