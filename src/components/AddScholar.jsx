import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import secureLocalStorage from 'react-secure-storage';
import Select from 'react-select';

const AddScholar = () => {
    const [formData, setFormData] = useState({
        stud_id: '',
        stud_active_academic_session_id: '',
        stud_name: '',
        stud_scholarship_id: '',
        stud_department_id: '',
        stud_course_id: '',
        stud_active_year_id: '',
        stud_contactNumber: '',
        stud_email: '',
        stud_active_percent_id: '',
        stud_active_amount: '',
        stud_active_applied_on_tuition: '',
        stud_active_applied_on_misc: '',
        stud_date: '',
        stud_modified_by: '',
        stud_modified_date: '',
        stud_active_status_id: '',
    });

    const [departments, setDepartments] = useState([]);
    const [courses, setCourses] = useState([]);
    const [yearLevels, setYearLevels] = useState([]);
    const [scholarshipTypes, setScholarshipTypes] = useState([]);
    const [percentages, setPercentages] = useState([]);
    const [status, setStatus] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = secureLocalStorage.getItem('url') + 'CSDL.php';
                const formData = new FormData();
                formData.append('operation', 'getAddScholarDropDown');
                const res = await axios.post(url, formData);

                setDepartments(res.data.department || []);
                setCourses(res.data.course || []);
                setYearLevels(res.data.year || []);
                setScholarshipTypes(res.data.scholarshipType || []);
                setPercentages(res.data.scholarshipSub || []);
                setStatus(res.data.status || []);

                toast.success('Form data loaded successfully');
            } catch (error) {
                toast.error('Failed to load form data');
            }
        };
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value }); // Removed .trim()
    };


    const handleComboBoxChange = (selectedOption, field) => {
        setFormData({ ...formData, [field]: selectedOption ? selectedOption.value : '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = secureLocalStorage.getItem('url') + 'CSDL.php';
            console.log('Submitting Form Data:', formData);

            const jsonData = JSON.stringify(formData);
            console.log('JSON Data Sent:', jsonData);

            const formDataToSend = new FormData();
            formDataToSend.append('json', jsonData);
            formDataToSend.append('operation', 'AddScholar');

            const res = await axios.post(url, formDataToSend);

            console.log('Server Response:', res.data); // Log API response

            if (res.data === 1) {
                toast.success('Scholar added successfully');
                setFormData({
                    stud_id: '',
                    stud_active_academic_session_id: '',
                    stud_name: '',
                    stud_scholarship_id: '',
                    stud_department_id: '',
                    stud_course_id: '',
                    stud_active_year_id: '',
                    stud_contactNumber: '',
                    stud_email: '',
                    stud_active_percent_id: '',
                    stud_active_amount: '',
                    stud_active_applied_on_tuition: '',
                    stud_active_applied_on_misc: '',
                    stud_date: '',
                    stud_modified_by: '',
                    stud_modified_date: '',
                    stud_active_status_id: '',
                });
            } else {
                toast.error('Failed to add scholar');
            }
        } catch (error) {
            console.error('API Error:', error);
            toast.error('An error occurred while adding scholar');
        }
    };


    return (
        <div className="flex flex-col items-center bg-blue-100 p-6 rounded-lg max-w-md mx-auto shadow-md">
            <h2 className="mb-4 text-2xl text-blue-900">Add Scholar</h2>

            <input type="text" name="stud_id" placeholder="Student ID" value={formData.stud_id} onChange={handleInputChange} className="p-2 text-lg w-full mb-2 border border-blue-900 rounded" required />
            <input type="text" name="stud_active_academic_session_id" placeholder="Academic Session" value={formData.stud_active_academic_session_id} onChange={handleInputChange} className="p-2 text-lg w-full mb-2 border border-blue-900 rounded" />
            <input type="text" name="stud_name" placeholder="Full Name" value={formData.stud_name} onChange={handleInputChange} className="p-2 text-lg w-full mb-2 border border-blue-900 rounded" required />

            <Select options={scholarshipTypes.map(s => ({ label: s.type_name, value: s.type_id }))} onChange={(option) => handleComboBoxChange(option, 'stud_scholarship_id')} placeholder="Select Scholarship" className="mb-2" isClearable required />
            <Select options={departments.map(dept => ({ label: dept.dept_name, value: dept.dept_id }))} onChange={(option) => handleComboBoxChange(option, 'stud_department_id')} placeholder="Select Department" className="mb-2" isClearable required />
            <Select options={courses.map(course => ({ label: course.course_name, value: course.course_id }))} onChange={(option) => handleComboBoxChange(option, 'stud_course_id')} placeholder="Select Course" className="mb-2" isClearable required />
            <Select options={yearLevels.map(year => ({ label: year.year_name, value: year.year_id }))} onChange={(option) => handleComboBoxChange(option, 'stud_active_year_id')} placeholder="Select Year Level" className="mb-2" isClearable required />
            <Select options={percentages.map(p => ({ label: p.percent_name, value: p.percent_id }))} onChange={(option) => handleComboBoxChange(option, 'stud_active_percent_id')} placeholder="Select Percentage" className="mb-2" isClearable required />
            <Select options={status.map(s => ({ label: s.status_name, value: s.status_id }))} onChange={(option) => handleComboBoxChange(option, 'stud_active_status_id')} placeholder="Select Status" className="mb-2" isClearable required />

            <input type="text" name="stud_contactNumber" placeholder="Contact Number" value={formData.stud_contactNumber} onChange={handleInputChange} className="p-2 text-lg w-full mb-2 border border-blue-900 rounded" />
            <input type="email" name="stud_email" placeholder="Email" value={formData.stud_email} onChange={handleInputChange} className="p-2 text-lg w-full mb-2 border border-blue-900 rounded" />
            <input type="text" name="stud_active_amount" placeholder="Scholarship Amount" value={formData.stud_active_amount} onChange={handleInputChange} className="p-2 text-lg w-full mb-2 border border-blue-900 rounded" />

            <input type="text" name="stud_active_applied_on_tuition" placeholder="Applied on Tuition" value={formData.stud_active_applied_on_tuition} onChange={handleInputChange} className="p-2 text-lg w-full mb-2 border border-blue-900 rounded" />
            <input type="text" name="stud_active_applied_on_misc" placeholder="Applied on Miscellaneous" value={formData.stud_active_applied_on_misc} onChange={handleInputChange} className="p-2 text-lg w-full mb-2 border border-blue-900 rounded" />

            <input type="date" name="stud_date" value={formData.stud_date} onChange={handleInputChange} className="p-2 text-lg w-full mb-2 border border-blue-900 rounded" />
            <input type="text" name="stud_modified_by" placeholder="Modified By" value={formData.stud_modified_by} onChange={handleInputChange} className="p-2 text-lg w-full mb-2 border border-blue-900 rounded" />
            <input type="date" name="stud_modified_date" value={formData.stud_modified_date} onChange={handleInputChange} className="p-2 text-lg w-full mb-2 border border-blue-900 rounded" />

            <button onClick={handleSubmit} className="p-2 text-lg bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300">Submit</button>
        </div>
    );
};

export default AddScholar;
