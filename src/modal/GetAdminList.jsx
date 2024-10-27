import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import secureLocalStorage from 'react-secure-storage';
import { FaTrash, FaEdit } from 'react-icons/fa';

const GetAdminList = () => {
    const [admins, setAdmins] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedAdmin, setSelectedAdmin] = useState(null);

    useEffect(() => {
        const getAdmins = async () => {
            try {
                const url = secureLocalStorage.getItem("url") + "CSDL.php";
                const formData = new FormData();
                formData.append("operation", "getAdmin");
                const res = await axios.post(url, formData);
                setAdmins(res.data);
                toast.success("Admins loaded successfully");
            } catch (error) {
                console.log('Failed to load admins:', error);
                toast.error("Failed to load admins");
            }
        };
        getAdmins();
    }, []);

    const deleteAdmin = async (admin_id) => {
        try {
            const url = secureLocalStorage.getItem("url") + "CSDL.php";
            const jsonData = { admin_id };
            const formData = new FormData();
            formData.append("operation", "deleteAdmin");
            formData.append("json", JSON.stringify(jsonData));
            const res = await axios.post(url, formData);
            if (res.data === -1) {
                toast.error("Failed to delete, there's a transaction using this admin");
            } else if (res.data === 1) {
                setAdmins(
                    admins.filter((admin) => admin.admin_id !== admin_id)
                );
                toast.success("Admin deleted successfully");
            } else {
                toast.error(res.data.message || "Failed to delete admin");
            }
        } catch (error) {
            console.log('Failed to delete admin:', error);
            toast.error("Failed to delete admin");
        }
    };

    const handleDelete = (adminId) => {
        if (window.confirm("Are you sure you want to delete this admin?")) {
            deleteAdmin(adminId);
        }
    };

    const handleUpdate = (admin) => {
        setSelectedAdmin(admin);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedAdmin(null);
    };

    return (
        <div className="bg-gray-100 min-h-screen w-full p-8">
            <div className="container mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 text-center">Admin Management</h1>
                </div>

                <div className="flex flex-wrap justify-center gap-8 overflow-y-auto max-h-[80vh] max-w-[1200px]">
                    {admins.length > 0 ? (
                        admins.map((admin) => (
                            <div
                                key={admin.adm_id}
                                className="bg-white shadow-lg rounded-lg p-6 transform transition-transform hover:scale-105 w-80"
                            >
                                <div className="flex flex-col items-start space-y-3">
                                    <div className="w-full">
                                        <h2 className="text-2xl font-semibold text-gray-700">
                                            {admin.adm_first_name} {admin.adm_last_name}
                                        </h2>
                                        <p className="text-gray-600 text-sm">Employee ID: {admin.adm_employee_id}</p>
                                    </div>

                                    <div className="w-full border-t border-gray-300 mt-4 pt-4">
                                        <p className="text-gray-600">Contact: {admin.adm_contact_number}</p>
                                        <p className="text-gray-600">Email: {admin.adm_email}</p>
                                    </div>

                                    <div className="flex space-x-4 w-full justify-end mt-6">
                                        <button
                                            className="bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center space-x-2 hover:bg-blue-600 transition-colors"
                                            onClick={() => handleUpdate(admin)}
                                        >
                                            <FaEdit />
                                            <span>Edit</span>
                                        </button>
                                        <button
                                            className="bg-red-500 text-white py-2 px-4 rounded-lg flex items-center space-x-2 hover:bg-red-600 transition-colors"
                                            onClick={() => handleDelete(admin.adm_id)}
                                        >
                                            <FaTrash />
                                            <span>Delete</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-600 col-span-full">No Admins Available</p>
                    )}
                </div>
            </div>

            {/* Edit Admin Modal */}
            {showModal && selectedAdmin && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg w-full max-w-[80vw] max-h-[50vh] p-8 relative">
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 bg-gray-200 rounded-full text-gray-600 p-2 hover:bg-gray-300 transition-colors"
                        >
                            X
                        </button>
                        <div className="flex-1 p-4">
                            <h2 className="text-2xl font-bold mb-4">Edit Admin</h2>
                            <p><strong>Employee ID:</strong> {selectedAdmin.adm_employee_id}</p>
                            <p><strong>Name:</strong> {selectedAdmin.adm_first_name} {selectedAdmin.adm_last_name}</p>
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

export default GetAdminList;
