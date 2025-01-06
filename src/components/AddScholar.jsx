import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import secureLocalStorage from 'react-secure-storage';
import Select from 'react-select';

const AddScholar = () => {
    const [formData, setFormData] = useState({
        studId: '',
        firstName: '',
        lastName: '',
        middleName: '',
        course: '',
        yearLevel: '',
        scholarshipType: '',
        scholarshipSub: '',
        contactNumber: '',
        email: '',
        modality: '',
    });

    const [yearLevels, setYearLevels] = useState([]);
    const [courses, setCourses] = useState([]);
    const [scholarshipSub, setScholarshipSub] = useState([]);
    const [scholarshipTypes, setScholarshipTypes] = useState([]);
    const [modalities, setModalities] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = secureLocalStorage.getItem('url') + 'CSDL.php';
                const formData = new FormData();
                formData.append('operation', 'getAddScholarDropDown');
                const res = await axios.post(url, formData);

                setYearLevels(res.data.yearLevel);
                setCourses(res.data.course);
                setScholarshipTypes(res.data.scholarshipType);
                setScholarshipSub(res.data.scholarshipSub);
                setModalities(res.data.modality);

                toast.success('Form data loaded successfully');
            } catch (error) {
                toast.error('Failed to load form data');
            }
        };

        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleComboBoxChange = (selectedOption, field) => {
        setFormData({
            ...formData,
            [field]: selectedOption ? selectedOption.value : ''
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = secureLocalStorage.getItem('url') + 'CSDL.php';
            const jsonData = {
                stud_school_id: formData.studId,
                stud_first_name: formData.firstName,
                stud_last_name: formData.lastName,
                stud_middle_name: formData.middleName,
                stud_year_level: formData.yearLevel,
                stud_course_id: formData.course,
                stud_scholarship_type_id: formData.scholarshipType,
                stud_scholarship_sub_type_id: formData.scholarshipSub,
                stud_contact_number: formData.contactNumber,
                stud_email: formData.email,
                stud_typeScholar_id: formData.modality,
            };

            const formDataToSend = new FormData();
            formDataToSend.append('json', JSON.stringify(jsonData));
            formDataToSend.append('operation', 'AddScholar');

            const res = await axios.post(url, formDataToSend);
            if (res.data !== 0) {
                toast.success('Scholar added successfully');
            } else {
                toast.error('Failed to add scholar');
            }
        } catch (error) {
            toast.error('An error occurred while adding scholar');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-80">
            <div className="bg-white text-gray-800 rounded-lg shadow-lg w-full max-w-3xl p-6">
                <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Add Scholar</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium">Student ID*</label>
                            <input
                                type="text"
                                name="studId"
                                value={formData.studId}
                                onChange={handleInputChange}
                                className="mt-1 p-2 w-full border rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">First Name*</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                className="mt-1 p-2 w-full border rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Last Name*</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                className="mt-1 p-2 w-full border rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Middle Name</label>
                            <input
                                type="text"
                                name="middleName"
                                value={formData.middleName}
                                onChange={handleInputChange}
                                className="mt-1 p-2 w-full border rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Course*</label>
                            <Select
                                options={courses.map(course => ({ label: course.crs_name, value: course.crs_id }))}
                                onChange={(selectedOption) => handleComboBoxChange(selectedOption, 'course')}
                                placeholder="Select Course"
                                isClearable
                                className="mt-1"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Year Level*</label>
                            <Select
                                options={yearLevels.map(level => ({ label: level.year_level_name, value: level.year_level_id }))}
                                onChange={(selectedOption) => handleComboBoxChange(selectedOption, 'yearLevel')}
                                placeholder="Select Year Level"
                                isClearable
                                className="mt-1"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Scholarship Type*</label>
                            <Select
                                options={scholarshipTypes.map(type => ({ label: type.type_name, value: type.type_id }))}
                                onChange={(selectedOption) => handleComboBoxChange(selectedOption, 'scholarshipType')}
                                placeholder="Select Scholarship Type"
                                isClearable
                                className="mt-1"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Scholarship Sub Type*</label>
                            <Select
                                options={scholarshipSub.map(sub => ({ label: sub.stype_name, value: sub.stype_id }))}
                                onChange={(selectedOption) => handleComboBoxChange(selectedOption, 'scholarshipSub')}
                                placeholder="Select Scholarship Sub Type"
                                isClearable
                                className="mt-1"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Contact Number</label>
                            <input
                                type="text"
                                name="contactNumber"
                                value={formData.contactNumber}
                                onChange={handleInputChange}
                                className="mt-1 p-2 w-full border rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="mt-1 p-2 w-full border rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Modality</label>
                            <Select
                                options={modalities.map(mod => ({ label: mod.stypeScholar_name, value: mod.stypeScholar_id }))}
                                onChange={(selectedOption) => handleComboBoxChange(selectedOption, 'modality')}
                                placeholder="Select Modality"
                                isClearable
                                className="mt-1"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddScholar;
