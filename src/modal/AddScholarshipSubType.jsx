import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';

function AddScholarshipSubType() {
    const [formData, setFormData] = useState({
        sub_type_name: "",
        dutyHours: "",
        HKType: "",
    });

    const [dutyHour, setDutyHour] = useState([]);
    const [HKTypes, setHKTypeS] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = secureLocalStorage.getItem("url") + "CSDL.php";
                const formData = new FormData();
                formData.append("operation", "getsublist");
                const res = await axios.post(url, formData);
                console.log("res ni gettin", res);
                if (res.data) {
                    setDutyHour(res.data.getDutyHours); // Ensure dutyHours is an array
                    setHKTypeS(res.data.scholarshipType); // Ensure HKType is an array
                }
            } catch (error) {
                console.error("Failed to load form data");
            }
        };
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleAdd = async () => {
        try {
            const url = secureLocalStorage.getItem("url") + "CSDL.php";

            const jsonData = {
                sub_type_name: formData.sub_type_name,
                dutyH_hours: formData.dutyHours,
                type_name: formData.HKType,
            };

            const formDataToSend = new FormData();
            formDataToSend.append("json", JSON.stringify(jsonData));
            formDataToSend.append("operation", "addSchoolar_sub_type");

            const res = await axios.post(url, formDataToSend);
            console.log("Res submithaha ", res.data);
            if (res.data !== 0) {
                toast.success("Scholarship sub type added successfully");
                console.log("res ni handle add", res.data);
            } else {
                toast.error("Failed to add scholarship sub type");
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while adding the scholarship sub type");
        }
    };

    return (
        <div className="flex flex-col items-center bg-blue-100 p-6 rounded-lg shadow-lg max-w-md mx-auto">
            <h2 className="mb-6 text-xl font-bold text-blue-900">Add Scholarship Sub Type</h2>

            <input
                type="text"
                name="sub_type_name"
                placeholder="Enter scholarship sub type"
                value={formData.sub_type_name}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border border-blue-700 rounded-lg"
            />

            <select
                name="dutyHours"
                value={formData.dutyHours}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border border-blue-700 rounded-lg"
            >
                <option value="">Select Duty Hours</option>
                {dutyHour?.length > 0 ? (
                    dutyHour.map((dutyHour, index) => (
                        <option key={index} value={dutyHour.dutyH_id}>
                            {dutyHour.dutyH_hours}
                        </option>
                    ))
                ) : (
                    <option disabled>No Duty hours found</option>
                )}
            </select>

            <select
                name="HKType"
                value={formData.HKType}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border border-blue-700 rounded-lg"
            >
                <option value="">Select HK Type</option>
                {HKTypes?.length > 0 ? (
                    HKTypes.map((HKType, index) => (
                        <option key={index} value={HKType.type_id}>
                            {HKType.type_name}
                        </option>
                    ))
                ) : (
                    <option disabled>No HK Types found</option>
                )}
            </select>

            <button
                onClick={handleAdd}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
            >
                Add
            </button>

            <ToastContainer />
        </div>
    );
}

export default AddScholarshipSubType;   
