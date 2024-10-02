import React, { useState } from 'react';
import { toast } from 'sonner';
import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';

function AddScholarshipType() {

    const [formData, setFormData] = useState({
        scholarship_type: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Function to handle adding scholarship type
    const handleAdd = async () => {
        try {
            const url = secureLocalStorage.getItem("url") + "CSDL.php";

            const jsonData = {
                type_name: formData.scholarship_type,
            };

            const formDataToSend = new FormData();
            formDataToSend.append("json", JSON.stringify(jsonData));
            formDataToSend.append("operation", "addScholarshipType");

            const res = await axios.post(url, formDataToSend);

            if (res.data !== 0) {
                toast.success("Scholarship Type added successfully");
            } else {
                toast.error("Failed to add Scholarship Type");
            }
        } catch (error) {
            console.log(error);
            toast.error("An error occurred while adding the Scholarship Type");
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
            }}>Add Scholarship Type</h2>
            <input
                type="text"
                name="scholarship_type" // Corrected the name
                placeholder="Enter Scholarship Type"
                value={formData.scholarship_type}
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
        </div>
    );
}

export default AddScholarshipType;
