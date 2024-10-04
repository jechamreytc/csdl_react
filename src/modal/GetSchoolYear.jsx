import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import secureLocalStorage from 'react-secure-storage';
import { FaTrash, FaEdit } from 'react-icons/fa';

const GetSchoolYear = () => {
    const [schoolYear, setSchoolYear] = useState([]);
    const [expandedSchoolYear, setexpandedSchoolYear] = useState(null);

    useEffect(() => {
        const GetSchoolYear = async () => {
            try {
                const url = secureLocalStorage.getItem("url") + "CSDL.php";
                const formData = new FormData();
                formData.append("operation", "getschoolyear");
                const res = await axios.post(url, formData);
                console.log("wrong", res);
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
            const jsonData = {
                sy_id: sy_id
            }
            const formData = new FormData();
            formData.append("operation", "deleteSchoolYear");
            formData.append("json", JSON.stringify(jsonData));
            const res = await axios.post(url, formData);
            console.log("worng", res);

            if (res.data === 1) {
                setSchoolYear((prevSchoolYear) =>
                    prevSchoolYear.filter(schoolYear => schoolYear.sy_id !== sy_id)
                );
                toast.success("School Year deleted successfully");
            } else {
                toast.error(res.data.message || "Failed to delete department");
            }
        } catch (error) {
            console.log('Failed to delete School Year:', error);
            toast.error("Failed to delete School Year");
        }
    };

    const handleSchoolYearClick = (schoolYear) => {
        setexpandedSchoolYear(expandedSchoolYear === schoolYear ? null : schoolYear);
    };

    const handleDelete = (schoolYearId) => {
        if (window.confirm("Are you sure you want to delete this Department Year?")) {
            deleteSchoolYear(schoolYearId);
        }
    };

    const handleUpdate = (schoolYearId) => {
        toast.success(`School Year ${schoolYearId} updated successfully`);
    };

    return (
        <div className="bg-blue-700 w-full max-w-md mx-auto rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
                <span className="text-white text-xl font-bold text-center flex-1">School Year List</span>
            </div>
            <div className="flex flex-col space-y-4">
                {schoolYear.length > 0 ? (
                    schoolYear.map((schoolYear) => (
                        <div key={schoolYear.sy_id}>
                            <div
                                className="flex items-center justify-between bg-blue-800 rounded-md py-3 px-5 text-white cursor-pointer hover:bg-blue-900 hover:scale-105 transition-transform duration-300"
                                onClick={() => handleSchoolYearClick(schoolYear.sy_name)}
                            >
                                <span className="text-lg">{expandedSchoolYear === schoolYear.sy_name ? '▼' : '▲ '}</span>
                                <span className="text-lg font-medium flex-1">{schoolYear.sy_name}</span>
                                {expandedSchoolYear === schoolYear.sy_name && (
                                    <div className="flex space-x-2">
                                        <button
                                            className="text-red-500 hover:bg-red-600 hover:text-white p-1 rounded-md"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(schoolYear.sy_id);
                                            }}
                                        >
                                            <FaTrash />
                                        </button>
                                        <button
                                            className="text-yellow-500 hover:bg-yellow-600 hover:text-white p-1 rounded-md"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleUpdate(schoolYear.sy_id);
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

export default GetSchoolYear;
