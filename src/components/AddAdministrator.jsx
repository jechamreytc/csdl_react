import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import secureLocalStorage from 'react-secure-storage';

const AddAdministrator = () => {
    const [formData, setFormData] = useState({
        idNumber: "",
        name: "",
        email: "",
    });

    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        console.log(`Updated ${name}:`, value);
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
                adm_id: formData.idNumber,
                adm_name: formData.name,
                adm_email: formData.email,
            };

            const formDataToSend = new FormData();
            formDataToSend.append("json", JSON.stringify(jsonData));
            formDataToSend.append("operation", "addadministrator");

            const res = await axios.post(url, formDataToSend);

            if (res.data !== 0) {
                toast.success("Administrator added successfully");
                setFormData({ idNumber: "", name: "", email: "" });
            } else {
                toast.error("Failed to add administrator");
            }
        } catch (error) {
            console.error("Error during signup:", error);
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
        <div className="min-h-screen flex items-center justify-center bg-white py-10">
            <div className="bg-green-50 shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center text-green-700 mb-6">Add Administrator</h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-green-700">ID Number*</label>
                        <input
                            type="text"
                            name="idNumber"
                            value={formData.idNumber}
                            onChange={handleInputChange}
                            className="mt-1 p-2 block w-full rounded-md border-green-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                            placeholder="Enter ID Number"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-green-700">Name*</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="mt-1 p-2 block w-full rounded-md border-green-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                            placeholder="Enter Name"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-green-700">Email Address*</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="mt-1 p-2 block w-full rounded-md border-green-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                            placeholder="Enter Email Address"
                            required
                        />
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 transition duration-300"
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
