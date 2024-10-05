import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import secureLocalStorage from 'react-secure-storage';

const AddSupervisor = () => {
    const [formData, setFormData] = useState({
        supM_employee_id: '',
        supM_password: '',
        supM_first_name: '',
        supM_last_name: '',
    });

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
            };

            const formDataToSend = new FormData();
            formDataToSend.append('json', JSON.stringify(jsonData));
            formDataToSend.append('operation', 'addSupervisor');

            const res = await axios.post(url, formDataToSend);
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

                    <div className="w-1/2">
                        <label className="block text-sm font-medium text-white">Password*</label>
                        <input
                            type="password"
                            name="supM_password"
                            value={formData.supM_password}
                            onChange={handleInputChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="Password"
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
