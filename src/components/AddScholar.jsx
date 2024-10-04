import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import secureLocalStorage from 'react-secure-storage';
import { ArrowBigDownDash, ArrowLeftIcon } from 'lucide-react';

const AddScholar = () => {
    const [formData, setFormData] = useState({
        studId: '',
        firstName: '',
        lastName: '',
        yearLevel: '',
        course: '',
        scholarshipType: '',
        scholarshipSub: '',
    });
    const [yearLevels, setYearLevels] = useState([]);
    const [courses, setCourses] = useState([]);
    const [scholarshipSub, setScholarshipSub] = useState([]);
    const [scholarshipTypes, setScholarshipTypes] = useState([]);


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
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = secureLocalStorage.getItem('url') + 'CSDL.php';

            const jsonData = {

                stud_school_id: formData.schoolId,
                stud_firstname: formData.firstName,
                stud_lastname: formData.lastName,
                stud_year_level: formData.yearLevel,
                stud_course_id: formData.course,
                scholarship_type_id: formData.scholarshipType,
                stud_scholarship_sub_id: formData.scholarshipSub,
                stud_school_id: formData.studId,


            };
            console.log("jsonData ni handleSubmit", JSON.stringify(jsonData));
            const formDataToSend = new FormData();
            formDataToSend.append('json', JSON.stringify(jsonData));
            formDataToSend.append('operation', 'addScholar');

            const res = await axios.post(url, formDataToSend);
            console.log("res ni handle submit", res.data);
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

        <div div className="flex" >
            <form className="space-y-6" onSubmit={handleSubmit}>

                <div className="flex space-x-4">

                    <div className="w-1/2">
                        <label className="block text-sm font-medium text-white">Enter School ID*</label>
                        <input
                            type="text"
                            name="studId"
                            value={formData.studId}
                            onChange={handleInputChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="School ID"
                            required
                        />
                    </div>

                    <div className="w-1/2">
                        <label className="block text-sm font-medium text-white">First Name*</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="First Name"
                            required
                        />
                    </div>
                    <div className="w-1/2">
                        <label className="block text-sm font-medium text-white">Last Name*</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="Last Name"
                            required
                        />
                    </div>
                </div>

                <div className="w-full">
                    <label className="block text-sm font-medium text-white">Select Year Level*</label>
                    <select
                        name="yearLevel"
                        value={formData.yearLevel}
                        onChange={handleInputChange}
                        className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                    >
                        <option value="">Select Year Level</option>
                        {yearLevels.length > 0 ? yearLevels.map((level, index) => (
                            <option key={index} value={level.school_year_level}>
                                {level.school_year_level}
                            </option>
                        )) : (<p>No School Year Yet</p>)}
                    </select>
                </div>


                <div className="w-full">
                    <label className="block text-sm font-medium text-white">Select Course*</label>
                    <select
                        name="course"
                        value={formData.course}
                        onChange={handleInputChange}
                        className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                    >
                        <option value="">Select Course</option>
                        {courses.length > 0 ? courses.map((course, index) => (
                            <option key={index} value={course.crs_id}>
                                {course.crs_name}
                            </option>
                        )) : (<p>No Course Yet</p>)}
                    </select>
                </div>


                <div className="w-full">
                    <label className="block text-sm font-medium text-white">Select Scholarship Type*</label>
                    <select
                        name="scholarshipType"
                        value={formData.scholarshipType}
                        onChange={handleInputChange}
                        className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                    >
                        <option value="">Select Scholarship Type</option>
                        {scholarshipTypes.length > 0 ? scholarshipTypes.map((type, index) => (
                            <option key={index} value={type.type_id}>
                                {type.type_name}
                            </option>
                        )) : (<p>No Scholarship Yet</p>)}
                    </select>
                </div>
                <div className="w-full">
                    <label className="block text-sm font-medium text-white">Select Scholarship Sub*</label>
                    <select
                        name="scholarshipSub"
                        value={formData.scholarshipSub}
                        onChange={handleInputChange}
                        className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                    >
                        <option value="">Select Scholarship Sub</option>
                        {scholarshipSub.length > 0 ? scholarshipSub.map((sub, index) => (
                            <option key={index} value={sub.stype_id}>
                                {sub.stype_name}
                            </option>
                        )) : (<p>No Scholarship Sub Type Yet</p>)}
                    </select>
                </div>

                <div className="flex justify-between">
                    <button
                        type="button"
                        className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600"
                    >
                        Open Batch
                    </button>
                    <button
                        type="submit"
                        className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600"
                    >
                        Add Scholar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddScholar;
