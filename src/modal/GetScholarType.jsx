import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import secureLocalStorage from 'react-secure-storage';
import { FaTrash, FaEdit } from 'react-icons/fa';

const GetScholarshipType = () => {
    const [scholarshipTypes, setScholarshipTypes] = useState([]);
    const [expandedScholarshipType, setExpandedScholarshipType] = useState(null);

    useEffect(() => {
        const getScholarshipTypes = async () => {
            try {
                const url = secureLocalStorage.getItem("url") + "CSDL.php";
                const formData = new FormData();
                formData.append("operation", "getscholarship_type");
                const res = await axios.post(url, formData);
                setScholarshipTypes(res.data);
                toast.success("Scholarship types loaded successfully");
            } catch (error) {
                console.log('Failed to load scholarship types:', error);
                toast.error("Failed to load scholarship types");
            }
        };
        getScholarshipTypes();
    }, []);

    const deleteScholarType = async (type_id) => {
        try {
            const url = secureLocalStorage.getItem("url") + "CSDL.php";
            const jsonData = { type_id };
            const formData = new FormData();
            formData.append("operation", "deleteScholarshipType");
            formData.append("json", JSON.stringify(jsonData));
            const res = await axios.post(url, formData);
            if (res.data === 1) {
                setScholarshipTypes(prevScholarshipTypes =>
                    prevScholarshipTypes.filter(scholarshipType => scholarshipType.type_id !== type_id)
                );
                toast.success("Scholarship type deleted successfully");
            } else {
                toast.error(res.data.message || "Failed to delete Scholarship type");
            }
        } catch (error) {
            console.log('Failed to delete Scholarship type:', error);
            toast.error("Failed to delete Scholarship type");
        }
    };

    const handleScholarshipTypeClick = (type_id) => {
        setExpandedScholarshipType(expandedScholarshipType === type_id ? null : type_id);
    };

    const handleDelete = (type_id) => {
        if (window.confirm("Are you sure you want to delete this scholarship type?")) {
            deleteScholarType(type_id);
        }
    };

    const handleUpdate = (type_id) => {
        toast.success(`Scholarship type ${type_id} updated successfully`);
    };

    return (
        <div className="bg-blue-700 w-full max-w-md mx-auto rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
                <span className="text-white text-xl font-bold text-center flex-1">Scholarship Type List</span>
            </div>
            <div className="flex flex-col space-y-4">
                {scholarshipTypes.length > 0 ? (
                    scholarshipTypes.map((scholarshipType) => (
                        <div key={scholarshipType.type_id}>
                            <div
                                className="flex items-center justify-between bg-blue-800 rounded-md py-3 px-5 text-white cursor-pointer hover:bg-blue-900 hover:scale-105 transition-transform duration-300"
                                onClick={() => handleScholarshipTypeClick(scholarshipType.type_id)}
                            >
                                <span className="text-lg">{expandedScholarshipType === scholarshipType.type_id ? '▼' : '▲ '}</span>
                                <span className="text-lg font-medium flex-1">{scholarshipType.type_name}</span>
                                {expandedScholarshipType === scholarshipType.type_id && (
                                    <div className="flex space-x-2">
                                        <button
                                            className="text-red-500 hover:bg-red-600 hover:text-white p-1 rounded-md"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(scholarshipType.type_id);
                                            }}
                                        >
                                            <FaTrash />
                                        </button>
                                        <button
                                            className="text-yellow-500 hover:bg-yellow-600 hover:text-white p-1 rounded-md"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleUpdate(scholarshipType.type_id);
                                            }}
                                        >
                                            <FaEdit />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-white text-center">No Data Found</p>
                )}
            </div>
        </div>
    );
};

export default GetScholarshipType;
