import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';

function AddSchoolYear() {
    const [formData, setFormData] = useState({
        sy_name: "",
    });

    // Function to handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Function to handle adding school year
    const handleAdd = async () => {
        try {
            const url = secureLocalStorage.getItem("url") + "CSDL.php";

            const jsonData = {
                sy_name: formData.sy_name,
            };

            const formDataToSend = new FormData();
            formDataToSend.append("json", JSON.stringify(jsonData));
            formDataToSend.append("operation", "addschoolyear"); // Updated operation

            const res = await axios.post(url, formDataToSend);

            if (res.data !== 0) {
                toast.success("School year added successfully");
                setFormData({ sy_name: "" }); // Reset the form after success
            } else {
                toast.error("Failed to add school year");
            }
        } catch (error) {
            console.log(error);
            toast.error("An error occurred while adding the school year");
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Add School Year</h2>
            <input
                type="text"
                name="sy_name" // Name matches the key in state
                placeholder="Enter school year"
                value={formData.sy_name}
                onChange={handleInputChange}
                style={styles.input}
            />
            <button onClick={handleAdd} style={styles.button}>
                Add
            </button>

            <ToastContainer />
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#e3f2fd',
        padding: '20px',
        borderRadius: '8px',
        maxWidth: '400px',
        margin: 'auto',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    heading: {
        marginBottom: '20px',
        color: '#0d47a1',
    },
    input: {
        padding: '10px',
        fontSize: '16px',
        width: '100%',
        marginBottom: '10px',
        border: '1px solid #0d47a1',
        borderRadius: '4px',
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#1e88e5',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
};

export default AddSchoolYear;
