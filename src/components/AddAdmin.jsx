import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import secureLocalStorage from 'react-secure-storage';

const AddAdministrator = () => {

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        userId: "",
        password: "",
        confirmPassword: ""
    });


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };


    const signup = async () => {
        try {
            const url = secureLocalStorage.getItem("url") + "CSDL.php";

            const jsonData = {
                adm_first_name: formData.firstName,
                adm_last_name: formData.lastName,
                adm_email: formData.email,
                adm_password: formData.password
            };

            const formDataToSend = new FormData();
            formDataToSend.append("json", JSON.stringify(jsonData));
            formDataToSend.append("operation", "addadministrator");

            const res = await axios.post(url, formDataToSend);

            if (res.data !== 0) {
                toast.success("Administrator added successfully");
                console.log("Successfully added administrator");
            } else {
                toast.error("Failed to add administrator");
                console.log("Failed to add administrator");
            }
        } catch (error) {
            console.log(error);
            toast.error("An error occurred during signup");
        }
    };

    // Form submission handling
    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        // Call signup function after validation
        signup();
    };

    return (
        <div className="">

            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="flex space-x-4">
                    <div className="w-1/2">
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
                    <div className="w-1/2">
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

                <div className="flex space-x-4">
                    <div className="w-1/2">
                        <label className="block text-sm font-medium text-white">Password*</label>
                        <div className="relative">
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                placeholder="Enter Password"
                                required
                            />
                            <span className="absolute right-2 top-1/2 transform -translate-y-1/2">

                            </span>
                        </div>
                    </div>
                    <div className="w-1/2">
                        <label className="block text-sm font-medium text-white">Confirm Password*</label>
                        <div className="relative">
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                placeholder="Confirm Password"
                                required
                            />
                            <span className="absolute right-2 top-1/2 transform -translate-y-1/2">

                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between">
                    <button type="submit" className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600">
                        Add
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddAdministrator;
