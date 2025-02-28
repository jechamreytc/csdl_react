import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import secureLocalStorage from "react-secure-storage";
import Select from "react-select";

function AddSubject() {
    const [formData, setFormData] = useState({
        subject_code: "",
        sub_descriptive_title: "",
        sub_section: "",
        sub_day_f2f_id: "",
        sub_day_rc_id: "",
        sub_time: "",
        sub_time_rc: "",
        sub_room: "",
        sub_supM_id: "",
    });

    const [supervisors, setSupervisors] = useState([]);
    const [days, setDays] = useState([]);
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = secureLocalStorage.getItem("url") + "CSDL.php";
                console.log("Fetching data from:", url);
                const formData = new FormData();
                formData.append("operation", "getsublist");
                const res = await axios.post(url, formData);

                console.log("Response data:", res.data);

                setSupervisors(res.data.supervisor || []);
                setDays(res.data.day || []);
                setRooms(res.data.room || []);
            } catch (error) {
                console.error("Failed to load data", error);
                toast.error("Failed to load data");
            }
        };
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(`Input Changed: ${name} = ${value}`);
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (selectedOption, { name }) => {
        console.log(`Select Changed: ${name} =`, selectedOption?.value);
        setFormData((prev) => ({
            ...prev,
            [name]: selectedOption ? selectedOption.value : "",
        }));
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            const url = secureLocalStorage.getItem("url") + "CSDL.php";
            const jsonData = {
                sub_code: formData.subject_code,
                sub_descriptive_title: formData.sub_descriptive_title,
                sub_section: formData.sub_section,
                sub_day_f2f_id: formData.sub_day_f2f_id,
                sub_day_rc_id: formData.sub_day_rc_id,
                sub_time: formData.sub_time,
                sub_time_rc: formData.sub_time_rc,
                sub_room: formData.sub_room,
                sub_supM_id: formData.sub_supM_id,
            };
            console.log("JSON Data:", jsonData);
            const formDataToSend = new FormData();
            formDataToSend.append("json", JSON.stringify(jsonData));
            formDataToSend.append("operation", "AddSubjectOne");

            const res = await axios.post(url, formDataToSend);
            console.log("Add Subject Response:", res.data);

            if (res.data === 1) {
                toast.success("Subject added successfully");
                setFormData({
                    subject_code: "",
                    sub_descriptive_title: "",
                    sub_section: "",
                    sub_day_f2f_id: "",
                    sub_day_rc_id: "",
                    sub_time: "",
                    sub_time_rc: "",
                    sub_room: "",
                    sub_supM_id: "",
                });
            } else {
                toast.error("Failed to add subject");
            }
        } catch (error) {
            console.error("Error adding subject:", error);
            toast.error("An error occurred while adding the subject");
        }
    };

    return (
        <div className="flex flex-col items-center bg-blue-100 p-6 rounded-lg max-w-md mx-auto shadow-md">
            <h2 className="mb-4 text-2xl text-blue-900">Add Subject</h2>

            <input
                type="text"
                name="subject_code"
                placeholder="Subject Code"
                value={formData.subject_code}
                onChange={handleInputChange}
                className="p-2 w-full mb-2 border rounded"
            />
            <input
                type="text"
                name="sub_descriptive_title"
                placeholder="Subject Description"
                value={formData.sub_descriptive_title}
                onChange={handleInputChange}
                className="p-2 w-full mb-2 border rounded"
            />
            <input
                type="text"
                name="sub_section"
                placeholder="Subject Section"
                value={formData.sub_section}
                onChange={handleInputChange}
                className="p-2 w-full mb-2 border rounded"
            />

            {/* Face-to-Face Day Dropdown */}
            <select
                name="sub_day_f2f_id"
                value={formData.sub_day_f2f_id}
                onChange={handleInputChange}
                className="p-2 w-full mb-2 border rounded"
            >
                <option value="">Select Face to Face Day</option>
                {days.map((day) => (
                    <option key={day.day_id} value={day.day_id}>
                        {day.day_name}
                    </option>
                ))}
            </select>

            {/* Remote Coaching Day Dropdown */}
            <select
                name="sub_day_rc_id"
                value={formData.sub_day_rc_id}
                onChange={handleInputChange}
                className="p-2 w-full mb-2 border rounded"
            >
                <option value="">Select Remote Coaching Day</option>
                {days.map((day) => (
                    <option key={day.day_id} value={day.day_id}>
                        {day.day_name}
                    </option>
                ))}
            </select>

            <input
                type="text"
                name="sub_time"
                placeholder="Face to Face Time"
                value={formData.sub_time}
                onChange={handleInputChange}
                className="p-2 w-full mb-2 border rounded"
            />
            <input
                type="text"
                name="sub_time_rc"
                placeholder="Remote Coaching Time"
                value={formData.sub_time_rc}
                onChange={handleInputChange}
                className="p-2 w-full mb-2 border rounded"
            />

            {/* Room Selection */}
            <Select
                name="sub_room"
                options={rooms.map((r) => ({ value: r.room_id, label: r.room_name }))}
                value={
                    formData.sub_room
                        ? rooms.find((r) => r.room_id === formData.sub_room)
                        : null
                }
                onChange={handleSelectChange}
                placeholder="Select Room"
                className="p-2 w-full mb-2 border rounded"
                isClearable
            />

            {/* Supervisor Selection */}
            <Select
                name="sub_supM_id"
                options={supervisors.map((sup) => ({
                    value: sup.supM_id,
                    label: sup.supM_name,
                }))}
                value={
                    formData.sub_supM_id
                        ? supervisors.find((sup) => sup.supM_id === formData.sub_supM_id)
                        : null
                }
                onChange={handleSelectChange}
                placeholder="Select Supervisor"
                className="p-2 w-full mb-2 border rounded"
                isClearable
            />

            <button
                onClick={handleAdd}
                className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
            >
                Add
            </button>
        </div>
    );
}

export default AddSubject;
