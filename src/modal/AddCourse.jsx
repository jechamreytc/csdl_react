import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddSchoolYear() {
    const [schoolYear, setSchoolYear] = useState('');

    const handleAdd = () => {
        if (schoolYear) {
            toast.success(`School Year "${schoolYear}" added!`);
            setSchoolYear('');
        } else {
            toast.error("Please enter a school year.");
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Add Courser</h2>
            <input
                type="text"
                placeholder="Enter Course"
                value={schoolYear}
                onChange={(e) => setSchoolYear(e.target.value)}
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
        color: '#0d47a1', // Dark blue heading
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
        backgroundColor: '#1e88e5', // Blue button
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
};

export default AddSchoolYear;
