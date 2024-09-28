import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';

function AddScholarshipType() {
    const [formData, setFormData] = useState({
        scholarship_type_name: "",
    });

    // Function to handle input change
    function handleInputChange(e) {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    // Function to handle adding scholarship type
    async function handleAdd() {
        try {
            const url = secureLocalStorage.getItem("url") + "CSDL.php";

            const jsonData = {
                scholarship_type_name: formData.scholarship_type_name,
            };

            const formDataToSend = new FormData();
            formDataToSend.append("json", JSON.stringify(jsonData));
            formDataToSend.append("operation", "addscholarshiptype");

            const res = await axios.post(url, formDataToSend);

            if (res.data !== 0) {
                toast.success("Scholarship Type added successfully");
                setFormData({ scholarship_type_name: "" });
            } else {
                toast.error("Failed to add scholarship type");
            }
        } catch (error) {
            console.log(error);
            toast.error("An error occurred while adding the scholarship type");
        }
    }

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
            }}>Add Scholarship Type</h2>
            <input
                type="text"
                name="scholarship_type_name"
                placeholder="Enter scholarship type name"
                value={formData.scholarship_type_name}
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

export default AddScholarshipType;
