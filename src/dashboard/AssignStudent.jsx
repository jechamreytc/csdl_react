import React, { useState, useEffect } from 'react';
import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';
import { toast } from 'react-toastify';
import { ConstructionIcon } from 'lucide-react';

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
        hours: '',
        supervisor: '',
        days: '',
    });
    const [students, setStudents] = useState([]);
    const [mode, setMode] = useState([]);
    const [day, setDay] = useState([]);
    const [department, setDepartment] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [building, setBuilding] = useState([]);
    const [session, setSession] = useState([]);
    const [hours, setHours] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [supervisor, setSupervisor] = useState(null);
    const [selectedDayId, setSelectedDayId] = useState(null);

    const [times, setTimes] = useState([
        { time_id: '1', time_range: '7:30-9:00 AM' },
        { time_id: '2', time_range: '9:00-10:30 AM' },
    ]);

    const [showOfficeField, setShowOfficeField] = useState(false);
    const [showSubjectField, setShowSubjectField] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const fetchData = async () => {
        try {
            const url = secureLocalStorage.getItem('url') + 'CSDL.php';
            const formData = new FormData();
            formData.append('operation', 'getAssignScholar');
            const res = await axios.post(url, formData);
            console.log("res data", res.data);
            console.log("academic ", res.data.getAcademicSession)
            setStudents(res.data.getScholar || []);
            setMode(res.data.getAssignmentMode || []);
            setDay(res.data.getDays || []);
            setDepartment(res.data.getDepartment || []);
            setSubjects(res.data.getSubject || []);
            setBuilding(res.data.getBuilding || []);
            setHours(res.data.getDutyHours || []);
            setSupervisor(res.data.getSupervisorMaster || []);
            setSelectedDayId(res.data.getDays[0].day_id);

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

        if (name === 'subject') {
            const subject = subjects.find((sub) => sub.sub_id === value); // Safely handle undefined subjects
            setSelectedSubject(subject || null);
            const selectedRole = subject ? subject.sub_room : ''; // Use optional chaining for safety
            setSelectedRole(selectedRole);
        }


        const selectedHours = hours.find((hour) =>
            selectedRole === "office"
                ? hour.dutyH_id === 2
                : selectedRole === "student facilitator"
                    ? hour.dutyH_id === 1
                    : null
        );


    };


    const handleAssignDuty = (e) => {
        e.preventDefault();
        setShowModal(true);
    };

    const handleSave = async () => {
        try {
            // Get the URL
            const url = secureLocalStorage.getItem('url') + 'CSDL.php';
            // Construct JSON data
            const jsonData = {
                assign_stud_id: formData.student,
                offT_day_id: formData.day,
                assignment_name: formData.mode,
                offT_time: formData.time,
                offT_dept_id: formData.department,
                offT_office_id: formData.office,
                off_subject_id: formData.subject,
                off_build_id: formData.building,
                session_name: session,
                dutyH_name: formData.hours,
                offT_supM_id: formData.supervisor,

            };
            console.log('JSON data sa pag:', jsonData); // Log JSON data for debugging
            console.log('JSON data:', jsonData); // Log JSON data for debugging
            // Prepare
            // FormData
            const data = new FormData();
            data.append('json', JSON.stringify(jsonData)); // Add JSON data
            data.append('operation', 'AddOfficeMasterSubCodeAndAssignScholars');
            // Make API request
            const res = await axios.post(url, data);
            console.log('Response:', res.data); // Log response for debugging
            // Check response and notify user
            if (res.data !== 0) {
                toast.success('Scholar added successfully');
                console.log('Scholar added successfully:', res.data);
            } else {
                toast.error('Failed to add scholar');
                console.log('Failed to add scholar:', res.data);
            }
        } catch (error) {
            console.error('Error adding scholar:', error); // Log error for debugging
            toast.error('An error occurred while adding scholar');
        }
    };



    // Function to get department name by ID
    const DepartmentName = (id) => {
        const dept = department.find((dept) => dept.department_id === id);
        return dept ? dept.department_name : '';
    };

    // Function to get subject name by ID
    const SubjectName = (id) => {
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
                                    {day.map((days, index) => (
                                        <option key={index} value={days.day_id}>
                                            {days.day_id}
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
                                    <label className="block text-blue-700 font-medium mb-2 mt-4">Supervisor</label>
                                    <select
                                        name="supervisor" // Match this with the formData property
                                        value={formData.supervisor} // Bind to formData.supervisor
                                        onChange={handleInputChange} // Handle the change event
                                        className="w-full bg-blue-700 text-white py-3 pl-4 pr-8 rounded-lg focus:outline-none"
                                    >
                                        <option value="">Select Supervisor</option>
                                        {supervisor.map((supervisor, index) => (
                                            <option key={index} value={supervisor.supM_id}>
                                                {supervisor.supM_name}
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


                                    <label className="block text-blue-700 font-medium mb-2 mt-4"> Duty Hours</label>
                                    <select
                                        name="hours"
                                        value={formData.hours}
                                        onChange={handleInputChange}
                                        className="w-full bg-blue-700 text-white py-3 pl-4 pr-8 rounded-lg focus:outline-none"
                                    >
                                        <option value="">Select Duty Hours</option>
                                        {hours.map((hours, index) => (
                                            <option key={index} value={hours.dutyH_name}>
                                                {hours.dutyH_name}
                                            </option>
                                        ))}
                                    </select>

                                </div>

                            )}

                            {showSubjectField && (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                                    {/* Subject Selection */}
                                    <div>
                                        <label className="block text-blue-700 font-medium mb-2">Subject</label>
                                        <select
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleInputChange}
                                            className="bg-blue-700 text-white py-3 pl-4 pr-8 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-600 transition"
                                        >
                                            <option value="">Select Subject</option>
                                            {subjects.map((subject, index) => (
                                                <option key={index} value={subject.sub_id}>
                                                    {subject.sub_code + " - " + subject.sub_descriptive_title}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Duty Hours Selection */}
                                    <div>
                                        <label className="block text-blue-700 font-medium mb-2">Duty Hours</label>
                                        <select
                                            name="hours"
                                            value={formData.hours}
                                            onChange={handleInputChange}
                                            className="bg-blue-700 text-white py-3 pl-4 pr-8 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-600 transition"
                                        >
                                            <option value="">Select Duty Hours</option>
                                            {hours.map((hour, index) => (
                                                <option key={index} value={hour.dutyH_name}>
                                                    {hour.dutyH_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Room Selection */}
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
                                <p><strong>Session:</strong> {session}</p>
                                <p><strong>Mode:</strong> {formData.mode}</p>
                                <p><strong>Day:</strong> {formData.day}</p>
                                <p><strong>Time:</strong> {formData.time}</p>
                                {showOfficeField && <p><strong>Department:</strong> {formData.department || "N/A"}</p>}
                                {showOfficeField && <p><strong>Supervisor:</strong> {formData.supervisor || "N/A"}</p>}
                                {showOfficeField && <p><strong>Building:</strong> {formData.building || "N/A"}</p>}
                                {showSubjectField && <p><strong>Subject:</strong> {formData.subject || "N/A"}</p>}

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
