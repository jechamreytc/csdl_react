import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import secureLocalStorage from 'react-secure-storage';
import { FaTrash, FaEdit } from 'react-icons/fa';

function GetScholarshipSubType() {
    const [scholarshipSubTypes, setScholarshipSubTypes] = useState([]); // Initialize as an array
    const [expandedSubType, setExpandedSubType] = useState(null);

    useEffect(() => {
        const getScholarshipSubTypes = async () => {
            try {
                const url = secureLocalStorage.getItem("url") + "CSDL.php";
                const formData = new FormData();
                formData.append("operation", "getScholarshipSubType");
                const res = await axios.post(url, formData);

                // Log response to inspect structure
                console.log(res.data);

                if (Array.isArray(res.data)) {
                    setScholarshipSubTypes(res.data);
                    toast.success("Scholarship Subtypes loaded successfully");
                } else {
                    toast.error("Invalid data format received");
                }
            } catch (error) {
                console.log('Failed to load scholarship subtypes:', error);
                toast.error("Failed to load scholarship subtypes");
            }
        };
        getScholarshipSubTypes();
    }, []);

    const deleteSubType = async (subType_id) => {
        try {
            const url = secureLocalStorage.getItem("url") + "CSDL.php";
            const jsonData = {
                stype_id: subType_id
            };
            const formData = new FormData();
            formData.append("operation", "deleteScholarshipSubType");
            formData.append("json", JSON.stringify(jsonData));
            const res = await axios.post(url, formData);
            if (res.data === 1) {
                setScholarshipSubTypes((prevSubTypes) =>
                    prevSubTypes.filter(subType => subType.stype_id !== subType_id)
                );
                toast.success("Scholarship Subtype deleted successfully");
            } else {
                toast.error(res.data.message || "Failed to delete scholarship subtype");
            }
        } catch (error) {
            console.log('Failed to delete scholarship subtype:', error);
            toast.error("Failed to delete scholarship subtype");
        }
    };

    const handleSubTypeClick = (subType) => {
        setExpandedSubType(expandedSubType === subType ? null : subType);
    };

    const handleDelete = (subTypeId) => {
        if (window.confirm("Are you sure you want to delete this scholarship subtype?")) {
            deleteSubType(subTypeId);
        }
    };

    const handleUpdate = (subTypeId) => {
        toast.success(`Scholarship Subtype ${subTypeId} updated successfully`);
    };

    return (
        <div className="bg-blue-700 w-full max-w-md mx-auto rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
                <span className="text-white text-xl font-bold text-center flex-1">Scholarship Subtype List</span>
            </div>
            <div className="flex flex-col space-y-4">
                {scholarshipSubTypes.length > 0 ? (
                    scholarshipSubTypes.map((subType) => (
                        <div key={subType.stype_id}>
                            <div
                                className="flex items-center justify-between bg-blue-800 rounded-md py-3 px-5 text-white cursor-pointer hover:bg-blue-900 hover:scale-105 transition-transform duration-300"
                                onClick={() => handleSubTypeClick(subType.stype_name)}
                            >
                                <span className="text-lg">{expandedSubType === subType.stype_name ? '▼' : '▲ '}</span>
                                <span className="text-lg font-medium flex-1">{subType.stype_name}</span>
                                {expandedSubType === subType.stype_name && (
                                    <div className="flex space-x-2">
                                        <button
                                            className="text-red-500 hover:bg-red-600 hover:text-white p-1 rounded-md"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(subType.stype_id);
                                            }}
                                        >
                                            <FaTrash />
                                        </button>
                                        <button
                                            className="text-yellow-500 hover:bg-yellow-600 hover:text-white p-1 rounded-md"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleUpdate(subType.stype_id);
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

export default GetScholarshipSubType;
