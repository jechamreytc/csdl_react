import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import secureLocalStorage from 'react-secure-storage';
import { FaTrash, FaEdit } from 'react-icons/fa';

const GetDepartment = () => {
    const [departments, setDepartments] = useState([]);
    const [expandedDepartment, setExpandedDepartment] = useState(null);

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
            const jsonData = {
                dept_id: dept_id
            }
            const formData = new FormData();
            formData.append("operation", "deleteDepartment");
            formData.append("json", JSON.stringify(jsonData));
            const res = await axios.post(url, formData);
            if (res.data === 1) {
                setDepartments((prevDepartments) =>
                    prevDepartments.filter(department => department.dept_id !== dept_id)
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
    const updateDepartment = async (dept_id) => {
        try {
            const url = secureLocalStorage.getItem("url") + "CSDL.php";
            const jsonData = {
                dept_id: dept_id
            }
            const formData = new FormData();
            formData.append("operation", "updateDepartment");
            formData.append("json", JSON.stringify(jsonData));
            const res = await axios.post(url, formData);
            if (res.data === 1) {
                setDepartments((prevDepartments) =>
                    prevDepartments.filter(department => department.dept_id !== dept_id)
                );
                toast.success("Department updated successfully");
            } else {
                toast.error(res.data.message || "Failed to update department");
            }
        } catch (error) {
            console.log('Failed to update department:', error);
            toast.error("Failed to update department");
        }
    };

    const handleDepartmentClick = (department) => {
        setExpandedDepartment(expandedDepartment === department ? null : department);
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
        <div className="bg-blue-700 w-full max-w-md mx-auto rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
                <span className="text-white text-xl font-bold text-center flex-1">Department List</span>
            </div>
            <div className="flex flex-col space-y-4">
                {departments.length > 0 ? (
                    departments.map((department) => (
                        <div key={department.dept_id}>
                            <div
                                className="flex items-center justify-between bg-blue-800 rounded-md py-3 px-5 text-white cursor-pointer hover:bg-blue-900 hover:scale-105 transition-transform duration-300"
                                onClick={() => handleDepartmentClick(department.dept_name)}
                            >
                                <span className="text-lg">{expandedDepartment === department.dept_name ? '▼' : '▲ '}</span>
                                <span className="text-lg font-medium flex-1">{department.dept_name}</span>
                                {expandedDepartment === department.dept_name && (
                                    <div className="flex space-x-2">
                                        <button
                                            className="text-red-500 hover:bg-red-600 hover:text-white p-1 rounded-md"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(department.dept_id);
                                            }}
                                        >
                                            <FaTrash />
                                        </button>
                                        <button
                                            className="text-yellow-500 hover:bg-yellow-600 hover:text-white p-1 rounded-md"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleUpdate(department.dept_id);
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

export default GetDepartment;
