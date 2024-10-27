import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import secureLocalStorage from 'react-secure-storage';
import { FaTrash, FaEdit, FaTimes } from 'react-icons/fa';

const GetScholarList = ({ onClose }) => {
    const [scholars, setScholars] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedScholar, setSelectedScholar] = useState(null);

    useEffect(() => {
        const getScholars = async () => {
            try {
                const url = secureLocalStorage.getItem("url") + "CSDL.php";
                const formData = new FormData();
                formData.append("operation", "getScholar");
                const res = await axios.post(url, formData);
                setScholars(res.data);
                toast.success("Scholars loaded successfully");
            } catch (error) {
                console.log('Failed to load scholars:', error);
                toast.error("Failed to load scholars");
            }
        };
        getScholars();
    }, []);

    const deleteScholar = async (stud_id) => {
        try {
            const url = secureLocalStorage.getItem("url") + "CSDL.php";
            const jsonData = { stud_id };
            const formData = new FormData();
            formData.append("operation", "deleteScholar");
            formData.append("json", JSON.stringify(jsonData));
            const res = await axios.post(url, formData);
            if (res.data === -1) {
                toast.error("Failed to delete, there's a transaction using this scholar");
            } else if (res.data === 1) {
                setScholars(scholars.filter((scholar) => scholar.stud_id !== stud_id));
                toast.success("Scholar deleted successfully");
            } else {
                toast.error(res.data.message || "Failed to delete scholar");
            }
        } catch (error) {
            console.log('Failed to delete scholar:', error);
            toast.error("Failed to delete scholar");
        }
    };

    const handleDelete = (scholarId) => {
        if (window.confirm("Are you sure you want to delete this scholar?")) {
            deleteScholar(scholarId);
        }
    };

    const handleUpdate = (scholar) => {
        setSelectedScholar(scholar);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedScholar(null);
    };

    return (
        <div className="bg-gray-100 min-h-screen w-full p-8">
            <div className="container mx-auto">
                <div className="mb-8 flex justify-between items-center">
                    <h1 className="text-4xl font-bold text-gray-800">Scholar Management</h1>
                    <button
                        onClick={onClose}
                        className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
                    >
                        Close
                    </button>
                </div>

                <div className="flex flex-wrap justify-center gap-8 overflow-y-auto max-h-[80vh] max-w-[1200px]">
                    {scholars.length > 0 ? (
                        scholars.map((scholar) => (
                            <div
                                key={scholar.stud_id}
                                className="bg-white shadow-lg rounded-lg p-6 transform transition-transform hover:scale-105 w-80"
                            >
                                <div className="flex flex-col items-start space-y-3">
                                    <div className="w-full">
                                        <h2 className="text-2xl font-semibold text-gray-700">
                                            {scholar.stud_first_name} {scholar.stud_last_name}
                                        </h2>
                                        <p className="text-gray-600 text-sm">Scholar ID: {scholar.stud_school_id}</p>
                                    </div>

                                    <div className="w-full border-t border-gray-300 mt-4 pt-4">
                                        <p className="text-gray-600">Contact: {scholar.stud_contact_number}</p>
                                        <p className="text-gray-600">Email: {scholar.stud_email}</p>
                                    </div>

                                    <div className="flex space-x-4 w-full justify-end mt-6">
                                        <button
                                            className="bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center space-x-2 hover:bg-blue-600 transition-colors"
                                            onClick={() => handleUpdate(scholar)}
                                        >
                                            <FaEdit />
                                            <span>Edit</span>
                                        </button>
                                        <button
                                            className="bg-red-500 text-white py-2 px-4 rounded-lg flex items-center space-x-2 hover:bg-red-600 transition-colors"
                                            onClick={() => handleDelete(scholar.stud_id)}
                                        >
                                            <FaTrash />
                                            <span>Delete</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-600 col-span-full">No Scholars Available</p>
                    )}
                </div>
            </div>

            {/* Edit Scholar Modal */}
            {showModal && selectedScholar && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                    onClick={closeModal} // Close modal on clicking outside
                >
                    <div
                        className="bg-white rounded-lg w-full max-w-[80vw] max-h-[50vh] p-8 relative"
                        onClick={(e) => e.stopPropagation()} // Prevent closing on clicking inside the modal
                    >
                        <button
                            onClick={closeModal} // Close modal on button click
                            className="absolute top-2 right-2 bg-transparent text-gray-600 p-2 hover:bg-gray-200 rounded-full transition-colors"
                        >
                            <FaTimes size={20} />
                        </button>
                        <div className="flex-1 p-4">
                            <h2 className="text-2xl font-bold mb-4">Edit Scholar</h2>
                            <p><strong>Scholar ID:</strong> {selectedScholar.stud_school_id}</p>
                            <p><strong>Name:</strong> {selectedScholar.stud_first_name} {selectedScholar.stud_last_name}</p>
                            {/* Add your edit form fields here */}
                        </div>

                        <div className="flex-1 p-4 border-l border-gray-200">
                            {/* Additional content or form fields for horizontal layout */}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GetScholarList;
