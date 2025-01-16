import React, { useState, useEffect } from 'react';
import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';
import { toast } from 'react-toastify';

function AssignStudent() {
    const [formData, setFormData] = useState({
        student: '',
        day: '',
        mode: '',
        time: '',
        department: '',
        office: '',
        subject: '',
        building: '',
        session: '',
    });
    const [students, setStudents] = useState([]);
    const [mode, setMode] = useState([]);
    const [day, setDay] = useState([]);
    const [department, setDepartment] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [building, setBuilding] = useState([]);
    const [session, setSession] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [times, setTimes] = useState([
        { time_id: '1', time_range: '7:30-9:00 AM' },
        { time_id: '2', time_range: '9:00-10:30 AM' },
    ]);

    const [showOfficeField, setShowOfficeField] = useState(false);
    const [showSubjectField, setShowSubjectField] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const fetchData = async () => {
        try {
            const url = secureLocalStorage.getItem('url') + 'CSDL.php';
            const formData = new FormData();
            formData.append('operation', 'getAssignScholar');
            const res = await axios.post(url, formData);
            console.log("y77yddsfdvs", res.data);
            console.log("academic ", res.data.getAcademicSession)
            setStudents(res.data.getScholar || []);
            setMode(res.data.getAssignmentMode || []);
            setDay(res.data.getDays || []);
            setDepartment(res.data.getDepartment || []);
            setSubjects(res.data.getSubject || []);
            setBuilding(res.data.getBuilding || []);
            // setSession(res.data.getAcademicSession || []);
            console.log("sessionnds ", session);
            toast.success('Form data loaded successfully');
        } catch (error) {
            toast.error('Failed to load form data');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));

        if (name === 'mode') {
            if (value === 'Office') {
                setShowOfficeField(true);
                setShowSubjectField(false);
            } else if (value === 'Student Facilitator') {
                setShowSubjectField(true);
                setShowOfficeField(false);
            } else {
                setShowOfficeField(false);
                setShowSubjectField(false);
            }
        }

        // Update selectedStudent only when the 'student' field changes
        if (name === 'student') {
            const student = students.find((stud) => stud.stud_id === value);
            setSelectedStudent(student || null);
            const sessionName = student ? student.session_name : ''; // Safely access session_name
            setSession(sessionName);
        }
    };






    const handleAssignDuty = (e) => {
        e.preventDefault();
        setShowModal(true);
    };

    const handleSave = async () => {
        try {
            const url = secureLocalStorage.getItem('url') + 'CSDL.php';
            const data = new FormData();
            data.append('operation', 'assignDuty');
            Object.keys(formData).forEach((key) => {
                data.append(key, formData[key]);
            });

            const res = await axios.post(url, data);
            if (res.data.success) {
                toast.success('Duty assigned successfully!');
                setShowModal(false);
                setFormData({
                    student: '',
                    day: '',
                    mode: '',
                    time: '',
                    department: '',
                    office: '',
                    subject: '',
                    building: '',
                    session: '',
                });
            } else {
                toast.error('Failed to assign duty');
            }
        } catch (error) {
            toast.error('An error occurred while saving the duty');
        }
    };

    // Function to get department name by ID
    const getDepartmentName = (id) => {
        const dept = department.find((dept) => dept.department_id === id);
        return dept ? dept.department_name : '';
    };

    // Function to get subject name by ID
    const getSubjectName = (id) => {
        const sub = subjects.find((subject) => subject.subject_id === id);
        return sub ? sub.subject_name : '';
    };


    return (
        <div className="flex h-screen" style={{ backgroundColor: 'rgb(8, 54, 100)' }}>
            <div className="flex-1 p-10">
                <main className="bg-gray-50 p-8 rounded-lg shadow-md max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-blue-900 mb-8 text-center">Assign Duty to Students</h1>
                    <form onSubmit={handleAssignDuty}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Mode */}
                            <div>
                                <label className="block text-white font-medium mb-2">Mode</label>
                                <select
                                    name="mode"
                                    value={formData.mode}
                                    onChange={handleInputChange}
                                    className="w-full bg-blue-700 text-white py-3 pl-4 pr-8 rounded-lg focus:outline-none"
                                >
                                    <option value="">Select Mode</option>
                                    {mode.map(({ assignment_id, assignment_name }) => (
                                        <option key={assignment_id} value={assignment_name}>
                                            {assignment_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {/* Day */}
                            <div>
                                <label className="block text-white font-medium mb-2">Day</label>
                                <select
                                    name="day"
                                    value={formData.day}
                                    onChange={handleInputChange}
                                    className="w-full bg-blue-700 text-white py-3 pl-4 pr-8 rounded-lg focus:outline-none"
                                >
                                    <option value="">Select Day</option>
                                    {day.map(({ day_id, day_name }) => (
                                        <option key={day_id} value={day_name}>
                                            {day_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {/* Time */}
                            <div>
                                <label className="block text-white font-medium mb-2">Time</label>
                                <select
                                    name="time"
                                    value={formData.time}
                                    onChange={handleInputChange}
                                    className="w-full bg-blue-700 text-white py-3 pl-4 pr-8 rounded-lg focus:outline-none"
                                >
                                    <option value="">Select Time</option>
                                    {times.map(({ time_id, time_range }) => (
                                        <option key={time_id} value={time_range}>
                                            {time_range}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {showOfficeField && (
                                <div>
                                    <label className="block text-blue-700 font-medium mb-2">Department</label>
                                    <select
                                        name="department"
                                        value={formData.department}
                                        onChange={handleInputChange}
                                        className="w-full bg-blue-700 text-white py-3 pl-4 pr-8 rounded-lg focus:outline-none"
                                    >
                                        <option value="">Select Department</option>
                                        {department.map((dept, index) => (
                                            <option key={index} value={dept.dept_id}>
                                                {dept.dept_name}
                                            </option>
                                        ))}
                                    </select>

                                    <label className="block text-blue-700 font-medium mb-2 mt-4">Building</label>
                                    <select
                                        name="building"
                                        value={formData.building}
                                        onChange={handleInputChange}
                                        className="w-full bg-blue-700 text-white py-3 pl-4 pr-8 rounded-lg focus:outline-none"
                                    >
                                        <option value="">Select Building</option>
                                        {building.map((building, index) => (
                                            <option key={index} value={building.build_id}>
                                                {building.build_name}
                                            </option>
                                        ))}
                                    </select>


                                    <label className="block text-blue-700 font-medium mb-2">Department</label>
                                    <input
                                        type="text"
                                        name="department"
                                        value="180 hours" // Fixed value displayed
                                        readOnly // Makes the field non-editable
                                        className="w-full bg-blue-700 text-white py-3 pl-4 rounded-lg focus:outline-none"
                                        onClick={(e) => e.preventDefault()} // Prevents interaction
                                    />

                                </div>

                            )}

                            {showSubjectField && (
                                <div className="flex flex-row gap-4 items-center">
                                    <div>
                                        <label className="block text-blue-700 font-medium mb-2">Subject</label>
                                        <select
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleInputChange}
                                            className="bg-blue-700 text-white py-3 pl-4 pr-8 rounded-lg w-fit focus:outline-none"
                                        >
                                            <option value="">Select Subject</option>
                                            {subjects.map((subject, index) => (
                                                <option key={index} value={subject.sub_id}>
                                                    {subject.sub_code + " - " + subject.sub_descriptive_title}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex-grow">
                                        <label className="block text-blue-700 font-medium mb-2">Department</label>
                                        <input
                                            type="text"
                                            name="department"
                                            value="90 hours" // Fixed value displayed
                                            readOnly // Makes the field non-editable
                                            className="bg-blue-700 text-white py-3 pl-4 rounded-lg w-full focus:outline-none"
                                            onClick={(e) => e.preventDefault()} // Prevents interaction
                                        />
                                    </div>
                                </div>
                            )}

                        </div>

                        <div>
                            <label className="block text-blue-700 font-medium mb-2">Student</label>
                            <select
                                name="student"
                                value={formData.student}
                                onChange={
                                    handleInputChange

                                }
                                className="w-full bg-blue-700 text-white py-3 pl-4 pr-8 rounded-lg focus:outline-none"
                            >
                                <option value="">Select Student</option>
                                {students.map((stud, index) => (
                                    <option key={index} value={stud.stud_id}>
                                        {stud.stud_id} - {stud.stud_name}
                                    </option>
                                ))}
                            </select>
                        </div>


                        {selectedStudent && (
                            <div className="mt-4">
                                <h2 className="text-blue-700 font-medium">Academic Session:</h2>
                                <p className="w-full bg-blue-700 py-3 pl-4 rounded-lg text-white ">
                                    {session}
                                </p>
                            </div>
                        )}
                        <button
                            type="submit"
                            className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition"
                        >
                            Assign Duty
                        </button>
                    </form>

                    {/* Modal */}
                    {showModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                                <h2 className="text-xl font-bold mb-4">Confirm Assignment</h2>
                                <p><strong>Student:</strong> {formData.student}</p>
                                <p><strong>Session:</strong>{session}</p>
                                <p><strong>Mode:</strong> {formData.mode}</p>
                                <p><strong>Day:</strong> {formData.day}</p>
                                <p><strong>Time:</strong> {formData.time}</p>
                                {showOfficeField && <p><strong>Department:</strong> {getDepartmentName(formData.department)}</p>}
                                <p><strong>Hour:</strong> {formData.hour}</p>
                                {showSubjectField && <p><strong>Subject:</strong> {getSubjectName(formData.subject)}</p>}

                                <div className="mt-4 flex justify-end">
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="mr-2 px-4 py-2 bg-gray-300 text-black rounded"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        className="px-4 py-2 bg-green-600 text-white rounded"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div >
    );
}

export default AssignStudent;
