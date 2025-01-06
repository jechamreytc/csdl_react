import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import secureLocalStorage from 'react-secure-storage';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Modal, Button, Form } from 'react-bootstrap';

const GetDepartment = () => {
    const [departments, setDepartments] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editName, setEditName] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showValidation, setShowValidation] = useState(false); // State for validation

    useEffect(() => {
        const getDepartments = async () => {
            try {
                const url = secureLocalStorage.getItem("url") + "CSDL.php";
                const formData = new FormData();
                formData.append("operation", "getDepartment");
                const res = await axios.post(url, formData);
                setDepartments(res.data);
                toast.success("Departments loaded successfully!");
            } catch (error) {
                console.error('Failed to load departments:', error);
                toast.error("Failed to load departments.");
            }
        };
        getDepartments();
    }, []);

    const deleteDepartment = async (dept_id) => {
        try {
            const url = secureLocalStorage.getItem("url") + "CSDL.php";
            const jsonData = { dept_id };
            const formData = new FormData();
            formData.append("operation", "deleteDepartment");
            formData.append("json", JSON.stringify(jsonData));
            const res = await axios.post(url, formData);

            if (res.data === -1) {
                toast.error("Cannot delete, department is in use.");
            } else if (res.data === 1) {
                setDepartments(departments.filter((department) => department.dept_id !== dept_id));
                toast.success("Department deleted successfully!");
            } else {
                toast.error(res.data.message || "Failed to delete department.");
            }
        } catch (error) {
            console.error('Failed to delete department:', error);
            toast.error("Failed to delete department.");
        }
    };

    const handleDelete = (departmentId) => {
        if (window.confirm("Are you sure you want to delete this department?")) {
            deleteDepartment(departmentId);
        }
    };

    const handleEdit = (departmentId, currentName) => {
        setEditId(departmentId);
        setEditName(currentName);
        setShowModal(true);
    };

    const saveDepartment = async () => {
        // Check if department name already exists
        const isDuplicate = departments.some(dept => dept.dept_name.toLowerCase() === editName.toLowerCase());

        if (isDuplicate) {
            setShowValidation(true); // Show validation message
            return;
        }

        try {
            const url = secureLocalStorage.getItem("url") + "CSDL.php";
            const jsonData = { dept_id: editId, dept_name: editName };
            const formData = new FormData();
            formData.append("operation", "updateDerpartment");
            formData.append("json", JSON.stringify(jsonData));
            const res = await axios.post(url, formData);

            if (res.data === 1) {
                setDepartments(departments.map((department) =>
                    department.dept_id === editId ? { ...department, dept_name: editName } : department
                ));
                toast.success("Department updated successfully!");
                setShowModal(false);
                setShowValidation(false); // Reset validation state
            } else {
                toast.error(res.data.message || "Failed to update department.");
            }
        } catch (error) {
            console.error('Failed to update department:', error);
            toast.error("Failed to update department.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="w-full max-w-4xl mx-auto text-center mb-6">
                <h1 className="text-4xl font-bold text-blue-900 mb-4">Department List</h1>
                <p className="text-blue-700 text-lg">Manage departments by editing or deleting entries.</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
                {departments.length > 0 ? (
                    departments.map((department) => (
                        <div
                            key={department.dept_id}
                            className="bg-white rounded-lg p-6 shadow-md border border-gray-300 hover:shadow-lg transition-transform transform hover:scale-105"
                        >
                            <h2 className="text-2xl font-semibold text-blue-800 mb-4">{department.dept_name}</h2>
                            <div className="flex justify-end space-x-3">
                                <button
                                    className="text-blue-500 hover:text-blue-700 p-2 transition-colors"
                                    onClick={() => handleEdit(department.dept_id, department.dept_name)}
                                >
                                    <FaEdit size={20} />
                                </button>
                                <button
                                    className="text-red-500 hover:text-red-700 p-2 transition-colors"
                                    onClick={() => handleDelete(department.dept_id)}
                                >
                                    <FaTrash size={20} />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-blue-700 text-lg">No Data Found</p>
                )}
            </div>

            {/* Edit Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Department</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formDepartmentName">
                            <Form.Label>Department Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                placeholder="Enter new department name"
                                isInvalid={showValidation} // Validation state
                            />
                            <Form.Control.Feedback type="invalid">
                                Department name already exists.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={saveDepartment}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default GetDepartment;
