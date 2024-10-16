import React, { useState } from 'react';
import { toast } from 'sonner';
import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';

function AddModality() {
    const [formData, setFormData] = useState({
        stypeScholar_name: "",
    });

    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleAdd = async () => {
        if (loading) return;

        const modalityName = formData.stypeScholar_name || "";
        if (modalityName.trim() === "") {
            toast.error("Modality name cannot be empty");
            return;
        }

        setLoading(true);
        try {
            const url = secureLocalStorage.getItem("url") + "CSDL.php";

            const jsonData = {
                stypeScholar_name: modalityName,
            };

            const formDataToSend = new FormData();
            formDataToSend.append("json", JSON.stringify(jsonData));
            formDataToSend.append("operation", "AddModality");

            const res = await axios.post(url, formDataToSend);

            if (res.data === 1) {
                toast.success("Modality added successfully");
                setFormData({ stypeScholar_name: "" });
            } else if (res.data === -1) {
                toast.error("Modality already exists");
            } else {
                toast.error("Failed to add modality");
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while adding the modality");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center bg-blue-100 p-6 rounded-lg max-w-md mx-auto shadow-lg">
            <h2 className="mb-5 text-2xl text-blue-900 font-semibold">Add Modality</h2>
            <input
                type="text"
                name="stypeScholar_name"
                placeholder="Enter modality name"
                value={formData.stypeScholar_name}
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
    );
}

export default AddModality;
