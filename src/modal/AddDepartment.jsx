import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';

function AddDepartmentModal() {
    const [formData, setFormData] = useState({ department_name: "", building_id: "" });
    const [departments, setDepartments] = useState([]);
    const [buildings, setBuildings] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getDepartments();
        getBuildings();
    }, []);

    const getDepartments = async () => {
        try {
            const url = secureLocalStorage.getItem("url") + "CSDL.php";
            const formData = new FormData();
            formData.append("operation", "getDepartment");
            const res = await axios.post(url, formData);
            if (Array.isArray(res.data)) {
                setDepartments(res.data);
            } else {
                console.log('Unexpected response format:', res.data);
                toast.error("Unexpected data format");
            }
        } catch (error) {
            console.log('Failed to load departments:', error);
            toast.error("Failed to load departments");
        }
    };

    const getBuildings = async () => {
        try {
            const url = secureLocalStorage.getItem("url") + "CSDL.php";
            const formData = new FormData();
            formData.append("operation", "getBuilding");
            const res = await axios.post(url, formData);
            if (Array.isArray(res.data)) {
                setBuildings(res.data);
            } else {
                console.log('Unexpected response format:', res.data);
                toast.error("Unexpected building data format");
            }
        } catch (error) {
            console.log('Failed to load buildings:', error);
            toast.error("Failed to load buildings");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAdd = async () => {
        if (loading) return;

        const departmentName = formData.department_name.trim();
        if (departmentName === "") {
            toast.error("Department name cannot be empty");
            return;
        }

        if (!formData.building_id) {
            toast.error("Please select a building");
            return;
        }

        const existingDepartment = departments.some(
            (department) =>
                department.dept_name.toLowerCase() === departmentName.toLowerCase() &&
                department.dept_build_id == formData.building_id
        );

        if (existingDepartment) {
            toast.error("Department already exists in this building");
            return;
        }
        console.log("Department name:", departmentName);
        console.log("Building ID:", formData.building_id);
        console.log("DEPTMAIN:", departments);
        console.log("is exitsting:", existingDepartment);

        setLoading(true);
        try {
            const url = secureLocalStorage.getItem("url") + "CSDL.php";
            const jsonData = {
                dept_name: departmentName,
                dept_build_id: formData.building_id
            };
            const formDataToSend = new FormData();
            formDataToSend.append("json", JSON.stringify(jsonData));
            formDataToSend.append("operation", "addDepartment");

            const res = await axios.post(url, formDataToSend);
            console.log('Response from server:', res.data);

            if (res.data === 1) {
                toast.success("Department added successfully");
                setFormData({ department_name: "", building_id: "" });
                await getDepartments();
            } else {
                toast.error("Failed to add department");
            }
        } catch (error) {
            console.error('Error while adding department:', error);
            toast.error("An error occurred while adding the department");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center bg-blue-100 p-6 rounded-lg max-w-md mx-auto shadow-md">
            <h2 className="mb-4 text-2xl text-blue-900">Add Department</h2>

            <input
                type="text"
                name="department_name"
                placeholder="Enter department name"
                value={formData.department_name}
                onChange={handleInputChange}
                className="p-2 text-lg w-full mb-2 border border-blue-900 rounded"
            />

            <select
                name="building_id"
                value={formData.building_id}
                onChange={handleInputChange}
                className="p-2 text-lg w-full mb-2 border border-blue-900 rounded"
            >
                <option value="">Select a Building</option>
                {buildings.map((building) => (
                    <option key={building.build_id} value={building.build_id}>
                        {building.build_name}
                    </option>
                ))}
            </select>

            <button
                onClick={handleAdd}
                className={`p-2 text-lg text-white rounded transition duration-300 ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                disabled={loading}
            >
                {loading ? 'Adding...' : 'Add Department'}
            </button>
        </div>
    );
}

export default AddDepartmentModal;
