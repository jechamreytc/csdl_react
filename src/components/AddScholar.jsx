import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import secureLocalStorage from 'react-secure-storage';
import Select from 'react-select';

const AddScholar = () => {
    const [formData, setFormData] = useState({
        studId: '',
        academicSession: '',
        fullname: '',
        scholarship: '',
        department: '',
        course: '',
        yearLevel: '',
        contactNumber: '',
        email: '',
        percent: '',
        amount: '',
        activeAppliedOnTuition: '',
        activeAppliedOnMisc: '',
        date: '',
        modifiedBy: '',
        modifiedDate: '',
    });

    const [departments, setDepartments] = useState([]);
    const [courses, setCourses] = useState([]);
    const [yearLevels, setYearLevels] = useState([]);
    const [scholarshipTypes, setScholarshipTypes] = useState([]);
    const [percentages, setPercentages] = useState([]);

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
                toast.success('Form data loaded successfully');
            } catch (error) {
                toast.error('Failed to load form data');
            }
        };
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value.trim() });
    };

    const handleComboBoxChange = (selectedOption, field) => {
        setFormData({ ...formData, [field]: selectedOption ? selectedOption.value : '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = secureLocalStorage.getItem('url') + 'CSDL.php';
            const jsonData = JSON.stringify(formData);
            console.log('JSON Data:', jsonData);
            const formDataToSend = new FormData();
            formDataToSend.append('json', jsonData);
            formDataToSend.append('operation', 'AddScholar');

            const res = await axios.post(url, formDataToSend);

            if (res.data !== 0) {
                toast.success('Scholar added successfully');
                setFormData({
                    studId: '', academicSession: '', fullname: '', scholarship: '', department: '', course: '',
                    yearLevel: '', contactNumber: '', email: '', percent: '', amount: '',
                    activeAppliedOnTuition: '', activeAppliedOnMisc: '', date: '',
                    modifiedBy: '', modifiedDate: '',
                });
            } else {
                toast.error('Failed to add scholar');
            }
        } catch (error) {
            toast.error('An error occurred while adding scholar');
        }
    };

    return (
        <div className="flex flex-col items-center bg-blue-100 p-6 rounded-lg max-w-md mx-auto shadow-md">
            <h2 className="mb-4 text-2xl text-blue-900">Add Scholar</h2>

            <input type="text" name="studId" placeholder="Student ID" value={formData.studId} onChange={handleInputChange} className="p-2 text-lg w-full mb-2 border border-blue-900 rounded" required />
            <input type="text" name="academicSession" placeholder="Academic Session" value={formData.academicSession} onChange={handleInputChange} className="p-2 text-lg w-full mb-2 border border-blue-900 rounded" />
            <input type="text" name="fullname" placeholder="Full Name" value={formData.fullname} onChange={handleInputChange} className="p-2 text-lg w-full mb-2 border border-blue-900 rounded" required />

            <Select options={scholarshipTypes.map(s => ({ label: s.scholarship_name, value: s.scholarship_id }))} onChange={(option) => handleComboBoxChange(option, 'scholarship')} placeholder="Select Scholarship" className="mb-2" isClearable required />
            <Select options={departments.map(dept => ({ label: dept.dept_name, value: dept.dept_id }))} onChange={(option) => handleComboBoxChange(option, 'department')} placeholder="Select Department" className="mb-2" isClearable required />
            <Select options={courses.map(course => ({ label: course.course_name, value: course.course_id }))} onChange={(option) => handleComboBoxChange(option, 'course')} placeholder="Select Course" className="mb-2" isClearable required />
            <Select options={yearLevels.map(year => ({ label: year.year_name, value: year.year_id }))} onChange={(option) => handleComboBoxChange(option, 'yearLevel')} placeholder="Select Year Level" className="mb-2" isClearable required />
            <Select options={percentages.map(p => ({ label: p.percent_name, value: p.percent_id }))} onChange={(option) => handleComboBoxChange(option, 'percent')} placeholder="Select Percentage" className="mb-2" isClearable required />

            <input type="text" name="contactNumber" placeholder="Contact Number" value={formData.contactNumber} onChange={handleInputChange} className="p-2 text-lg w-full mb-2 border border-blue-900 rounded" />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} className="p-2 text-lg w-full mb-2 border border-blue-900 rounded" />
            <input type="text" name="amount" placeholder="Scholarship Amount" value={formData.amount} onChange={handleInputChange} className="p-2 text-lg w-full mb-2 border border-blue-900 rounded" />

            <input type="text" name="activeAppliedOnTuition" placeholder="Applied on Tuition" value={formData.activeAppliedOnTuition} onChange={handleInputChange} className="p-2 text-lg w-full mb-2 border border-blue-900 rounded" />
            <input type="text" name="activeAppliedOnMisc" placeholder="Applied on Miscellaneous" value={formData.activeAppliedOnMisc} onChange={handleInputChange} className="p-2 text-lg w-full mb-2 border border-blue-900 rounded" />

            <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="p-2 text-lg w-full mb-2 border border-blue-900 rounded" />
            <input type="text" name="modifiedBy" placeholder="Modified By" value={formData.modifiedBy} onChange={handleInputChange} className="p-2 text-lg w-full mb-2 border border-blue-900 rounded" />
            <input type="date" name="modifiedDate" value={formData.modifiedDate} onChange={handleInputChange} className="p-2 text-lg w-full mb-2 border border-blue-900 rounded" />

            <button onClick={handleSubmit} className="p-2 text-lg bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300">Submit</button>
        </div>
    );
};

export default AddScholar;
