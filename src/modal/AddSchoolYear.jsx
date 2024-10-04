import React, { useState } from 'react';
import { toast } from 'sonner';
import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';

function AddScholarYear() {
    const [formData, setFormData] = useState({
        year_name: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleAdd = async () => {
        // Basic validation
        if (!formData.year_name.trim()) {
            toast.error("Please enter a school year");
            return;
        }

        try {
            const url = secureLocalStorage.getItem("url") + "CSDL.php";
            const jsonData = {
                sy_name: formData.year_name,
            };

            const formDataToSend = new FormData();
            formDataToSend.append("json", JSON.stringify(jsonData));
            formDataToSend.append("operation", "addSchoolyear");

            const res = await axios.post(url, formDataToSend);

            if (res.data !== 0) {
                toast.success("School Year added successfully");
                setFormData({ year_name: "" }); // Clear the input field after successful addition
            } else {
                toast.error("Failed to add School Year");
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while adding the School Year");
        }
    };

    return (
        <div className="flex flex-col items-center bg-blue-100 p-6 rounded-lg shadow-md max-w-sm mx-auto">
            <h2 className="text-blue-800 text-2xl font-semibold mb-4">Add School Year</h2>
            <input
                type="text"
                name="year_name"
                placeholder="Enter School Year"
                value={formData.year_name}
                onChange={handleInputChange}
                className="w-full p-2 border border-blue-800 rounded-md mb-4 focus:outline-none focus:ring focus:ring-blue-300"
            />
            <button
                onClick={handleAdd}
                className="w-full py-2 text-white bg-blue-600 rounded-md transition-colors duration-300 hover:bg-blue-700"
            >
                Add
            </button>
        </div>
    );
}

export default AddScholarYear;
