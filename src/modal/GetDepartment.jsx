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
    const [showValidation, setShowValidation] = useState(false);

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
                toast.error("Failed to load departments.");
            }
        };
        getDepartments();
    }, []);

    const deleteDepartment = async (dept_id) => {
        try {
            const url = secureLocalStorage.getItem("url") + "CSDL.php";
            const formData = new FormData();
            formData.append("operation", "deleteDepartment");
            formData.append("json", JSON.stringify({ dept_id }));
            const res = await axios.post(url, formData);

            if (res.data === 1) {
                setDepartments(departments.filter((department) => department.dept_id !== dept_id));
                toast.success("Department deleted successfully!");
            } else {
                toast.error("Failed to delete department.");
            }
        } catch (error) {
            toast.error("Failed to delete department.");
        }
    };

    const handleEdit = (departmentId, currentName) => {
        setEditId(departmentId);
        setEditName(currentName);
        setShowModal(true);
        setShowValidation(false);
    };

    const saveDepartment = async () => {
        if (!editName.trim()) {
            setShowValidation(true);
            return;
        }

        try {
            const url = secureLocalStorage.getItem("url") + "CSDL.php";
            const formData = new FormData();
            formData.append("operation", "updateDepartment");
            formData.append("json", JSON.stringify({ dept_id: editId, dept_name: editName }));
            const res = await axios.post(url, formData);

            if (res.data === 1) {
                setDepartments(departments.map((department) =>
                    department.dept_id === editId ? { ...department, dept_name: editName } : department
                ));
                toast.success("Department updated successfully!");
                setShowModal(false);
            } else {
                toast.error("Failed to update department.");
            }
        } catch (error) {
            toast.error("Failed to update department.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="w-full max-w-4xl mx-auto text-center mb-6">
                <h1 className="text-4xl font-extrabold text-green-800 mb-6">Department List</h1>
            </div>

            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
                {departments.length > 0 ? (
                    departments.map((department) => (
                        <div
                            key={department.dept_id}
                            className="bg-green-500 rounded-lg p-6 shadow-lg border border-green-600 hover:bg-green-600 transition duration-300"
                        >
                            <h2 className="text-2xl font-semibold text-white mb-4">{department.dept_name}</h2>
                            <div className="flex justify-end space-x-3">
                                <button
                                    className="text-white bg-gray-800 hover:bg-gray-700 p-2 rounded-md"
                                    onClick={() => handleEdit(department.dept_id, department.dept_name)}
                                >
                                    <FaEdit size={20} />
                                </button>
                                <button
                                    className="text-white bg-red-600 hover:bg-red-500 p-2 rounded-md"
                                    onClick={() => deleteDepartment(department.dept_id)}
                                >
                                    <FaTrash size={20} />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-700 text-lg">No Data Found</p>
                )}
            </div>

            {/* Edit Department Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton className="bg-green-600 text-white">
                    <Modal.Title>Edit Department</Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-white">
                    <Form>
                        <Form.Group controlId="formDepartmentName">
                            <Form.Label className="text-gray-800 font-semibold">Department Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                placeholder="Enter new department name"
                                isInvalid={showValidation}
                            />
                            <Form.Control.Feedback type="invalid">
                                Department name cannot be empty.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="bg-white">
                    <Button variant="secondary" className="bg-gray-300 text-gray-700 border-0" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" className="bg-green-600 text-white border-0" onClick={saveDepartment}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default GetDepartment;