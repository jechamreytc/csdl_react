import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import Select from "react-select"; // Importing react-select

function StudentFacilitator() {
    const [formData, setFormData] = useState({
        mode: 'Student Facilitator',
        department: '',
        subject: '',
        session: '',
        hours: '90 hours',
        supervisor: '',
        scholar: '',
    });
    const [selectedRow, setSelectedRow] = useState(null);
    const [filteredSubjects, setFilteredSubjects] = useState([]);
    const [selectedSchedule, setSelectedSchedule] = useState(null);
    const [scholarSchedules, setScholarSchedules] = useState([]);
    const [activeScholars, setActiveScholars] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [scholarId, setScholarId] = useState("");
    const [session, setSession] = useState('');
    const [selectedSubject, setSelectedSubject] = useState(null); // Track selected subject
    const [saveStatus, setSaveStatus] = useState(""); // To show save status message
    const [selectedStudent, setSelectedStudent] = useState(null); // Track selected student
    const [selectedSessions, setSelectedSessions] = useState(null); // Track selected session

    const normalizeTime = (time) => {
        if (!time) {
            return "";
        }
        if (/^[A-Za-z]+$/.test(time)) {
            return time.toUpperCase();
        }
        time = time.replace(/\s+/g, "").toUpperCase();
        const match = time.match(/^(\d{1,2}):(\d{2})(AM|PM)$/);
        if (!match) {
            console.warn(`Invalid time format: ${time}`);
            return "";
        }
        const [, hour, minute, period] = match;
        let hour24 = parseInt(hour, 10);
        if (period === 'AM' && hour24 === 12) hour24 = 0;
        if (period === 'PM' && hour24 !== 12) hour24 += 12;
        return hour24.toString().padStart(2, '0') + ':' + minute;
    };

    const compareTimeRange = (subjectTime, scheduleFromTime, scheduleToTime) => {
        const [subjectStart, subjectEnd] = subjectTime.split("-");
        return (
            normalizeTime(subjectStart) === normalizeTime(scheduleFromTime) &&
            normalizeTime(subjectEnd) === normalizeTime(scheduleToTime)
        );
    };

    const getScholarAllAvailableSchedule = async (id) => {
        if (!id) {
            console.error("Scholar ID is missing.");
            return; // Avoid making a request if no scholar ID is provided
        }

        try {
            const url = secureLocalStorage.getItem("url") + 'CSDL.php';
            const formData = new FormData();

            const jsonData = {
                ocr_studActive_id: id,
            };

            formData.append("operation", "getScholarAllAvailableSchedule");
            formData.append("json", JSON.stringify(jsonData));

            console.log(`Fetching schedules for Scholar ID: ${id}`); // Log scholar ID

            const res = await axios.post(url, formData);

            console.log("Fetched schedules:", res.data); // Log response data

            if (res.data !== "0" && Array.isArray(res.data)) {
                setScholarSchedules(res.data);
            } else {
                setScholarSchedules([]);
            }
        } catch (error) {
            console.error("Error fetching scholar schedules:", error);
            setScholarSchedules([]);
        }
    };

    const getScholars = async () => {
        try {
            const url = secureLocalStorage.getItem("url") + 'CSDL.php';
            const formData = new FormData();
            formData.append("operation", "getScholar");

            const res = await axios.post(url, formData);
            console.log("Fetched scholars:", res.data); // Log response data

            if (res.data !== "0") {
                setActiveScholars(res.data);
            }
        } catch (error) {
            console.log("Error fetching scholars:", error);
        }
    };

    const getAllSubjects = async () => {
        try {
            const url = secureLocalStorage.getItem("url") + 'CSDL.php';
            const formData = new FormData();
            formData.append("operation", "getAllSubjects");

            const res = await axios.post(url, formData);

            if (res.data !== "0") {
                setSubjects(res.data);
                setFilteredSubjects(res.data);
            }
        } catch (error) {
            console.log("Error fetching subjects:", error);
        }
    };

    useEffect(() => {
        console.log("Selected Scholar ID:", scholarId); // Log scholar ID to make sure it's set
        if (scholarId) {
            getScholarAllAvailableSchedule(scholarId); // Fetch schedules based on selected scholar
        } else {
            console.error("Scholar ID is missing.");
        }
        getAllSubjects();
        getScholars();
    }, [scholarId]);

    const handleRowClick = (index) => {
        const selectedSchedule = scholarSchedules[index];
        setSelectedRow(index);
        setSelectedSchedule(selectedSchedule);

        const selectedDay = normalizeTime(selectedSchedule.ocr_day);

        const filtered = subjects.filter((item) => {
            const subjectDay = normalizeTime(item.f2f_day);
            const subjectTime = item.sub_time;

            const isSameDay = subjectDay === selectedDay;
            const isSameTimeRange = compareTimeRange(subjectTime, selectedSchedule.ocr_schedule_time_from, selectedSchedule.ocr_schedule_time_to);

            return isSameDay && isSameTimeRange;
        });

        setFilteredSubjects(filtered);
    };

    const handleSubjectSelect = (selectedOption) => {
        setSelectedSubject(selectedOption); // Update selected subject
        console.log("Selected Subject:", selectedOption);
        setSelectedSessions(selectedSessions);
        console.log("Selected Session:",); // Log selected subject
    };

    const handleClearClick = () => {
        setSelectedRow(null);
        setSelectedSchedule(null);
        setScholarSchedules([]);
        setFilteredSubjects(subjects);
        setScholarId("");
        setSelectedSubject(null); // Reset selected subject
        setSession(''); // Clear session on reset
    };

    const handleSaveClick = async () => {
        // Check if both scholarId and selectedSubject are selected
        if (!scholarId || !selectedSubject) {
            setSaveStatus("Please select both Scholar and Subject before saving.");
            return;
        }

        // Prepare data to save
        const dataToSave = {
            assignment_name: formData.mode,
            dutyH_name: formData.hours,
            assign_stud_id: scholarId,
            off_subject_id: selectedSubject.value,
            session_name: selectedStudent?.session_name || '', // Ensure session_name is passed correctly
        };

        console.log("Data to save:", dataToSave); // Log the data to save for debugging

        try {
            const url = secureLocalStorage.getItem("url") + 'CSDL.php';
            const formData = new FormData();
            formData.append("operation", "AddStudentFacilitator");
            formData.append("json", JSON.stringify(dataToSave));

            const res = await axios.post(url, formData);

            // Check if the response indicates success or failure
            if (res.data !== "0") {
                setSaveStatus("Data saved successfully!");
            } else {
                setSaveStatus(`Failed to save data. Server response: ${res.data}`);
                console.error("Server Response:", res.data); // Log the server response for debugging
            }
        } catch (error) {
            // Log detailed error
            console.error("Error during save operation:", error);

            // If the error has a response (Axios error), log the response
            if (error.response) {
                console.error("Error Response Data:", error.response.data);
                console.error("Error Response Status:", error.response.status);
                console.error("Error Response Headers:", error.response.headers);
            } else if (error.request) {
                // If no response was received
                console.error("Error Request:", error.request);
            } else {
                // Any other errors that may have occurred
                console.error("Error Message:", error.message);
            }

            setSaveStatus("Error saving data. Please try again.");
        }
    };

    // Convert the scholars data to the format required by react-select
    const scholarOptions = activeScholars.map(scholar => ({
        value: scholar.stud_active_id,
        label: `${scholar.stud_active_id} | ${scholar.stud_name} | ${scholar.course_name} | ${scholar.session_name}`,
    }));

    // Convert the subjects data to the format required by react-select
    const subjectOptions = filteredSubjects.map(subject => ({
        value: subject.sub_id,
        label: `${subject.sub_code} | ${subject.sub_descriptive_title} | ${subject.sub_section} | ${subject.sub_room} | ${subject.f2f_day} | ${subject.rc_day} | ${subject.learning_name} | ${subject.sub_used} | ${subject.sub_time}`,
    }));

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Assign Filter</h1>

            <div>
                <label className="block text-blue-100 font-medium mb-2">Mode</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-blue-100 font-medium mb-2">Mode</label>
                        <p className="w-full bg-blue-600 text-white py-3 pl-4 rounded-lg">{formData.mode}</p>
                    </div>

                    <div className="mt-4">
                        <h2 className="text-blue-100 font-medium">Assigned Hours:</h2>
                        <p className="w-full bg-blue-600 py-3 pl-4 rounded-lg">{formData.hours}</p>
                    </div>
                    <label className="block text-blue-100 font-medium mb-2">Select Scholar</label>
                    <Select
                        options={scholarOptions}
                        value={scholarOptions.find(option => option.value === scholarId)}
                        onChange={(selectedOption) => {
                            const selectedScholarId = selectedOption ? selectedOption.value : "";
                            setScholarId(selectedScholarId);
                            // Find the selected scholar from activeScholars array and set it as selectedStudent
                            const selectedScholar = activeScholars.find(scholar => scholar.stud_active_id === selectedScholarId);
                            setSelectedStudent(selectedScholar); // Include session_name in the selectedStudent
                            console.log("Selected Scholar ID:", selectedScholarId);
                        }}
                        placeholder="Select a Scholar"
                        className="text-black"
                    />

                    {/* Display student info dynamically, including session_name */}
                    {selectedStudent && (
                        <div className="mt-4">
                            <h2 className="text-blue-100 font-medium">Student Info:</h2>
                            <p className="w-full bg-blue-600 py-3 pl-4 rounded-lg">
                                {selectedStudent.stud_name} | {selectedStudent.session_name} {/* Display session_name */}
                            </p>
                        </div>
                    )}
                </div>

                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Day</th>
                            <th>From</th>
                            <th>To</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(scholarSchedules) && scholarSchedules.length > 0 ? (
                            scholarSchedules.map((schedule, index) => (
                                <tr
                                    key={index}
                                    onClick={() => handleRowClick(index)}
                                    style={{
                                        backgroundColor: selectedRow === index ? "green" : "#f8f9fa",
                                        cursor: "pointer",
                                        color: selectedRow === index ? "#fff" : "#6c757d",
                                    }}
                                >
                                    <td>{schedule.ocr_day}</td>
                                    <td>{schedule.ocr_schedule_time_from}</td>
                                    <td>{schedule.ocr_schedule_time_to}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center">
                                    No schedules found for this Scholar ID.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>

                {selectedSchedule && (
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold">Selected Schedule:</h3>
                        <p>
                            {selectedSchedule.ocr_day} | {selectedSchedule.ocr_schedule_time_from} - {selectedSchedule.ocr_schedule_time_to}
                        </p>
                    </div>
                )}

                <div className="mt-4">
                    <label className="block text-blue-100 font-medium mb-2">Select Subject</label>
                    <Select
                        options={subjectOptions}
                        value={selectedSubject}
                        onChange={handleSubjectSelect}
                        placeholder="Select a Subject"
                        className="text-black"
                    />
                </div>

                <div className="flex justify-between mt-6">
                    <Button variant="secondary" onClick={handleClearClick}>
                        Clear
                    </Button>
                    <Button variant="primary" onClick={handleSaveClick}>
                        Save
                    </Button>
                </div>

                {saveStatus && (
                    <div className="mt-4">
                        <p className="text-green-500">{saveStatus}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default StudentFacilitator;
