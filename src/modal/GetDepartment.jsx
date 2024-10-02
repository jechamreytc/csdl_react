import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import secureLocalStorage from 'react-secure-storage';

const GetDepartment = () => {
    const [formData, setFormData] = useState({
        department: "",
    });

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
                console.log('Departments:', res.data);
            } catch (error) {
                console.log('Failed to load departments:', error);
                toast.error("Failed to load departments");
            }
        };
        getDepartments();
    }, []);

    const handleDepartmentClick = (department) => {
        setFormData({ ...formData, department });
    };

    return (
        <div className="bg-blue-700 w-full max-w-md mx-auto rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">

                <span className="text-white text-xl font-bold text-center flex-1">Department List</span>
            </div>
            <div className="flex flex-col space-y-4">
                {departments.length > 0 ? (
                    departments.map((department) => (
                        <div
                            key={department.dept_id}
                            className="flex items-center justify-between bg-blue-800 rounded-md py-3 px-5 text-white cursor-pointer hover:bg-blue-900 hover:scale-105 transition-transform duration-300"
                            onClick={() => handleDepartmentClick(department.dept_name)}
                        >
                            <span className="text-lg">{'>'}</span>
                            <span className="text-lg font-medium">{department.dept_name}</span>
                        </div>
                    ))
                ) : (
                    <p className="text-white text-center">Loading departments...</p>
                )}
            </div>
        </div>
    );
};

export default GetDepartment;
