import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import secureLocalStorage from 'react-secure-storage';


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
            console.log("HELLO JSONDATA", jsonData);

            const formDataToSend = new FormData();
            formDataToSend.append('json', JSON.stringify(jsonData));
            formDataToSend.append('operation', 'AddScholar');

            const res = await axios.post(url, formDataToSend);
            console.log("HELLO RES DATA", res.data);
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

                    <div className="w-full">
                        <label className="block text-sm font-medium">Enter School ID*</label>
                        <input
                            type="text"
                            name="studId"
                            value={formData.studId}
                            onChange={handleInputChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="School ID"
                            required
                        />
                    </div>


                    <div className="flex flex-wrap -mx-2">
                        <div className="w-full sm:w-1/3 px-2">
                            <label className="block text-sm font-medium">First Name*</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="First Name"
                                required
                            />
                        </div>
                        <div className="w-full sm:w-1/3 px-2">
                            <label className="block text-sm font-medium">Middle Name</label>
                            <input
                                type="text"
                                name="middleName"
                                value={formData.middleName}
                                onChange={handleInputChange}
                                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="Middle Name"
                            />
                        </div>
                        <div className="w-full sm:w-1/3 px-2">
                            <label className="block text-sm font-medium">Last Name*</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="Last Name"
                                required
                            />
                        </div>
                    </div>


                    <div className="flex flex-wrap -mx-2">
                        <div className="w-full sm:w-1/2 px-2">
                            <label className="block text-sm font-medium">Select Course*</label>
                            <select
                                name="course"
                                value={formData.course}
                                onChange={handleInputChange}
                                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            >
                                <option value="">Select Course</option>
                                {courses.map((course, index) => (
                                    <option key={index} value={course.crs_id}>
                                        {course.crs_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="w-full sm:w-1/2 px-2">
                            <label className="block text-sm font-medium">Select Year Level*</label>
                            <select
                                name="yearLevel"
                                value={formData.yearLevel}
                                onChange={handleInputChange}
                                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            >
                                <option value="">Select Year Level</option>
                                {yearLevels.map((level, index) => (
                                    <option key={index} value={level.year_level_id}>
                                        {level.year_level_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Scholarship Type, Sub-Type */}
                    <div className="flex flex-wrap -mx-2">
                        <div className="w-full sm:w-1/2 px-2">
                            <label className="block text-sm font-medium">Scholarship Type*</label>
                            <select
                                name="scholarshipType"
                                value={formData.scholarshipType}
                                onChange={handleInputChange}
                                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            >
                                <option value="">Select Scholarship Type</option>
                                {scholarshipTypes.map((type, index) => (
                                    <option key={index} value={type.type_id}>
                                        {type.type_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="w-full sm:w-1/2 px-2">
                            <label className="block text-sm font-medium">Scholarship Sub-Type*</label>
                            <select
                                name="scholarshipSub"
                                value={formData.scholarshipSub}
                                onChange={handleInputChange}
                                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            >
                                <option value="">Select Scholarship Sub-Type</option>
                                {scholarshipSub.map((sub, index) => (
                                    <option key={index} value={sub.stype_id}>
                                        {sub.stype_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Scholarship Modality */}
                    <div className="w-full">
                        <label className="block text-sm font-medium">Modality*</label>
                        <select
                            name="modality"
                            value={formData.modality}
                            onChange={handleInputChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        >
                            <option value="">Select Modality</option>
                            {modalities.map((modality, index) => (
                                <option key={index} value={modality.stypeScholar_id}>
                                    {modality.stypeScholar_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Contact Number, Email */}
                    <div className="flex flex-wrap -mx-2">
                        <div className="w-full sm:w-1/2 px-2">
                            <label className="block text-sm font-medium">Contact Number*</label>
                            <input
                                type="text"
                                name="contactNumber"
                                value={formData.contactNumber}
                                onChange={handleInputChange}
                                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="Contact Number"
                                required
                            />
                        </div>
                        <div className="w-full sm:w-1/2 px-2">
                            <label className="block text-sm font-medium">Email*</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="Email"
                                required
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
