import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import secureLocalStorage from 'react-secure-storage';
import { FaTrash, FaEdit } from 'react-icons/fa';

const GetSubject = () => {
    const [subjects, setSubjects] = useState([]);
    const [expandedSubject, setExpandedSubject] = useState(null);

    useEffect(() => {
        const getSubject = async () => {
            try {
                const url = secureLocalStorage.getItem("url") + "CSDL.php";
                const formData = new FormData();
                formData.append("operation", "getSubject");
                const res = await axios.post(url, formData);
                console.log("res ni get subject", res.data);
                if (Array.isArray(res.data)) {
                    setSubjects(res.data);
                    toast.success("Subjects loaded successfully");
                } else {
                    toast.error("Unexpected data format");
                }
            } catch (error) {
                toast.error("Failed to load subjects");
            }
        };
        getSubject();
    }, []);

    const deleteSubject = async (sub_id) => {
        try {
            const url = secureLocalStorage.getItem("url") + "CSDL.php";
            const jsonData = { sub_id: sub_id };
            const formData = new FormData();
            formData.append("operation", "deleteSubject");
            formData.append("json", JSON.stringify(jsonData));
            const res = await axios.post(url, formData);
            if (res.data === 1) {
                setSubjects((prevSubjects) =>
                    prevSubjects.filter(subject => subject.sub_id !== sub_id)
                );
                toast.success("Subject deleted successfully");
            } else {
                toast.error(res.data.message || "Failed to delete subject");
            }
        } catch (error) {
            toast.error("Failed to delete subject");
        }
    };

    const handleSubjectClick = (subject) => {
        setExpandedSubject(expandedSubject === subject ? null : subject);
    };

    const handleDelete = (subjectId) => {
        if (window.confirm("Are you sure you want to delete this subject?")) {
            deleteSubject(subjectId);
        }
    };

    const handleUpdate = (subjectId) => {
        toast.success(`Subject ${subjectId} updated successfully`);
    };

    return (
        <div className="bg-blue-700 w-full max-w-md mx-auto rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
                <span className="text-white text-xl font-bold text-center flex-1">Subject List</span>
            </div>
            <div className="flex flex-col space-y-4">
                {subjects.length > 0 ? (
                    subjects.map((subject) => (
                        <div key={subject.sub_id}>
                            <div
                                className="flex items-center justify-between bg-blue-800 rounded-md py-3 px-5 text-white cursor-pointer hover:bg-blue-900 hover:scale-105 transition-transform duration-300"
                                onClick={() => handleSubjectClick(subject.sub_name_descriptive_title)}
                            >
                                <span className="text-lg">{expandedSubject === subject.sub_name_descriptive_title ? '▼' : '▲ '}</span>
                                <div className="text-lg font-medium flex-1">
                                    <span>{subject.sub_code} - {subject.sub_descriptive_title}</span> {/* Display subject code and name */}
                                </div>
                                {expandedSubject === subject.sub_descriptive_title && (
                                    <div className="flex space-x-2">
                                        <button
                                            className="text-red-500 hover:bg-red-600 hover:text-white p-1 rounded-md"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(subject.sub_id);
                                            }}
                                        >
                                            <FaTrash />
                                        </button>
                                        <button
                                            className="text-yellow-500 hover:bg-yellow-600 hover:text-white p-1 rounded-md"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleUpdate(subject.sub_id);
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

export default GetSubject;
