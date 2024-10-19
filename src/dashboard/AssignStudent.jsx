import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BellIcon, CircleUser, FolderClosed, LogOutIcon, PanelsRightBottom, QrCodeIcon, User, List, Mail, Calendar, Search } from 'lucide-react';
import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';
import { toast } from 'sonner';

function AssignStudent() {
    const [formData, setFormData] = useState({
        dutyAssignment: '',
        subjectcode: '',
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
    });

    const [subject, setSubject] = useState('');
    const [time, setTime] = useState('');
    const [days, setDays] = useState('');
    const [rooms, setRooms] = useState('');
    const [buildings, setBuildings] = useState('');
    const [student, setStudent] = useState('');
    const [dutyHours, setDutyHours] = useState('');
    const [supervisor, setSupervisor] = useState('');
    const [timeOuts, setTimeOuts] = useState('');

    const navigateTo = useNavigate();

    // Fetch data from API
    const fetchData = async () => {
        try {
            const url = secureLocalStorage.getItem('url') + 'CSDL.php';
            const formData = new FormData();
            formData.append('operation', 'getDutyAssign');
            const res = await axios.post(url, formData);

            // Set data for various dropdowns
            setBuildings(res.data.getBuilding);
            setRooms(res.data.getRoom);
            setDays(res.data.getDays);
            setSubject(res.data.getSubject);
            setDutyHours(res.data.getDutyHours);
            setStudent(res.data.getScholar);
            setSupervisor(res.data.getSupervisorMaster);
            setTime(res.data.getTimeIn);
            setTimeOuts(res.data.getTimeOut);

            toast.success('Form data loaded successfully');
        } catch (error) {
            toast.error('Failed to load form data');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const convertSecondsToHours = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return `${hours}h ${minutes}m`;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = secureLocalStorage.getItem('url') + 'CSDL.php';
            const jsonData = {
                subjectcode: formData.subjectcode,
                section: formData.section,
                assign_time_schedule_in: formData.timeIn,
                assign_time_schedule_out: formData.timeOut,
                assign_day_id: formData.day,
                assign_room_id: formData.room,
                assign_stud_id: formData.student,
                assign_build_id: formData.building,
                assign_dutyH_Id: formData.dutyHours,
                assign_supM_id: formData.supervisor,
            };

            const formDataToSend = new FormData();
            formDataToSend.append('json', JSON.stringify(jsonData));
            formDataToSend.append('operation', 'AssignStudent');

            const res = await axios.post(url, formDataToSend);

            if (res.data !== 0) {
                toast.success('Assignment added successfully');
            } else {
                toast.error('Failed to add assignment');
            }
        } catch (error) {
            toast.error('Failed to add assignment');
        }
    };

    const handleLogOut = () => {
        navigateTo("/");
    }

    return (
        <div className="flex h-screen" style={{ backgroundColor: "rgb(8, 54, 100)" }}>
            <aside className="w-1/6 p-4 flex flex-col justify-between" style={{ backgroundColor: "#109315" }}>
                <div className="text-white mb-6">
                    <div className="flex items-center mb-6">
                        <img
                            src="images/csdl.jpg"
                            alt="CSDL Logo"
                            className="w-24 h-24 rounded-full mr-3"
                        />
                        <div>
                            <br />
                            <h1 className="text-xl font-bold">HK SMS</h1>
                            <p className="text-xl">HK Scholars Management System</p>
                        </div>
                    </div>

                    <nav>
                        <ul className="space-y-4">
                            <li>
                                <button
                                    className="flex items-center p-3 hover:bg-green-700 rounded-md w-full transition-all duration-200"
                                    onClick={() => navigateTo("/MainDashboard")}
                                >
                                    <PanelsRightBottom className="mr-2" />
                                    <span className="text-sm">Dashboard</span>
                                </button>
                            </li>
                            <li>
                                <button
                                    className="flex items-center p-3 hover:bg-green-700 rounded-md w-full transition-all duration-200"
                                    onClick={() => navigateTo("/ScholarList")}
                                >
                                    <List className="mr-2" />
                                    <span className="text-sm">Scholar List</span>
                                </button>
                            </li>
                            <li>
                                <button
                                    className="flex items-center p-3 hover:bg-green-700 rounded-md w-full transition-all duration-200"
                                    onClick={() => navigateTo("/qrcode")}
                                >
                                    <QrCodeIcon className="mr-2" />
                                    <span className="text-sm">QR Code</span>
                                </button>
                            </li>

                            <li>
                                <button
                                    className="flex items-center p-3 hover:bg-green-700 rounded-md w-full transition-all duration-200"
                                    onClick={() => navigateTo("/AssignStudent")}
                                >
                                    <User className="mr-2" />
                                    <span className="text-sm">Assigned Student</span>
                                </button>
                            </li>
                            <li>
                                <button
                                    className="flex items-center p-3 hover:bg-green-700 rounded-md w-full transition-all duration-200"
                                    onClick={() => navigateTo("/AdminDashboard")}
                                >
                                    <FolderClosed className="mr-2" />
                                    <span className="text-sm">Master Files</span>
                                </button>
                            </li>
                            {/* <h2 className="text-lg font-semibold mt-6 mb-2">Account</h2>
                            <li>
                                <button
                                    className="flex items-center p-3 hover:bg-green-700 rounded-md w-full transition-all duration-200"
                                >
                                    <CircleUser className="mr-2" />
                                    <span className="text-sm">Account</span>
                                </button>
                            </li>
                            <li>
                                <button
                                    className="flex items-center p-3 hover:bg-green-700 rounded-md w-full transition-all duration-200"
                                >
                                    <BellIcon className="mr-2" />
                                    <span className="text-sm">Notification</span>
                                </button>
                            </li>
                            <li>
                                <button
                                    className="flex items-center p-3 hover:bg-green-700 rounded-md w-full transition-all duration-200"
                                >
                                    <Mail className="mr-2" />
                                    <span className="text-sm">Messages</span>
                                </button>
                            </li> */}
                            <li className="mt-4">
                                <button
                                    className="flex items-center p-3 bg-red-600 hover:bg-red-700 rounded-md w-full transition-all duration-200"
                                    onClick={handleLogOut}
                                >
                                    <LogOutIcon className="mr-2" />
                                    <span className="text-sm">Logout</span>
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
                <p className="text-white text-xs mt-4">Powered by PHINMA</p>
            </aside >
            <main className="bg-white p-8 rounded-lg shadow-lg relative max-w-4xl mx-auto">
                <h1 className="text-3xl font-semibold text-blue-900 mb-6">Assigned Students</h1>

                <div className="bg-blue-800 p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold text-white mb-3">Duty Assigned</h2>
                    <p className="text-gray-300 mb-6">
                        Generate a student duty: Input the necessary details with a unique identifier for easy reference.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="sm:flex sm:space-x-4">
                            {/* Student Dropdown */}
                            <div className="flex-1">
                                <label className="block text-white font-semibold mb-2">Student*</label>
                                <div className="flex items-center bg-blue-700 rounded-lg px-4 py-3">
                                    <select
                                        name="student"
                                        value={formData.student}
                                        onChange={handleInputChange}
                                        className="w-full bg-blue-700 text-white border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Select Student</option>
                                        {student.length > 0 ? (
                                            student.map((student, index) => (
                                                <option key={index} value={student.stud_id}>
                                                    {student.stud_first_name + " " + student.stud_last_name}
                                                </option>
                                            ))
                                        ) : (
                                            <option disabled>No Student Available</option>
                                        )}
                                    </select>
                                    <span className="ml-2 text-white">&gt;</span>
                                </div>
                            </div>

                            {/* Supervisor Dropdown */}
                            <div className="flex-1">
                                <label className="block text-white font-semibold mb-2">Supervisor*</label>
                                <div className="flex items-center bg-blue-700 rounded-lg px-4 py-3">
                                    <select
                                        name="supervisor"
                                        value={formData.supervisor}
                                        onChange={handleInputChange}
                                        className="w-full bg-blue-700 text-white border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Select Supervisor</option>
                                        {supervisor.length > 0 ? (
                                            supervisor.map((sup, index) => (
                                                <option key={index} value={sup.supM_id}>
                                                    {sup.supM_first_name + " " + sup.supM_last_name}
                                                </option>
                                            ))
                                        ) : (
                                            <option disabled>No Supervisor Available</option>
                                        )}
                                    </select>
                                    <span className="ml-2 text-white">&gt;</span>
                                </div>
                            </div>
                        </div>

                        <div className="sm:flex sm:space-x-4">
                            {/* Building Dropdown */}
                            <div className="flex-1">
                                <label className="block text-white font-semibold mb-2">Building</label>
                                <div className="flex items-center bg-blue-700 rounded-lg px-4 py-3">
                                    <select
                                        name="building"
                                        value={formData.building}
                                        onChange={handleInputChange}
                                        className="w-full bg-blue-700 text-white border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Select Building</option>
                                        {buildings.length > 0 ? (
                                            buildings.map((build, index) => (
                                                <option key={index} value={build.build_id}>
                                                    {build.build_name}
                                                </option>
                                            ))
                                        ) : (
                                            <option value="" disabled>No Buildings Available</option>
                                        )}
                                    </select>
                                    <span className="ml-2 text-white">&gt;</span>
                                </div>

                                {/* Room Dropdown */}
                                <label className="block text-white font-semibold mb-2 mt-4">Room</label>
                                <div className="flex items-center bg-blue-700 rounded-lg px-4 py-3">
                                    <select
                                        name="room"
                                        value={formData.room}
                                        onChange={handleInputChange}
                                        className="w-full bg-blue-700 text-white border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Select Room</option>
                                        {rooms.length > 0 ? (
                                            rooms.map((room, index) => (
                                                <option key={index} value={room.room_id}>
                                                    {room.room_number}
                                                </option>
                                            ))
                                        ) : (
                                            <option value="" disabled>No Room Available</option>
                                        )}
                                    </select>
                                    <span className="ml-2 text-white">&gt;</span>
                                </div>

                                {/* Hours Dropdown */}
                                <label className="block text-white font-semibold mb-2 mt-4">Hours</label>
                                <div className="flex items-center bg-blue-700 rounded-lg px-4 py-3">
                                    <select
                                        name="hours"
                                        value={formData.hours}
                                        onChange={handleInputChange}
                                        className="w-full bg-blue-700 text-white border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Select Hours</option>
                                        {dutyHours.length > 0 ? (
                                            dutyHours.map((hours, index) => (
                                                <option key={index} value={hours.dutyH_id}>
                                                    {hours.dutyH_name}
                                                </option>
                                            ))
                                        ) : (
                                            <option value="" disabled>No Hours Available</option>
                                        )}
                                    </select>
                                    <span className="ml-2 text-white">&gt;</span>
                                </div>
                            </div>

                            {/* Day Dropdown */}
                            <div className="flex-1">
                                <label className="block text-white font-semibold mb-2">Day</label>
                                <div className="flex items-center bg-blue-700 rounded-lg px-4 py-3">
                                    <select
                                        name="day"
                                        value={formData.day}
                                        onChange={handleInputChange}
                                        className="w-full bg-blue-700 text-white border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Select Day</option>
                                        {days.length > 0 ? (
                                            days.map((day, index) => (
                                                <option key={index} value={day.days_id}>
                                                    {day.days_desc}
                                                </option>
                                            ))
                                        ) : (
                                            <option value="" disabled>No Day Available</option>
                                        )}
                                    </select>
                                    <span className="ml-2 text-white">&gt;</span>
                                </div>

                                {/* Time In Dropdown */}
                                <label className="block text-white font-semibold mb-2 mt-4">Time In</label>
                                <div className="flex items-center bg-blue-700 rounded-lg px-4 py-3">
                                    <select
                                        name="timeIn"
                                        value={formData.timeIn}
                                        onChange={handleInputChange}
                                        className="w-full bg-blue-700 text-white border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Select Time In</option>
                                        {time.length > 0 ? (
                                            time.map((time, index) => (
                                                <option key={index} value={time.time_id}>
                                                    {time.time_desc}
                                                </option>
                                            ))
                                        ) : (
                                            <option value="" disabled>No Time In Available</option>
                                        )}
                                    </select>
                                    <span className="ml-2 text-white">&gt;</span>
                                </div>

                                {/* Time Out Dropdown */}
                                <label className="block text-white font-semibold mb-2 mt-4">Time Out</label>
                                <div className="flex items-center bg-blue-700 rounded-lg px-4 py-3">
                                    <select
                                        name="timeOut"
                                        value={formData.timeOut}
                                        onChange={handleInputChange}
                                        className="w-full bg-blue-700 text-white border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Select Time Out</option>
                                        {timeOuts.length > 0 ? (
                                            timeOuts.map((time, index) => (
                                                <option key={index} value={time.time_id}>
                                                    {time.time_desc}
                                                </option>
                                            ))
                                        ) : (
                                            <option value="" disabled>No Time Out Available</option>
                                        )}
                                    </select>
                                    <span className="ml-2 text-white">&gt;</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between mt-6">
                            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
                                Submit
                            </button>
                            <button onClick={handleLogOut} className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
                                Log Out
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}

export default AssignStudent;
