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
                await getAdministrators();
                onClose();
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

    return (
        <div className="flex flex-col items-center bg-blue-100 p-6 rounded-lg max-w-md mx-auto shadow-md">
            <h2 className="mb-4 text-2xl text-blue-900">Add Administrator</h2>

            <input
                type="text"
                name="idNumber"
                placeholder="Enter ID Number"
                value={formData.idNumber}
                onChange={handleInputChange}
                className="p-2 text-lg w-full mb-2 border border-blue-900 rounded"
            />

            <input
                type="text"
                name="name"
                placeholder="Enter Name"
                value={formData.name}
                onChange={handleInputChange}
                className="p-2 text-lg w-full mb-2 border border-blue-900 rounded"
            />

            <input
                type="email"
                name="email"
                placeholder="Enter Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className="p-2 text-lg w-full mb-2 border border-blue-900 rounded"
            />

            <button
                onClick={signup}
                className="p-2 text-lg bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
                disabled={loading}
            >
                {loading ? "Adding..." : "Add Administrator"}
            </button>
        </div>
    );
};

export default AddAdministrator;