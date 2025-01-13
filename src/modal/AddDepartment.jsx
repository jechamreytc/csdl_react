import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';

function AddDepartmentModal() {
    const [isModalOpen, setIsModalOpen] = useState(true); // Modal opens automatically
    const [formData, setFormData] = useState({
        department_name: "", // Use consistent naming
    });
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(false);

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleAdd = async () => {
        if (loading) return;

        const departmentName = formData.department_name || ""; // Use consistent property
        if (departmentName.trim() === "") {
            toast.error("Department name cannot be empty");
            console.log("Department name cannot be empty list");
            return;
        }

        const existingDepartment = departments.find(
            (department) => department.dept_name.toLowerCase() === departmentName.toLowerCase()
        );
        if (existingDepartment) {
            toast.error("Department already exists");
            return;
        }

        setLoading(true);
        try {
            const url = secureLocalStorage.getItem("url") + "CSDL.php";
            const jsonData = { dept_name: departmentName };
            const formDataToSend = new FormData();
            formDataToSend.append("json", JSON.stringify(jsonData));
            formDataToSend.append("operation", "addDepartment");

            const res = await axios.post(url, formDataToSend);

            if (res.data === 1) {
                toast.success("Department added successfully");
                setFormData({ department_name: "" }); // Reset form data
                setIsModalOpen(false);
            } else if (res.data === -1) {
                toast.error("Department already exists");
            } else {
                toast.error("Failed to add department");
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while adding the department");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
                        <div className="flex flex-col items-center bg-blue-100 p-6 rounded-lg">
                            <h2 className="mb-5 text-2xl text-blue-900 font-semibold">Add Department</h2>
                            <input
                                type="text"
                                name="department_name"
                                placeholder="Enter department name"
                                value={formData.department_name} // Use correct state property
                                onChange={handleInputChange}
                                className="p-2 text-lg w-full mb-4 border border-blue-900 rounded-md"
                            />
                            <button
                                onClick={handleAdd}
                                className={`px-4 py-2 text-lg text-white rounded-md transition-colors duration-300 ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                                    }`}
                                disabled={loading}
                            >
                                {loading ? 'Adding...' : 'Add'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AddDepartmentModal;
