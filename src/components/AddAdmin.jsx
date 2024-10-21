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
            setLoading(true); // Set loading to true
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
                console.log("Successfully added administrator");
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
                console.log("Failed to add administrator");
            }
        } catch (error) {
            console.log(error);
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
        <div className="">
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="w-full">
                    <label className="block text-sm font-medium text-white">Employee ID*</label>
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
                    <div className="w-full">
                        <label className="block text-sm font-medium text-white">First Name*</label>
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
                    <div className="w-full">
                        <label className="block text-sm font-medium text-white">Middle Name*</label>
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

                <div className="w-full">
                    <label className="block text-sm font-medium text-white">Last Name*</label>
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

                <div className="w-full">
                    <label className="block text-sm font-medium text-white">Email Address*</label>
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

                <div className="w-full">
                    <label className="block text-sm font-medium text-white">Contact Number*</label>
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
                <div className="flex justify-between">
                    <button type="submit" className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600">
                        Add Administrator
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddAdministrator;
