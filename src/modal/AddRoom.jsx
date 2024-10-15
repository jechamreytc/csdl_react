import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import secureLocalStorage from 'react-secure-storage';

function AddRoom() {
    const [formData, setFormData] = useState({
        room: "",
        building: ""
    });
    const [buildings, setBuildings] = useState([]);

    useEffect(() => {
        const getBuildings = async () => {
            try {
                const url = secureLocalStorage.getItem("url") + "CSDL.php";
                const formData = new FormData();
                formData.append("operation", "getBuildings");
                const res = await axios.post(url, formData);
                setBuildings(res.data);
                toast.success("Buildings loaded successfully");

                console.log('Buildings:', res.data);
            } catch (error) {
                console.log('Failed to load buildings:', error);
                toast.error("Failed to load buildings");
            }
        };

        getBuildings();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleAdd = async (e) => {
        e.preventDefault();

        // Validation: Check if the room already exists
        const roomExists = buildings.some(
            (building) => building.room_name?.toLowerCase() === formData.room.toLowerCase()
        );

        if (roomExists) {
            toast.error("Room with the same name already exists.");
            return; // Prevent form submission if room exists
        }

        try {
            const url = secureLocalStorage.getItem("url") + "CSDL.php";

            const jsonData = {
                room_name: formData.room,
                building_id: formData.building,
            };

            const formDataToSend = new FormData();
            formDataToSend.append("json", JSON.stringify(jsonData));
            formDataToSend.append("operation", "addRoom");

            const res = await axios.post(url, formDataToSend);

            if (res.data !== 0) {
                toast.success("Room added successfully");
                // Reset form fields after adding the room
                setFormData({
                    room: "",
                    building: ""
                });
            } else {
                toast.error("Failed to add room");
            }
        } catch (error) {
            console.log(error);
            toast.error("An error occurred while adding the room");
        }
    };

    return (
        <div className="flex flex-col items-center bg-blue-100 p-6 rounded-lg max-w-md mx-auto shadow-md">
            <h2 className="mb-4 text-2xl text-blue-900">Add Room</h2>

            <input
                type="text"
                name="room"
                placeholder="Enter Room Name"
                value={formData.room}
                onChange={handleInputChange}
                className="p-2 text-lg w-full mb-2 border border-blue-900 rounded"
            />

            <select
                name="building"
                value={formData.building}
                onChange={handleInputChange}
                className="p-2 text-lg w-full mb-2 border border-blue-900 rounded"
            >
                <option value="">Select Building</option>
                {buildings.length > 0 ? buildings.map((building, index) => (
                    <option key={index} value={building.building_id}>
                        {building.building_name}
                    </option>
                )) : (<option disabled>No buildings yet</option>)}
            </select>

            <button
                onClick={handleAdd}
                className="p-2 text-lg bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
            >
                Add Room
            </button>
        </div>
    );
}

export default AddRoom;
