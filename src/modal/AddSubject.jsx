import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import secureLocalStorage from 'react-secure-storage';

function AddSubject() {
    const [formData, setFormData] = useState({
        subject_code: "",
        subject_name: ""
    });
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        const getSubjects = async () => {
            try {
                const url = secureLocalStorage.getItem("url") + "CSDL.php";
                const formData = new FormData();
                formData.append("operation", "getSubjects");
                const res = await axios.post(url, formData);

                console.log(res.data);
                if (Array.isArray(res.data)) {
                    setSubjects(res.data);
                    toast.success("Subjects loaded successfully");
                } else {
                    console.log('Unexpected response format:', res.data);
                    toast.error("Unexpected data format");
                }
            } catch (error) {
                console.log('Failed to load subjects:', error);
                toast.error("Failed to load subjects");
            }
        };
        getSubjects();
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

        // Validation: Check if the subject already exists
        const subjectExists = subjects.find(
            (subject) => subject.subject_name?.toLowerCase() === formData.subject_name.toLowerCase()
        );

        if (subjectExists) {
            toast.error("Subject with the same name already exists.");
            return; // Prevent form submission if subject exists
        }

        try {
            const url = secureLocalStorage.getItem("url") + "CSDL.php";
            const jsonData = {
                subject_code: formData.subject_code,
                subject_name: formData.subject_name
            };

            const formDataToSend = new FormData();
            formDataToSend.append("json", JSON.stringify(jsonData));
            formDataToSend.append("operation", "AddSubject");
            const res = await axios.post(url, formDataToSend);

            if (res.data !== 0) {
                toast.success("Subject added successfully");
                setFormData({
                    subject_name: "",
                    subject_code: ""
                });
            } else if (res.data === -1) {
                toast.error("Subject already exists");
            } else {
                toast.error("Failed to add Subject");
            }

        } catch (error) {
            console.log(error);
            toast.error("An error occurred while adding the Subject");
        }
    };

    return (
        <div className="flex flex-col items-center bg-blue-100 p-6 rounded-lg max-w-md mx-auto shadow-md">
            <h2 className="mb-4 text-2xl text-blue-900">Add Subject</h2>

            <input
                type="text"
                name="subject_code" // Corrected name for subject code
                placeholder="Enter Subject Code"
                value={formData.subject_code}
                onChange={handleInputChange}
                className="p-2 text-lg w-full mb-2 border border-blue-900 rounded"
            />

            <input
                type="text"
                name="subject_name" // Corrected name for subject name
                placeholder="Enter Subject Name"
                value={formData.subject_name}
                onChange={handleInputChange}
                className="p-2 text-lg w-full mb-2 border border-blue-900 rounded"
            />

            <button
                onClick={handleAdd}
                className="p-2 text-lg bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
            >
                Add
            </button>
        </div>
    );
}

export default AddSubject;
