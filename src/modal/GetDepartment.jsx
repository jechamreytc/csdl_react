import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import secureLocalStorage from 'react-secure-storage';
import { FaTrash, FaEdit } from 'react-icons/fa';

const GetDepartment = () => {
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        const getDepartments = async () => {
            try {
                const url = secureLocalStorage.getItem("url") + "CSDL.php";
                const formData = new FormData();
                formData.append("operation", "getDepartment");
                const res = await axios.post(url, formData);
                setDepartments(res.data);
                toast.success("Departments loaded successfully");
            } catch (error) {
                console.log('Failed to load departments:', error);
                toast.error("Failed to load departments");
            }
        };
        getDepartments();
    }, []);

    const deleteDepartment = async (dept_id) => {
        try {
            const url = secureLocalStorage.getItem("url") + "CSDL.php";
            const jsonData = { dept_id };
            const formData = new FormData();
            formData.append("operation", "deleteDepartment");
            formData.append("json", JSON.stringify(jsonData));
            const res = await axios.post(url, formData);
            if (res.data === -1) {
                toast.error("Failed to delete, there's a transaction using this department");
            } else if (res.data === 1) {
                setDepartments(
                    departments.filter((department) => department.dept_id !== dept_id)
                );
                toast.success("Department deleted successfully");
            } else {
                toast.error(res.data.message || "Failed to delete department");
            }
        } catch (error) {
            console.log('Failed to delete department:', error);
            toast.error("Failed to delete department");
        }
    };

    const handleDelete = (departmentId) => {
        if (window.confirm("Are you sure you want to delete this department?")) {
            deleteDepartment(departmentId);
        }
    };

    const handleUpdate = (departmentId) => {
        toast.success(`Department ${departmentId} updated successfully`);
    };

    return (
        <div className="bg-blue-900 w-full max-w-md mx-auto rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
                <span className="text-white text-xl font-bold text-center flex-1">Department List</span>
            </div>
            <div className="flex flex-col space-y-5"> {/* Increased space between items */}
                {departments.length > 0 ? (
                    departments.map((department) => (
                        <div
                            key={department.dept_id}
                            className="flex items-center justify-between bg-blue-800 rounded-lg py-4 px-6 text-white hover:bg-blue-700 transition-colors duration-300 shadow-md"
                        >
                            <span className="text-lg font-medium">{department.dept_name}</span>
                            <div className="flex space-x-3"> {/* Spacing between buttons */}
                                <button
                                    className="text-green-500 hover:bg-green-600 hover:text-white p-2 rounded-full transition-transform transform hover:scale-105"
                                    onClick={() => handleUpdate(department.dept_id)}
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    className="text-red-500 hover:bg-red-600 hover:text-white p-2 rounded-full transition-transform transform hover:scale-105"
                                    onClick={() => handleDelete(department.dept_id)}
                                >
                                    <FaTrash />
                                </button>
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

export default GetDepartment;
