import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';

function AddDepartment() {
    const [formData, setFormData] = useState({
        department_name: "",
    });


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Function to handle adding department
    const handleAdd = async () => {
        try {
            const url = secureLocalStorage.getItem("url") + "CSDL.php";

            const jsonData = {
                department_name: formData.department_name,
            };

            const formDataToSend = new FormData();
            formDataToSend.append("json", JSON.stringify(jsonData));
            formDataToSend.append("operation", "adddepartment"); // Updated operation for department

            const res = await axios.post(url, formDataToSend);

            if (res.data !== 0) {
                toast.success("Department added successfully");
                setFormData({ department_name: "" }); // Reset the form after success
            } else {
                toast.error("Failed to add department");
            }
        } catch (error) {
            console.log(error);
            toast.error("An error occurred while adding the department");
        }
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#e3f2fd',
            padding: '20px',
            borderRadius: '8px',
            maxWidth: '400px',
            margin: 'auto',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
        }}>
            <h2 style={{
                marginBottom: '20px',
                color: '#0d47a1',
            }}>Add Department</h2>
            <input
                type="text"
                name="department_name" // Name matches the key in state
                placeholder="Enter department name"
                value={formData.department_name}
                onChange={handleInputChange}
                style={{
                    padding: '10px',
                    fontSize: '16px',
                    width: '100%',
                    marginBottom: '10px',
                    border: '1px solid #0d47a1',
                    borderRadius: '4px',
                }}
            />
            <button onClick={handleAdd} style={{
                padding: '10px 20px',
                fontSize: '16px',
                backgroundColor: '#1e88e5',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
            }}>
                Add
            </button>

            <ToastContainer />
        </div>
    );
}

export default AddDepartment;
