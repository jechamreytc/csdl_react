import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import secureLocalStorage from 'react-secure-storage';

const AddSupervisorMaster = () => {
    const [formData, setFormData] = useState({
        supM_employee_id: '',
        supM_name: '',
        supM_department_id: '',
        supM_email: '',
    });

    const [departments, setDepartments] = useState([]);
    const [supervisors, setSupervisors] = useState([]);
    const [loading, setLoading] = useState(false);

    // Define getSupervisors outside of useEffect so it can be reused
    const getSupervisors = async () => {
        try {
            const url = secureLocalStorage.getItem("url") + "CSDL.php";
            const formData = new FormData();
            formData.append("operation", "getSupervisorMaster");
            const res = await axios.post(url, formData);
            setSupervisors(res.data);
            toast.success("Supervisors loaded successfully");
        } catch (error) {
            console.log('Failed to load supervisors:', error);
            toast.error("Failed to load supervisors");
        }
    };

    useEffect(() => {
        getSupervisors();
    }, []);

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const url = secureLocalStorage.getItem('url') + 'CSDL.php';
                const formData = new FormData();
                formData.append('operation', 'getDepartment');
                const res = await axios.post(url, formData);
                setDepartments(res.data);
                toast.success('Departments loaded successfully');
            } catch (error) {
                console.log('Failed to load departments:', error);
                toast.error('Failed to load departments');
            }
        };

        fetchDepartments();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) return;

        // Trim form values to avoid accidental duplicates due to whitespace
        const trimmedFormData = {
            ...formData,
            supM_employee_id: formData.supM_employee_id.trim(),
            supM_name: formData.supM_name.trim(),
            supM_email: formData.supM_email.trim(),
        };

        // Check for duplicate supervisor based on employee ID and name
        const isDuplicate = supervisors.some(
            (supervisor) =>
                supervisor.supM_employee_id === trimmedFormData.supM_employee_id ||
                supervisor.supM_name.toLowerCase() === trimmedFormData.supM_name.toLowerCase()
        );

        if (isDuplicate) {
            toast.error("Supervisor already exists");
            return;
        }

        setLoading(true);

        try {
            const url = secureLocalStorage.getItem('url') + 'CSDL.php';
            const jsonData = {
                supM_employee_id: trimmedFormData.supM_employee_id,
                supM_name: trimmedFormData.supM_name,
                supM_department_id: trimmedFormData.supM_department_id,
                supM_email: trimmedFormData.supM_email,
            };

            const formDataToSend = new FormData();
            formDataToSend.append('json', JSON.stringify(jsonData));
            formDataToSend.append('operation', 'AddSupervisorMaster');

            const res = await axios.post(url, formDataToSend);
            if (res.data !== 0) {
                toast.success('Supervisor added successfully');
                setFormData({
                    supM_employee_id: '',
                    supM_name: '',
                    supM_department_id: '',
                    supM_email: '',
                });
                // Reload supervisors to ensure list is up to date
                await getSupervisors();
            } else {
                toast.error('Failed to add supervisor');
            }
        } catch (error) {
            toast.error('An error occurred while adding supervisor');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-10 rounded-lg max-w-5xl mx-auto shadow-xl mt-12">
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Employee ID */}
                    <div className="flex flex-col">
                        <label className="mb-2 text-gray-700 font-semibold">Employee ID</label>
                        <input
                            type="text"
                            name="supM_employee_id"
                            value={formData.supM_employee_id}
                            onChange={handleInputChange}
                            placeholder="Enter Employee ID"
                            required
                            className="p-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
                        />
                    </div>

                    {/* Name */}
                    <div className="flex flex-col">
                        <label className="mb-2 text-gray-700 font-semibold">Name</label>
                        <input
                            type="text"
                            name="supM_name"
                            value={formData.supM_name}
                            onChange={handleInputChange}
                            placeholder="Enter Full Name"
                            required
                            className="p-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
                        />
                    </div>

                    {/* Department */}
                    <div className="flex flex-col">
                        <label className="mb-2 text-gray-700 font-semibold">Department</label>
                        <select
                            name="supM_department_id"
                            value={formData.supM_department_id}
                            onChange={handleInputChange}
                            required
                            className="p-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
                        >
                            <option value="">Select Department</option>
                            {departments.map((dept, index) => (
                                <option key={index} value={dept.dept_id}>
                                    {dept.dept_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Email */}
                    <div className="flex flex-col">
                        <label className="mb-2 text-gray-700 font-semibold">Email</label>
                        <input
                            type="email"
                            name="supM_email"
                            value={formData.supM_email}
                            onChange={handleInputChange}
                            placeholder="Enter Email"
                            required
                            className="p-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full p-4 bg-indigo-600 text-white text-lg font-semibold rounded-lg hover:bg-indigo-700 transition duration-300 mt-6"
                    disabled={loading}
                >
                    {loading ? 'Adding...' : 'Add Supervisor'}
                </button>
            </form>
        </div>
    );
};

export default AddSupervisorMaster;
