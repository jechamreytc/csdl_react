import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import secureLocalStorage from 'react-secure-storage';
import { FaTrash, FaEdit } from 'react-icons/fa';

const GetModality = () => {
    const [modalities, setModalities] = useState([]);

    useEffect(() => {
        const getModalities = async () => {
            try {
                const url = secureLocalStorage.getItem("url") + "CSDL.php";
                const formData = new FormData();
                formData.append("operation", "getModality");
                const res = await axios.post(url, formData);
                setModalities(res.data);
                toast.success("Modalities loaded successfully");
            } catch (error) {
                console.log('Failed to load modalities:', error);
                toast.error("Failed to load modalities");
            }
        };
        getModalities();
    }, []);

    const deleteModality = async (stypeScholar_id) => {
        try {
            const url = secureLocalStorage.getItem("url") + "CSDL.php";
            const jsonData = { stypeScholar_id };
            const formData = new FormData();
            formData.append("operation", "deleteModality");
            formData.append("json", JSON.stringify(jsonData));
            const res = await axios.post(url, formData);
            if (res.data === 1) {
                setModalities((prevModalities) =>
                    prevModalities.filter(modality => modality.stypeScholar_id !== stypeScholar_id)
                );
                toast.success("Modality deleted successfully");
            } else {
                toast.error(res.data.message || "Failed to delete modality");
            }
        } catch (error) {
            console.log('Failed to delete modality:', error);
            toast.error("Failed to delete modality");
        }
    };

    const handleDelete = (modalityId) => {
        if (window.confirm("Are you sure you want to delete this modality?")) {
            deleteModality(modalityId);
        }
    };

    const handleUpdate = (modalityId) => {
        toast.success(`Modality ${modalityId} updated successfully`);
    };

    return (
        <div className="bg-blue-900 w-full max-w-md mx-auto rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
                <span className="text-white text-xl font-bold text-center flex-1">Modality List</span>
            </div>
            <div className="flex flex-col space-y-5"> {/* Increased space between items */}
                {modalities.length > 0 ? (
                    modalities.map((modality) => (
                        <div
                            key={modality.stypeScholar_id}
                            className="flex items-center justify-between bg-blue-800 rounded-lg py-4 px-6 text-white hover:bg-blue-700 transition-colors duration-300 shadow-md"
                        >
                            <span className="text-lg font-medium">{modality.stypeScholar_name}</span>
                            <div className="flex space-x-3"> {/* Spacing between buttons */}
                                <button
                                    className="text-green-500 hover:bg-green-600 hover:text-white p-2 rounded-full transition-transform transform hover:scale-105"
                                    onClick={() => handleUpdate(modality.stypeScholar_id)}
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    className="text-red-500 hover:bg-red-600 hover:text-white p-2 rounded-full transition-transform transform hover:scale-105"
                                    onClick={() => handleDelete(modality.stypeScholar_id)}
                                >
                                    <FaTrash />
                                </button>
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

export default GetModality;
