import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import secureLocalStorage from 'react-secure-storage';

const AddAdministrator = () => {
    const [formData, setFormData] = useState({
        employeeId: "",
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        contactNumber: "",
    });

    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const isValidEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const signup = async () => {
        try {
            setLoading(true);
            const url = secureLocalStorage.getItem("url") + "CSDL.php";

            const jsonData = {
                adm_employee_id: formData.employeeId,
                adm_first_name: formData.firstName,
                adm_middle_name: formData.middleName,
                adm_last_name: formData.lastName,
                adm_email: formData.email,
                adm_contact_number: formData.contactNumber,
            };

            const formDataToSend = new FormData();
            formDataToSend.append("json", JSON.stringify(jsonData));
            formDataToSend.append("operation", "addadministrator");

            const res = await axios.post(url, formDataToSend);

            if (res.data !== 0) {
                toast.success("Administrator added successfully");
                setFormData({
                    employeeId: "",
                    firstName: "",
                    middleName: "",
                    lastName: "",
                    email: "",
                    contactNumber: "",
                });
            } else {
                toast.error("Failed to add administrator");
            }
        } catch (error) {
            toast.error("An error occurred during signup");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!isValidEmail(formData.email)) {
            toast.error("Invalid email format");
            return;
        }

        signup();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Add Administrator</h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Employee ID*</label>
                        <input
                            type="text"
                            name="employeeId"
                            value={formData.employeeId}
                            onChange={handleInputChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="Enter Employee ID"
                            required
                        />
                    </div>

                    <div className="flex space-x-4">
                        <div className="w-1/2">
                            <label className="block text-sm font-medium text-gray-600">First Name*</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                placeholder="Enter First Name"
                                required
                            />
                        </div>
                        <div className="w-1/2">
                            <label className="block text-sm font-medium text-gray-600">Middle Name*</label>
                            <input
                                type="text"
                                name="middleName"
                                value={formData.middleName}
                                onChange={handleInputChange}
                                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                placeholder="Enter Middle Name"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600">Last Name*</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="Enter Last Name"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600">Email Address*</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="Enter Email Address"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600">Contact Number*</label>
                        <input
                            type="text"
                            name="contactNumber"
                            value={formData.contactNumber}
                            onChange={handleInputChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="Enter Contact Number"
                            required
                        />
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-indigo-500 text-white py-2 px-6 rounded-md hover:bg-indigo-600 transition duration-300"
                            disabled={loading}
                        >
                            {loading ? "Adding..." : "Add Administrator"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddAdministrator;
