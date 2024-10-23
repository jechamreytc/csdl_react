import React, { useState, useEffect } from 'react';
import { CircleUser, FolderClosed, LogOutIcon, PanelsRightBottom, QrCodeIcon, User, List } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';
import { toast } from 'sonner';

function AssignStudent() {
    const [formData, setFormData] = useState({
        dutyAssignment: '',

        section: '',
        timeIn: '',
        timeOut: '',
        day: '',
        room: '',
        student: '',
        hours: '',
        building: '',
        dutyHours: '',
        supervisor: '',
        subject: '',
    });

    const [time, setTime] = useState('');
    const [days, setDays] = useState('');
    const [rooms, setRooms] = useState('');
    const [buildings, setBuildings] = useState('');
    const [student, setStudent] = useState('');
    const [dutyHours, setDutyHours] = useState('');
    const [supervisor, setSupervisor] = useState('');
    const [timeOuts, setTimeOuts] = useState('');
    const [subjects, setSubjects] = useState('');

    const navigateTo = useNavigate();

    // Fetch data from API
    const fetchData = async () => {
        try {
            const url = secureLocalStorage.getItem('url') + 'CSDL.php';
            const formData = new FormData();
            formData.append('operation', 'getDutyAssign');
            const res = await axios.post(url, formData);

            console.log("res ni fetch data", res.data);
            setBuildings(res.data.getBuilding);
            setRooms(res.data.getRoom);
            setDays(res.data.getDays);
            setSubjects(res.data.getSubject);
            setDutyHours(res.data.getDutyHours);
            setStudent(res.data.getScholar);
            setSupervisor(res.data.getSupervisorMaster);
            setTime(res.data.getTimeIn);
            setTimeOuts(res.data.getTimeOut);
            console.log("HELLO", res.data);
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
        console.log("name", name, "value", value);
    };

    const handleAdd = async (e) => {
        e.preventDefault();

        try {
            const url = secureLocalStorage.getItem('url') + 'CSDL.php';
            const jsonData = {
                assign_stud_id: formData.student,
                assign_supM_id: formData.supervisor,
                assign_build_id: formData.building,
                assign_day_id: formData.day,
                assign_time_schedule_in: formData.timeIn,
                assign_time_schedule_out: formData.timeOut,
                assign_room_id: formData.room,
                assign_duty_hours: formData.dutyHours,
                assign_subject_id: formData.subject,
            };

            console.log('JSON DATA', jsonData);

            const formDataToSend = new FormData();
            formDataToSend.append('json', JSON.stringify(jsonData));
            formDataToSend.append('operation', 'AddAssignScholar');

            const res = await axios.post(url, formDataToSend);
            console.log('HELLO RES DATA', res.data);

            if (res.data !== 0) {
                toast.success('Assignment added successfully');
                // Reset form after successful submission
                setFormData({
                    dutyAssignment: '',
                    section: '',
                    timeIn: '',
                    timeOut: '',
                    day: '',
                    room: '',
                    student: '',
                    hours: '',
                    building: '',
                    dutyHours: '',
                    supervisor: '',
                    subject: '',
                });
            } else {
                toast.error('Failed to add assignment');
            }
        } catch (error) {
            console.error('Error adding assignment:', error);
            toast.error('Failed to add assignment');
        }
    };

    const handleLogOut = () => {
        navigateTo("/");
    }

    return (
        <div className="flex h-screen" style={{ backgroundColor: "rgb(8, 54, 100)" }}>
            <div className="w-64 bg-blue-900 text-white p-6">
                <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
                <ul>
                    <li className="mb-4">
                        <button className="flex items-center text-lg" onClick={() => navigateTo('/MainDashboard')}>
                            <PanelsRightBottom className="mr-2" />
                            Dashboard
                        </button>
                    </li>
                    <li className="mb-4">
                        <button className="flex items-center text-lg" onClick={() => navigateTo('/ScholarList')}>
                            <List className="mr-2" />
                            Scholar List
                        </button>
                    </li>
                    <li className="mb-4">
                        <button className="flex items-center text-lg" onClick={() => navigateTo('/AssignStudent')}>
                            <User className="mr-2" />
                            Assign Student
                        </button>
                    </li>
                    <li className="mb-4">
                        <button className="flex items-center text-lg" onClick={() => navigateTo('/qrcode')}>
                            <QrCodeIcon className="mr-2" />
                            QR Code
                        </button>
                    </li>
                    <li className="mb-4">
                        <button className="flex items-center text-lg" onClick={() => navigateTo('/Account')}>
                            <CircleUser className="mr-2" />
                            Account
                        </button>
                    </li>
                    <li className="mt-auto">
                        <button className="flex items-center text-lg" onClick={handleLogOut}>
                            <LogOutIcon className="mr-2" />
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
            <div className="flex-1 p-10">
                <main className="bg-gray-50 p-8 rounded-lg shadow-md max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-blue-900 mb-8 text-center">Assign Duty to Students</h1>

                    <div className="bg-blue-800 p-8 rounded-lg">
                        <h2 className="text-2xl font-semibold text-white mb-4 text-center">Duty Assignment</h2>
                        <p className="text-gray-300 mb-8 text-center">
                            Please fill out the form below to assign duty details to the selected student and supervisor.
                        </p>

                        <form onSubmit={handleAdd}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-white font-medium mb-2">Student</label>
                                    <div className="relative mb-4">
                                        <select
                                            name="student"
                                            value={formData.student}
                                            onChange={handleInputChange}
                                            className="w-full bg-blue-700 text-white py-3 pl-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                        >
                                            <option value="">Select Student</option>
                                            {student.length > 0 ? (
                                                student.map((stud, index) => (
                                                    <option key={index} value={stud.stud_id}>
                                                        {stud.stud_first_name + " " + stud.stud_last_name}
                                                    </option>
                                                ))
                                            ) : (
                                                <option disabled>No Students Available</option>
                                            )}
                                        </select>
                                        <span className="absolute right-3 top-3 text-white pointer-events-none">▼</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-white font-medium mb-2">Supervisor</label>
                                    <div className="relative mb-4">
                                        <select
                                            name="supervisor"
                                            value={formData.supervisor}
                                            onChange={handleInputChange}
                                            className="w-full bg-blue-700 text-white py-3 pl-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                        >
                                            <option value="">Select Supervisor</option>
                                            {supervisor.length > 0 ? (
                                                supervisor.map((sup, index) => (
                                                    <option key={index} value={sup.supM_id}>
                                                        {sup.supM_first_name + " " + sup.supM_last_name}
                                                    </option>
                                                ))
                                            ) : (
                                                <option disabled>No Supervisors Available</option>
                                            )}
                                        </select>
                                        <span className="absolute right-3 top-3 text-white pointer-events-none">▼</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-white font-medium mb-2">Time In</label>
                                    <div className="relative mb-4">
                                        <select
                                            name="timeIn"
                                            value={formData.timeIn}
                                            onChange={handleInputChange}
                                            className="w-full bg-blue-700 text-white py-3 pl-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                        >
                                            <option value="">Select Time In</option>
                                            {time.length > 0 ? (
                                                time.map((t, index) => (
                                                    <option key={index} value={t.timeSched_id}>
                                                        {t.timeShed_name}
                                                    </option>
                                                ))
                                            ) : (
                                                <option disabled>No Time In Available</option>
                                            )}
                                        </select>
                                        <span className="absolute right-3 top-3 text-white pointer-events-none">▼</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-white font-medium mb-2">Time Out</label>
                                    <div className="relative mb-4">
                                        <select
                                            name="timeOut"
                                            value={formData.timeOut}
                                            onChange={handleInputChange}
                                            className="w-full bg-blue-700 text-white py-3 pl-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                        >
                                            <option value="">Select Time Out</option>
                                            {timeOuts.length > 0 ? (
                                                timeOuts.map((t, index) => (
                                                    <option key={index} value={t.time_out_id}>
                                                        {t.time_out_name}
                                                    </option>
                                                ))
                                            ) : (
                                                <option disabled>No Time Out Available</option>
                                            )}
                                        </select>
                                        <span className="absolute right-3 top-3 text-white pointer-events-none">▼</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-white font-medium mb-2">Day</label>
                                    <div className="relative mb-4">
                                        <select
                                            name="day"
                                            value={formData.day}
                                            onChange={handleInputChange}
                                            className="w-full bg-blue-700 text-white py-3 pl-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                        >
                                            <option value="">Select Day</option>
                                            {days.length > 0 ? (
                                                days.map((day, index) => (
                                                    <option key={index} value={day.day_id}>
                                                        {day.day_name}
                                                    </option>
                                                ))
                                            ) : (
                                                <option disabled>No Days Available</option>
                                            )}
                                        </select>
                                        <span className="absolute right-3 top-3 text-white pointer-events-none">▼</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-white font-medium mb-2">Room</label>
                                    <div className="relative mb-4">
                                        <select
                                            name="room"
                                            value={formData.room}
                                            onChange={handleInputChange}
                                            className="w-full bg-blue-700 text-white py-3 pl-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                        >
                                            <option value="">Select Room</option>
                                            {rooms.length > 0 ? (
                                                rooms.map((room, index) => (
                                                    <option key={index} value={room.room_id}>
                                                        {room.room_number}
                                                    </option>
                                                ))
                                            ) : (
                                                <option disabled>No Rooms Available</option>
                                            )}
                                        </select>
                                        <span className="absolute right-3 top-3 text-white pointer-events-none">▼</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-white font-medium mb-2">Building</label>
                                    <div className="relative mb-4">
                                        <select
                                            name="building"
                                            value={formData.building}
                                            onChange={handleInputChange}
                                            className="w-full bg-blue-700 text-white py-3 pl-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                        >
                                            <option value="">Select Building</option>
                                            {buildings.length > 0 ? (
                                                buildings.map((building, index) => (
                                                    <option key={index} value={building.build_id}>
                                                        {building.build_name}
                                                    </option>
                                                ))
                                            ) : (
                                                <option disabled>No Buildings Available</option>
                                            )}
                                        </select>
                                        <span className="absolute right-3 top-3 text-white pointer-events-none">▼</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-white font-medium mb-2">Duty Hours</label>
                                    <div className="relative mb-4">
                                        <select
                                            name="dutyHours"
                                            value={formData.dutyHours}
                                            onChange={handleInputChange}
                                            className="w-full bg-blue-700 text-white py-3 pl-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                        >
                                            <option value="">Select Duty Hours</option>
                                            {dutyHours.length > 0 ? (
                                                dutyHours.map((hour, index) => (
                                                    <option key={index} value={hour.dutyH_hours}>
                                                        {hour.dutyH_hours}
                                                    </option>
                                                ))
                                            ) : (
                                                <option disabled>No Duty Hours Available</option>
                                            )}
                                        </select>
                                        <span className="absolute right-3 top-3 text-white pointer-events-none">▼</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-white font-medium mb-2">Subject</label>
                                    <div className="relative mb-4">
                                        <select
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleInputChange}
                                            className="w-full bg-blue-700 text-white py-3 pl-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                        >
                                            <option value="">Select Subject</option>
                                            {subjects.length > 0 ? (
                                                subjects.map((subject, index) => (
                                                    <option key={index} value={subject.subject_id}>
                                                        {subject.subject_code + " - " + subject.subject_name}
                                                    </option>
                                                ))
                                            ) : (
                                                <option disabled>No Subjects Available</option>
                                            )}
                                        </select>
                                        <span className="absolute right-3 top-3 text-white pointer-events-none">▼</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="p-2 text-lg bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
                            >
                                Add
                            </button>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default AssignStudent;
