import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import secureLocalStorage from 'react-secure-storage';

const AddAdministrator = ({ onClose = () => { } }) => {
    const [formData, setFormData] = useState({
        idNumber: "",
        name: "",
        email: "",
    });

    const [loading, setLoading] = useState(false);
    const [administrators, setAdministrators] = useState([]);

    useEffect(() => {
        getAdministrators();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value.trim(),
        });
    };

    const getAdministrators = async () => {
        try {
            const url = secureLocalStorage.getItem("url") + "CSDL.php";
            const formData = new FormData();
            formData.append("operation", "getAdmin");

            const res = await axios.post(url, formData);
            setAdministrators(res.data);
        } catch (error) {
            console.error('Failed to load administrators:', error);
            toast.error("Failed to load administrators");
        }
    };

    const signup = async (e) => {
        e.preventDefault();
        if (loading) return;

        const trimmedFormData = {
            idNumber: formData.idNumber.trim(),
            name: formData.name.trim(),
            email: formData.email.trim(),
        };

        if (!trimmedFormData.idNumber || !trimmedFormData.name || !trimmedFormData.email) {
            toast.error("All fields are required");
            return;
        }

        const isDuplicate = administrators.some(
            (admin) =>
                admin.adm_id === trimmedFormData.idNumber ||
                admin.adm_name.toLowerCase() === trimmedFormData.name.toLowerCase()
        );

        if (isDuplicate) {
            toast.error("Administrator already exists");
            return;
        }

        setLoading(true);
        try {
            const url = secureLocalStorage.getItem("url") + "CSDL.php";
            const jsonData = {
                adm_id: trimmedFormData.idNumber,
                adm_name: trimmedFormData.name,
                adm_email: trimmedFormData.email,
            };

            const formDataToSend = new FormData();
            formDataToSend.append("json", JSON.stringify(jsonData));
            formDataToSend.append("operation", "addadministrator");

            const res = await axios.post(url, formDataToSend);

            if (res.data !== 0) {
                toast.success("Administrator added successfully");
                setFormData({ idNumber: "", name: "", email: "" });
                getAdministrators();
                onClose(); // Close modal after successful submission
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

    const handleClose = () => {
        console.log("Closing modal...");
        if (typeof onClose === "function") {
            onClose(); // Ensure onClose is a function before calling it
        }
    };

    const handleBackgroundClick = (e) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4"
            onClick={handleBackgroundClick}
        >
            <div
                className="bg-white shadow-xl rounded-lg p-6 w-full max-w-lg relative"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    type="button"
                    onClick={handleClose}
                    className="absolute top-2 right-2 bg-gray-200 rounded-full text-gray-600 p-2 hover:bg-gray-300 transition-colors"
                >
                    X
                </button>

                <h2 className="text-2xl font-semibold text-center text-green-700 mb-4">Add Administrator</h2>

                <form className="space-y-4" onSubmit={signup}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">ID Number*</label>
                        <input
                            type="text"
                            name="idNumber"
                            value={formData.idNumber}
                            onChange={handleInputChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                            placeholder="Enter ID Number"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name*</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                            placeholder="Enter Name"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email Address*</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                            placeholder="Enter Email Address"
                            required
                        />
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition duration-300"
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
