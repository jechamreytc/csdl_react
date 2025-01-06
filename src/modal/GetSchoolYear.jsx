import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import secureLocalStorage from 'react-secure-storage';
import { FaTrash, FaEdit, FaSave } from 'react-icons/fa';

const GetSchoolYear = () => {
    const [schoolYear, setSchoolYear] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editName, setEditName] = useState("");

    useEffect(() => {
        const GetSchoolYear = async () => {
            try {
                const url = secureLocalStorage.getItem("url") + "CSDL.php";
                const formData = new FormData();
                formData.append("operation", "getschoolyear");
                const res = await axios.post(url, formData);
                setSchoolYear(res.data);
                toast.success("School Year loaded successfully");
            } catch (error) {
                console.log('Failed to load School Year:', error);
                toast.error("Failed to load School Year");
            }
        };
        GetSchoolYear();
    }, []);

    const deleteSchoolYear = async (sy_id) => {
        try {
            const url = secureLocalStorage.getItem("url") + "CSDL.php";
            const jsonData = { sy_id };
            const formData = new FormData();
            formData.append("operation", "deleteSchoolYear");
            formData.append("json", JSON.stringify(jsonData));
            const res = await axios.post(url, formData);
            if (res.data === 1) {
                setSchoolYear(schoolYear.filter((item) => item.sy_id !== sy_id));
                toast.success("School Year deleted successfully");
            } else {
                toast.error(res.data.message || "Failed to delete school year");
            }
        } catch (error) {
            console.log('Failed to delete School Year:', error);
            toast.error("Failed to delete School Year");
        }
    };

    const handleDelete = (sy_id) => {
        if (window.confirm("Are you sure you want to delete this School Year?")) {
            deleteSchoolYear(sy_id);
        }
    };

    const handleEdit = (sy_id, currentName) => {
        setEditId(sy_id);
        setEditName(currentName);
    };

    const saveSchoolYear = async (sy_id) => {
        try {
            const url = secureLocalStorage.getItem("url") + "CSDL.php";
            const jsonData = { sy_id, sy_name: editName };
            const formData = new FormData();
            formData.append("operation", "updateSchoolYear");
            formData.append("json", JSON.stringify(jsonData));
            const res = await axios.post(url, formData);
            if (res.data === 1) {
                setSchoolYear(
                    schoolYear.map((item) =>
                        item.sy_id === sy_id ? { ...item, sy_name: editName } : item
                    )
                );
                toast.success("School Year updated successfully");
                setEditId(null);
            } else {
                toast.error(res.data.message || "Failed to update School Year");
            }
        } catch (error) {
            console.log('Failed to update School Year:', error);
            toast.error("Failed to update School Year");
        }
    };

    return (
        <div className="bg-blue-900 w-full max-w-md mx-auto rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
                <span className="text-white text-xl font-bold text-center flex-1">School Year List</span>
            </div>
            <div className="flex flex-col space-y-5">
                {schoolYear.length > 0 ? (
                    schoolYear.map((item) => (
                        <div
                            key={item.sy_id}
                            className="flex items-center justify-between bg-blue-800 rounded-lg py-4 px-6 text-white hover:bg-blue-700 transition-colors duration-300 shadow-md"
                        >
                            {editId === item.sy_id ? (
                                <input
                                    type="text"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    className="text-lg font-medium bg-blue-800 text-white border-b-2 border-gray-500 focus:border-white focus:outline-none"
                                />
                            ) : (
                                <span className="text-lg font-medium">{item.sy_name}</span>
                            )}
                            <div className="flex space-x-3">
                                {editId === item.sy_id ? (
                                    <button
                                        className="text-green-500 hover:bg-green-600 hover:text-white p-2 rounded-full transition-transform transform hover:scale-105"
                                        onClick={() => saveSchoolYear(item.sy_id)}
                                    >
                                        <FaSave />
                                    </button>
                                ) : (
                                    <button
                                        className="text-green-500 hover:bg-green-600 hover:text-white p-2 rounded-full transition-transform transform hover:scale-105"
                                        onClick={() => handleEdit(item.sy_id, item.sy_name)}
                                    >
                                        <FaEdit />
                                    </button>
                                )}
                                <button
                                    className="text-red-500 hover:bg-red-600 hover:text-white p-2 rounded-full transition-transform transform hover:scale-105"
                                    onClick={() => handleDelete(item.sy_id)}
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

export default GetSchoolYear;
