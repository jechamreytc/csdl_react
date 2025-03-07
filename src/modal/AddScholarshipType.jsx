import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";

function AddScholarshipType() {
    const [formData, setFormData] = useState({
        scholarship_type: "",
        percent: ""
    });

    const [scholarshipTypes, setScholarshipTypes] = useState([]);
    const [percent, setPercent] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getPercent = async () => {
            try {
                const url = secureLocalStorage.getItem("url") + "CSDL.php";
                const formData = new FormData();
                formData.append("operation", "getPercentStype");

                const res = await axios.post(url, formData);
                setPercent(res.data);
            } catch (error) {
                console.error("Failed to load percent options:", error);
                toast.error("Failed to load percent options");
            }
        };

        getPercent();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        if (loading) return;

        const trimmedType = formData.scholarship_type.trim();
        const selectedPercent = parseInt(formData.percent, 10);

        // Validation: Ensure fields are filled
        if (!trimmedType || isNaN(selectedPercent)) {
            toast.error("All fields are required");
            return;
        }

        // Validation: Check if the scholarship type already exists
        const isDuplicate = scholarshipTypes.some(
            (stype) => stype.type_name.toLowerCase() === trimmedType.toLowerCase()
        );

        if (isDuplicate) {
            toast.error("Scholarship type already exists");
            return;
        }

        setLoading(true);
        try {
            const url = secureLocalStorage.getItem("url") + "CSDL.php";
            const jsonData = {
                type_name: trimmedType,
                type_percent_id: selectedPercent
            };

            const formDataToSend = new FormData();
            formDataToSend.append("json", JSON.stringify(jsonData));
            formDataToSend.append("operation", "addScholarshipType");

            const res = await axios.post(url, formDataToSend);

            if (res.data !== 0) {
                toast.success("Scholarship Type added successfully");
                setFormData({ scholarship_type: "", percent: "" });
                setScholarshipTypes([...scholarshipTypes, jsonData]);
            } else {
                toast.error("Failed to add Scholarship Type");
            }
        } catch (error) {
            console.error("Error adding Scholarship Type:", error);
            toast.error("An error occurred while adding the Scholarship Type");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center bg-blue-100 p-6 rounded-lg max-w-md mx-auto shadow-lg">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">Add Scholarship Type</h2>
            <input
                type="text"
                name="scholarship_type"
                placeholder="Enter Scholarship Type"
                value={formData.scholarship_type}
                onChange={handleInputChange}
                className="p-3 text-lg w-full mb-4 border border-blue-700 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
            <select
                name="percent"
                value={formData.percent}
                onChange={handleInputChange}
                className="p-2 text-lg w-full mb-4 border border-blue-900 rounded"
            >
                <option value="">Select Percent</option>
                {percent.length > 0 ? (
                    percent.map((p, index) => (
                        <option key={index} value={p.percent_id}>
                            {p.percent_name}
                        </option>
                    ))
                ) : (
                    <option disabled>No percent options available</option>
                )}
            </select>
            <button
                onClick={handleAdd}
                className={`px-5 py-3 text-lg text-white rounded-md transition-colors duration-300 ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
                disabled={loading}
            >
                {loading ? "Adding..." : "Add"}
            </button>
        </div>
    );
}

export default AddScholarshipType;
