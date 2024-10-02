import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import secureLocalStorage from 'react-secure-storage';

function AddCourse() {
    const [formData, setFormData] = useState({
        course: "",
        department: ""
    });
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        const getDepartments = async () => {
            try {
                const url = secureLocalStorage.getItem("url") + "CSDL.php";
                const formData = new FormData();
                formData.append("operation", "getDepartment");
                const res = await axios.post(url, formData);
                setDepartments(res.data);
                toast.success("Departments loaded successfully");

                console.log('Departments:', res.data);
            } catch (error) {
                console.log('Failed to load departments:', error);
                toast.error("Failed to load departments");
            }
        };

        getDepartments();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            const url = secureLocalStorage.getItem("url") + "CSDL.php";

            const jsonData = {
                crs_name: formData.course,
                crs_dept_id: formData.department,

            };

            const formDataToSend = new FormData();
            formDataToSend.append("json", JSON.stringify(jsonData));
            formDataToSend.append("operation", "addCourse");

            const res = await axios.post(url, formDataToSend);

            if (res.data !== 0) {
                toast.success("Course added successfully");
            } else {
                toast.error("Failed to add Course");
            }
        } catch (error) {
            console.log(error);
            toast.error("An error occurred while adding the Course");
        }
    };




    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Add Course</h2>

            <input
                type="text"
                name="course"
                placeholder="Enter Course Name"
                value={formData.course}
                onChange={handleInputChange}
                style={styles.input}
            />

            <select
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                style={styles.select}
            >
                <option value="">Select Department</option>
                {departments.map((dept, index) => (
                    <option key={index} value={dept.dept_id}>
                        {dept.dept_name}
                    </option>
                ))}
            </select>

            <button onClick={handleAdd} style={styles.button}>
                Add
            </button>
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
    select: {
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

export default AddCourse;
