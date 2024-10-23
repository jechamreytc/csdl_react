import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import secureLocalStorage from 'react-secure-storage';
import { FaTrash, FaEdit } from 'react-icons/fa';

const GetSupervisorMaster = () => {
    const [supervisors, setSupervisors] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedSupervisor, setSelectedSupervisor] = useState(null); // Selected supervisor data

    useEffect(() => {
        const getSupervisors = async () => {
            try {
                const url = secureLocalStorage.getItem("url") + "CSDL.php";
                const formData = new FormData();
                formData.append("operation", "getSupervisorMaster");
                const res = await axios.post(url, formData);
                setSupervisors(res.data);
                toast.success("Supervisors loaded successfully");
            } catch (error) {
                console.log('Failed to load supervisors:', error);
                toast.error("Failed to load supervisors");
            }
        };
        getSupervisors();
    }, []);

    const deleteSupervisor = async (supervisor_id) => {
        try {
            const url = secureLocalStorage.getItem("url") + "CSDL.php";
            const jsonData = { supervisor_id };
            const formData = new FormData();
            formData.append("operation", "deleteSupervisorMaster");
            formData.append("json", JSON.stringify(jsonData));
            const res = await axios.post(url, formData);
            if (res.data === -1) {
                toast.error("Failed to delete, there's a transaction using this supervisor");
            } else if (res.data === 1) {
                setSupervisors(
                    supervisors.filter((supervisor) => supervisor.supervisor_id !== supervisor_id)
                );
                toast.success("Supervisor deleted successfully");
            } else {
                toast.error(res.data.message || "Failed to delete supervisor");
            }
        } catch (error) {
            console.log('Failed to delete supervisor:', error);
            toast.error("Failed to delete supervisor");
        }
    };

    const handleDelete = (supervisorId) => {
        if (window.confirm("Are you sure you want to delete this supervisor?")) {
            deleteSupervisor(supervisorId);
        }
    };

    const handleUpdate = (supervisor) => {
        setSelectedSupervisor(supervisor);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedSupervisor(null);
    };

    return (
        <div className="bg-gray-100 min-h-screen w-full p-8">
            <div className="container mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 text-center">Supervisor Management</h1>
                </div>

                <div className="flex flex-wrap justify-center gap-8 overflow-y-auto max-h-[80vh] max-w-[1200px]">
                    {supervisors.length > 0 ? (
                        supervisors.map((supervisor) => (
                            <div
                                key={supervisor.supervisor_id}
                                className="bg-white shadow-lg rounded-lg p-6 transform transition-transform hover:scale-105 w-80"
                            >
                                <div className="flex flex-col items-start space-y-3">
                                    <div className="w-full">
                                        <h2 className="text-2xl font-semibold text-gray-700">
                                            {supervisor.supM_first_name} {supervisor.supM_last_name}
                                        </h2>
                                        <p className="text-gray-600 text-sm">Employee ID: {supervisor.supM_employee_id}</p>
                                    </div>

                                    <div className="w-full border-t border-gray-300 mt-4 pt-4">
                                        <p className="text-gray-600">Department: {supervisor.dept_name}</p>
                                        <p className="text-gray-600">Contact: {supervisor.supM_contact_number}</p>
                                        <p className="text-gray-600">Email: {supervisor.supM_email}</p>
                                    </div>

                                    <div className="flex space-x-4 w-full justify-end mt-6">
                                        <button
                                            className="bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center space-x-2 hover:bg-blue-600 transition-colors"
                                            onClick={() => handleUpdate(supervisor)}
                                        >
                                            <FaEdit />
                                            <span>Edit</span>
                                        </button>
                                        <button
                                            className="bg-red-500 text-white py-2 px-4 rounded-lg flex items-center space-x-2 hover:bg-red-600 transition-colors"
                                            onClick={() => handleDelete(supervisor.supervisor_id)}
                                        >
                                            <FaTrash />
                                            <span>Delete</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-600 col-span-full">No Supervisors Available</p>
                    )}
                </div>
            </div>

            {/* Full-Screen Modal */}
            {showModal && selectedSupervisor && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg w-full max-w-4xl p-8 relative">
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                        >
                            Close
                        </button>
                        <h2 className="text-2xl font-bold mb-6">Edit Supervisor</h2>
                        <p><strong>Employee ID:</strong> {selectedSupervisor.supM_employee_id}</p>
                        <p><strong>Name:</strong> {selectedSupervisor.supM_first_name} {selectedSupervisor.supM_last_name}</p>
                        {/* Add your edit form fields here */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default GetSupervisorMaster;
