import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import secureLocalStorage from 'react-secure-storage';

function AddSubject() {
    const [formData, setFormData] = useState({
        subject_code: "",
        subject_name: "",
        subject_description: "",
        subject_section: "",
        face_to_face_day: "",
        remote_day: "",
        subject_time_rc: "",
        supervisor: "",
        learning_modality: ""
    });

    const [subjects, setSubjects] = useState([]);
    const [supervisors, setSupervisors] = useState([]);
    const [learningModalities, setLearningModalities] = useState([]);

    useEffect(() => {
        const getSubjects = async () => {
            try {
                const url = secureLocalStorage.getItem("url") + "CSDL.php";
                const formData = new FormData();
                formData.append("operation", "getSubjects");
                const res = await axios.post(url, formData);

                if (Array.isArray(res.data)) {
                    setSubjects(res.data);
                    toast.success("Subjects loaded successfully");
                } else {
                    toast.error("Unexpected data format");
                }
            } catch (error) {
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
        const subjectExists = subjects.find(
            (subject) => subject.subject_name?.toLowerCase() === formData.subject_name.toLowerCase()
        );
        if (subjectExists) {
            toast.error("Subject with the same name already exists.");
            return;
        }
        try {
            const url = secureLocalStorage.getItem("url") + "CSDL.php";
            const jsonData = { ...formData };
            const formDataToSend = new FormData();
            formDataToSend.append("json", JSON.stringify(jsonData));
            formDataToSend.append("operation", "AddSubject");
            const res = await axios.post(url, formDataToSend);

            if (res.data !== 0) {
                toast.success("Subject added successfully");
                setFormData({
                    subject_code: "",
                    subject_name: "",
                    subject_description: "",
                    subject_section: "",
                    face_to_face_day: "",
                    remote_day: "",
                    subject_time_rc: "",
                    supervisor: "",
                    learning_modality: ""
                });
            } else {
                toast.error("Failed to add Subject");
            }
        } catch (error) {
            toast.error("An error occurred while adding the Subject");
        }
    };

    return (
        <div className="flex flex-col items-center bg-blue-100 p-6 rounded-lg max-w-md mx-auto shadow-md">
            <h2 className="mb-4 text-2xl text-blue-900">Add Subject</h2>
            <input type="text" name="subject_code" placeholder="Subject Code" value={formData.subject_code} onChange={handleInputChange} className="p-2 w-full mb-2 border rounded" />

            <input type="text" name="subject_description" placeholder="Subject Description" value={formData.subject_description} onChange={handleInputChange} className="p-2 w-full mb-2 border rounded" />
            <input type="text" name="subject_section" placeholder="Subject Section" value={formData.subject_section} onChange={handleInputChange} className="p-2 w-full mb-2 border rounded" />

            <select name="face_to_face_day" value={formData.face_to_face_day} onChange={handleInputChange} className="p-2 w-full mb-2 border rounded">
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(day => (
                    <option key={day} value={day}>{day}</option>
                ))}
            </select>

            <select name="remote_day" value={formData.remote_day} onChange={handleInputChange} className="p-2 w-full mb-2 border rounded">
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(day => (
                    <option key={day} value={day}>{day}</option>
                ))}
            </select>

            <input type="text" name="subject_time_rc" placeholder="Subject Time RC" value={formData.subject_time_rc} onChange={handleInputChange} className="p-2 w-full mb-2 border rounded" />

            <select name="supervisor" value={formData.supervisor} onChange={handleInputChange} className="p-2 w-full mb-2 border rounded">
                <option value="">Select Supervisor</option>
                {supervisors.map(sup => (
                    <option key={sup.id} value={sup.name}>{sup.name}</option>
                ))}
            </select>

            <select name="learning_modality" value={formData.learning_modality} onChange={handleInputChange} className="p-2 w-full mb-2 border rounded">
                <option value="">Select Learning Modality</option>
                {learningModalities.map(mod => (
                    <option key={mod.id} value={mod.name}>{mod.name}</option>
                ))}
            </select>

            <button onClick={handleAdd} className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300">
                Add
            </button>
        </div>
    );
}

export default AddSubject;
