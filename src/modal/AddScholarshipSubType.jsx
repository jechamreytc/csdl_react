import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';

function AddScholarshipSubType() {
    const [formData, setFormData] = useState({
        sub_type_name: "",
    });

    // Function to handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Function to handle adding scholarship sub type
    const handleAdd = async () => {
        try {
            const url = secureLocalStorage.getItem("url") + "CSDL.php";

            const jsonData = {
                sub_type_name: formData.sub_type_name,
            };

            const formDataToSend = new FormData();
            formDataToSend.append("json", JSON.stringify(jsonData));
            formDataToSend.append("operation", "addscholarshipsubtype"); // Updated operation for scholarship subtype

            const res = await axios.post(url, formDataToSend);

            if (res.data !== 0) {
                toast.success("Scholarship sub type added successfully");
                setFormData({ sub_type_name: "" }); // Reset the form after success
            } else {
                toast.error("Failed to add scholarship sub type");
            }
        } catch (error) {
            console.log(error);
            toast.error("An error occurred while adding the scholarship sub type");
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
                color: '#0d47a1'
            }}>Add Scholarship Sub Type</h2>
            <input
                type="text"
                name="sub_type_name" // Name matches the key in state
                placeholder="Enter scholarship sub type"
                value={formData.sub_type_name}
                onChange={handleInputChange}
                style={{
                    padding: '10px',
                    fontSize: '16px',
                    width: '100%',
                    marginBottom: '10px',
                    border: '1px solid #0d47a1',
                    borderRadius: '4px'
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
                transition: 'background-color 0.3s ease'
            }}>
                Add
            </button>

            <ToastContainer />
        </div>
    );
}

export default AddScholarshipSubType;
