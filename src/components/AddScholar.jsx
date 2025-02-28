import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import secureLocalStorage from 'react-secure-storage';
import Select from 'react-select';
import AddDepartmentModal from '../modal/AddDepartment';

const AddScholar = () => {
    const [formData, setFormData] = useState({
        studId: '',
        academicSession: '',
        firstName: '',
        lastName: '',
        middleName: '',
        scholarship: '',
        department: '',
        course: '',
        yearLevel: '',
        contactNumber: '',
        email: '',
        percent: '',
        amount: '',
        modality: '',
        activeAppliedOnTuition: '',
        activeAppliedOnMisc: '',
        date: '',
        modifiedBy: '',
        modifiedDate: '',

    });

    const [yearLevels, setYearLevels] = useState([]);
    const [courses, setCourses] = useState([]);
    const [scholarshipTypes, setScholarshipTypes] = useState([]);
    const [modalities, setModalities] = useState([]);
    const [percent, setPercent] = useState([]);
    const [department, setDepartment] = useState([]);
    const [year, setYear] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = secureLocalStorage.getItem('url') + 'CSDL.php';
                const formData = new FormData();
                formData.append('operation', 'getAddScholarDropDown');
                const res = await axios.post(url, formData);

                setYearLevels(res.data.yearLevel || []);
                setCourses(res.data.course || []);
                setScholarshipTypes(res.data.scholarshipType || []);
                setModalities(res.data.modality || []);
                setPercent(res.data.scholarshipSub || []);
                setDepartment(res.data.department || []);
                setYear(res.data.year || []);

                toast.success('Form data loaded successfully');
            } catch (error) {
                toast.error('Failed to load form data');
                setModalities([]);
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
                stud_id: formData.studId,
                stud_academic_session_id: formData.academicSession,
                stud_name: formData.fullname,

                stud_scholarship_id: formData.scholarship,
                stud_department_id: formData.department,
                stud_course_id: formData.course,
                stud_year_level_id: formData.yearLevel,
                stud_contact_number: formData.contactNumber,
                stud_email: formData.email,
                stud_active_percent_id: formData.percent,
                stud_active_amount: formData.amount,
                // stud_modality_id: formData.modality,
                stud_active_applied_on_tuition: formData.activeAppliedOnTuition,
                stud_active_applied_on_misc: formData.activeAppliedOnMisc,
                stud_date: formData.date,
                stud_modified_by: formData.modifiedBy,
                stud_modified_date: formData.modifiedDate,
            };

            const formDataToSend = new FormData();
            formDataToSend.append('json', JSON.stringify(jsonData));
            formDataToSend.append('operation', 'AddScholar');

            const res = await axios.post(url, formDataToSend);
            console.log('Res submithaha ', res.data);
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
                            <input type="text" name="studId" value={formData.studId} onChange={handleInputChange} className="mt-1 p-2 w-full border rounded" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Academic Session</label>
                            <input type="text" name="academicSession" value={formData.academicSession} onChange={handleInputChange} className="mt-1 p-2 w-full border rounded" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Full Name*</label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullname}
                                onChange={handleInputChange}
                                className="mt-1 p-2 w-full border rounded"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">ScholarShip</label>
                            <input type="text" name="scholarship" value={formData.scholarship} onChange={handleInputChange} className="mt-1 p-2 w-full border rounded" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Department*</label>
                            <Select options={department.map(department => ({ label: department.dept_name, value: department.dept_id }))} onChange={(selectedOption) => handleComboBoxChange(selectedOption, 'department')} placeholder="Select Department" isClearable className="mt-1" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Course*</label>
                            <Select options={courses.map(course => ({ label: course.course_name, value: course.course_id }))} onChange={(selectedOption) => handleComboBoxChange(selectedOption, 'course')} placeholder="Select Course" isClearable className="mt-1" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Year Level*</label>
                            <Select options={year.map(year => ({ label: year.year_name, value: year.year_id }))} onChange={(selectedOption) => handleComboBoxChange(selectedOption, 'year')} placeholder="Select Year Level" isClearable className="mt-1" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Scholarship Type*</label>
                            <Select options={scholarshipTypes.map(type => ({ label: type.type_name, value: type.type_id }))} onChange={(selectedOption) => handleComboBoxChange(selectedOption, 'scholarship')} placeholder="Select Scholarship Type" isClearable className="mt-1" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Contact Number</label>
                            <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleInputChange} className="mt-1 p-2 w-full border rounded" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Email</label>
                            <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="mt-1 p-2 w-full border rounded" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Percent*</label>
                            <Select options={percent.map(percent => ({ label: percent.percent_name, value: percent.percent_id }))} onChange={(selectedOption) => handleComboBoxChange(selectedOption, 'percent')} placeholder="Select Percent" isClearable className="mt-1" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Amount</label>
                            <input type="amount" name="amount" value={formData.amount} onChange={handleInputChange} className="mt-1 p-2 w-full border rounded" />
                        </div>
                        {/* <div>
                            <label className="block text-sm font-medium">Modality</label>
                            <input type="email" name="modality" value={formData.modality} onChange={handleInputChange} className="mt-1 p-2 w-full border rounded" />
                        </div> */}
                        <div>
                            <label className="block text-sm font-medium">Applied On Tuition</label>
                            <input type="activeAppliedOnTuition" name="activeAppliedOnTuition" value={formData.activeAppliedOnTuition} onChange={handleInputChange} className="mt-1 p-2 w-full border rounded" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Applied On Miscellaneous </label>
                            <input type="activeAppliedOnMisc" name="activeAppliedOnMisc" value={formData.activeAppliedOnMisc} onChange={handleInputChange} className="mt-1 p-2 w-full border rounded" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Date </label>
                            <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="mt-1 p-2 w-full border rounded" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Modified By </label>
                            <input type="modifiedBy" name="modifiedBy" value={formData.modifiedBy} onChange={handleInputChange} className="mt-1 p-2 w-full border rounded" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Modified Date </label>
                            <input type="date" name="modifiedDate" value={formData.modifiedDate} onChange={handleInputChange} className="mt-1 p-2 w-full border rounded" />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddScholar;
