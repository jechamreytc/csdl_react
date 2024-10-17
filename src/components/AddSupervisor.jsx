import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import secureLocalStorage from 'react-secure-storage';

const AddSupervisor = () => {
    const [formData, setFormData] = useState({
        supM_employee_id: '',
        supM_password: '',
        supM_first_name: '',
        supM_last_name: '',
        supM_middle_name: '',
        supM_department_id: '',
        supM_email: '',
        supM_contact_number: '',
    });

    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const url = secureLocalStorage.getItem('url') + 'CSDL.php';
                const formData = new FormData();
                formData.append('operation', 'getDepartment');
                const res = await axios.post(url, formData);

                if (res.data && res.data.departments) {
                    setDepartments(res.data.departments);
                    toast.success('Departments loaded successfully');
                } else {
                    toast.error('No departments data found');
                }
            } catch (error) {
                toast.error('Failed to load departments');
            }
        };

        fetchDepartments();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = secureLocalStorage.getItem('url') + 'CSDL.php';

            const jsonData = {
                supM_employee_id: formData.supM_employee_id,
                supM_password: formData.supM_password,
                supM_first_name: formData.supM_first_name,
                supM_last_name: formData.supM_last_name,
                supM_middle_name: formData.supM_middle_name,
                supM_department_id: formData.supM_department_id,
                supM_email: formData.supM_email,
                supM_contact_number: formData.supM_contact_number,
            };
            console.log("HELLO JSON DATA", jsonData);

            const formDataToSend = new FormData();
            formDataToSend.append('json', JSON.stringify(jsonData));
            formDataToSend.append('operation', 'AddSupervisorMaster');

            const res = await axios.post(url, formDataToSend);
            console.log("HELLO RES DATA", res);
            if (res.data !== 0) {
                toast.success('Supervisor added successfully');
            } else {
                toast.error('Failed to add supervisor');
            }
        } catch (error) {
            toast.error('An error occurred while adding supervisor');
        }
    };

    return (
        <div className="flex">
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="flex space-x-4">
                    <div className="w-1/2">
                        <label className="block text-sm font-medium text-white">Employee ID*</label>
                        <input
                            type="text"
                            name="supM_employee_id"
                            value={formData.supM_employee_id}
                            onChange={handleInputChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="Employee ID"
                            required
                        />
                    </div>

                </div>

                <div className="flex space-x-4">
                    <div className="w-1/2">
                        <label className="block text-sm font-medium text-white">First Name*</label>
                        <input
                            type="text"
                            name="supM_first_name"
                            value={formData.supM_first_name}
                            onChange={handleInputChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="First Name"
                            required
                        />
                    </div>

                    <div className="w-1/2">
                        <label className="block text-sm font-medium text-white">Last Name*</label>
                        <input
                            type="text"
                            name="supM_last_name"
                            value={formData.supM_last_name}
                            onChange={handleInputChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="Last Name"
                            required
                        />
                    </div>
                </div>

                <div className="flex space-x-4">
                    <div className="w-1/2">
                        <label className="block text-sm font-medium text-white">Middle Name</label>
                        <input
                            type="text"
                            name="supM_middle_name"
                            value={formData.supM_middle_name}
                            onChange={handleInputChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="Middle Name"
                        />
                    </div>

                    <div className="w-1/2">
                        <label className="block text-sm font-medium text-white">Department*</label>
                        <select
                            name="supM_department_id"
                            value={formData.supM_department_id}
                            onChange={handleInputChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        >
                            <option value="">Select Department</option>
                            {departments.length > 0 && departments.map((dept, index) => (
                                <option key={index} value={dept.dept_id}>
                                    {dept.dept_name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex space-x-4">
                    <div className="w-1/2">
                        <label className="block text-sm font-medium text-white">Email*</label>
                        <input
                            type="email"
                            name="supM_email"
                            value={formData.supM_email}
                            onChange={handleInputChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="Email"
                            required
                        />
                    </div>

                    <div className="w-1/2">
                        <label className="block text-sm font-medium text-white">Contact Number*</label>
                        <input
                            type="text"
                            name="supM_contact_number"
                            value={formData.supM_contact_number}
                            onChange={handleInputChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="Contact Number"
                            required
                        />
                    </div>
                </div>

                <div className="flex justify-between">
                    <button
                        type="submit"
                        className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600"
                    >
                        Add Supervisor
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddSupervisor;
